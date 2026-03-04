import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth, ADMIN_SECRET } from '../../context/AuthContext';

function validateIsraeliIdLocal(id) {
  const str = String(id).padStart(9, '0');
  if (str.length !== 9) return false;
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    let c = Number(str[i]) * ((i % 2) + 1);
    if (c > 9) c -= 9;
    sum += c;
  }
  return sum % 10 === 0;
}

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preRole = searchParams.get('role');

  const [step, setStep] = useState(preRole ? 2 : 1);
  const [role, setRole] = useState(preRole || '');
  const [form, setForm] = useState({ name: '', email: '', password: '', idNumber: '', lmpDate: '', adminCode: '' });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    if (preRole) { setRole(preRole); setStep(2); }
  }, [preRole]);

  const updateField = (field, value) => {
    setForm(f => ({ ...f, [field]: value }));
    setErrors(e => ({ ...e, [field]: '' }));
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'נא להזין שם מלא';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) newErrors.email = 'כתובת אימייל לא תקינה';
    if (form.password.length < 8) newErrors.password = 'הסיסמה חייבת להכיל לפחות 8 תווים';
    if (!validateIsraeliIdLocal(form.idNumber)) newErrors.idNumber = 'מספר תעודת זהות לא תקין';
    if (role === 'moms' && !form.lmpDate) newErrors.lmpDate = 'נא להזין תאריך הווסת האחרון';
    if (role === 'admin' && !form.adminCode) newErrors.adminCode = 'נא להזין קוד מנהל';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep2()) return;
    setLoading(true);
    const result = register({ ...form, role });
    setLoading(false);
    if (!result.ok) { setSubmitError(result.error); return; }

    if (role === 'admin') {
      navigate('/admin');
    } else if (result.pending) {
      setRegistered(true);
    } else {
      if (role === 'moms') navigate('/moms');
      else if (role === 'student') navigate('/academy');
    }
  };

  const roleCards = [
    {
      id: 'moms',
      icon: '🤰',
      title: 'אני בהריון / יולדת',
      desc: 'מעקב הריון אישי, טיפים שבועיים, ניהול בדיקות ותמיכה',
      color: 'var(--color-rose-light)',
      border: 'var(--color-rose)',
    },
    {
      id: 'student',
      icon: '🎓',
      title: 'אני רוצה ללמוד Happy Baby',
      desc: 'קורס מקצועי לרכישת שיטת Happy Baby ולווי אמהות',
      color: 'var(--color-sage-ultra)',
      border: 'var(--color-sage)',
    },
    {
      id: 'admin',
      icon: '🛡️',
      title: 'מנהל / מנהלת האתר',
      desc: 'גישה מלאה לניהול משתמשים, תוכן ואבטחה (נדרש קוד מנהל)',
      color: '#F0F4FF',
      border: 'var(--color-admin)',
    },
  ];

  // Pending approval screen
  if (registered) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(160deg, var(--color-cream) 0%, var(--color-sage-ultra) 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24, direction: 'rtl',
      }}>
        <div style={{
          width: '100%', maxWidth: 440,
          background: 'var(--color-white)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-xl)',
          padding: '48px 36px',
          textAlign: 'center',
          border: '1px solid var(--color-border)',
        }}>
          <div style={{ fontSize: '3.5rem', marginBottom: 16 }}>⏳</div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--color-sage-dark)', marginBottom: 12 }}>
            ההרשמה נשלחה!
          </h1>
          <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: 24 }}>
            בקשתך התקבלה ותבדק על ידי המנהלת בהקדם.
            תקבלי הודעה ברגע שהחשבון שלך יאושר.
          </p>
          <div style={{
            padding: '14px 18px',
            background: 'var(--color-sage-ultra)',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.85rem',
            color: 'var(--color-sage-dark)',
            marginBottom: 24,
          }}>
            📧 שמור/י את פרטי ההתחברות שלך — תצטרכ/י אותם לאחר האישור
          </div>
          <Link to="/login" className="btn btn-primary" style={{ display: 'block', textAlign: 'center' }}>
            חזרה לכניסה
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, var(--color-cream) 0%, var(--color-sage-ultra) 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      direction: 'rtl',
      position: 'relative',
    }}>
      {/* Back button */}
      <button
        onClick={() => navigate('/')}
        style={{
          position: 'absolute',
          top: 24,
          right: 24,
          background: 'rgba(255,255,255,0.9)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          padding: '8px 16px',
          fontSize: '0.9rem',
          fontWeight: 600,
          color: 'var(--color-text)',
          cursor: 'pointer',
          transition: 'all 0.2s',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,1)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.9)'}
      >
        → חזרה
      </button>

      <div style={{
        width: '100%',
        maxWidth: step === 1 ? 660 : 480,
        background: 'var(--color-white)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-xl)',
        padding: '40px 36px',
        border: '1px solid var(--color-border)',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <img src="/happy-baby-logo.png" alt="happy baby" style={{ height: 56, objectFit: 'contain' }} />
        </div>

        {/* Progress */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 28, justifyContent: 'center' }}>
          {[1, 2].map(s => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                background: step >= s ? 'var(--color-sage)' : 'var(--color-border)',
                color: step >= s ? 'white' : 'var(--color-text-muted)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: '0.8rem', transition: 'all 0.3s',
              }}>{s}</div>
              {s < 2 && <div style={{ width: 32, height: 2, background: step > s ? 'var(--color-sage)' : 'var(--color-border)', borderRadius: 2 }} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div>
            <h1 style={{ textAlign: 'center', fontSize: '1.3rem', fontWeight: 800, marginBottom: 24, color: 'var(--color-text)' }}>
              בחר/י את המסלול שלך
            </h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {roleCards.map(card => (
                <div
                  key={card.id}
                  className="card card-clickable"
                  style={{
                    background: card.color,
                    borderColor: role === card.id ? card.border : 'transparent',
                    borderWidth: 2,
                    display: 'flex', gap: 16, alignItems: 'flex-start',
                    padding: 20,
                    boxShadow: role === card.id ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                  }}
                  onClick={() => setRole(card.id)}
                >
                  <div style={{ fontSize: '2.5rem', flexShrink: 0 }}>{card.icon}</div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--color-text)' }}>{card.title}</div>
                    <div style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginTop: 4 }}>{card.desc}</div>
                  </div>
                  {role === card.id && <div style={{ marginRight: 'auto', fontSize: '1.2rem' }}>✅</div>}
                </div>
              ))}
            </div>
            <button
              className="btn btn-primary w-full"
              style={{ marginTop: 24 }}
              disabled={!role}
              onClick={() => setStep(2)}
            >
              המשך ←
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h1 style={{ textAlign: 'center', fontSize: '1.3rem', fontWeight: 800, marginBottom: 24, color: 'var(--color-text)' }}>
              פרטים אישיים
            </h1>

            {submitError && <div className="alert alert-danger" style={{ marginBottom: 16 }}>⚠️ {submitError}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">שם מלא</label>
                <input
                  type="text"
                  className={`form-input${errors.name ? ' error' : ''}`}
                  placeholder="שם פרטי ושם משפחה"
                  value={form.name}
                  onChange={e => updateField('name', e.target.value)}
                />
                {errors.name && <span className="form-error">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">כתובת אימייל</label>
                <input
                  type="email"
                  className={`form-input${errors.email ? ' error' : ''}`}
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={e => updateField('email', e.target.value)}
                  dir="ltr"
                />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">
                  תעודת זהות
                  {form.idNumber.length >= 7 && (
                    <span style={{ marginRight: 8, fontSize: '0.75rem', color: validateIsraeliIdLocal(form.idNumber) ? '#2E7D32' : 'var(--color-danger)' }}>
                      {validateIsraeliIdLocal(form.idNumber) ? '✓ תקין' : '✗ לא תקין'}
                    </span>
                  )}
                </label>
                <input
                  type="text"
                  className={`form-input${errors.idNumber ? ' error' : ''}`}
                  placeholder="9 ספרות"
                  value={form.idNumber}
                  onChange={e => updateField('idNumber', e.target.value.replace(/\D/g, '').slice(0, 9))}
                  dir="ltr"
                  maxLength={9}
                />
                {errors.idNumber && <span className="form-error">{errors.idNumber}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">סיסמה</label>
                <input
                  type="password"
                  className={`form-input${errors.password ? ' error' : ''}`}
                  placeholder="לפחות 8 תווים"
                  value={form.password}
                  onChange={e => updateField('password', e.target.value)}
                  dir="ltr"
                />
                {errors.password && <span className="form-error">{errors.password}</span>}
                {form.password.length > 0 && (
                  <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
                    {[...Array(4)].map((_, i) => (
                      <div key={i} style={{
                        flex: 1, height: 4, borderRadius: 2,
                        background: form.password.length >= (i + 1) * 2
                          ? (i < 2 ? 'var(--color-warning)' : 'var(--color-sage)')
                          : 'var(--color-border)',
                        transition: 'background 0.3s',
                      }} />
                    ))}
                  </div>
                )}
              </div>

              {role === 'moms' && (
                <div className="form-group">
                  <label className="form-label">תאריך הווסת האחרון (LMP)</label>
                  <input
                    type="date"
                    lang="en"
                    className={`form-input${errors.lmpDate ? ' error' : ''}`}
                    value={form.lmpDate}
                    onChange={e => updateField('lmpDate', e.target.value)}
                    dir="ltr"
                    max={new Date().toISOString().split('T')[0]}
                  />
                  {errors.lmpDate && <span className="form-error">{errors.lmpDate}</span>}
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    שדה זה משמש לחישוב שבוע ההריון ותאריך הלידה המשוער
                  </span>
                </div>
              )}

              {role === 'admin' && (
                <div className="form-group">
                  <label className="form-label">🔑 קוד מנהל</label>
                  <input
                    type="text"
                    className={`form-input${errors.adminCode ? ' error' : ''}`}
                    placeholder="HAPPYBABY2025"
                    value={form.adminCode}
                    onChange={e => updateField('adminCode', e.target.value.trim())}
                    dir="ltr"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="none"
                  />
                  {errors.adminCode && <span className="form-error">{errors.adminCode}</span>}
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    הקוד מתקבל מהמנהלת הראשית בלבד
                  </span>
                </div>
              )}

              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setStep(1)}
                  style={{ flex: 1 }}
                >
                  חזרה
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                  style={{ flex: 2 }}
                >
                  {loading ? 'נרשמ/ת...' : role === 'admin' ? 'הרשמה כמנהל' : 'שלח/י בקשה'}
                </button>
              </div>
            </form>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: 20, fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
          יש לך כבר חשבון?{' '}
          <Link to="/login" style={{ color: 'var(--color-sage-dark)', fontWeight: 700 }}>כנס/י כאן</Link>
        </div>
      </div>
    </div>
  );
}
