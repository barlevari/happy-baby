import { useState, useEffect } from 'react';

const TIPS = [
  { emoji: '🤝', title: 'חפשי תמיכה', text: 'אל תהססי לבקש עזרה מבן/בת זוג, משפחה וחברות. גידול תינוק הוא עניין שבטי.' },
  { emoji: '😴', title: 'תנוחי כשהתינוקת ישנה', text: 'שחרורי את האשמה. שינה מספקת חיונית לבריאות הנפשית שלך כמו שהיא לגופך.' },
  { emoji: '📓', title: 'כתיבה יומנית', text: 'רשמי 3 דברים טובים מכל יום. מחקרים מראים שזה משפר משמעותית את מצב הרוח.' },
  { emoji: '🌿', title: 'זמן בטבע', text: '20 דקות בחוץ ביום מורידות קורטיזול ומשפרות מצב רוח, גם ביום גשום.' },
  { emoji: '📞', title: 'דברי עם מי שאכפת לה', text: 'שיחת טלפון עם חברה קרובה יכולה לשנות לחלוטין את האנרגיה של היום.' },
  { emoji: '💆‍♀️', title: 'עיסוי ומגע', text: 'מגע עוזר לשחרר אוקסיטוצין – הורמון הקשר והרוגע. בקשי עיסוי גב קצר מבן/בת זוג.' },
];

const ACCORDIONS = [
  {
    title: 'מה זה Baby Blues ואיך מתמודדים?',
    content: 'Baby Blues הוא מצב שכיח מאוד שחוות רוב האמהות בשבוע הראשון לאחר הלידה. הוא כולל מצבי רוח משתנים, בכי ללא סיבה ברורה, חרדה ועייפות. זה נורמלי לחלוטין ועובר תוך 10-14 ימים. כשהתחושות נמשכות מעבר לשבועיים, חשוב לדבר עם רופא.'
  },
  {
    title: 'כיצד לשמור על זוגיות בריאה לאחר לידה?',
    content: 'לידה היא שינוי ענק לשניהם. שמרו על זמן זוגי קצר אך קבוע, אפילו ארוחת ערב ביחד לאחר שהתינוק ישן. שוחחו על ציפיות, חלקו תפקידים בשוויוניות, ואל תשכחו להגיד תודה. מומלץ גם לקרוא ספר זוגי או לעשות טיפול זוגי.'
  },
  {
    title: 'מתי כדאי לפנות לעזרה מקצועית?',
    content: 'פני לעזרה כשאת חשה: עצב עמוק מעבר לשבועיים, קשיים בקשר עם התינוק, מחשבות על פגיעה עצמית, חרדה שמונעת ממך לתפקד. פסיכולוגיה, עבודה סוציאלית ייעודית לאחר לידה ועמותות כמו "עמותת ניצן" יכולות לסייע.'
  },
  {
    title: 'איך ניהול זמן עוזר לנפש?',
    content: 'תכנוני את היום בבלוקים קטנים. הקצי 5 דקות ביום לעצמך בלבד – אפילו לשתות קפה חמה בשקט. הרשימות לביצוע יקצרו את החרדה. ושכחי מהפרפקציוניזם – בית מושלם פחות חשוב מאמא מאושרת.'
  },
];

const BREATHING_PHASES = [
  { label: 'שאפי', duration: 4000, scale: 1.3, opacity: 1 },
  { label: 'החזיקי', duration: 2000, scale: 1.3, opacity: 0.8 },
  { label: 'נשפי', duration: 6000, scale: 1, opacity: 0.6 },
  { label: 'נוחי', duration: 2000, scale: 1, opacity: 0.7 },
];

export default function MentalPage() {
  const [breathing, setBreathing] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [openAccordion, setOpenAccordion] = useState(null);

  useEffect(() => {
    if (!breathing) { setPhaseIndex(0); return; }
    const phase = BREATHING_PHASES[phaseIndex];
    const timer = setTimeout(() => {
      setPhaseIndex(i => (i + 1) % BREATHING_PHASES.length);
    }, phase.duration);
    return () => clearTimeout(timer);
  }, [breathing, phaseIndex]);

  const currentPhase = BREATHING_PHASES[phaseIndex];

  return (
    <div style={{ direction: 'rtl' }}>
      <div className="page-header">
        <h1>🧘 כנה מנטלית</h1>
      </div>

      {/* Breathing Exercise */}
      <div className="card" style={{ marginBottom: 28, textAlign: 'center' }}>
        <h2 style={{ fontSize: 'var(--font-lg)', fontWeight: 800, marginBottom: 8 }}>
          🌬️ תרגיל נשימה מנחה
        </h2>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: 24, fontSize: '0.875rem' }}>
          נשימה 4-2-6-2 – מפחיתה חרדה ומרגיעה את מערכת העצבים
        </p>

        <div style={{ position: 'relative', width: 180, height: 180, margin: '0 auto 24px' }}>
          {/* Outer ring */}
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            border: '2px solid var(--color-sage-light)',
            transform: breathing ? `scale(${currentPhase.scale})` : 'scale(1)',
            opacity: 0.4,
            transition: `transform ${currentPhase?.duration || 1000}ms ease-in-out`,
          }} />
          {/* Inner circle */}
          <div style={{
            position: 'absolute', inset: 20, borderRadius: '50%',
            background: `radial-gradient(circle, var(--color-sage-light), var(--color-sage))`,
            transform: breathing ? `scale(${currentPhase.scale * 0.9})` : 'scale(1)',
            opacity: breathing ? currentPhase.opacity : 0.5,
            transition: `all ${currentPhase?.duration || 1000}ms ease-in-out`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            color: 'white',
            fontWeight: 700,
          }}>
            {breathing ? (
              <>
                <div style={{ fontSize: '0.9rem' }}>{currentPhase.label}</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.85 }}>
                  {Math.ceil(currentPhase.duration / 1000)} שנ'
                </div>
              </>
            ) : (
              <div style={{ fontSize: '0.85rem' }}>לחצי כדי<br/>להתחיל</div>
            )}
          </div>
        </div>

        <button
          className={`btn ${breathing ? 'btn-secondary' : 'btn-primary'}`}
          onClick={() => setBreathing(b => !b)}
        >
          {breathing ? 'עצרי' : 'התחילי נשימה'}
        </button>
      </div>

      {/* Mental Tips */}
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 'var(--font-lg)', fontWeight: 800, marginBottom: 16 }}>
          💡 טיפים לבריאות הנפשית
        </h2>
        <div className="grid-2">
          {TIPS.map((tip, i) => (
            <div key={i} className="card" style={{
              background: i % 2 === 0 ? 'var(--color-sage-ultra)' : 'var(--color-rose-light)',
              border: `1px solid ${i % 2 === 0 ? 'var(--color-sage-light)' : 'var(--color-rose)'}`,
              display: 'flex',
              gap: 12,
              alignItems: 'flex-start',
            }}>
              <div style={{ fontSize: '2rem', flexShrink: 0 }}>{tip.emoji}</div>
              <div>
                <div style={{ fontWeight: 800, marginBottom: 4, fontSize: '0.9rem' }}>{tip.title}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{tip.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Accordion */}
      <div>
        <h2 style={{ fontSize: 'var(--font-lg)', fontWeight: 800, marginBottom: 16 }}>
          ❓ שאלות נפוצות
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {ACCORDIONS.map((item, i) => (
            <div key={i} className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <button
                onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px 20px',
                  background: 'none',
                  border: 'none',
                  fontFamily: 'var(--font-family)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  color: 'var(--color-text)',
                  textAlign: 'right',
                  gap: 12,
                }}
              >
                <span>{item.title}</span>
                <span style={{
                  transform: openAccordion === i ? 'rotate(180deg)' : 'rotate(0)',
                  transition: 'transform 0.25s',
                  flexShrink: 0,
                  color: 'var(--color-sage)',
                }}>▼</span>
              </button>
              <div style={{
                maxHeight: openAccordion === i ? 300 : 0,
                overflow: 'hidden',
                transition: 'max-height 0.3s ease',
              }}>
                <div style={{
                  padding: '0 20px 16px',
                  fontSize: '0.875rem',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.8,
                  borderTop: '1px solid var(--color-border)',
                  paddingTop: 14,
                }}>
                  {item.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="alert alert-info" style={{ marginTop: 28 }}>
        <span>📞</span>
        <div>
          <strong>זקוקה לעזרה מיידית?</strong> ניתן לפנות לקו החם של עמותת ניצן: 1201 | ער"ן: 1201
        </div>
      </div>
    </div>
  );
}
