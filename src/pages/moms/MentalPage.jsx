import { useState, useEffect } from 'react';
import { useLanguage, usePageText } from '../../context/LanguageContext';

// ── Page-level translations ─────────────────────────────────
const PAGE_TEXT = {
  he: {
    // Header
    pageTitle: '🧘 כנה מנטלית',

    // Breathing exercise
    breathingTitle: '🌬️ תרגיל נשימה מנחה',
    breathingDesc: 'נשימה 4-2-6-2 – מפחיתה חרדה ומרגיעה את מערכת העצבים',
    breatheIn: 'שאפי',
    hold: 'החזיקי',
    breatheOut: 'נשפי',
    rest: 'נוחי',
    sec: "שנ'",
    tapToStart: 'לחצי כדי\nלהתחיל',
    stop: 'עצרי',
    startBreathing: 'התחילי נשימה',

    // Tips
    tipsTitle: '💡 טיפים לבריאות הנפשית',
    tip1Title: 'חפשי תמיכה',
    tip1Text: 'אל תהססי לבקש עזרה מבן/בת זוג, משפחה וחברות. גידול תינוק הוא עניין שבטי.',
    tip2Title: 'תנוחי כשהתינוקת ישנה',
    tip2Text: 'שחרורי את האשמה. שינה מספקת חיונית לבריאות הנפשית שלך כמו שהיא לגופך.',
    tip3Title: 'כתיבה יומנית',
    tip3Text: 'רשמי 3 דברים טובים מכל יום. מחקרים מראים שזה משפר משמעותית את מצב הרוח.',
    tip4Title: 'זמן בטבע',
    tip4Text: '20 דקות בחוץ ביום מורידות קורטיזול ומשפרות מצב רוח, גם ביום גשום.',
    tip5Title: 'דברי עם מי שאכפת לה',
    tip5Text: 'שיחת טלפון עם חברה קרובה יכולה לשנות לחלוטין את האנרגיה של היום.',
    tip6Title: 'עיסוי ומגע',
    tip6Text: 'מגע עוזר לשחרר אוקסיטוצין – הורמון הקשר והרוגע. בקשי עיסוי גב קצר מבן/בת זוג.',

    // Accordions (FAQ)
    faqTitle: '❓ שאלות נפוצות',
    faq1Title: 'מה זה Baby Blues ואיך מתמודדים?',
    faq1Content: 'Baby Blues הוא מצב שכיח מאוד שחוות רוב האמהות בשבוע הראשון לאחר הלידה. הוא כולל מצבי רוח משתנים, בכי ללא סיבה ברורה, חרדה ועייפות. זה נורמלי לחלוטין ועובר תוך 10-14 ימים. כשהתחושות נמשכות מעבר לשבועיים, חשוב לדבר עם רופא.',
    faq2Title: 'כיצד לשמור על זוגיות בריאה לאחר לידה?',
    faq2Content: 'לידה היא שינוי ענק לשניהם. שמרו על זמן זוגי קצר אך קבוע, אפילו ארוחת ערב ביחד לאחר שהתינוק ישן. שוחחו על ציפיות, חלקו תפקידים בשוויוניות, ואל תשכחו להגיד תודה. מומלץ גם לקרוא ספר זוגי או לעשות טיפול זוגי.',
    faq3Title: 'מתי כדאי לפנות לעזרה מקצועית?',
    faq3Content: 'פני לעזרה כשאת חשה: עצב עמוק מעבר לשבועיים, קשיים בקשר עם התינוק, מחשבות על פגיעה עצמית, חרדה שמונעת ממך לתפקד. פסיכולוגיה, עבודה סוציאלית ייעודית לאחר לידה ועמותות כמו "עמותת ניצן" יכולות לסייע.',
    faq4Title: 'איך ניהול זמן עוזר לנפש?',
    faq4Content: 'תכנוני את היום בבלוקים קטנים. הקצי 5 דקות ביום לעצמך בלבד – אפילו לשתות קפה חמה בשקט. הרשימות לביצוע יקצרו את החרדה. ושכחי מהפרפקציוניזם – בית מושלם פחות חשוב מאמא מאושרת.',

    // Emergency contact
    emergencyTitle: 'זקוקה לעזרה מיידית?',
    emergencyText: 'ניתן לפנות לקו החם של עמותת ניצן: 1201 | ער"ן: 1201',
  },
  en: {
    // Header
    pageTitle: '🧘 Mental Wellness',

    // Breathing exercise
    breathingTitle: '🌬️ Guided Breathing Exercise',
    breathingDesc: '4-2-6-2 breathing – reduces anxiety and calms the nervous system',
    breatheIn: 'Breathe In',
    hold: 'Hold',
    breatheOut: 'Breathe Out',
    rest: 'Rest',
    sec: 'sec',
    tapToStart: 'Tap to\nstart',
    stop: 'Stop',
    startBreathing: 'Start Breathing',

    // Tips
    tipsTitle: '💡 Mental Health Tips',
    tip1Title: 'Seek Support',
    tip1Text: "Don't hesitate to ask for help from your partner, family, and friends. Raising a baby is a communal effort.",
    tip2Title: 'Rest When Baby Sleeps',
    tip2Text: 'Let go of the guilt. Adequate sleep is as essential for your mental health as it is for your body.',
    tip3Title: 'Daily Journaling',
    tip3Text: 'Write down 3 good things from each day. Research shows this significantly improves mood.',
    tip4Title: 'Time in Nature',
    tip4Text: '20 minutes outdoors daily lowers cortisol and improves mood, even on rainy days.',
    tip5Title: 'Talk to Someone Who Cares',
    tip5Text: 'A phone call with a close friend can completely change the energy of your day.',
    tip6Title: 'Massage and Touch',
    tip6Text: 'Touch helps release oxytocin – the bonding and calming hormone. Ask your partner for a short back massage.',

    // Accordions (FAQ)
    faqTitle: '❓ Frequently Asked Questions',
    faq1Title: 'What is Baby Blues and how do you cope?',
    faq1Content: 'Baby Blues is a very common condition experienced by most mothers in the first week after birth. It includes mood swings, crying without a clear reason, anxiety, and fatigue. This is completely normal and passes within 10-14 days. When the feelings last beyond two weeks, it is important to talk to a doctor.',
    faq2Title: 'How to maintain a healthy relationship after birth?',
    faq2Content: 'Having a baby is a huge change for both partners. Keep short but regular couple time, even dinner together after the baby falls asleep. Discuss expectations, share responsibilities equally, and remember to say thank you. Reading a relationship book or attending couples therapy is also recommended.',
    faq3Title: 'When should you seek professional help?',
    faq3Content: 'Seek help when you feel: deep sadness beyond two weeks, difficulties bonding with the baby, thoughts of self-harm, or anxiety that prevents you from functioning. Psychologists, social workers specializing in postpartum care, and organizations like Nitzan Association can help.',
    faq4Title: 'How does time management help mental health?',
    faq4Content: "Plan your day in small blocks. Set aside 5 minutes a day for yourself – even to drink a hot coffee in peace. To-do lists will reduce anxiety. And forget perfectionism – a perfect home is less important than a happy mom.",

    // Emergency contact
    emergencyTitle: 'Need immediate help?',
    emergencyText: 'Contact the Nitzan Association hotline: 1201 | ERAN: 1201',
  },
};

const TIP_EMOJIS = ['🤝', '😴', '📓', '🌿', '📞', '💆‍♀️'];

const BREATHING_DURATIONS = [
  { duration: 4000, scale: 1.3, opacity: 1 },
  { duration: 2000, scale: 1.3, opacity: 0.8 },
  { duration: 6000, scale: 1, opacity: 0.6 },
  { duration: 2000, scale: 1, opacity: 0.7 },
];

const BREATHING_LABEL_KEYS = ['breatheIn', 'hold', 'breatheOut', 'rest'];

const TIP_KEYS = [
  { titleKey: 'tip1Title', textKey: 'tip1Text' },
  { titleKey: 'tip2Title', textKey: 'tip2Text' },
  { titleKey: 'tip3Title', textKey: 'tip3Text' },
  { titleKey: 'tip4Title', textKey: 'tip4Text' },
  { titleKey: 'tip5Title', textKey: 'tip5Text' },
  { titleKey: 'tip6Title', textKey: 'tip6Text' },
];

const FAQ_KEYS = [
  { titleKey: 'faq1Title', contentKey: 'faq1Content' },
  { titleKey: 'faq2Title', contentKey: 'faq2Content' },
  { titleKey: 'faq3Title', contentKey: 'faq3Content' },
  { titleKey: 'faq4Title', contentKey: 'faq4Content' },
];

export default function MentalPage() {
  const { isRTL } = useLanguage();
  const pt = usePageText(PAGE_TEXT);

  const [breathing, setBreathing] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [openAccordion, setOpenAccordion] = useState(null);

  useEffect(() => {
    if (!breathing) { setPhaseIndex(0); return; }
    const phase = BREATHING_DURATIONS[phaseIndex];
    const timer = setTimeout(() => {
      setPhaseIndex(i => (i + 1) % BREATHING_DURATIONS.length);
    }, phase.duration);
    return () => clearTimeout(timer);
  }, [breathing, phaseIndex]);

  const currentPhase = BREATHING_DURATIONS[phaseIndex];

  return (
    <div style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      <div className="page-header">
        <h1>{pt('pageTitle')}</h1>
      </div>

      {/* Breathing Exercise */}
      <div className="card" style={{ marginBottom: 28, textAlign: 'center' }}>
        <h2 style={{ fontSize: 'var(--font-lg)', fontWeight: 800, marginBottom: 8 }}>
          {pt('breathingTitle')}
        </h2>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: 24, fontSize: '0.875rem' }}>
          {pt('breathingDesc')}
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
                <div style={{ fontSize: '0.9rem' }}>{pt(BREATHING_LABEL_KEYS[phaseIndex])}</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.85 }}>
                  {Math.ceil(currentPhase.duration / 1000)} {pt('sec')}
                </div>
              </>
            ) : (
              <div style={{ fontSize: '0.85rem', whiteSpace: 'pre-line' }}>{pt('tapToStart')}</div>
            )}
          </div>
        </div>

        <button
          className={`btn ${breathing ? 'btn-secondary' : 'btn-primary'}`}
          onClick={() => setBreathing(b => !b)}
        >
          {breathing ? pt('stop') : pt('startBreathing')}
        </button>
      </div>

      {/* Mental Tips */}
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 'var(--font-lg)', fontWeight: 800, marginBottom: 16 }}>
          {pt('tipsTitle')}
        </h2>
        <div className="grid-2">
          {TIP_KEYS.map((tip, i) => (
            <div key={i} className="card" style={{
              background: i % 2 === 0 ? 'var(--color-sage-ultra)' : 'var(--color-rose-light)',
              border: `1px solid ${i % 2 === 0 ? 'var(--color-sage-light)' : 'var(--color-rose)'}`,
              display: 'flex',
              gap: 12,
              alignItems: 'flex-start',
            }}>
              <div style={{ fontSize: '2rem', flexShrink: 0 }}>{TIP_EMOJIS[i]}</div>
              <div>
                <div style={{ fontWeight: 800, marginBottom: 4, fontSize: '0.9rem' }}>{pt(tip.titleKey)}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{pt(tip.textKey)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Accordion */}
      <div>
        <h2 style={{ fontSize: 'var(--font-lg)', fontWeight: 800, marginBottom: 16 }}>
          {pt('faqTitle')}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {FAQ_KEYS.map((item, i) => (
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
                  textAlign: isRTL ? 'right' : 'left',
                  gap: 12,
                }}
              >
                <span>{pt(item.titleKey)}</span>
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
                  {pt(item.contentKey)}
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
          <strong>{pt('emergencyTitle')}</strong> {pt('emergencyText')}
        </div>
      </div>
    </div>
  );
}
