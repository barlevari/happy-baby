import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage, usePageText } from '../../context/LanguageContext';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import {
  MOCK_HEALTH_METRICS,
  MOCK_TESTS,
  BABY_SIZES,
  WEEKLY_TIPS,
} from '../../data/mockData';

// ── Page-level translations ─────────────────────────────────
const T = {
  he: {
    week: 'שבוע',
    trimester1: 'טרימסטר ראשון',
    trimester2: 'טרימסטר שני',
    trimester3: 'טרימסטר שלישי',
    day: 'יום',
    daySunday: 'ראשון',
    dayMonday: 'שני',
    dayTuesday: 'שלישי',
    dayWednesday: 'רביעי',
    dayThursday: 'חמישי',
    dayFriday: 'שישי',
    daySaturday: 'שבת',
    monthJan: 'ינואר',
    monthFeb: 'פברואר',
    monthMar: 'מרץ',
    monthApr: 'אפריל',
    monthMay: 'מאי',
    monthJun: 'יוני',
    monthJul: 'יולי',
    monthAug: 'אוגוסט',
    monthSep: 'ספטמבר',
    monthOct: 'אוקטובר',
    monthNov: 'נובמבר',
    monthDec: 'דצמבר',
    hello: 'שלום',
    daysToDate: 'ימים ללידה',
    pregnancyStage: 'שלב ההריון',
    nextTest: 'הבדיקה הבאה',
    noTests: 'אין בדיקות',
    lastWeightKg: 'משקל אחרון (ק"ג)',
    sizeOf: 'כגודל',
    dueDate: 'לידה משוערת:',
    tipForWeek: 'טיפ לשבוע',
    healthMetrics: 'מדדי בריאות',
    addMetric: '+ הוסיפי מדד',
    weightKg: 'משקל (ק"ג)',
    bloodPressureMmhg: 'לחץ דם (מ"מ כספית)',
    bloodSugarMgdl: 'סוכר בדם (mg/dL)',
    pregnancyTests: 'בדיקות הריון',
    addTest: '+ הוסיפי בדיקה',
    testName: 'שם הבדיקה',
    recommendedWeek: 'שבוע מומלץ',
    status: 'סטטוס',
    date: 'תאריך',
    urgent: 'דחוף',
    done: 'בוצע',
    pending: 'ממתין',
    addHealthMetric: 'הוספת מדד בריאות',
    testDate: 'תאריך הבדיקה',
    fillAtLeastOne: 'יש למלא לפחות מדד אחד',
    diastolicRequired: 'נדרש גם לחץ דם דיאסטולי',
    systolicRequired: 'נדרש גם לחץ דם סיסטולי',
    cancel: 'ביטול',
    saveMetric: 'שמור מדד',
    addTestModal: 'הוספת בדיקה',
    selectTest: 'בחרי בדיקה',
    selectTestPlaceholder: '-- בחרי בדיקה --',
    other: 'אחר...',
    testNameLabel: 'שם הבדיקה',
    typeTestName: 'הקלידי שם בדיקה...',
    recommendedWeekLabel: 'שבוע מומלץ',
    completionDate: 'תאריך ביצוע',
    save: 'שמור',
    // METRIC_CONFIG labels/hints
    metricWeightLabel: 'משקל (ק"ג)',
    metricWeightPlaceholder: 'לדוגמה: 68.5',
    metricWeightHint: 'טווח תקין בהריון: עלייה של 0.3–0.5 ק"ג לשבוע בטרימסטר 2–3',
    metricBpSysLabel: 'לחץ דם סיסטולי (מ"מ כספית)',
    metricBpSysPlaceholder: 'לדוגמה: 115',
    metricBpSysHint: 'תקין: 90–120 | גבוה: מעל 140 | דחוף: מעל 160',
    metricBpDiaLabel: 'לחץ דם דיאסטולי (מ"מ כספית)',
    metricBpDiaPlaceholder: 'לדוגמה: 75',
    metricBpDiaHint: 'תקין: 60–80 | גבוה: מעל 90 | דחוף: מעל 110',
    metricBloodSugarLabel: 'סוכר בדם (mg/dL)',
    metricBloodSugarPlaceholder: 'לדוגמה: 90',
    metricBloodSugarHint: 'תקין בצום: 70–95 | אחרי ארוחה: עד 120',
    // Alert texts
    alertBpEmergency: 'פנייה לחדר מיון מיידית!',
    alertBpHigh: 'מומלץ להתייעץ עם רופא בהקדם.',
    alertBpLabel: 'לחץ דם',
    alertBpMmhg: 'מ"מ כספית',
    alertSugarHigh: 'מומלץ לדון עם הרופא על תוצאות עקומת הסוכר.',
    alertSugarAboveNorm: 'שימי לב לתזונה.',
    alertSugarLevelHigh: 'רמת סוכר גבוהה',
    alertSugarAboveNormLabel: 'רמת סוכר מעל הנורמה',
    alertWeightGain: 'עלייה של',
    alertWeightFromLast: 'מהמדידה האחרונה – מומלץ לדון עם הרופא.',
    alertWeightKg: 'ק"ג',
    // LMP prompt
    enterLmp: 'הזן/י תאריך הווסת האחרון',
    lmpNeeded: 'הנתון הזה נחוץ לחישוב שבוע ההריון ותאריך הלידה המשוער',
    updateInSettings: 'עדכן/י בהגדרות',
    // Tooltip formatters
    tooltipKg: 'ק"ג',
    tooltipWeight: 'משקל',
    tooltipSystolic: 'סיסטולי',
    tooltipDiastolic: 'דיאסטולי',
    tooltipSugar: 'סוכר',
    // Predefined tests
    testBloodGeneral: 'בדיקות דם כלליות',
    testNT: 'שקיפות עורפית + NT',
    testNIFTY: 'סקר גנטי – NIFTY',
    testEarlyAnatomy: 'סקירת מערכות מוקדמת',
    testLateAnatomy: 'סקירת מערכות מאוחרת',
    testIronFerritin: 'בדיקת ברזל ופריטין',
    testGCT: 'עקומת סוכר – GCT',
    testUrinalysis: 'בדיקת שתן ותרבית',
    testCBCAntibodies: 'ספירת דם + בדיקת נוגדנים',
    testPlacentaUS: 'אולטרסאונד לתפקוד שליה',
    testGBS: 'בדיקת סטרפטוקוק – GBS',
    testCTG: 'CTG – ניטור עוברי',
    testTSH: 'בדיקת TSH – בלוטת התריס',
    testProteinUrine: 'בדיקת חלבון בשתן',
  },
  en: {
    week: 'Week',
    trimester1: 'First Trimester',
    trimester2: 'Second Trimester',
    trimester3: 'Third Trimester',
    day: 'Day',
    daySunday: 'Sunday',
    dayMonday: 'Monday',
    dayTuesday: 'Tuesday',
    dayWednesday: 'Wednesday',
    dayThursday: 'Thursday',
    dayFriday: 'Friday',
    daySaturday: 'Saturday',
    monthJan: 'January',
    monthFeb: 'February',
    monthMar: 'March',
    monthApr: 'April',
    monthMay: 'May',
    monthJun: 'June',
    monthJul: 'July',
    monthAug: 'August',
    monthSep: 'September',
    monthOct: 'October',
    monthNov: 'November',
    monthDec: 'December',
    hello: 'Hello',
    daysToDate: 'Days to due date',
    pregnancyStage: 'Pregnancy stage',
    nextTest: 'Next test',
    noTests: 'No tests',
    lastWeightKg: 'Last weight (kg)',
    sizeOf: 'Size of',
    dueDate: 'Due date:',
    tipForWeek: 'Tip for week',
    healthMetrics: 'Health Metrics',
    addMetric: '+ Add Metric',
    weightKg: 'Weight (kg)',
    bloodPressureMmhg: 'Blood Pressure (mmHg)',
    bloodSugarMgdl: 'Blood Sugar (mg/dL)',
    pregnancyTests: 'Pregnancy Tests',
    addTest: '+ Add Test',
    testName: 'Test Name',
    recommendedWeek: 'Recommended Week',
    status: 'Status',
    date: 'Date',
    urgent: 'Urgent',
    done: 'Done',
    pending: 'Pending',
    addHealthMetric: 'Add Health Metric',
    testDate: 'Test Date',
    fillAtLeastOne: 'Fill at least one metric',
    diastolicRequired: 'Diastolic BP also required',
    systolicRequired: 'Systolic BP also required',
    cancel: 'Cancel',
    saveMetric: 'Save Metric',
    addTestModal: 'Add Test',
    selectTest: 'Select Test',
    selectTestPlaceholder: '-- Select Test --',
    other: 'Other...',
    testNameLabel: 'Test Name',
    typeTestName: 'Type test name...',
    recommendedWeekLabel: 'Recommended Week',
    completionDate: 'Completion Date',
    save: 'Save',
    // METRIC_CONFIG labels/hints
    metricWeightLabel: 'Weight (kg)',
    metricWeightPlaceholder: 'e.g.: 68.5',
    metricWeightHint: 'Normal range in pregnancy: 0.3–0.5 kg/week gain in trimester 2–3',
    metricBpSysLabel: 'Systolic BP (mmHg)',
    metricBpSysPlaceholder: 'e.g.: 115',
    metricBpSysHint: 'Normal: 90–120 | High: above 140 | Urgent: above 160',
    metricBpDiaLabel: 'Diastolic BP (mmHg)',
    metricBpDiaPlaceholder: 'e.g.: 75',
    metricBpDiaHint: 'Normal: 60–80 | High: above 90 | Urgent: above 110',
    metricBloodSugarLabel: 'Blood Sugar (mg/dL)',
    metricBloodSugarPlaceholder: 'e.g.: 90',
    metricBloodSugarHint: 'Normal fasting: 70–95 | Post-meal: up to 120',
    // Alert texts
    alertBpEmergency: 'Go to the emergency room immediately!',
    alertBpHigh: 'Consult a doctor as soon as possible.',
    alertBpLabel: 'Blood Pressure',
    alertBpMmhg: 'mmHg',
    alertSugarHigh: 'Discuss glucose tolerance test results with your doctor.',
    alertSugarAboveNorm: 'Watch your diet.',
    alertSugarLevelHigh: 'High blood sugar level',
    alertSugarAboveNormLabel: 'Blood sugar above normal',
    alertWeightGain: 'Gained',
    alertWeightFromLast: 'since last measurement \u2013 consult your doctor.',
    alertWeightKg: 'kg',
    // LMP prompt
    enterLmp: 'Enter last menstrual period date',
    lmpNeeded: 'This data is needed to calculate pregnancy week and estimated due date',
    updateInSettings: 'Update in Settings',
    // Tooltip formatters
    tooltipKg: 'kg',
    tooltipWeight: 'Weight',
    tooltipSystolic: 'Systolic',
    tooltipDiastolic: 'Diastolic',
    tooltipSugar: 'Sugar',
    // Predefined tests
    testBloodGeneral: 'General Blood Tests',
    testNT: 'Nuchal Translucency + NT',
    testNIFTY: 'Genetic Screening \u2013 NIFTY',
    testEarlyAnatomy: 'Early Anatomy Scan',
    testLateAnatomy: 'Late Anatomy Scan',
    testIronFerritin: 'Iron & Ferritin Test',
    testGCT: 'Glucose Challenge Test \u2013 GCT',
    testUrinalysis: 'Urinalysis & Culture',
    testCBCAntibodies: 'CBC + Antibody Test',
    testPlacentaUS: 'Placental Function Ultrasound',
    testGBS: 'Group B Strep \u2013 GBS',
    testCTG: 'CTG \u2013 Fetal Monitoring',
    testTSH: 'TSH \u2013 Thyroid Test',
    testProteinUrine: 'Urine Protein Test',
  },
};

// ── Helpers ──────────────────────────────────────────────────
function getBabySize(week) {
  const keys = Object.keys(BABY_SIZES).map(Number).sort((a, b) => a - b);
  let chosen = keys[0];
  for (const k of keys) { if (week >= k) chosen = k; }
  return BABY_SIZES[chosen];
}

function getTrimester(week, pt) {
  if (week <= 12) return { label: pt('trimester1'), num: 1 };
  if (week <= 26) return { label: pt('trimester2'), num: 2 };
  return { label: pt('trimester3'), num: 3 };
}

// dd/mm/yyyy in Arabic numerals - no browser locale dependency
function formatDate(dateStr) {
  if (!dateStr) return '\u2013';
  const d = new Date(dateStr + 'T12:00:00');
  return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
}

// Today's date string
function todayDateString(pt, isRTL) {
  const d = new Date();
  const days = [
    pt('daySunday'), pt('dayMonday'), pt('dayTuesday'),
    pt('dayWednesday'), pt('dayThursday'), pt('dayFriday'), pt('daySaturday'),
  ];
  const months = [
    pt('monthJan'), pt('monthFeb'), pt('monthMar'), pt('monthApr'),
    pt('monthMay'), pt('monthJun'), pt('monthJul'), pt('monthAug'),
    pt('monthSep'), pt('monthOct'), pt('monthNov'), pt('monthDec'),
  ];
  if (isRTL) {
    return `${pt('day')} ${days[d.getDay()]}, ${d.getDate()} \u05D1${months[d.getMonth()]} ${d.getFullYear()}`;
  }
  return `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

// Metric alerts logic
function getMetricAlerts(metrics, pt) {
  if (!metrics.length) return [];
  const latest = metrics[metrics.length - 1];
  const prev = metrics.length >= 2 ? metrics[metrics.length - 2] : null;
  const alerts = [];

  // Blood pressure
  if (latest.bpSystolic > 160 || latest.bpDiastolic > 110) {
    alerts.push({ level: 'danger', icon: '\uD83D\uDEA8', text: `${pt('alertBpLabel')} ${latest.bpSystolic}/${latest.bpDiastolic} \u2013 ${pt('alertBpEmergency')}` });
  } else if (latest.bpSystolic > 140 || latest.bpDiastolic > 90) {
    alerts.push({ level: 'warning', icon: '\u26A0\uFE0F', text: `${pt('alertBpLabel')} (${latest.bpSystolic}/${latest.bpDiastolic} ${pt('alertBpMmhg')}) \u2013 ${pt('alertBpHigh')}` });
  }

  // Blood sugar
  if (latest.bloodSugar > 140) {
    alerts.push({ level: 'warning', icon: '\uD83C\uDF6C', text: `${pt('alertSugarLevelHigh')} (${latest.bloodSugar} mg/dL) \u2013 ${pt('alertSugarHigh')}` });
  } else if (latest.bloodSugar > 120) {
    alerts.push({ level: 'warning', icon: '\uD83C\uDF6C', text: `${pt('alertSugarAboveNormLabel')} (${latest.bloodSugar} mg/dL) \u2013 ${pt('alertSugarAboveNorm')}` });
  }

  // Weight gain (from previous measurement)
  if (prev && latest.weight && prev.weight) {
    const gain = parseFloat((latest.weight - prev.weight).toFixed(1));
    if (gain > 3) {
      alerts.push({ level: 'warning', icon: '\u2696\uFE0F', text: `${pt('alertWeightGain')} ${gain} ${pt('alertWeightKg')} ${pt('alertWeightFromLast')}` });
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
function ProgressRing({ week, pt }) {
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
        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>{pt('week')}</div>
        <div style={{ fontSize: '1.5rem' }}>{babySize.emoji}</div>
      </div>
    </div>
  );
}

// ── Add Metric Modal ──────────────────────────────────────────
function MetricModal({ onClose, onSave, pt, isRTL }) {
  const metricConfig = [
    {
      field: 'weight',
      label: pt('metricWeightLabel'),
      placeholder: pt('metricWeightPlaceholder'),
      hint: pt('metricWeightHint'),
      min: 40, max: 140, step: 0.1,
      icon: '\u2696\uFE0F',
    },
    {
      field: 'bpSystolic',
      label: pt('metricBpSysLabel'),
      placeholder: pt('metricBpSysPlaceholder'),
      hint: pt('metricBpSysHint'),
      min: 60, max: 200, step: 1,
      icon: '\uD83D\uDC89',
    },
    {
      field: 'bpDiastolic',
      label: pt('metricBpDiaLabel'),
      placeholder: pt('metricBpDiaPlaceholder'),
      hint: pt('metricBpDiaHint'),
      min: 40, max: 130, step: 1,
      icon: '\uD83D\uDC89',
    },
    {
      field: 'bloodSugar',
      label: pt('metricBloodSugarLabel'),
      placeholder: pt('metricBloodSugarPlaceholder'),
      hint: pt('metricBloodSugarHint'),
      min: 50, max: 400, step: 1,
      icon: '\uD83C\uDF6C',
    },
  ];

  const today = new Date().toISOString().split('T')[0];
  const [form, setForm] = useState({ date: today, weight: '', bpSystolic: '', bpDiastolic: '', bloodSugar: '' });
  const [errors, setErrors] = useState({});

  function validate() {
    const errs = {};
    if (!form.weight && !form.bpSystolic && !form.bloodSugar) {
      errs.general = pt('fillAtLeastOne');
    }
    if (form.bpSystolic && !form.bpDiastolic) errs.bpDiastolic = pt('diastolicRequired');
    if (!form.bpSystolic && form.bpDiastolic) errs.bpSystolic = pt('systolicRequired');
    return errs;
  }

  function handleSave() {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
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

  const displayDate = form.date ? formatDate(form.date) : '';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{'\uD83D\uDCCA'} {pt('addHealthMetric')}</h2>
          <button onClick={onClose} style={{ border: 'none', background: 'none', fontSize: '1.2rem', cursor: 'pointer', color: 'var(--color-text-muted)' }}>{'\u2715'}</button>
        </div>

        {/* Date picker */}
        <div className="form-group">
          <label className="form-label">{'\uD83D\uDCC5'} {pt('testDate')}</label>
          <input
            type="date"
            lang="en"
            className="form-input"
            value={form.date}
            max={today}
            onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
            dir="ltr"
            style={{ textAlign: isRTL ? 'right' : 'left' }}
          />
          {form.date && (
            <div style={{ fontSize: '0.78rem', color: 'var(--color-sage-dark)', fontWeight: 600 }}>
              {'\u2713'} {displayDate}
            </div>
          )}
        </div>

        {errors.general && (
          <div className="alert alert-warning" style={{ marginBottom: 16, fontSize: '0.85rem' }}>
            {'\u26A0\uFE0F'} {errors.general}
          </div>
        )}

        {metricConfig.map(cfg => (
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
              style={{ textAlign: isRTL ? 'right' : 'left' }}
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
            {errors[cfg.field] && <span className="form-error">{'\u26A0\uFE0F'} {errors[cfg.field]}</span>}
            <div style={{ fontSize: '0.73rem', color: 'var(--color-text-muted)', marginTop: 2 }}>
              {cfg.hint}
            </div>
          </div>
        ))}

        <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
          <button className="btn btn-ghost" onClick={onClose} style={{ flex: 1 }}>{pt('cancel')}</button>
          <button className="btn btn-primary" onClick={handleSave} style={{ flex: 2 }}>{'\uD83D\uDCBE'} {pt('saveMetric')}</button>
        </div>
      </div>
    </div>
  );
}

// ── Add Test Modal ────────────────────────────────────────────
function TestModal({ onClose, onSave, pt, isRTL }) {
  const predefinedTests = [
    { name: pt('testBloodGeneral'), week: 8 },
    { name: pt('testNT'), week: 12 },
    { name: pt('testNIFTY'), week: 14 },
    { name: pt('testEarlyAnatomy'), week: 16 },
    { name: pt('testLateAnatomy'), week: 22 },
    { name: pt('testIronFerritin'), week: 24 },
    { name: pt('testGCT'), week: 26 },
    { name: pt('testUrinalysis'), week: 28 },
    { name: pt('testCBCAntibodies'), week: 30 },
    { name: pt('testPlacentaUS'), week: 32 },
    { name: pt('testGBS'), week: 35 },
    { name: pt('testCTG'), week: 38 },
    { name: pt('testTSH'), week: 10 },
    { name: pt('testProteinUrine'), week: 20 },
  ];

  const [form, setForm] = useState({ name: '', recommendedWeek: '', date: new Date().toISOString().split('T')[0] });
  const [isOther, setIsOther] = useState(false);

  const handleSelectTest = (value) => {
    if (value === 'other') {
      setIsOther(true);
      setForm(f => ({ ...f, name: '', recommendedWeek: '' }));
    } else {
      setIsOther(false);
      const test = predefinedTests.find(t => t.name === value);
      setForm(f => ({ ...f, name: value, recommendedWeek: test ? String(test.week) : '' }));
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <h2 style={{ marginBottom: 20, fontSize: '1.2rem', fontWeight: 800 }}>{pt('addTestModal')}</h2>
        <div className="form-group">
          <label className="form-label">{pt('selectTest')}</label>
          <select
            className="form-input"
            value={isOther ? 'other' : form.name}
            onChange={e => handleSelectTest(e.target.value)}
          >
            <option value="">{pt('selectTestPlaceholder')}</option>
            {predefinedTests.map(t => (
              <option key={t.name} value={t.name}>{t.name} ({pt('week')} {t.week})</option>
            ))}
            <option value="other">{pt('other')}</option>
          </select>
        </div>
        {isOther && (
          <div className="form-group">
            <label className="form-label">{pt('testNameLabel')}</label>
            <input type="text" className="form-input" value={form.name} placeholder={pt('typeTestName')} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          </div>
        )}
        <div className="form-group">
          <label className="form-label">{pt('recommendedWeekLabel')}</label>
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
          <label className="form-label">{pt('completionDate')}</label>
          <input type="date" lang="en" className="form-input" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} dir="ltr" />
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn btn-ghost" onClick={onClose} style={{ flex: 1 }}>{pt('cancel')}</button>
          <button
            className="btn btn-primary"
            disabled={!form.name.trim()}
            onClick={() => { onSave({ ...form, status: 'done', id: Date.now() }); onClose(); }}
            style={{ flex: 2 }}
          >{pt('save')}</button>
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
  const { lang, isRTL } = useLanguage();
  const pt = usePageText(T);

  const rawWeek = getCurrentWeek();
  const week = rawWeek || 1;
  const hasLmp = !!user?.lmpDate;
  const [metrics, setMetrics] = useState(() => loadUserMetrics(user?.id));
  const [tests, setTests] = useState(() => loadUserTests(user?.id));
  const [showMetricModal, setShowMetricModal] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false);

  const babySize = getBabySize(week);
  const trimester = getTrimester(week, pt);
  const dueDate = getDueDate(user?.lmpDate);
  const daysLeft = dueDate ? Math.max(0, Math.floor((dueDate - new Date()) / (1000 * 60 * 60 * 24))) : null;
  const latestWeight = metrics[metrics.length - 1]?.weight;
  const latestBP = metrics[metrics.length - 1];
  const highBP = latestBP && latestBP.bpSystolic > 140;
  const metricAlerts = getMetricAlerts(metrics, pt);

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

  const today = todayDateString(pt, isRTL);

  return (
    <div style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      {/* Greeting */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 'var(--font-2xl)', fontWeight: 900, marginBottom: 4 }}>
          {pt('hello')} {user?.name?.split(' ')[0]}! {'\uD83C\uDF38'}
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-sm)' }}>{today}</p>
      </div>

      {/* Upgrade banner */}
      <div style={{
        background: 'linear-gradient(135deg, var(--color-sage-ultra), var(--color-rose-light))',
        border: '1px solid var(--color-sage-light)',
        borderRadius: 'var(--radius-lg)',
        padding: '18px 24px',
        marginBottom: 24,
        display: 'flex',
        alignItems: 'center',
        gap: 16,
      }}>
        <span style={{ fontSize: '2rem' }}>✨</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--color-sage-dark)', marginBottom: 4 }}>
            {isRTL ? 'שדרגי לפרימיום' : 'Upgrade to Premium'}
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
            {isRTL
              ? 'קבלי גישה לתכנים בלעדיים, כלים מתקדמים וליווי אישי לאורך כל ההריון.'
              : 'Get access to exclusive content, advanced tools, and personal guidance throughout your pregnancy.'}
          </div>
        </div>
        <Link
          to="/pricing"
          className="btn btn-primary btn-sm"
          style={{ whiteSpace: 'nowrap', flexShrink: 0, textDecoration: 'none' }}
        >
          {isRTL ? '✨ שדרגי עכשיו' : '✨ Upgrade Now'}
        </Link>
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
          <span style={{ fontSize: '1.4rem' }}>{'\uD83D\uDCC5'}</span>
          <div style={{ flex: 1 }}>
            <strong style={{ color: '#B45309' }}>{pt('enterLmp')}</strong>
            <div style={{ fontSize: '0.82rem', color: '#92400E' }}>{pt('lmpNeeded')}</div>
          </div>
          <Link to="/settings" className="btn btn-sm" style={{ background: 'var(--color-warning)', color: 'white', border: 'none', whiteSpace: 'nowrap' }}>
            {pt('updateInSettings')}
          </Link>
        </div>
      )}

      {/* Hero Section */}
      <div className="grid-3" style={{ marginBottom: 32 }}>
        {/* Column 1 - Progress Ring */}
        <div className="card" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <ProgressRing week={week} pt={pt} />
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>
              {pt('sizeOf')} {babySize.name} {babySize.emoji}
            </div>
            {dueDate && (
              <div style={{ marginTop: 8, fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                {pt('dueDate')} {formatDate(dueDate.toISOString().split('T')[0])}
              </div>
            )}
          </div>
        </div>

        {/* Column 2 - Quick Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'var(--color-rose-light)' }}>{'\u23F3'}</div>
            <div className="stat-value" style={{ fontSize: '1.5rem' }}>{daysLeft ?? '\u2013'}</div>
            <div className="stat-label">{pt('daysToDate')}</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'var(--color-sage-ultra)' }}>{'\uD83D\uDCC5'}</div>
            <div className="stat-value" style={{ fontSize: '1.1rem' }}>{trimester.label}</div>
            <div className="stat-label">{pt('pregnancyStage')}</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#FEF3E7' }}>{'\uD83C\uDFE5'}</div>
            <div className="stat-value" style={{ fontSize: '0.9rem' }}>{nextTest ? nextTest.name : pt('noTests')}</div>
            <div className="stat-label">{pt('nextTest')}</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'var(--color-sage-ultra)' }}>{'\u2696\uFE0F'}</div>
            <div className="stat-value" style={{ fontSize: '1.5rem' }}>{latestWeight ? `${latestWeight}` : '\u2013'}</div>
            <div className="stat-label">{pt('lastWeightKg')}</div>
          </div>
        </div>

        {/* Column 3 - Daily Tip */}
        {tip && (
          <div className="card" style={{ background: 'linear-gradient(135deg, var(--color-sage-ultra), var(--color-rose-light))', border: '1px solid var(--color-sage-light)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span className="badge badge-sage">{pt('tipForWeek')} {week}</span>
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
          <h2 style={{ fontSize: 'var(--font-lg)', fontWeight: 800 }}>{'\uD83D\uDCCA'} {pt('healthMetrics')}</h2>
          <button className="btn btn-secondary btn-sm" onClick={() => setShowMetricModal(true)}>
            {pt('addMetric')}
          </button>
        </div>

        <div className="grid-3">
          {/* Weight chart */}
          <div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom: 6 }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>{'\u2696\uFE0F'} {pt('weightKg')}</div>
              {metrics.length > 0 && <div style={{ fontSize:'0.8rem', fontWeight:800, color:'var(--color-text)' }}>{metrics[metrics.length-1].weight} {pt('tooltipKg')}</div>}
            </div>
            <ResponsiveContainer width="100%" height={120}>
              <LineChart data={metrics.filter(m => m.weight)}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="date" tickFormatter={d => formatDate(d).slice(0,5)} tick={{ fontSize: 9, fill:'var(--color-text-muted)' }} />
                <YAxis domain={['auto', 'auto']} width={32} tick={{ fontSize: 9, fill:'var(--color-text-muted)' }} />
                <Tooltip
                  formatter={v => [`${v} ${pt('tooltipKg')}`, pt('tooltipWeight')]}
                  labelFormatter={l => formatDate(l)}
                  contentStyle={{ borderRadius:8, fontSize:12, direction: isRTL ? 'rtl' : 'ltr' }}
                />
                <Line type="monotone" dataKey="weight" stroke="var(--color-sage)" strokeWidth={2.5} dot={{ r: 4, fill:'var(--color-sage)' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* BP chart */}
          <div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom: 6 }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>{'\uD83D\uDC89'} {pt('bloodPressureMmhg')}</div>
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
                  contentStyle={{ borderRadius:8, fontSize:12, direction: isRTL ? 'rtl' : 'ltr' }}
                />
                <Line type="monotone" dataKey="bpSystolic" stroke="var(--color-rose)" strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} name={pt('tooltipSystolic')} />
                <Line type="monotone" dataKey="bpDiastolic" stroke="var(--color-rose-dark)" strokeWidth={2} dot={{ r: 3 }} strokeDasharray="4 2" name={pt('tooltipDiastolic')} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Blood Sugar chart */}
          <div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom: 6 }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>{'\uD83C\uDF6C'} {pt('bloodSugarMgdl')}</div>
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
                  formatter={v => [`${v} mg/dL`, pt('tooltipSugar')]}
                  labelFormatter={l => formatDate(l)}
                  contentStyle={{ borderRadius:8, fontSize:12, direction: isRTL ? 'rtl' : 'ltr' }}
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
          <h2 style={{ fontSize: 'var(--font-lg)', fontWeight: 800 }}>{'\uD83C\uDFE5'} {pt('pregnancyTests')}</h2>
          <button className="btn btn-secondary btn-sm" onClick={() => setShowTestModal(true)}>
            {pt('addTest')}
          </button>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>{pt('testName')}</th>
                <th>{pt('recommendedWeek')}</th>
                <th>{pt('status')}</th>
                <th>{pt('date')}</th>
              </tr>
            </thead>
            <tbody>
              {sortedTests.map(test => {
                const overdue = test.status === 'pending' && test.recommendedWeek < week;
                return (
                  <tr key={test.id}>
                    <td style={{ fontWeight: 600 }}>{test.name}</td>
                    <td style={{ color: 'var(--color-text-muted)' }}>{pt('week')} {test.recommendedWeek}</td>
                    <td>
                      {overdue ? (
                        <span className="badge badge-danger">{pt('urgent')}</span>
                      ) : test.status === 'done' ? (
                        <span className="badge badge-success">{pt('done')}</span>
                      ) : (
                        <span className="badge badge-warning">{pt('pending')}</span>
                      )}
                    </td>
                    <td style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                      {test.date ? formatDate(test.date) : '\u2013'}
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
          pt={pt}
          isRTL={isRTL}
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
          pt={pt}
          isRTL={isRTL}
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
