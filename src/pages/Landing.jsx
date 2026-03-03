import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

export default function Landing() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      if (user.role === 'moms') navigate('/moms', { replace: true });
      else if (user.role === 'student') navigate('/academy', { replace: true });
      else if (user.role === 'admin') navigate('/admin', { replace: true });
    }
  }, [user, navigate]);

  const features = [
    { icon: '🤰', label: 'מעקב שבועי' },
    { icon: '🥗', label: 'תזונה' },
    { icon: '🎥', label: 'סרטונים' },
    { icon: '🤖', label: 'תמיכה' },
    { icon: '📅', label: 'אירועים' },
  ];

  const cards = [
    {
      icon: '🤰',
      title: 'אני בהריון / יולדת',
      desc: 'מעקב אישי, טיפים שבועיים ותמיכה לאורך כל הדרך',
      cta: 'בואי נתחיל',
      bg: 'var(--color-rose-light)',
      border: 'var(--color-rose)',
      ctaClass: 'btn btn-rose',
      role: 'moms',
    },
    {
      icon: '🎓',
      title: 'אני רוצה ללמוד Happy Baby',
      desc: 'קורס מקצועי לרכישת השיטה ולווי אמהות',
      cta: 'לפרטים נוספים',
      bg: 'var(--color-sage-ultra)',
      border: 'var(--color-sage)',
      ctaClass: 'btn btn-primary',
      role: 'student',
    },
    {
      icon: '🔑',
      title: 'כניסה לחשבון',
      desc: 'יש לך כבר חשבון? כנסי לאזור האישי שלך',
      cta: 'כניסה',
      bg: 'var(--color-white)',
      border: 'var(--color-border)',
      ctaClass: 'btn btn-secondary',
      role: null,
    },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, var(--color-cream) 0%, var(--color-sage-ultra) 50%, var(--color-rose-light) 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '40px 20px',
      direction: 'rtl',
    }}>
      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{ fontSize: '5rem', marginBottom: 8, lineHeight: 1 }}>🌿</div>
        <h1 style={{
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          fontWeight: 900,
          color: 'var(--color-sage-dark)',
          margin: 0,
          letterSpacing: '-0.03em',
        }}>
          happy baby
        </h1>
        <p style={{
          fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
          color: 'var(--color-text-muted)',
          marginTop: 12,
          fontWeight: 500,
        }}>
          מלווים אותך בכל שלב של המסע
        </p>
      </div>

      {/* Action Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 24,
        width: '100%',
        maxWidth: 960,
        marginBottom: 48,
      }}>
        {cards.map((card, i) => (
          <div
            key={i}
            className="card card-clickable"
            style={{
              background: card.bg,
              borderColor: card.border,
              borderWidth: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: 16,
              padding: 32,
            }}
            onClick={() => {
              if (card.role) navigate(`/register?role=${card.role}`);
              else navigate('/login');
            }}
          >
            <div style={{ fontSize: '3rem' }}>{card.icon}</div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-text)', margin: 0 }}>
              {card.title}
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', margin: 0, lineHeight: 1.6 }}>
              {card.desc}
            </p>
            <button
              className={card.ctaClass}
              onClick={e => {
                e.stopPropagation();
                if (card.role) navigate(`/register?role=${card.role}`);
                else navigate('/login');
              }}
              style={{ marginTop: 8 }}
            >
              {card.cta}
            </button>
          </div>
        ))}
      </div>

      {/* Feature Pills */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 12,
        justifyContent: 'center',
        marginBottom: 48,
      }}>
        {features.map((f, i) => (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(255,255,255,0.8)',
            backdropFilter: 'blur(8px)',
            border: '1px solid var(--color-border)',
            padding: '8px 18px',
            borderRadius: '9999px',
            fontSize: '0.9rem',
            fontWeight: 600,
            color: 'var(--color-text)',
            boxShadow: 'var(--shadow-sm)',
          }}>
            <span>{f.icon}</span>
            <span>{f.label}</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer style={{
        marginTop: 'auto',
        textAlign: 'center',
        color: 'var(--color-text-muted)',
        fontSize: '0.8rem',
        paddingTop: 24,
        borderTop: '1px solid var(--color-border)',
        width: '100%',
        maxWidth: 600,
      }}>
        happy baby &copy; 2025 | כל הזכויות שמורות
      </footer>
    </div>
  );
}
