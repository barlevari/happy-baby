import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

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
  const [form, setForm] = useState({ name: '', email: '', password: '', idNumber: '', lmpDate: '' });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [loading, setLoading] = useState(false);

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
    if (role === 'moms') navigate('/moms');
    else if (role === 'student') navigate('/academy');
    else navigate('/');
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
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, var(--color-cream) 0%, var(--color-sage-ultra) 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      direction: 'rtl',
    }}>
      <div style={{
        width: '100%',
        maxWidth: step === 1 ? 640 : 480,
        background: 'var(--color-white)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-xl)',
        padding: '40px 36px',
        border: '1px solid var(--color-border)',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: '2rem' }}>🌿</div>
          <div style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--color-sage-dark)' }}>happy baby</div>
        </div>

        {/* Progress */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 28, justifyContent: 'center' }}>
          {[1, 2].map(s => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: step >= s ? 'var(--color-sage)' : 'var(--color-border)',
                color: step >= s ? 'white' : 'var(--color-text-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.8rem',
                transition: 'all 0.3s',
              }}>{s}</div>
              {s < 2 && <div style={{ width: 32, height: 2, background: step > s ? 'var(--color-sage)' : 'var(--color-border)', borderRadius: 2 }} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div>
            <h1 style={{ textAlign: 'center', fontSize: '1.3rem', fontWeight: 800, marginBottom: 24, color: 'var(--color-text)' }}>
              בחרי את המסלול שלך
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
                    display: 'flex',
                    gap: 16,
                    alignItems: 'flex-start',
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
                  {loading ? 'נרשמת...' : 'הרשמה'}
                </button>
              </div>
            </form>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: 20, fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
          יש לך כבר חשבון?{' '}
          <Link to="/login" style={{ color: 'var(--color-sage-dark)', fontWeight: 700 }}>כנסי כאן</Link>
        </div>
      </div>
    </div>
  );
}
