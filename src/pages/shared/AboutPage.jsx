import { Link } from 'react-router-dom';

const CREDENTIALS = [
  {
    emoji: '🏥',
    title: 'רפואה סינית לילדים ותינוקות',
    desc: 'מומחית ברפואה סינית המיוחדת לתינוקות, ילדים, הריון ולידה — תחום ייחודי ונדיר.',
  },
  {
    emoji: '⏳',
    title: '35+ שנות ניסיון קליני',
    desc: 'ניסיון קליני עשיר של למעלה מ-35 שנה בליווי נשים, תינוקות ומשפחות.',
  },
  {
    emoji: '🌿',
    title: 'גישה הוליסטית ומחברת',
    desc: 'שיטת Happy Baby מאחדת רפואה סינית, מדע מודרני ואינטואיציה הורית ליצירת שגרה בריאה.',
  },
];

const SPECIALTIES = [
  'רפואה סינית לתינוקות וילדים',
  'ליווי הריון ולידה ברפואה סינית',
  'טיפול בבעיות שינה אצל תינוקות',
  'תמיכה בהנקה ותזונת תינוקות',
  'הכנה ללידה והתאוששות לאחריה',
  'טיפול בקוליק, גזים ואי-נוחות',
];

export default function AboutPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, var(--color-cream), var(--color-sage-ultra))',
      direction: 'rtl',
      padding: '40px 24px',
    }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>

        {/* Hero - Roital's profile */}
        <div className="card" style={{ textAlign: 'center', marginBottom: 32, padding: '40px 32px' }}>
          <div style={{
            width: 140,
            height: 140,
            borderRadius: '50%',
            overflow: 'hidden',
            margin: '0 auto 20px',
            boxShadow: 'var(--shadow-lg)',
            border: '4px solid var(--color-sage-light)',
          }}>
            <img
              src="/roital.jpg"
              alt="רויטל לב ארי"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={e => {
                e.target.style.display = 'none';
                e.target.parentElement.style.background = 'linear-gradient(135deg, var(--color-sage), var(--color-sage-dark))';
                e.target.parentElement.style.display = 'flex';
                e.target.parentElement.style.alignItems = 'center';
                e.target.parentElement.style.justifyContent = 'center';
                e.target.parentElement.style.fontSize = '4rem';
                e.target.parentElement.innerHTML = '🌿';
              }}
            />
          </div>
          <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 900, marginBottom: 8, color: 'var(--color-sage-dark)' }}>
            רויטל לב ארי
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--color-sage)', fontWeight: 700, marginBottom: 20 }}>
            מייסדת Happy Baby | מומחית ברפואה סינית לתינוקות, ילדים, הריון ולידה
          </p>
          <p style={{ lineHeight: 1.9, color: 'var(--color-text)', fontSize: '0.97rem', maxWidth: 620, margin: '0 auto' }}>
            נעים מאוד! אני רויטל לב ארי, נשואה לשחר ואמא לבר ואביב.
            מקדישה חיים ללימודי רפואה סינית ולממשק הייחודי של רפואה סינית לתינוקות, ילדים, הריון ולידה —
            תחום ייחודי ונדיר שאני גאה להיות בין המובילות בו בארץ.
          </p>
        </div>

        {/* Credentials cards */}
        <div className="grid-3" style={{ marginBottom: 32 }}>
          {CREDENTIALS.map((c, i) => (
            <div className="card" key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>{c.emoji}</div>
              <h3 style={{ fontWeight: 800, marginBottom: 8, fontSize: '1rem' }}>{c.title}</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', lineHeight: 1.7 }}>{c.desc}</p>
            </div>
          ))}
        </div>

        {/* About story */}
        <div className="card" style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: 16, color: 'var(--color-sage-dark)' }}>
            🌱 הסיפור שלי
          </h2>
          <p style={{ lineHeight: 1.9, color: 'var(--color-text)', fontSize: '0.95rem', marginBottom: 14 }}>
            הדרך שלי לרפואה סינית התחילה מתוך סקרנות ואהבה עמוקה לרפואה הוליסטית.
            לאחר שנים של לימוד ופרקטיקה, התמחיתי בתחום שגיליתי שהוא הלב שלי —
            ליווי אמהות בהריון, לידה, ותקופת הגדילה של התינוקות.
          </p>
          <p style={{ lineHeight: 1.9, color: 'var(--color-text)', fontSize: '0.95rem', marginBottom: 14 }}>
            ניסיון קליני של למעלה מ-35 שנה לימד אותי שכל אמא, כל תינוק וכל משפחה הם עולם ומלואו.
            שיטת Happy Baby נולדה מתוך הרצון לתת לכל אמא — ולכל מי שמלווה אמהות — את הכלים, הידע והביטחון
            שהם צריכים.
          </p>
          <p style={{ lineHeight: 1.9, color: 'var(--color-text)', fontSize: '0.95rem' }}>
            Happy Baby היא לא רק שיטה — זו פילוסופיה של ליווי חם, מקצועי ומבוסס ניסיון
            שמאמינה בכל אמא ובכל תינוק.
          </p>
        </div>

        {/* Specialties */}
        <div className="card" style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: 16, color: 'var(--color-sage-dark)' }}>
            ✨ תחומי התמחות
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
            {SPECIALTIES.map((s, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 14px',
                background: 'var(--color-sage-ultra)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'var(--color-sage-dark)',
              }}>
                <span style={{ color: 'var(--color-sage)', flexShrink: 0 }}>✓</span>
                {s}
              </div>
            ))}
          </div>
        </div>

        {/* Contact & Social */}
        <div className="card" style={{ marginBottom: 32, textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: 20, color: 'var(--color-text)' }}>
            📬 בואו נתחבר
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
            <a
              href="https://wa.me/972522218646?text=היי%20רויטל%2C%20אשמח%20לקבל%20מידע%20נוסף%20על%20Happy%20Baby"
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              style={{ background: '#25D366', color: 'white', border: 'none', display: 'inline-flex', gap: 8, alignItems: 'center' }}
            >
              💬 וואטסאפ
            </a>
            <a
              href="https://www.instagram.com/pikpikit/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
              style={{ display: 'inline-flex', gap: 8, alignItems: 'center', border: '2px solid #E1306C', color: '#E1306C' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="ig-grad" cx="30%" cy="107%" r="150%">
                    <stop offset="0%" stopColor="#fdf497"/>
                    <stop offset="5%" stopColor="#fdf497"/>
                    <stop offset="45%" stopColor="#fd5949"/>
                    <stop offset="60%" stopColor="#d6249f"/>
                    <stop offset="90%" stopColor="#285AEB"/>
                  </radialGradient>
                </defs>
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="url(#ig-grad)"/>
                <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="1.8" fill="none"/>
                <circle cx="17.5" cy="6.5" r="1.2" fill="white"/>
              </svg>
              @pikpikit
            </a>
          </div>
        </div>

        {/* Back Link */}
        <div style={{ textAlign: 'center' }}>
          <Link to="/" style={{ color: 'var(--color-sage-dark)', fontWeight: 600, fontSize: '0.875rem' }}>
            ← חזרה לדף הבית
          </Link>
        </div>
      </div>
    </div>
  );
}
