import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage, usePageText } from '../../context/LanguageContext';

// ── Page-level translations ─────────────────────────────────
const PAGE_TEXT = {
  he: {
    fillAllFields: 'נא למלא את כל השדות',
    backBtn: '→ חזרה',
    forgotTitle: 'שכחתי סיסמה',
    forgotQuestion: 'שכחת סיסמה?',
    forgotExplanation: 'האתר עדיין אין לו שליחת מיילים אוטומטית.\nלאיפוס סיסמה – פנ/י לרויטל ישירות בוואטסאפ עם כתובת האימייל שלך.',
    whatsappMsg: 'היי רויטל, שכחתי את הסיסמה שלי, האימייל שלי: ',
    whatsappBtn: '💬 שלח/י הודעה בוואטסאפ',
    backToLogin: 'חזרה לכניסה',
    yourEmail: 'כתובת האימייל שלך',
    sendResetLink: 'שלח/י קישור לאיפוס',
    back: 'חזרה',
    welcome: 'ברוכ/ה הבא/ה',
    pendingHint: 'פנ/י למנהלת האתר לאישור מהיר',
    emailLabel: 'כתובת אימייל',
    passwordLabel: 'סיסמה',
    passwordPlaceholder: 'לפחות 8 תווים',
    forgotPassword: 'שכחתי סיסמה',
    loading: 'מתחבר/ת...',
    loginBtn: 'כניסה',
    noAccount: 'אין לך חשבון עדיין?',
    registerHere: 'הירשמ/י כאן',
    demo: 'דמו:',
    backBtnEn: '← Back',
  },
  en: {
    fillAllFields: 'Please fill in all fields',
    backBtn: '← Back',
    forgotTitle: 'Forgot Password',
    forgotQuestion: 'Forgot your password?',
    forgotExplanation: 'The site does not yet support automatic email sending.\nTo reset your password, contact Revital directly on WhatsApp with your email address.',
    whatsappMsg: 'Hi Revital, I forgot my password, my email is: ',
    whatsappBtn: '💬 Send a WhatsApp message',
    backToLogin: 'Back to Login',
    yourEmail: 'Your email address',
    sendResetLink: 'Send reset link',
    back: 'Back',
    welcome: 'Welcome',
    pendingHint: 'Contact the site admin for quick approval',
    emailLabel: 'Email address',
    passwordLabel: 'Password',
    passwordPlaceholder: 'At least 8 characters',
    forgotPassword: 'Forgot password',
    loading: 'Signing in...',
    loginBtn: 'Sign In',
    noAccount: "Don't have an account yet?",
    registerHere: 'Register here',
    demo: 'Demo:',
    backBtnEn: '← Back',
  },
};

export default function Login() {
  const { login, resetPassword, isSupabaseMode } = useAuth();
  const navigate = useNavigate();
  const pt = usePageText(PAGE_TEXT);
  const { isRTL } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsPending(false);
    if (!email || !password) {
      setError(pt('fillAllFields'));
      return;
    }
    setLoading(true);
    try {
      const result = await login(email, password);
      setLoading(false);
      if (!result.ok) {
        if (result.pending) setIsPending(true);
        setError(result.error);
        return;
      }
      const { user } = result;
      if (user.role === 'moms') navigate('/moms');
      else if (user.role === 'student') navigate('/academy');
      else if (user.role === 'admin') navigate('/admin');
      else navigate('/');
    } catch (err) {
      setLoading(false);
      setError(err.message || 'שגיאה לא צפויה, נסו שוב');
    }
  };

  const [forgotError, setForgotError] = useState('');

  const handleForgot = async (e) => {
    e.preventDefault();
    if (!forgotEmail) return;
    if (isSupabaseMode) {
      setLoading(true);
      const result = await resetPassword(forgotEmail);
      setLoading(false);
      if (!result.ok) {
        setForgotError(result.error);
        return;
      }
    }
    setForgotSent(true);
  };

  if (showForgot) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(160deg, var(--color-cream) 0%, var(--color-sage-ultra) 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24, direction: isRTL ? 'rtl' : 'ltr', position: 'relative',
      }}>
        {/* Back button */}
        <button
          onClick={() => { setShowForgot(false); setForgotSent(false); }}
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
          width: '100%', maxWidth: 420,
          background: 'var(--color-white)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-xl)',
          padding: '40px 36px',
          border: '1px solid var(--color-border)',
        }}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 8 }}>🔑</div>
            <h1 style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--color-sage-dark)' }}>{pt('forgotTitle')}</h1>
          </div>

          {forgotSent ? (
            <div style={{ textAlign: 'center' }}>
              {isSupabaseMode ? (
                <>
                  <div style={{ fontSize: '3rem', marginBottom: 16 }}>📧</div>
                  <p style={{ fontWeight: 700, marginBottom: 8, color: 'var(--color-text)' }}>
                    {isRTL ? 'קישור לאיפוס נשלח!' : 'Reset link sent!'}
                  </p>
                  <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: 20, fontSize: '0.9rem' }}>
                    {isRTL
                      ? `שלחנו קישור לאיפוס סיסמה ל-${forgotEmail}. בדקי את תיבת הדואר שלך.`
                      : `We sent a password reset link to ${forgotEmail}. Check your inbox.`}
                  </p>
                </>
              ) : (
                <>
                  <div style={{ fontSize: '3rem', marginBottom: 16 }}>💬</div>
                  <p style={{ fontWeight: 700, marginBottom: 8, color: 'var(--color-text)' }}>
                    {pt('forgotQuestion')}
                  </p>
                  <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: 20, fontSize: '0.9rem', whiteSpace: 'pre-line' }}>
                    {pt('forgotExplanation')}
                  </p>
                  <a
                    href={`https://wa.me/972522218646?text=${encodeURIComponent(`${pt('whatsappMsg')}${forgotEmail}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn w-full"
                    style={{ background: '#25D366', color: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 12, textDecoration: 'none' }}
                  >
                    {pt('whatsappBtn')}
                  </a>
                </>
              )}
              <button
                className="btn btn-ghost w-full"
                onClick={() => { setShowForgot(false); setForgotSent(false); setForgotEmail(''); }}
              >
                {pt('backToLogin')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleForgot}>
              <div className="form-group">
                <label className="form-label">{pt('yourEmail')}</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="your@email.com"
                  value={forgotEmail}
                  onChange={e => setForgotEmail(e.target.value)}
                  dir="ltr"
                  autoFocus
                />
              </div>
              <button type="submit" className="btn btn-primary w-full" style={{ marginTop: 8 }}>
                {pt('sendResetLink')}
              </button>
              <button
                type="button"
                className="btn btn-ghost w-full"
                style={{ marginTop: 10 }}
                onClick={() => setShowForgot(false)}
              >
                {pt('back')}
              </button>
            </form>
          )}
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
        maxWidth: 420,
        background: 'var(--color-white)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-xl)',
        padding: '40px 36px',
        border: '1px solid var(--color-border)',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
          <img src="/happy-baby-logo.png" alt="happy baby" style={{ height: 72, objectFit: 'contain', mixBlendMode: 'multiply' }} />
        </div>

        <h1 style={{ textAlign: 'center', fontSize: '1.4rem', fontWeight: 800, marginBottom: 28, color: 'var(--color-text)' }}>
          {pt('welcome')}
        </h1>

        {error && (
          <div className={`alert ${isPending ? 'alert-warning' : 'alert-danger'}`} style={{ marginBottom: 20 }}>
            {isPending ? '⏳' : '⚠️'} {error}
            {isPending && (
              <div style={{ fontSize: '0.8rem', marginTop: 6, color: 'var(--color-text-muted)' }}>
                {pt('pendingHint')}
              </div>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">{pt('emailLabel')}</label>
            <input
              type="email"
              className="form-input"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
              dir="ltr"
            />
          </div>
          <div className="form-group">
            <label className="form-label">{pt('passwordLabel')}</label>
            <input
              type="password"
              className="form-input"
              placeholder={pt('passwordPlaceholder')}
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
              dir="ltr"
            />
          </div>

          <div style={{ textAlign: isRTL ? 'left' : 'right', marginBottom: 12 }}>
            <button
              type="button"
              onClick={() => setShowForgot(true)}
              style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', fontSize: '0.82rem', cursor: 'pointer', padding: 0 }}
            >
              {pt('forgotPassword')}
            </button>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
            style={{ marginTop: 4 }}
          >
            {loading ? pt('loading') : pt('loginBtn')}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 24, fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
          {pt('noAccount')}{' '}
          <Link to="/register" style={{ color: 'var(--color-sage-dark)', fontWeight: 700 }}>
            {pt('registerHere')}
          </Link>
        </div>

        {/* Demo credentials hint (only in mock mode) */}
        {!isSupabaseMode && <div style={{
          marginTop: 24,
          padding: '12px 16px',
          background: 'var(--color-sage-ultra)',
          borderRadius: 'var(--radius-md)',
          fontSize: '0.78rem',
          color: 'var(--color-text-muted)',
          lineHeight: 1.8,
        }}>
          <strong style={{ color: 'var(--color-sage-dark)' }}>{pt('demo')}</strong><br />
          🤰 sarah@test.com / test1234<br />
          🎓 michal@test.com / test1234<br />
          🛡️ admin@happybaby.com / admin1234
        </div>}
      </div>
    </div>
  );
}
