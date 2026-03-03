import { Link } from 'react-router-dom';

const CREDENTIALS = [
  {
    emoji: '🎓',
    title: 'הסמכה מקצועית',
    desc: 'בוגרת לימודי ייעוץ שינה לתינוקות בהסמכה בינלאומית, עם ניסיון של מעל עשר שנים בתחום.',
  },
  {
    emoji: '👶',
    title: 'ניסיון עשיר',
    desc: 'עבדתי עם מאות משפחות בישראל, מלוות אמהות בהריון ולאחר לידה עם תוצאות מוכחות.',
  },
  {
    emoji: '🌿',
    title: 'גישה הוליסטית',
    desc: 'שיטת Happy Baby מאחדת מדע, אינטואיציה הורית וכלים מעשיים ליצירת שגרה בריאה לתינוק ולמשפחה.',
  },
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
        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--color-sage), var(--color-sage-dark))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3.5rem',
            margin: '0 auto 24px',
            boxShadow: 'var(--shadow-lg)',
          }}>
            🌿
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: 12, color: 'var(--color-sage-dark)' }}>
            אודות Happy Baby
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--color-text-muted)', maxWidth: 560, margin: '0 auto', lineHeight: 1.8 }}>
            Happy Baby נולדה מתוך אהבה עמוקה לאמהות ולתינוקות, ומתוך הבנה שכל אמא ראויה ללווי מקצועי, חם ונגיש בכל שלב של המסע.
          </p>
        </div>

        {/* Mission */}
        <div className="card" style={{ marginBottom: 32, background: 'var(--color-white)', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: 16, color: 'var(--color-sage-dark)' }}>
            🎯 המשימה שלנו
          </h2>
          <p style={{ lineHeight: 1.9, color: 'var(--color-text)', fontSize: '0.95rem' }}>
            אנו מאמינות שכל אמא – בהריון, לאחר לידה, וטרי – ראויה לידע, לכלים ולתמיכה שיאפשרו לה לגדל תינוק מאושר ובריא. שיטת Happy Baby משלבת מחקר עדכני, ניסיון אישי עשיר וגישה אמפתית, כדי לעזור לכל משפחה ליצור שגרה שעובדת עבורה.
          </p>
        </div>

        {/* Credentials */}
        <div className="grid-3" style={{ marginBottom: 32 }}>
          {CREDENTIALS.map((c, i) => (
            <div className="card" key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>{c.emoji}</div>
              <h3 style={{ fontWeight: 800, marginBottom: 8, fontSize: '1rem' }}>{c.title}</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', lineHeight: 1.7 }}>{c.desc}</p>
            </div>
          ))}
        </div>

        {/* Team */}
        <div className="card" style={{ textAlign: 'center', marginBottom: 32 }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: 20, color: 'var(--color-text)' }}>
            👩‍⚕️ הצוות שלנו
          </h2>
          <div style={{
            width: 120,
            height: 120,
            borderRadius: 'var(--radius-lg)',
            background: 'var(--color-sage-ultra)',
            border: '2px dashed var(--color-sage-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            color: 'var(--color-sage)',
            fontSize: '0.85rem',
            fontWeight: 600,
          }}>
            📷<br />תמונה<br />תתווסף בקרוב
          </div>
          <div style={{ fontWeight: 700 }}>מייסדת Happy Baby</div>
          <div style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginTop: 4 }}>
            מומחית שינה לתינוקות ויועצת הנקה
          </div>
        </div>

        {/* WhatsApp CTA */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <a
            href="https://wa.me/972501234567?text=היי%2C%20אשמח%20לקבל%20מידע%20נוסף%20על%20Happy%20Baby"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-lg"
            style={{ background: '#25D366', color: 'white', border: 'none', display: 'inline-flex', gap: 10 }}
          >
            💬 דברי איתנו בוואטסאפ
          </a>
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
