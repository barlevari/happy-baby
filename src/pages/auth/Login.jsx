import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('נא למלא את כל השדות');
      return;
    }
    setLoading(true);
    const result = login(email, password);
    setLoading(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    const { user } = result;
    if (user.role === 'moms') navigate('/moms');
    else if (user.role === 'student') navigate('/academy');
    else if (user.role === 'admin') navigate('/admin');
    else navigate('/');
  };

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
          <div style={{ fontSize: '2.5rem', marginBottom: 8 }}>🌿</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--color-sage-dark)' }}>
            happy baby
          </div>
        </div>

        <h1 style={{ textAlign: 'center', fontSize: '1.4rem', fontWeight: 800, marginBottom: 28, color: 'var(--color-text)' }}>
          ברוכה הבאה בחזרה 🌿
        </h1>

        {error && (
          <div className="alert alert-danger" style={{ marginBottom: 20 }}>
            ⚠️ {error}
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

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
            style={{ marginTop: 8 }}
          >
            {loading ? 'מתחברת...' : 'כניסה'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 24, fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
          אין לך חשבון עדיין?{' '}
          <Link to="/register" style={{ color: 'var(--color-sage-dark)', fontWeight: 700 }}>
            הירשמי כאן
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
