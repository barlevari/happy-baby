import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
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
      setError('נא למלא את כל השדות');
      return;
    }
    setLoading(true);
    const result = login(email, password);
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
  };

  const handleForgot = (e) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setForgotSent(true);
  };

  if (showForgot) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(160deg, var(--color-cream) 0%, var(--color-sage-ultra) 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24, direction: 'rtl',
      }}>
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
            <h1 style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--color-sage-dark)' }}>שכחתי סיסמה</h1>
          </div>

          {forgotSent ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: 16 }}>💬</div>
              <p style={{ fontWeight: 700, marginBottom: 8, color: 'var(--color-text)' }}>
                שכחת סיסמה?
              </p>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: 20, fontSize: '0.9rem' }}>
                האתר עדיין אין לו שליחת מיילים אוטומטית.
                לאיפוס סיסמה – פנ/י לרויטל ישירות בוואטסאפ עם כתובת האימייל שלך.
              </p>
              <a
                href={`https://wa.me/972522218646?text=${encodeURIComponent(`היי רויטל, שכחתי את הסיסמה שלי, האימייל שלי: ${forgotEmail}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn w-full"
                style={{ background: '#25D366', color: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 12, textDecoration: 'none' }}
              >
                💬 שלח/י הודעה בוואטסאפ
              </a>
              <button
                className="btn btn-ghost w-full"
                onClick={() => { setShowForgot(false); setForgotSent(false); setForgotEmail(''); }}
              >
                חזרה לכניסה
              </button>
            </div>
          ) : (
            <form onSubmit={handleForgot}>
              <div className="form-group">
                <label className="form-label">כתובת האימייל שלך</label>
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
                שלח/י קישור לאיפוס
              </button>
              <button
                type="button"
                className="btn btn-ghost w-full"
                style={{ marginTop: 10 }}
                onClick={() => setShowForgot(false)}
              >
                חזרה
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
      direction: 'rtl',
    }}>
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
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <img src="/happy-baby-logo.png" alt="happy baby" style={{ height: 64, objectFit: 'contain', mixBlendMode: 'multiply' }} />
        </div>

        <h1 style={{ textAlign: 'center', fontSize: '1.4rem', fontWeight: 800, marginBottom: 28, color: 'var(--color-text)' }}>
          ברוכ/ה הבא/ה
        </h1>

        {error && (
          <div className={`alert ${isPending ? 'alert-warning' : 'alert-danger'}`} style={{ marginBottom: 20 }}>
            {isPending ? '⏳' : '⚠️'} {error}
            {isPending && (
              <div style={{ fontSize: '0.8rem', marginTop: 6, color: 'var(--color-text-muted)' }}>
                פנ/י למנהלת האתר לאישור מהיר
              </div>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">כתובת אימייל</label>
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
            <label className="form-label">סיסמה</label>
            <input
              type="password"
              className="form-input"
              placeholder="לפחות 8 תווים"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
              dir="ltr"
            />
          </div>

          <div style={{ textAlign: 'left', marginBottom: 12 }}>
            <button
              type="button"
              onClick={() => setShowForgot(true)}
              style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', fontSize: '0.82rem', cursor: 'pointer', padding: 0 }}
            >
              שכחתי סיסמה
            </button>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
            style={{ marginTop: 4 }}
          >
            {loading ? 'מתחבר/ת...' : 'כניסה'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 24, fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
          אין לך חשבון עדיין?{' '}
          <Link to="/register" style={{ color: 'var(--color-sage-dark)', fontWeight: 700 }}>
            הירשמ/י כאן
          </Link>
        </div>

        {/* Demo credentials hint */}
        <div style={{
          marginTop: 24,
          padding: '12px 16px',
          background: 'var(--color-sage-ultra)',
          borderRadius: 'var(--radius-md)',
          fontSize: '0.78rem',
          color: 'var(--color-text-muted)',
          lineHeight: 1.8,
        }}>
          <strong style={{ color: 'var(--color-sage-dark)' }}>דמו:</strong><br />
          🤰 sarah@test.com / test1234<br />
          🎓 michal@test.com / test1234<br />
          🛡️ admin@happybaby.com / admin1234
        </div>
      </div>
    </div>
  );
}
