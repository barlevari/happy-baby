import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage, usePageText } from '../context/LanguageContext';
import { useEffect, useState, useRef } from 'react';

const PAGE_TEXT = {
  he: {
    tagline: 'מלווים אותך בכל שלב של המסע',
    subtitle: 'Happy Baby | ליווי הריון ולידה מקצועי',
    // Milestones
    milestone4: 'פעימת לב ראשונה',
    milestone12: 'סוף טרימסטר ראשון',
    milestone20: 'בעיטות ראשונות',
    milestone28: 'הכנות ללידה',
    milestone36: 'כמעט שם!',
    milestone40: 'יום הולדת!',
    weekLabel: 'שבוע',
    // Cards
    momsTitle: 'אני בהריון / יולדת',
    momsDesc: 'מעקב אישי, טיפים שבועיים ותמיכה לאורך כל הדרך',
    momsCta: 'בואי נתחיל',
    academyTitle: 'אני רוצה ללמוד Happy Baby',
    academyDesc: 'קורס מקצועי לרכישת השיטה ולווי אמהות',
    academyCta: 'לפרטים נוספים',
    // Features
    weeklyTracking: 'מעקב שבועי',
    nutritionLabel: 'תזונה',
    videosLabel: 'סרטונים',
    supportLabel: 'תמיכה',
    eventsLabel: 'אירועים',
    // Footer
    footer: 'happy baby \u00A9 2025 | כל הזכויות שמורות',
  },
  en: {
    tagline: 'With you at every step of the journey',
    subtitle: 'Happy Baby | Professional Pregnancy & Birth Support',
    milestone4: 'First heartbeat',
    milestone12: 'End of first trimester',
    milestone20: 'First kicks',
    milestone28: 'Birth preparations',
    milestone36: 'Almost there!',
    milestone40: 'Birthday!',
    weekLabel: 'Week',
    momsTitle: 'I\'m pregnant / a new mom',
    momsDesc: 'Personal tracking, weekly tips and support all the way',
    momsCta: 'Let\'s get started',
    academyTitle: 'I want to learn Happy Baby',
    academyDesc: 'Professional course for learning the method and supporting mothers',
    academyCta: 'Learn more',
    weeklyTracking: 'Weekly Tracking',
    nutritionLabel: 'Nutrition',
    videosLabel: 'Videos',
    supportLabel: 'Support',
    eventsLabel: 'Events',
    footer: 'happy baby \u00A9 2025 | All rights reserved',
  },
};

const SPRING = 'cubic-bezier(0.34, 1.56, 0.64, 1)';

const MILESTONE_KEYS = [
  { week: 4,  emoji: '💗', key: 'milestone4' },
  { week: 12, emoji: '🫒', key: 'milestone12' },
  { week: 20, emoji: '🦶', key: 'milestone20' },
  { week: 28, emoji: '🎒', key: 'milestone28' },
  { week: 36, emoji: '🍉', key: 'milestone36' },
  { week: 40, emoji: '👶', key: 'milestone40' },
];

const BOKEH = Array.from({ length: 18 }, (_, i) => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 30 + Math.random() * 80,
  delay: Math.random() * 8,
  dur: 6 + Math.random() * 6,
  color: i % 3 === 0 ? 'var(--color-rose)' : i % 3 === 1 ? 'var(--color-sage)' : '#e8b4d0',
}));

export default function Landing() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isRTL } = useLanguage();
  const pt = usePageText(PAGE_TEXT);
  const [introPhase, setIntroPhase] = useState(0);
  const [journeyProgress, setJourneyProgress] = useState(0);
  const journeyRef = useRef(null);

  useEffect(() => {
    if (user) {
      if (user.role === 'moms') navigate('/moms', { replace: true });
      else if (user.role === 'student') navigate('/academy', { replace: true });
      else if (user.role === 'admin') navigate('/admin', { replace: true });
    }
  }, [user, navigate]);

  // Cinematic intro sequence
  useEffect(() => {
    const t1 = setTimeout(() => setIntroPhase(1), 200);
    const t2 = setTimeout(() => setIntroPhase(2), 800);
    const t3 = setTimeout(() => setIntroPhase(3), 1400);
    const t4 = setTimeout(() => setIntroPhase(4), 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  // Journey path animation on scroll
  useEffect(() => {
    const el = journeyRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = null;
          const duration = 2500;
          const animate = (ts) => {
            if (!start) start = ts;
            const progress = Math.min((ts - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setJourneyProgress(eased);
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const features = [
    { icon: '🤰', label: pt('weeklyTracking') },
    { icon: '🥗', label: pt('nutritionLabel') },
    { icon: '🎥', label: pt('videosLabel') },
    { icon: '💬', label: pt('supportLabel') },
    { icon: '📅', label: pt('eventsLabel') },
  ];

  const milestones = MILESTONE_KEYS.map(m => ({ ...m, label: pt(m.key) }));

  const cards = [
    {
      icon: '🤰',
      title: pt('momsTitle'),
      desc: pt('momsDesc'),
      cta: pt('momsCta'),
      bg: 'var(--color-rose-light)',
      border: 'var(--color-rose)',
      ctaClass: 'btn btn-rose',
      role: 'moms',
    },
    {
      icon: '🎓',
      title: pt('academyTitle'),
      desc: pt('academyDesc'),
      cta: pt('academyCta'),
      bg: 'var(--color-sage-ultra)',
      border: 'var(--color-sage)',
      ctaClass: 'btn btn-primary',
      role: 'student',
    },
  ];

  const tagline = pt('tagline');

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, var(--color-cream) 0%, var(--color-sage-ultra) 50%, var(--color-rose-light) 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '40px 20px',
      direction: isRTL ? 'rtl' : 'ltr',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* === Background Video === */}
      <video
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.12,
          zIndex: 0,
          pointerEvents: 'none',
          filter: 'blur(2px) saturate(0.7)',
        }}
      >
        <source src="/bg-video.mp4" type="video/mp4" />
      </video>
      {/* Gradient overlay on top of video */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(160deg, rgba(var(--color-cream-rgb, 255,250,240), 0.6) 0%, rgba(var(--color-sage-ultra-rgb, 230,240,235), 0.5) 50%, rgba(var(--color-rose-light-rgb, 252,235,240), 0.6) 100%)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      <style>{`
        /* === Bokeh Particles === */
        @keyframes bokehFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25%  { transform: translate(30px, -20px) scale(1.1); }
          50%  { transform: translate(-15px, 15px) scale(0.9); }
          75%  { transform: translate(20px, 25px) scale(1.05); }
        }
        @keyframes bokehPulse {
          0%, 100% { opacity: 0.12; }
          50% { opacity: 0.25; }
        }

        /* === Heartbeat Pulse === */
        @keyframes heartbeat {
          0%   { transform: scale(1); opacity: 0.3; }
          14%  { transform: scale(1.08); opacity: 0.5; }
          28%  { transform: scale(1); opacity: 0.3; }
          42%  { transform: scale(1.12); opacity: 0.55; }
          70%  { transform: scale(1); opacity: 0.25; }
          100% { transform: scale(1); opacity: 0.25; }
        }

        /* === Logo Bloom === */
        @keyframes logoBloom {
          0%   { transform: scale(0); opacity: 0; filter: blur(20px); }
          40%  { filter: blur(0px); }
          60%  { transform: scale(1.15); opacity: 1; }
          80%  { transform: scale(0.95); }
          100% { transform: scale(1); opacity: 1; }
        }

        /* === Text Reveal === */
        @keyframes textReveal {
          from { opacity: 0; transform: translateY(20px); filter: blur(8px); }
          to   { opacity: 1; transform: translateY(0); filter: blur(0px); }
        }

        /* === Glow Ring === */
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 40px 10px rgba(var(--color-rose-rgb, 232,180,208), 0.2), 0 0 80px 20px rgba(var(--color-sage-rgb, 155,187,172), 0.1); }
          50%      { box-shadow: 0 0 60px 20px rgba(var(--color-rose-rgb, 232,180,208), 0.35), 0 0 100px 30px rgba(var(--color-sage-rgb, 155,187,172), 0.2); }
        }

        /* === Card Animations === */
        @keyframes cardReveal {
          from { opacity: 0; transform: translateY(60px) scale(0.9) rotateX(10deg); }
          to   { opacity: 1; transform: translateY(0) scale(1) rotateX(0deg); }
        }
        .landing-card {
          perspective: 800px;
          transition: transform 0.35s ${SPRING}, box-shadow 0.35s ease !important;
        }
        .landing-card:hover {
          transform: translateY(-8px) scale(1.03) !important;
          box-shadow: 0 20px 50px rgba(0,0,0,0.12) !important;
        }

        /* === Pill Pop === */
        @keyframes pillPop {
          from { opacity: 0; transform: scale(0.2) translateY(10px); }
          to   { opacity: 1; transform: scale(1)   translateY(0);    }
        }

        /* === Journey Path === */
        @keyframes milestonePop {
          0%   { transform: scale(0) rotate(-20deg); opacity: 0; }
          60%  { transform: scale(1.3) rotate(5deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }

        /* === Floating Emojis === */
        @keyframes floatUp {
          0%   { transform: translateY(110vh) rotate(0deg);   opacity: 0; }
          6%   { opacity: 0.5; }
          94%  { opacity: 0.4; }
          100% { transform: translateY(-10vh) rotate(400deg); opacity: 0; }
        }

        /* === Shimmer === */
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center;  }
        }

        /* === Typing cursor === */
        @keyframes blink {
          0%, 50% { border-color: var(--color-sage); }
          51%, 100% { border-color: transparent; }
        }
      `}</style>

      {/* === Bokeh Background Particles === */}
      {BOKEH.map((b, i) => (
        <div
          key={`bokeh-${i}`}
          aria-hidden="true"
          style={{
            position: 'fixed',
            left: `${b.x}%`,
            top: `${b.y}%`,
            width: b.size,
            height: b.size,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${b.color} 0%, transparent 70%)`,
            opacity: 0.15,
            animation: `bokehFloat ${b.dur}s ease-in-out ${b.delay}s infinite, bokehPulse ${b.dur * 0.7}s ease-in-out ${b.delay}s infinite`,
            pointerEvents: 'none',
            zIndex: 0,
            filter: 'blur(2px)',
          }}
        />
      ))}

      {/* === Floating Emojis (refined) === */}
      {['🍼','👶','🌸','⭐','💫','🎀','✨','💝'].map((emoji, i) => (
        <span
          key={`float-${i}`}
          aria-hidden="true"
          style={{
            position: 'fixed',
            left: `${8 + i * 12}%`,
            bottom: '-60px',
            fontSize: `${1.3 + Math.random() * 0.6}rem`,
            animation: `floatUp ${7 + i * 0.5}s ${i * 0.8}s infinite linear`,
            pointerEvents: 'none',
            zIndex: 0,
            userSelect: 'none',
            opacity: 0.6,
          }}
        >
          {emoji}
        </span>
      ))}

      {/* ===== HERO SECTION ===== */}
      <div style={{ textAlign: 'center', marginBottom: 32, position: 'relative', zIndex: 1 }}>
        {/* Heartbeat glow ring behind logo */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -55%)',
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(232,180,208,0.3) 0%, rgba(155,187,172,0.15) 40%, transparent 70%)',
          animation: introPhase >= 1 ? 'heartbeat 1.5s ease-in-out infinite' : 'none',
          opacity: introPhase >= 1 ? 1 : 0,
          transition: 'opacity 0.5s ease',
          pointerEvents: 'none',
        }} />

        {/* Logo */}
        <img
          src="/happy-baby-logo.png"
          alt="happy baby"
          style={{
            height: 'clamp(100px, 18vw, 170px)',
            objectFit: 'contain',
            marginBottom: 12,
            mixBlendMode: 'multiply',
            opacity: introPhase >= 2 ? 1 : 0,
            animation: introPhase >= 2 ? `logoBloom 1.2s ${SPRING} both` : 'none',
            position: 'relative',
            zIndex: 2,
          }}
        />

        {/* Animated tagline with character stagger */}
        <div style={{
          fontSize: 'clamp(1.05rem, 2.5vw, 1.35rem)',
          color: 'var(--color-text-muted)',
          marginTop: 16,
          fontWeight: 600,
          letterSpacing: '0.02em',
          overflow: 'hidden',
          position: 'relative',
        }}>
          {tagline.split('').map((char, i) => (
            <span
              key={i}
              style={{
                display: 'inline-block',
                opacity: introPhase >= 3 ? 1 : 0,
                animation: introPhase >= 3 ? `textReveal 0.5s ease ${i * 0.03}s both` : 'none',
                whiteSpace: char === ' ' ? 'pre' : undefined,
              }}
            >
              {char}
            </span>
          ))}
        </div>

        {/* Shimmer subtitle */}
        <p style={{
          fontSize: '0.85rem',
          marginTop: 8,
          fontWeight: 500,
          opacity: introPhase >= 4 ? 1 : 0,
          transition: 'opacity 0.8s ease',
          background: 'linear-gradient(90deg, var(--color-text-muted), var(--color-sage-dark), var(--color-rose-dark, #c98aa0), var(--color-text-muted))',
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: introPhase >= 4 ? 'shimmer 4s linear infinite' : 'none',
        }}>
          {pt('subtitle')}
        </p>
      </div>

      {/* ===== PREGNANCY JOURNEY TIMELINE ===== */}
      <div
        ref={journeyRef}
        style={{
          width: '100%',
          maxWidth: 700,
          margin: '0 auto 40px',
          position: 'relative',
          zIndex: 1,
          padding: '10px 0',
        }}
      >
        <svg
          viewBox="0 0 700 100"
          style={{ width: '100%', height: 'auto', overflow: 'visible' }}
        >
          {/* Path */}
          <path
            d="M 50 50 C 150 10, 250 90, 350 50 C 450 10, 550 90, 650 50"
            fill="none"
            stroke="url(#journeyGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="900"
            strokeDashoffset={900 - journeyProgress * 900}
            style={{ transition: 'stroke-dashoffset 0.05s linear' }}
          />
          <defs>
            <linearGradient id="journeyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--color-rose)" />
              <stop offset="50%" stopColor="var(--color-sage)" />
              <stop offset="100%" stopColor="var(--color-rose)" />
            </linearGradient>
          </defs>

          {/* Milestones */}
          {milestones.map((m, i) => {
            const t = m.week / 40;
            const x = 50 + t * 600;
            const y = 50 + Math.sin(t * Math.PI * 2) * 30;
            const visible = journeyProgress >= t;
            return (
              <g key={i}>
                {visible && (
                  <>
                    <circle cx={x} cy={y} r="16" fill="white" stroke="var(--color-sage)" strokeWidth="2" opacity="0.9">
                      <animate attributeName="r" from="0" to="16" dur="0.3s" fill="freeze" />
                      <animate attributeName="opacity" from="0" to="0.9" dur="0.3s" fill="freeze" />
                    </circle>
                    <text
                      x={x}
                      y={y + 5}
                      textAnchor="middle"
                      fontSize="14"
                      style={{ animation: 'milestonePop 0.5s ease both' }}
                    >
                      {m.emoji}
                    </text>
                    <text
                      x={x}
                      y={y + 34}
                      textAnchor="middle"
                      fontSize="9"
                      fill="var(--color-text-muted)"
                      fontWeight="600"
                      direction={isRTL ? 'rtl' : 'ltr'}
                      opacity={journeyProgress >= t + 0.05 ? 1 : 0}
                      style={{ transition: 'opacity 0.3s ease' }}
                    >
                      {m.label}
                    </text>
                    <text
                      x={x}
                      y={y - 22}
                      textAnchor="middle"
                      fontSize="8"
                      fill="var(--color-sage-dark)"
                      fontWeight="700"
                      opacity={journeyProgress >= t + 0.05 ? 1 : 0}
                      style={{ transition: 'opacity 0.3s ease' }}
                    >
                      {`${pt('weekLabel')} ${m.week}`}
                    </text>
                  </>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* ===== ACTION CARDS ===== */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 28,
        width: '100%',
        maxWidth: 780,
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
              padding: '36px 28px',
              opacity: introPhase >= 4 ? 1 : 0,
              animation: introPhase >= 4 ? `cardReveal 0.8s ${SPRING} ${i * 0.15}s both` : 'none',
            }}
            onClick={() => navigate(`/register?role=${card.role}`)}
          >
            <div style={{
              fontSize: '3.5rem',
              filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.1))',
            }}>
              {card.icon}
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-text)', margin: 0 }}>
              {card.title}
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', margin: 0, lineHeight: 1.7 }}>
              {card.desc}
            </p>
            <button
              className={card.ctaClass}
              onClick={e => {
                e.stopPropagation();
                navigate(`/register?role=${card.role}`);
              }}
              style={{
                marginTop: 8,
                padding: '10px 28px',
                fontSize: '0.95rem',
                fontWeight: 700,
                borderRadius: 12,
              }}
            >
              {card.cta}
            </button>
          </div>
        ))}
      </div>

      {/* ===== FEATURE PILLS ===== */}
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
              background: 'rgba(255,255,255,0.8)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.4)',
              padding: '10px 20px',
              borderRadius: '9999px',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: 'var(--color-text)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
              opacity: introPhase >= 4 ? 1 : 0,
              animation: introPhase >= 4 ? `pillPop 0.5s ${SPRING} ${0.3 + i * 0.08}s both` : 'none',
            }}
          >
            <span style={{ fontSize: '1.1rem' }}>{f.icon}</span>
            <span>{f.label}</span>
          </div>
        ))}
      </div>

      {/* ===== FOOTER ===== */}
      <footer style={{
        marginTop: 'auto',
        textAlign: 'center',
        color: 'var(--color-text-muted)',
        fontSize: '0.8rem',
        paddingTop: 24,
        borderTop: '1px solid rgba(255,255,255,0.3)',
        width: '100%',
        maxWidth: 600,
        position: 'relative',
        zIndex: 1,
      }}>
        {pt('footer')}
      </footer>
    </div>
  );
}
