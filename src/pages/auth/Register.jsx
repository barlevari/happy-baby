import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage, usePageText } from '../../context/LanguageContext';

// ── Page-level translations ─────────────────────────────────
const PAGE_TEXT = {
  he: {
    backBtn: '→ חזרה',
    chooseTrack: 'בחר/י את המסלול שלך',
    continueBtn: 'המשך ←',
    personalDetails: 'פרטים אישיים',
    fullName: 'שם מלא',
    fullNamePlaceholder: 'שם פרטי ושם משפחה',
    emailLabel: 'כתובת אימייל',
    idLabel: 'תעודת זהות',
    idValid: '✓ תקין',
    idInvalid: '✗ לא תקין',
    idPlaceholder: '9 ספרות',
    passwordLabel: 'סיסמה',
    passwordPlaceholder: 'לפחות 8 תווים',
    lmpLabel: 'תאריך הווסת האחרון (LMP)',
    lmpHint: 'שדה זה משמש לחישוב שבוע ההריון ותאריך הלידה המשוער',
    adminCodeLabel: '🔑 קוד מנהל',
    adminCodePlaceholder: 'הזיני את הקוד שקיבלת',
    adminCodeHint: 'הקוד מתקבל מהמנהלת הראשית בלבד',
    backStepBtn: 'חזרה',
    loading: 'נרשמ/ת...',
    registerAdmin: 'הרשמה כמנהל',
    submitRequest: 'שלח/י בקשה',
    haveAccount: 'יש לך כבר חשבון?',
    loginHere: 'כנס/י כאן',

    // Role cards
    roleMomsTitle: 'אני בהריון / יולדת',
    roleMomsDesc: 'מעקב הריון אישי, טיפים שבועיים, ניהול בדיקות ותמיכה',
    roleStudentTitle: 'אני רוצה ללמוד Hapby Baby',
    roleStudentDesc: 'קורס מקצועי לרכישת שיטת Hapby Baby ולווי אמהות',
    roleAdminTitle: 'מנהל / מנהלת האתר',
    roleAdminDesc: 'גישה מלאה לניהול משתמשים, תוכן ואבטחה (נדרש קוד מנהל)',

    // Validation errors
    errName: 'נא להזין שם מלא',
    errEmail: 'כתובת אימייל לא תקינה',
    errPassword: 'הסיסמה חייבת להכיל לפחות 8 תווים',
    errId: 'מספר תעודת זהות לא תקין',
    errLmp: 'נא להזין תאריך הווסת האחרון',
    errAdminCode: 'נא להזין קוד מנהל',

    // Pending approval screen
    registrationSent: 'ההרשמה נשלחה!',
    pendingMsg: 'בקשתך התקבלה ותבדק על ידי המנהלת בהקדם.\nתקבלי הודעה ברגע שהחשבון שלך יאושר.',
    saveCredentials: '📧 שמור/י את פרטי ההתחברות שלך — תצטרכ/י אותם לאחר האישור',
    backToLogin: 'חזרה לכניסה',
  },
  en: {
    backBtn: '← Back',
    chooseTrack: 'Choose your track',
    continueBtn: 'Continue →',
    personalDetails: 'Personal Details',
    fullName: 'Full Name',
    fullNamePlaceholder: 'First and last name',
    emailLabel: 'Email address',
    idLabel: 'ID Number',
    idValid: '✓ Valid',
    idInvalid: '✗ Invalid',
    idPlaceholder: '9 digits',
    passwordLabel: 'Password',
    passwordPlaceholder: 'At least 8 characters',
    lmpLabel: 'Last Menstrual Period (LMP)',
    lmpHint: 'This field is used to calculate your pregnancy week and estimated due date',
    adminCodeLabel: '🔑 Admin Code',
    adminCodePlaceholder: 'Enter the code you received',
    adminCodeHint: 'The code is provided by the head admin only',
    backStepBtn: 'Back',
    loading: 'Registering...',
    registerAdmin: 'Register as Admin',
    submitRequest: 'Submit Request',
    haveAccount: 'Already have an account?',
    loginHere: 'Sign in here',

    // Role cards
    roleMomsTitle: "I'm pregnant / a new mom",
    roleMomsDesc: 'Personal pregnancy tracking, weekly tips, test management, and support',
    roleStudentTitle: 'I want to learn Hapby Baby',
    roleStudentDesc: 'Professional course to learn the Hapby Baby method and support mothers',
    roleAdminTitle: 'Site Administrator',
    roleAdminDesc: 'Full access to manage users, content, and security (admin code required)',

    // Validation errors
    errName: 'Please enter your full name',
    errEmail: 'Invalid email address',
    errPassword: 'Password must be at least 8 characters',
    errId: 'Invalid ID number',
    errLmp: 'Please enter the date of your last period',
    errAdminCode: 'Please enter the admin code',

    // Pending approval screen
    registrationSent: 'Registration Submitted!',
    pendingMsg: 'Your request has been received and will be reviewed by the admin shortly.\nYou will be notified once your account is approved.',
    saveCredentials: '📧 Save your login details — you will need them after approval',
    backToLogin: 'Back to Login',
  },
};

export default function Register() {
  const { register, validateIsraeliId } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preRole = searchParams.get('role');
  const pt = usePageText(PAGE_TEXT);
  const { isRTL } = useLanguage();

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
    if (!form.name.trim()) newErrors.name = pt('errName');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) newErrors.email = pt('errEmail');
    if (form.password.length < 8) newErrors.password = pt('errPassword');
    if (!validateIsraeliId(form.idNumber)) newErrors.idNumber = pt('errId');
    if (role === 'moms' && !form.lmpDate) newErrors.lmpDate = pt('errLmp');
    if (role === 'admin' && !form.adminCode) newErrors.adminCode = pt('errAdminCode');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep2()) return;
    setLoading(true);
    setSubmitError('');
    try {
      const result = await register({ ...form, role });
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
    } catch (err) {
      setLoading(false);
      setSubmitError(err.message || 'שגיאה לא צפויה, נסו שוב');
    }
  };

  const roleCards = [
    {
      id: 'moms',
      icon: '🤰',
      title: pt('roleMomsTitle'),
      desc: pt('roleMomsDesc'),
      color: 'var(--color-rose-light)',
      border: 'var(--color-rose)',
    },
    {
      id: 'student',
      icon: '🎓',
      title: pt('roleStudentTitle'),
      desc: pt('roleStudentDesc'),
      color: 'var(--color-sage-ultra)',
      border: 'var(--color-sage)',
    },
    {
      id: 'admin',
      icon: '🛡️',
      title: pt('roleAdminTitle'),
      desc: pt('roleAdminDesc'),
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
        padding: 24, direction: isRTL ? 'rtl' : 'ltr',
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
            {pt('registrationSent')}
          </h1>
          <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: 24, whiteSpace: 'pre-line' }}>
            {pt('pendingMsg')}
          </p>
          <div style={{
            padding: '14px 18px',
            background: 'var(--color-sage-ultra)',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.85rem',
            color: 'var(--color-sage-dark)',
            marginBottom: 24,
          }}>
            {pt('saveCredentials')}
          </div>
          <Link to="/login" className="btn btn-primary" style={{ display: 'block', textAlign: 'center' }}>
            {pt('backToLogin')}
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
      direction: isRTL ? 'rtl' : 'ltr',
      position: 'relative',
    }}>
      {/* Back button */}
      <button
        onClick={() => navigate('/')}
        style={{
          position: 'absolute',
          top: 24,
          ...(isRTL ? { right: 24 } : { left: 24 }),
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
        {pt('backBtn')}
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
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
          <img src="/happy-baby-logo.png" alt="hapby baby" style={{ height: 72, objectFit: 'contain' }} />
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
              {pt('chooseTrack')}
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
                  {role === card.id && <div style={{ ...(isRTL ? { marginRight: 'auto' } : { marginLeft: 'auto' }), fontSize: '1.2rem' }}>✅</div>}
                </div>
              ))}
            </div>
            <button
              className="btn btn-primary w-full"
              style={{ marginTop: 24 }}
              disabled={!role}
              onClick={() => setStep(2)}
            >
              {pt('continueBtn')}
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h1 style={{ textAlign: 'center', fontSize: '1.3rem', fontWeight: 800, marginBottom: 24, color: 'var(--color-text)' }}>
              {pt('personalDetails')}
            </h1>

            {submitError && <div className="alert alert-danger" style={{ marginBottom: 16 }}>⚠️ {submitError}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">{pt('fullName')}</label>
                <input
                  type="text"
                  className={`form-input${errors.name ? ' error' : ''}`}
                  placeholder={pt('fullNamePlaceholder')}
                  value={form.name}
                  onChange={e => updateField('name', e.target.value)}
                />
                {errors.name && <span className="form-error">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">{pt('emailLabel')}</label>
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
                  {pt('idLabel')}
                  {form.idNumber.length >= 7 && (
                    <span style={{ ...(isRTL ? { marginRight: 8 } : { marginLeft: 8 }), fontSize: '0.75rem', color: validateIsraeliId(form.idNumber) ? '#2E7D32' : 'var(--color-danger)' }}>
                      {validateIsraeliId(form.idNumber) ? pt('idValid') : pt('idInvalid')}
                    </span>
                  )}
                </label>
                <input
                  type="text"
                  className={`form-input${errors.idNumber ? ' error' : ''}`}
                  placeholder={pt('idPlaceholder')}
                  value={form.idNumber}
                  onChange={e => updateField('idNumber', e.target.value.replace(/\D/g, '').slice(0, 9))}
                  dir="ltr"
                  maxLength={9}
                />
                {errors.idNumber && <span className="form-error">{errors.idNumber}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">{pt('passwordLabel')}</label>
                <input
                  type="password"
                  className={`form-input${errors.password ? ' error' : ''}`}
                  placeholder={pt('passwordPlaceholder')}
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
                  <label className="form-label">{pt('lmpLabel')}</label>
                  <div lang="en" dir="ltr">
                    <input
                      type="date"
                      lang="en"
                      className={`form-input${errors.lmpDate ? ' error' : ''}`}
                      value={form.lmpDate}
                      onChange={e => updateField('lmpDate', e.target.value)}
                      dir="ltr"
                      max={new Date().toISOString().split('T')[0]}
                      style={{ width: '100%' }}
                    />
                  </div>
                  {errors.lmpDate && <span className="form-error">{errors.lmpDate}</span>}
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    {pt('lmpHint')}
                  </span>
                </div>
              )}

              {role === 'admin' && (
                <div className="form-group">
                  <label className="form-label">{pt('adminCodeLabel')}</label>
                  <input
                    type="text"
                    className={`form-input${errors.adminCode ? ' error' : ''}`}
                    placeholder={pt('adminCodePlaceholder')}
                    value={form.adminCode}
                    onChange={e => updateField('adminCode', e.target.value.trim())}
                    dir="ltr"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="none"
                  />
                  {errors.adminCode && <span className="form-error">{errors.adminCode}</span>}
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    {pt('adminCodeHint')}
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
                  {pt('backStepBtn')}
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                  style={{ flex: 2 }}
                >
                  {loading ? pt('loading') : role === 'admin' ? pt('registerAdmin') : pt('submitRequest')}
                </button>
              </div>
            </form>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: 20, fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
          {pt('haveAccount')}{' '}
          <Link to="/login" style={{ color: 'var(--color-sage-dark)', fontWeight: 700 }}>{pt('loginHere')}</Link>
        </div>
      </div>
    </div>
  );
}
