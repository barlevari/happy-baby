import { useState } from 'react';

const NUTRITION_DATA = {
  1: {
    label: 'טרימסטר ראשון (שבועות 1–12)',
    eat: [
      { emoji: '🥦', name: 'ירקות עלים ירוקים', desc: 'עשירים בחומצה פולית ומינרלים חיוניים' },
      { emoji: '🫐', name: 'פירות יער', desc: 'אנטיאוקסידנטים ממגני DNA עוברי' },
      { emoji: '🥚', name: 'ביצים', desc: 'חלבון איכותי וכולין לפיתוח המוח' },
      { emoji: '🐟', name: 'דגים שמנים', desc: 'אומגה 3 – קריטי להתפתחות עצבית' },
      { emoji: '🫘', name: 'קטניות', desc: 'ברזל, חלבון וסיבים תזונתיים' },
    ],
    avoid: [
      { emoji: '🐟', name: 'דגים עם כספית גבוהה', desc: 'טונה, חרב ים, כריש – עלולים לפגוע בפיתוח מוחי' },
      { emoji: '🥩', name: 'בשר חי / לא מבושל', desc: 'סכנת ליסטריה וטוקסופלסמה' },
      { emoji: '☕', name: 'קפאין מעל 200 מ"ג', desc: 'עלול להגביר סיכון להפלה' },
      { emoji: '🍣', name: 'סושי עם דגים חיים', desc: 'סכנת חיידקים ומזהמים' },
    ],
    vitamins: [
      { emoji: '💊', name: 'חומצה פולית', dose: '400–800 מק"ג', note: 'חיונית למניעת מומים בצינור העצבי' },
      { emoji: '🌞', name: 'ויטמין D', dose: '400–2000 IU', note: 'חשוב לפיתוח עצמות ומערכת חיסון' },
      { emoji: '🩸', name: 'ברזל', dose: '27 מ"ג', note: 'מניעת אנמיה ושמירה על ערכי המוגלובין' },
    ],
    exercises: [
      { emoji: '🚶‍♀️', name: 'הליכה', duration: '30 דק׳', desc: 'מצוינת למניעת בחילות ולשיפור מצב הרוח' },
      { emoji: '🏊‍♀️', name: 'שחייה', duration: '30–45 דק׳', desc: 'ללא לחץ על המפרקים, מצוינת לגב' },
      { emoji: '🧘‍♀️', name: 'יוגה פרינטל', duration: '45 דק׳', desc: 'נשימה, גמישות ורוגע' },
    ],
  },
  2: {
    label: 'טרימסטר שני (שבועות 13–26)',
    eat: [
      { emoji: '🥛', name: 'מוצרי חלב', desc: 'סידן להתפתחות עצמות התינוק' },
      { emoji: '🌾', name: 'דגנים מלאים', desc: 'אנרגיה מאוזנת ומגנזיום' },
      { emoji: '🥜', name: 'אגוזים וגרעינים', desc: 'שומנים בריאים, ויטמין E ומגנזיום' },
      { emoji: '🥕', name: 'גזר ובטטה', desc: 'ויטמין A לפיתוח ראייה' },
      { emoji: '🫐', name: 'אוכמניות', desc: 'ברזל ואנטיאוקסידנטים' },
    ],
    avoid: [
      { emoji: '🍷', name: 'אלכוהול לחלוטין', desc: 'אין רמה בטוחה בהריון' },
      { emoji: '🧀', name: 'גבינות רכות לא מפוסטרות', desc: 'סכנת ליסטריה' },
      { emoji: '🌭', name: 'בשרים מעובדים', desc: 'נתרן גבוה ופחות חלבון איכותי' },
      { emoji: '🧂', name: 'מלח מוגזם', desc: 'עלול לגרום לבצקת ולעלייה בלחץ הדם' },
    ],
    vitamins: [
      { emoji: '💊', name: 'ברזל', dose: '27 מ"ג', note: 'חיוני עם עלייה בנפח הדם' },
      { emoji: '🦴', name: 'סידן', dose: '1000 מ"ג', note: 'עצמות חזקות לאמא ולתינוק' },
      { emoji: '🐟', name: 'אומגה 3', dose: '200 מ"ג DHA', note: 'פיתוח מוח ועיניים' },
    ],
    exercises: [
      { emoji: '🏋️‍♀️', name: 'כוח עם משקלות קלים', duration: '20–30 דק׳', desc: 'שמירה על מסת שריר ומניעת כאבי גב' },
      { emoji: '🚴‍♀️', name: 'אופניים ניידים', duration: '30 דק׳', desc: 'קרדיו בטוח ללא זעזועים' },
      { emoji: '🤸‍♀️', name: 'פילאטיס פרינטל', duration: '45 דק׳', desc: 'חיזוק שרירי הרצפה האגנית' },
    ],
  },
  3: {
    label: 'טרימסטר שלישי (שבועות 27–40)',
    eat: [
      { emoji: '🍗', name: 'חלבון רזה', desc: 'נדרש יותר לצמיחה האחרונה של התינוק' },
      { emoji: '🌰', name: 'טחינה', desc: 'סידן, ברזל ושומנים בריאים' },
      { emoji: '🥑', name: 'אבוקדו', desc: 'חומצה פולית, אשלגן ושומנים טובים' },
      { emoji: '🫚', name: 'שמן זית', desc: 'שומן בריא ואנטי-דלקתי' },
      { emoji: '🍇', name: 'ענבים ותמרים', desc: 'תמרים בשבועות האחרונים עשויים לסייע לצירים' },
    ],
    avoid: [
      { emoji: '🌶️', name: 'אוכל חריף מאוד', desc: 'עלול להחמיר צרבת שכיחה בטרימסטר שלישי' },
      { emoji: '🍕', name: 'ארוחות כבדות', desc: 'עדיפות ארוחות קטנות ותכופות' },
      { emoji: '🥤', name: 'שתייה מוגזת', desc: 'מגבירה גזים ואי-נוחות' },
      { emoji: '🍰', name: 'סוכר מוגזם', desc: 'סיכון לסוכרת הריון וצמיחה מוגזמת' },
    ],
    vitamins: [
      { emoji: '💊', name: 'ברזל + ויטמין C', dose: '27 מ"ג + 75 מ"ג', note: 'ויטמין C משפר ספיגת ברזל' },
      { emoji: '🦴', name: 'סידן + D', dose: '1000 מ"ג + 600 IU', note: 'בניית מלאי לתינוק' },
      { emoji: '🧠', name: 'כולין', dose: '450 מ"ג', note: 'התפתחות מוחית אחרונה' },
    ],
    exercises: [
      { emoji: '🚶‍♀️', name: 'הליכה קלה', duration: '20 דק׳', desc: 'שמירה על כושר לקראת הלידה' },
      { emoji: '🧘‍♀️', name: 'מדיטציה ונשימות', duration: '15–20 דק׳', desc: 'הכנה מנטלית ללידה' },
      { emoji: '🏊‍♀️', name: 'הידרותרפיה', duration: '30 דק׳', desc: 'הקלה על כאבי גב ובצקות' },
    ],
  },
};

export default function NutritionPage() {
  const [trimester, setTrimester] = useState(1);
  const data = NUTRITION_DATA[trimester];

  return (
    <div style={{ direction: 'rtl' }}>
      <div className="page-header">
        <h1>🥗 תזונה בהריון</h1>
      </div>

      {/* Trimester Tabs */}
      <div className="tabs">
        {[1, 2, 3].map(t => (
          <button
            key={t}
            className={`tab-btn${trimester === t ? ' active' : ''}`}
            onClick={() => setTrimester(t)}
          >
            טרימסטר {t === 1 ? 'ראשון' : t === 2 ? 'שני' : 'שלישי'}
          </button>
        ))}
      </div>

      <div className="alert alert-info" style={{ marginBottom: 24 }}>
        ℹ️ <strong>{data.label}</strong>
      </div>

      {/* Foods to Eat */}
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 'var(--font-lg)', fontWeight: 800, marginBottom: 16 }}>
          ✅ מזונות מומלצים
        </h2>
        <div className="grid-3">
          {data.eat.map((food, i) => (
            <div key={i} className="card" style={{
              background: '#E6F4EA',
              border: '1px solid #A5D6A7',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}>
              <div style={{ fontSize: '2rem' }}>{food.emoji}</div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1B5E20' }}>{food.name}</div>
              <div style={{ fontSize: '0.8rem', color: '#2E7D32' }}>{food.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Foods to Avoid */}
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 'var(--font-lg)', fontWeight: 800, marginBottom: 16 }}>
          🚫 מזונות שיש להימנע מהם
        </h2>
        <div className="grid-2">
          {data.avoid.map((food, i) => (
            <div key={i} className="card" style={{
              background: '#FDEAEA',
              border: '1px solid #FCA5A5',
              display: 'flex',
              gap: 12,
              alignItems: 'flex-start',
            }}>
              <div style={{ fontSize: '1.8rem', flexShrink: 0 }}>{food.emoji}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#9B1C1C', marginBottom: 2 }}>{food.name}</div>
                <div style={{ fontSize: '0.8rem', color: '#7F1D1D' }}>{food.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vitamins */}
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 'var(--font-lg)', fontWeight: 800, marginBottom: 16 }}>
          💊 ויטמינים ותוספים
        </h2>
        <div className="grid-3">
          {data.vitamins.map((v, i) => (
            <div key={i} className="card" style={{
              background: 'var(--color-admin-light)',
              border: '1px solid #C5B3E6',
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: '1.5rem' }}>{v.emoji}</span>
                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-admin)' }}>{v.name}</span>
              </div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-admin)' }}>{v.dose}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>{v.note}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Exercises */}
      <div>
        <h2 style={{ fontSize: 'var(--font-lg)', fontWeight: 800, marginBottom: 16 }}>
          🏃‍♀️ פעילות גופנית מומלצת
        </h2>
        <div className="grid-3">
          {data.exercises.map((ex, i) => (
            <div key={i} className="card card-clickable" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: '1.8rem' }}>{ex.emoji}</span>
                  <span style={{ fontWeight: 700 }}>{ex.name}</span>
                </div>
                <span className="badge badge-sage">{ex.duration}</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: 0 }}>{ex.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
