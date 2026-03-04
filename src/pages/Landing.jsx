import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

const FLOATERS = [
  { emoji: '🍼', x: '4%',  delay: '0s',    dur: '8s',   size: '1.9rem' },
  { emoji: '👶', x: '14%', delay: '2.3s',  dur: '7s',   size: '1.7rem' },
  { emoji: '🌸', x: '27%', delay: '0.7s',  dur: '9.5s', size: '1.5rem' },
  { emoji: '⭐', x: '41%', delay: '3.8s',  dur: '7.5s', size: '1.4rem' },
  { emoji: '💫', x: '56%', delay: '1.2s',  dur: '8.5s', size: '1.6rem' },
  { emoji: '🎀', x: '68%', delay: '4.5s',  dur: '6.5s', size: '1.8rem' },
  { emoji: '✨', x: '80%', delay: '0.4s',  dur: '10s',  size: '1.4rem' },
  { emoji: '💝', x: '91%', delay: '2.9s',  dur: '7.5s', size: '2rem'   },
  { emoji: '🌟', x: '35%', delay: '6s',    dur: '8s',   size: '1.3rem' },
  { emoji: '🍼', x: '74%', delay: '1.6s',  dur: '9s',   size: '1.5rem' },
];

const CARD_ANIMS = ['cardFromRight', 'cardFromBottom', 'cardFromLeft'];
const SPRING = 'cubic-bezier(0.34, 1.56, 0.64, 1)';

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
      overflow: 'hidden',
      position: 'relative',
    }}>
      <style>{`
        @keyframes logoIn {
          0%   { transform: scale(0) rotate(-15deg); opacity: 0; }
          50%  { transform: scale(1.32) rotate(5deg); opacity: 1; }
          68%  { transform: scale(0.88) rotate(-3deg); }
          84%  { transform: scale(1.09) rotate(2deg); }
          93%  { transform: scale(0.97) rotate(-1deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes cardFromRight {
          from { opacity: 0; transform: translateX(70px) scale(0.85); }
          to   { opacity: 1; transform: translateX(0)   scale(1);    }
        }
        @keyframes cardFromBottom {
          from { opacity: 0; transform: translateY(80px) scale(0.85); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
        @keyframes cardFromLeft {
          from { opacity: 0; transform: translateX(-70px) scale(0.85); }
          to   { opacity: 1; transform: translateX(0)    scale(1);    }
        }
        @keyframes pillPop {
          from { opacity: 0; transform: scale(0.2) translateY(10px); }
          to   { opacity: 1; transform: scale(1)   translateY(0);    }
        }
        @keyframes floatUp {
          0%   { transform: translateY(110vh) rotate(0deg);   opacity: 0; }
          6%   { opacity: 0.6; }
          94%  { opacity: 0.55; }
          100% { transform: translateY(-10vh) rotate(400deg); opacity: 0; }
        }
        @keyframes cardHover {
          from { transform: translateY(0) scale(1); }
          to   { transform: translateY(-6px) scale(1.02); }
        }
        .landing-card:hover {
          transform: translateY(-6px) scale(1.02) !important;
          box-shadow: 0 12px 40px rgba(0,0,0,0.14) !important;
          transition: transform 0.25s ${SPRING}, box-shadow 0.25s ease;
        }
      `}</style>

      {/* Background floating baby emojis */}
      {FLOATERS.map((p, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            position: 'fixed',
            left: p.x,
            bottom: '-60px',
            fontSize: p.size,
            animation: `floatUp ${p.dur} ${p.delay} infinite linear`,
            pointerEvents: 'none',
            zIndex: 0,
            userSelect: 'none',
          }}
        >
          {p.emoji}
        </span>
      ))}

      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: 48, position: 'relative', zIndex: 1 }}>
        <img
          src="/happy-baby-logo.png"
          alt="happy baby"
          style={{
            height: 'clamp(90px, 15vw, 150px)',
            objectFit: 'contain',
            marginBottom: 8,
            mixBlendMode: 'multiply',
            animation: `logoIn 1s ${SPRING} both`,
            animationDelay: '0.05s',
          }}
        />
        <p style={{
          fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
          color: 'var(--color-text-muted)',
          marginTop: 12,
          fontWeight: 500,
          animation: `fadeUp 0.7s ease both`,
          animationDelay: '0.6s',
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
        position: 'relative',
        zIndex: 1,
      }}>
        {cards.map((card, i) => (
          <div
            key={i}
            className="card card-clickable landing-card"
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
              animation: `${CARD_ANIMS[i]} 0.75s ${SPRING} both`,
              animationDelay: `${0.65 + i * 0.18}s`,
              transition: 'transform 0.25s, box-shadow 0.25s',
            }}
            onClick={() => {
              if (card.role) navigate(`/register?role=${card.role}`);
              else navigate('/login');
            }}
          >
            <div style={{ fontSize: '3.2rem', animation: `logoIn 0.8s ${SPRING} both`, animationDelay: `${0.9 + i * 0.18}s` }}>
              {card.icon}
            </div>
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
        position: 'relative',
        zIndex: 1,
      }}>
        {features.map((f, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(10px)',
              border: '1px solid var(--color-border)',
              padding: '8px 18px',
              borderRadius: '9999px',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: 'var(--color-text)',
              boxShadow: 'var(--shadow-sm)',
              animation: `pillPop 0.5s ${SPRING} both`,
              animationDelay: `${1.25 + i * 0.1}s`,
            }}
          >
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
        position: 'relative',
        zIndex: 1,
      }}>
        happy baby &copy; 2025 | כל הזכויות שמורות
      </footer>
    </div>
  );
}
