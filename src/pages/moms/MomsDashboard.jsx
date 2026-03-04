import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import {
  MOCK_HEALTH_METRICS,
  MOCK_TESTS,
  BABY_SIZES,
  WEEKLY_TIPS,
} from '../../data/mockData';

// ── Helpers ──────────────────────────────────────────────────
function getBabySize(week) {
  const keys = Object.keys(BABY_SIZES).map(Number).sort((a, b) => a - b);
  let chosen = keys[0];
  for (const k of keys) { if (week >= k) chosen = k; }
  return BABY_SIZES[chosen];
}

function getTrimester(week) {
  if (week <= 12) return { label: 'טרימסטר ראשון', num: 1 };
  if (week <= 26) return { label: 'טרימסטר שני', num: 2 };
  return { label: 'טרימסטר שלישי', num: 3 };
}

// תמיד dd/mm/yyyy בספרות ערביות – ללא תלות ב-locale של הדפדפן
function formatDate(dateStr) {
  if (!dateStr) return '–';
  const d = new Date(dateStr + 'T12:00:00');
  return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
}

// תאריך היום בעברית עם ספרות ערביות בלבד
function todayHebrewString() {
  const d = new Date();
  const days = ['ראשון','שני','שלישי','רביעי','חמישי','שישי','שבת'];
  const months = ['ינואר','פברואר','מרץ','אפריל','מאי','יוני','יולי','אוגוסט','ספטמבר','אוקטובר','נובמבר','דצמבר'];
  return `יום ${days[d.getDay()]}, ${d.getDate()} ב${months[d.getMonth()]} ${d.getFullYear()}`;
}

// ── לוגיקת התראות מדדים ──────────────────────────────────────
function getMetricAlerts(metrics) {
  if (!metrics.length) return [];
  const latest = metrics[metrics.length - 1];
  const prev = metrics.length >= 2 ? metrics[metrics.length - 2] : null;
  const alerts = [];

  // לחץ דם
  if (latest.bpSystolic > 160 || latest.bpDiastolic > 110) {
    alerts.push({ level: 'danger', icon: '🚨', text: `לחץ דם ${latest.bpSystolic}/${latest.bpDiastolic} – פנייה לחדר מיון מיידית!` });
  } else if (latest.bpSystolic > 140 || latest.bpDiastolic > 90) {
    alerts.push({ level: 'warning', icon: '⚠️', text: `לחץ דם גבוה (${latest.bpSystolic}/${latest.bpDiastolic} מ"מ כספית) – מומלץ להתייעץ עם רופא בהקדם.` });
  }

  // סוכר בדם
  if (latest.bloodSugar > 140) {
    alerts.push({ level: 'warning', icon: '🍬', text: `רמת סוכר גבוהה (${latest.bloodSugar} mg/dL) – מומלץ לדון עם הרופא על תוצאות עקומת הסוכר.` });
  } else if (latest.bloodSugar > 120) {
    alerts.push({ level: 'warning', icon: '🍬', text: `רמת סוכר מעל הנורמה (${latest.bloodSugar} mg/dL) – שימי לב לתזונה.` });
  }

  // עלייה במשקל (מהמדידה הקודמת)
  if (prev && latest.weight && prev.weight) {
    const gain = parseFloat((latest.weight - prev.weight).toFixed(1));
    if (gain > 3) {
      alerts.push({ level: 'warning', icon: '⚖️', text: `עלייה של ${gain} ק"ג מהמדידה האחרונה – מומלץ לדון עם הרופא.` });
    }
  }

  return alerts;
}

function getDueDate(lmpDate) {
  if (!lmpDate) return null;
  const d = new Date(lmpDate);
  d.setDate(d.getDate() + 280);
  return d;
}

// ── Progress Ring Component ───────────────────────────────────
function ProgressRing({ week }) {
  const r = 80, cx = 100, cy = 100;
  const circ = 2 * Math.PI * r;
  const progress = Math.min(week / 40, 1);
  const offset = circ * (1 - progress);
  const babySize = getBabySize(week);

  return (
    <div style={{ position: 'relative', width: 200, height: 200, margin: '0 auto' }}>
      <svg width="200" height="200" style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}>
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7DAA92" />
            <stop offset="100%" stopColor="#5C8A72" />
          </linearGradient>
        </defs>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--color-border)" strokeWidth={14} />
        <circle
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth={14}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.8s ease' }}
        />
      </svg>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 4,
      }}>
        <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--color-sage-dark)', lineHeight: 1 }}>
          {week}
        </div>
        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>שבוע</div>
        <div style={{ fontSize: '1.5rem' }}>{babySize.emoji}</div>
      </div>
    </div>
  );
}

// ── Add Metric Modal ──────────────────────────────────────────
const METRIC_CONFIG = [
  {
    field: 'weight',
    label: 'משקל (ק"ג)',
    placeholder: 'לדוגמה: 68.5',
    hint: 'טווח תקין בהריון: עלייה של 0.3–0.5 ק"ג לשבוע בטרימסטר 2–3',
    min: 40, max: 140, step: 0.1,
    icon: '⚖️',
  },
  {
    field: 'bpSystolic',
    label: 'לחץ דם סיסטולי (מ"מ כספית)',
    placeholder: 'לדוגמה: 115',
    hint: 'תקין: 90–120 | גבוה: מעל 140 | דחוף: מעל 160',
    min: 60, max: 200, step: 1,
    icon: '💉',
  },
  {
    field: 'bpDiastolic',
    label: 'לחץ דם דיאסטולי (מ"מ כספית)',
    placeholder: 'לדוגמה: 75',
    hint: 'תקין: 60–80 | גבוה: מעל 90 | דחוף: מעל 110',
    min: 40, max: 130, step: 1,
    icon: '💉',
  },
  {
    field: 'bloodSugar',
    label: 'סוכר בדם (mg/dL)',
    placeholder: 'לדוגמה: 90',
    hint: 'תקין בצום: 70–95 | אחרי ארוחה: עד 120',
    min: 50, max: 400, step: 1,
    icon: '🍬',
  },
];

function MetricModal({ onClose, onSave }) {
  const today = new Date().toISOString().split('T')[0];
  const [form, setForm] = useState({ date: today, weight: '', bpSystolic: '', bpDiastolic: '', bloodSugar: '' });
  const [errors, setErrors] = useState({});

  function validate() {
    const errs = {};
    if (!form.weight && !form.bpSystolic && !form.bloodSugar) {
      errs.general = 'יש למלא לפחות מדד אחד';
    }
    if (form.bpSystolic && !form.bpDiastolic) errs.bpDiastolic = 'נדרש גם לחץ דם דיאסטולי';
    if (!form.bpSystolic && form.bpDiastolic) errs.bpSystolic = 'נדרש גם לחץ דם סיסטולי';
    return errs;
  }

  function handleSave() {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    // Convert strings to numbers
    const data = {
      date: form.date,
      weight: form.weight ? parseFloat(form.weight) : null,
      bpSystolic: form.bpSystolic ? parseInt(form.bpSystolic) : null,
      bpDiastolic: form.bpDiastolic ? parseInt(form.bpDiastolic) : null,
      bloodSugar: form.bloodSugar ? parseFloat(form.bloodSugar) : null,
    };
    onSave(data);
    onClose();
  }

  // Format date for display in the date field
  const displayDate = form.date ? formatDate(form.date) : '';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>📊 הוספת מדד בריאות</h2>
          <button onClick={onClose} style={{ border: 'none', background: 'none', fontSize: '1.2rem', cursor: 'pointer', color: 'var(--color-text-muted)' }}>✕</button>
        </div>

        {/* Date picker */}
        <div className="form-group">
          <label className="form-label">📅 תאריך הבדיקה</label>
          <input
            type="date"
            lang="en"
            className="form-input"
            value={form.date}
            max={today}
            onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
            dir="ltr"
            style={{ textAlign: 'right' }}
          />
          {form.date && (
            <div style={{ fontSize: '0.78rem', color: 'var(--color-sage-dark)', fontWeight: 600 }}>
              ✓ {displayDate}
            </div>
          )}
        </div>

        {errors.general && (
          <div className="alert alert-warning" style={{ marginBottom: 16, fontSize: '0.85rem' }}>
            ⚠️ {errors.general}
          </div>
        )}

        {METRIC_CONFIG.map(cfg => (
          <div className="form-group" key={cfg.field}>
            <label className="form-label">
              {cfg.icon} {cfg.label}
            </label>
            <input
              type="number"
              inputMode="decimal"
              className={`form-input${errors[cfg.field] ? ' error' : ''}`}
              value={form[cfg.field]}
              placeholder={cfg.placeholder}
              min={cfg.min}
              max={cfg.max}
              step={cfg.step}
              dir="ltr"
              style={{ textAlign: 'right' }}
              onKeyDown={e => {
                if (!/[0-9.]/.test(e.key) && !['Backspace','Tab','Enter','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Delete'].includes(e.key)) {
                  e.preventDefault();
                }
                if (e.key === '.' && e.target.value.includes('.')) {
                  e.preventDefault();
                }
              }}
              onChange={e => {
                const val = e.target.value.replace(/[^0-9.]/g, '');
                setForm(f => ({ ...f, [cfg.field]: val }));
                setErrors(prev => ({ ...prev, [cfg.field]: undefined }));
              }}
            />
            {errors[cfg.field] && <span className="form-error">⚠️ {errors[cfg.field]}</span>}
            <div style={{ fontSize: '0.73rem', color: 'var(--color-text-muted)', marginTop: 2 }}>
              {cfg.hint}
            </div>
          </div>
        ))}

        <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
          <button className="btn btn-ghost" onClick={onClose} style={{ flex: 1 }}>ביטול</button>
          <button className="btn btn-primary" onClick={handleSave} style={{ flex: 2 }}>💾 שמור מדד</button>
        </div>
      </div>
    </div>
  );
}

// ── Add Test Modal ────────────────────────────────────────────
const PREDEFINED_TESTS = [
  { name: 'בדיקות דם כלליות', week: 8 },
  { name: 'שקיפות עורפית + NT', week: 12 },
  { name: 'סקר גנטי – NIFTY', week: 14 },
  { name: 'סקירת מערכות מוקדמת', week: 16 },
  { name: 'סקירת מערכות מאוחרת', week: 22 },
  { name: 'בדיקת ברזל ופריטין', week: 24 },
  { name: 'עקומת סוכר – GCT', week: 26 },
  { name: 'בדיקת שתן ותרבית', week: 28 },
  { name: 'ספירת דם + בדיקת נוגדנים', week: 30 },
  { name: 'אולטרסאונד לתפקוד שליה', week: 32 },
  { name: 'בדיקת סטרפטוקוק – GBS', week: 35 },
  { name: 'CTG – ניטור עוברי', week: 38 },
  { name: 'בדיקת TSH – בלוטת התריס', week: 10 },
  { name: 'בדיקת חלבון בשתן', week: 20 },
];

function TestModal({ onClose, onSave }) {
  const [form, setForm] = useState({ name: '', recommendedWeek: '', date: new Date().toISOString().split('T')[0] });
  const [isOther, setIsOther] = useState(false);

  const handleSelectTest = (value) => {
    if (value === 'other') {
      setIsOther(true);
      setForm(f => ({ ...f, name: '', recommendedWeek: '' }));
    } else {
      setIsOther(false);
      const test = PREDEFINED_TESTS.find(t => t.name === value);
      setForm(f => ({ ...f, name: value, recommendedWeek: test ? String(test.week) : '' }));
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <h2 style={{ marginBottom: 20, fontSize: '1.2rem', fontWeight: 800 }}>הוספת בדיקה</h2>
        <div className="form-group">
          <label className="form-label">בחרי בדיקה</label>
          <select
            className="form-input"
            value={isOther ? 'other' : form.name}
            onChange={e => handleSelectTest(e.target.value)}
          >
            <option value="">-- בחרי בדיקה --</option>
            {PREDEFINED_TESTS.map(t => (
              <option key={t.name} value={t.name}>{t.name} (שבוע {t.week})</option>
            ))}
            <option value="other">אחר...</option>
          </select>
        </div>
        {isOther && (
          <div className="form-group">
            <label className="form-label">שם הבדיקה</label>
            <input type="text" className="form-input" value={form.name} placeholder="הקלידי שם בדיקה..." onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          </div>
        )}
        <div className="form-group">
          <label className="form-label">שבוע מומלץ</label>
          <input
            type="number"
            inputMode="numeric"
            className="form-input"
            value={form.recommendedWeek}
            min={1}
            max={42}
            dir="ltr"
            onKeyDown={e => {
              if (!/[0-9]/.test(e.key) && !['Backspace','Tab','Enter','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Delete'].includes(e.key)) {
                e.preventDefault();
              }
            }}
            onChange={e => {
              const val = e.target.value.replace(/[^0-9]/g, '');
              setForm(f => ({ ...f, recommendedWeek: val }));
            }}
          />
        </div>
        <div className="form-group">
          <label className="form-label">תאריך ביצוע</label>
          <input type="date" lang="en" className="form-input" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} dir="ltr" />
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn btn-ghost" onClick={onClose} style={{ flex: 1 }}>ביטול</button>
          <button
            className="btn btn-primary"
            disabled={!form.name.trim()}
            onClick={() => { onSave({ ...form, status: 'done', id: Date.now() }); onClose(); }}
            style={{ flex: 2 }}
          >שמור</button>
        </div>
      </div>
    </div>
  );
}

// ── Per-user localStorage helpers ────────────────────────────
function loadUserMetrics(userId) {
  try {
    const stored = localStorage.getItem(`hb_metrics_${userId}`);
    if (stored) return JSON.parse(stored);
  } catch {}
  return [];
}

function saveUserMetrics(userId, data) {
  localStorage.setItem(`hb_metrics_${userId}`, JSON.stringify(data));
}

function loadUserTests(userId) {
  try {
    const stored = localStorage.getItem(`hb_tests_${userId}`);
    if (stored) return JSON.parse(stored);
  } catch {}
  return [];
}

function saveUserTests(userId, data) {
  localStorage.setItem(`hb_tests_${userId}`, JSON.stringify(data));
}

// ── Main Dashboard ────────────────────────────────────────────
export default function MomsDashboard() {
  const { user, getCurrentWeek } = useAuth();
  const rawWeek = getCurrentWeek();
  const week = rawWeek || 1;
  const hasLmp = !!user?.lmpDate;
  const [metrics, setMetrics] = useState(() => loadUserMetrics(user?.id));
  const [tests, setTests] = useState(() => loadUserTests(user?.id));
  const [showMetricModal, setShowMetricModal] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false);

  const babySize = getBabySize(week);
  const trimester = getTrimester(week);
  const dueDate = getDueDate(user?.lmpDate);
  const daysLeft = dueDate ? Math.max(0, Math.floor((dueDate - new Date()) / (1000 * 60 * 60 * 24))) : null;
  const latestWeight = metrics[metrics.length - 1]?.weight;
  const latestBP = metrics[metrics.length - 1];
  const highBP = latestBP && latestBP.bpSystolic > 140;
  const metricAlerts = getMetricAlerts(metrics);

  const tip = useMemo(() => {
    const keys = WEEKLY_TIPS.map(t => t.week).sort((a, b) => a - b);
    let chosen = keys[0];
    for (const k of keys) { if (week >= k) chosen = k; }
    return WEEKLY_TIPS.find(t => t.week === chosen);
  }, [week]);

  const sortedTests = useMemo(() => {
    return [...tests].sort((a, b) => {
      const aOverdue = a.status === 'pending' && a.recommendedWeek < week;
      const bOverdue = b.status === 'pending' && b.recommendedWeek < week;
      if (aOverdue && !bOverdue) return -1;
      if (!aOverdue && bOverdue) return 1;
      return a.recommendedWeek - b.recommendedWeek;
    });
  }, [tests, week]);

  const nextTest = useMemo(() =>
    tests.find(t => t.status === 'pending' && t.recommendedWeek >= week),
    [tests, week]
  );

  const today = todayHebrewString();

  return (
    <div style={{ direction: 'rtl' }}>
      {/* Greeting */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 'var(--font-2xl)', fontWeight: 900, marginBottom: 4 }}>
          שלום {user?.name?.split(' ')[0]}! 🌸
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-sm)' }}>{today}</p>
      </div>

      {/* LMP missing prompt */}
      {!hasLmp && (
        <div style={{
          background: '#FFF8E1',
          border: '1px solid var(--color-warning)',
          borderRadius: 'var(--radius-md)',
          padding: '14px 18px',
          marginBottom: 24,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          <span style={{ fontSize: '1.4rem' }}>📅</span>
          <div style={{ flex: 1 }}>
            <strong style={{ color: '#B45309' }}>הזן/י תאריך הווסת האחרון</strong>
            <div style={{ fontSize: '0.82rem', color: '#92400E' }}>הנתון הזה נחוץ לחישוב שבוע ההריון ותאריך הלידה המשוער</div>
          </div>
          <Link to="/settings" className="btn btn-sm" style={{ background: 'var(--color-warning)', color: 'white', border: 'none', whiteSpace: 'nowrap' }}>
            עדכן/י בהגדרות
          </Link>
        </div>
      )}

      {/* Hero Section */}
      <div className="grid-3" style={{ marginBottom: 32 }}>
        {/* Column 1 - Progress Ring */}
        <div className="card" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <ProgressRing week={week} />
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>
              כגודל {babySize.name} {babySize.emoji}
            </div>
            {dueDate && (
              <div style={{ marginTop: 8, fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                לידה משוערת: {formatDate(dueDate.toISOString().split('T')[0])}
              </div>
            )}
          </div>
        </div>

        {/* Column 2 - Quick Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'var(--color-rose-light)' }}>⏳</div>
            <div className="stat-value" style={{ fontSize: '1.5rem' }}>{daysLeft ?? '–'}</div>
            <div className="stat-label">ימים ללידה</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'var(--color-sage-ultra)' }}>📅</div>
            <div className="stat-value" style={{ fontSize: '1.1rem' }}>{trimester.label}</div>
            <div className="stat-label">שלב ההריון</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#FEF3E7' }}>🏥</div>
            <div className="stat-value" style={{ fontSize: '0.9rem' }}>{nextTest ? nextTest.name : 'אין בדיקות'}</div>
            <div className="stat-label">הבדיקה הבאה</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'var(--color-sage-ultra)' }}>⚖️</div>
            <div className="stat-value" style={{ fontSize: '1.5rem' }}>{latestWeight ? `${latestWeight}` : '–'}</div>
            <div className="stat-label">משקל אחרון (ק"ג)</div>
          </div>
        </div>

        {/* Column 3 - Daily Tip */}
        {tip && (
          <div className="card" style={{ background: 'linear-gradient(135deg, var(--color-sage-ultra), var(--color-rose-light))', border: '1px solid var(--color-sage-light)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span className="badge badge-sage">טיפ לשבוע {week}</span>
              <span className="badge badge-rose">{tip.category}</span>
            </div>
            <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>{tip.emoji}</div>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--color-text)', fontWeight: 500 }}>
              {tip.tip}
            </p>
          </div>
        )}
      </div>

      {/* Dynamic Metric Alerts */}
      {metricAlerts.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {metricAlerts.map((alert, i) => (
            <div
              key={i}
              className={`alert alert-${alert.level}`}
              style={{ borderRadius: 'var(--radius-md)' }}
            >
              <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{alert.icon}</span>
              <span>{alert.text}</span>
            </div>
          ))}
        </div>
      )}

      {/* Health Metrics */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 style={{ fontSize: 'var(--font-lg)', fontWeight: 800 }}>📊 מדדי בריאות</h2>
          <button className="btn btn-secondary btn-sm" onClick={() => setShowMetricModal(true)}>
            + הוסיפי מדד
          </button>
        </div>

        <div className="grid-3">
          {/* Weight chart */}
          <div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom: 6 }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>⚖️ משקל (ק"ג)</div>
              {metrics.length > 0 && <div style={{ fontSize:'0.8rem', fontWeight:800, color:'var(--color-text)' }}>{metrics[metrics.length-1].weight} ק"ג</div>}
            </div>
            <ResponsiveContainer width="100%" height={120}>
              <LineChart data={metrics.filter(m => m.weight)}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="date" tickFormatter={d => formatDate(d).slice(0,5)} tick={{ fontSize: 9, fill:'var(--color-text-muted)' }} />
                <YAxis domain={['auto', 'auto']} width={32} tick={{ fontSize: 9, fill:'var(--color-text-muted)' }} />
                <Tooltip
                  formatter={v => [`${v} ק"ג`, 'משקל']}
                  labelFormatter={l => formatDate(l)}
                  contentStyle={{ borderRadius:8, fontSize:12, direction:'rtl' }}
                />
                <Line type="monotone" dataKey="weight" stroke="var(--color-sage)" strokeWidth={2.5} dot={{ r: 4, fill:'var(--color-sage)' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* BP chart */}
          <div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom: 6 }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>💉 לחץ דם (מ"מ כספית)</div>
              {metrics.length > 0 && metrics[metrics.length-1].bpSystolic && (
                <div style={{ fontSize:'0.8rem', fontWeight:800, color: metrics[metrics.length-1].bpSystolic > 140 ? 'var(--color-warning)' : 'var(--color-text)' }}>
                  {metrics[metrics.length-1].bpSystolic}/{metrics[metrics.length-1].bpDiastolic}
                </div>
              )}
            </div>
            <ResponsiveContainer width="100%" height={120}>
              <LineChart data={metrics.filter(m => m.bpSystolic)}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="date" tickFormatter={d => formatDate(d).slice(0,5)} tick={{ fontSize: 9, fill:'var(--color-text-muted)' }} />
                <YAxis domain={['auto', 'auto']} width={32} tick={{ fontSize: 9, fill:'var(--color-text-muted)' }} />
                <Tooltip
                  labelFormatter={l => formatDate(l)}
                  contentStyle={{ borderRadius:8, fontSize:12, direction:'rtl' }}
                />
                <Line type="monotone" dataKey="bpSystolic" stroke="var(--color-rose)" strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} name="סיסטולי" />
                <Line type="monotone" dataKey="bpDiastolic" stroke="var(--color-rose-dark)" strokeWidth={2} dot={{ r: 3 }} strokeDasharray="4 2" name="דיאסטולי" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Blood Sugar chart */}
          <div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom: 6 }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>🍬 סוכר בדם (mg/dL)</div>
              {metrics.length > 0 && metrics[metrics.length-1].bloodSugar && (
                <div style={{ fontSize:'0.8rem', fontWeight:800, color: metrics[metrics.length-1].bloodSugar > 120 ? 'var(--color-warning)' : 'var(--color-text)' }}>
                  {metrics[metrics.length-1].bloodSugar} mg/dL
                </div>
              )}
            </div>
            <ResponsiveContainer width="100%" height={120}>
              <LineChart data={metrics.filter(m => m.bloodSugar)}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="date" tickFormatter={d => formatDate(d).slice(0,5)} tick={{ fontSize: 9, fill:'var(--color-text-muted)' }} />
                <YAxis domain={['auto', 'auto']} width={32} tick={{ fontSize: 9, fill:'var(--color-text-muted)' }} />
                <Tooltip
                  formatter={v => [`${v} mg/dL`, 'סוכר']}
                  labelFormatter={l => formatDate(l)}
                  contentStyle={{ borderRadius:8, fontSize:12, direction:'rtl' }}
                />
                <Line type="monotone" dataKey="bloodSugar" stroke="var(--color-warning)" strokeWidth={2.5} dot={{ r: 4, fill:'var(--color-warning)' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tests Panel */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 style={{ fontSize: 'var(--font-lg)', fontWeight: 800 }}>🏥 בדיקות הריון</h2>
          <button className="btn btn-secondary btn-sm" onClick={() => setShowTestModal(true)}>
            + הוסיפי בדיקה
          </button>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>שם הבדיקה</th>
                <th>שבוע מומלץ</th>
                <th>סטטוס</th>
                <th>תאריך</th>
              </tr>
            </thead>
            <tbody>
              {sortedTests.map(test => {
                const overdue = test.status === 'pending' && test.recommendedWeek < week;
                return (
                  <tr key={test.id}>
                    <td style={{ fontWeight: 600 }}>{test.name}</td>
                    <td style={{ color: 'var(--color-text-muted)' }}>שבוע {test.recommendedWeek}</td>
                    <td>
                      {overdue ? (
                        <span className="badge badge-danger">דחוף</span>
                      ) : test.status === 'done' ? (
                        <span className="badge badge-success">בוצע</span>
                      ) : (
                        <span className="badge badge-warning">ממתין</span>
                      )}
                    </td>
                    <td style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                      {test.date ? formatDate(test.date) : '–'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {showMetricModal && (
        <MetricModal
          onClose={() => setShowMetricModal(false)}
          onSave={m => setMetrics(prev => {
            const next = [...prev, m];
            saveUserMetrics(user?.id, next);
            return next;
          })}
        />
      )}
      {showTestModal && (
        <TestModal
          onClose={() => setShowTestModal(false)}
          onSave={t => setTests(prev => {
            const next = [...prev, t];
            saveUserTests(user?.id, next);
            return next;
          })}
        />
      )}
    </div>
  );
}
