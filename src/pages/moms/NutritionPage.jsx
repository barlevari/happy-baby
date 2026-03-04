import { useState } from 'react';
import { useLanguage, usePageText } from '../../context/LanguageContext';

// ── Page-level translations ─────────────────────────────────
const PAGE_TEXT = {
  he: {
    pageTitle: '🥗 תזונה בהריון',
    trimesterFirst: 'ראשון',
    trimesterSecond: 'שני',
    trimesterThird: 'שלישי',
    trimesterWord: 'טרימסטר',
    recommendedFoods: '✅ מזונות מומלצים',
    avoidFoods: '🚫 מזונות שיש להימנע מהם',
    vitaminsAndSupplements: '💊 ויטמינים ותוספים',
    recommendedExercise: '🏃‍♀️ פעילות גופנית מומלצת',

    // Trimester labels
    tri1Label: 'טרימסטר ראשון (שבועות 1–12)',
    tri2Label: 'טרימסטר שני (שבועות 13–26)',
    tri3Label: 'טרימסטר שלישי (שבועות 27–40)',

    // ── Trimester 1 – Eat ──
    t1EatName1: 'ירקות עלים ירוקים',
    t1EatDesc1: 'עשירים בחומצה פולית ומינרלים חיוניים',
    t1EatName2: 'פירות יער',
    t1EatDesc2: 'אנטיאוקסידנטים ממגני DNA עוברי',
    t1EatName3: 'ביצים',
    t1EatDesc3: 'חלבון איכותי וכולין לפיתוח המוח',
    t1EatName4: 'דגים שמנים',
    t1EatDesc4: 'אומגה 3 – קריטי להתפתחות עצבית',
    t1EatName5: 'קטניות',
    t1EatDesc5: 'ברזל, חלבון וסיבים תזונתיים',

    // ── Trimester 1 – Avoid ──
    t1AvoidName1: 'דגים עם כספית גבוהה',
    t1AvoidDesc1: 'טונה, חרב ים, כריש – עלולים לפגוע בפיתוח מוחי',
    t1AvoidName2: 'בשר חי / לא מבושל',
    t1AvoidDesc2: 'סכנת ליסטריה וטוקסופלסמה',
    t1AvoidName3: 'קפאין מעל 200 מ"ג',
    t1AvoidDesc3: 'עלול להגביר סיכון להפלה',
    t1AvoidName4: 'סושי עם דגים חיים',
    t1AvoidDesc4: 'סכנת חיידקים ומזהמים',

    // ── Trimester 1 – Vitamins ──
    t1VitName1: 'חומצה פולית',
    t1VitDose1: '400–800 מק"ג',
    t1VitNote1: 'חיונית למניעת מומים בצינור העצבי',
    t1VitName2: 'ויטמין D',
    t1VitDose2: '400–2000 IU',
    t1VitNote2: 'חשוב לפיתוח עצמות ומערכת חיסון',
    t1VitName3: 'ברזל',
    t1VitDose3: '27 מ"ג',
    t1VitNote3: 'מניעת אנמיה ושמירה על ערכי המוגלובין',

    // ── Trimester 1 – Exercises ──
    t1ExName1: 'הליכה',
    t1ExDur1: '30 דק׳',
    t1ExDesc1: 'מצוינת למניעת בחילות ולשיפור מצב הרוח',
    t1ExName2: 'שחייה',
    t1ExDur2: '30–45 דק׳',
    t1ExDesc2: 'ללא לחץ על המפרקים, מצוינת לגב',
    t1ExName3: 'יוגה פרינטל',
    t1ExDur3: '45 דק׳',
    t1ExDesc3: 'נשימה, גמישות ורוגע',

    // ── Trimester 2 – Eat ──
    t2EatName1: 'מוצרי חלב',
    t2EatDesc1: 'סידן להתפתחות עצמות התינוק',
    t2EatName2: 'דגנים מלאים',
    t2EatDesc2: 'אנרגיה מאוזנת ומגנזיום',
    t2EatName3: 'אגוזים וגרעינים',
    t2EatDesc3: 'שומנים בריאים, ויטמין E ומגנזיום',
    t2EatName4: 'גזר ובטטה',
    t2EatDesc4: 'ויטמין A לפיתוח ראייה',
    t2EatName5: 'אוכמניות',
    t2EatDesc5: 'ברזל ואנטיאוקסידנטים',

    // ── Trimester 2 – Avoid ──
    t2AvoidName1: 'אלכוהול לחלוטין',
    t2AvoidDesc1: 'אין רמה בטוחה בהריון',
    t2AvoidName2: 'גבינות רכות לא מפוסטרות',
    t2AvoidDesc2: 'סכנת ליסטריה',
    t2AvoidName3: 'בשרים מעובדים',
    t2AvoidDesc3: 'נתרן גבוה ופחות חלבון איכותי',
    t2AvoidName4: 'מלח מוגזם',
    t2AvoidDesc4: 'עלול לגרום לבצקת ולעלייה בלחץ הדם',

    // ── Trimester 2 – Vitamins ──
    t2VitName1: 'ברזל',
    t2VitDose1: '27 מ"ג',
    t2VitNote1: 'חיוני עם עלייה בנפח הדם',
    t2VitName2: 'סידן',
    t2VitDose2: '1000 מ"ג',
    t2VitNote2: 'עצמות חזקות לאמא ולתינוק',
    t2VitName3: 'אומגה 3',
    t2VitDose3: '200 מ"ג DHA',
    t2VitNote3: 'פיתוח מוח ועיניים',

    // ── Trimester 2 – Exercises ──
    t2ExName1: 'כוח עם משקלות קלים',
    t2ExDur1: '20–30 דק׳',
    t2ExDesc1: 'שמירה על מסת שריר ומניעת כאבי גב',
    t2ExName2: 'אופניים ניידים',
    t2ExDur2: '30 דק׳',
    t2ExDesc2: 'קרדיו בטוח ללא זעזועים',
    t2ExName3: 'פילאטיס פרינטל',
    t2ExDur3: '45 דק׳',
    t2ExDesc3: 'חיזוק שרירי הרצפה האגנית',

    // ── Trimester 3 – Eat ──
    t3EatName1: 'חלבון רזה',
    t3EatDesc1: 'נדרש יותר לצמיחה האחרונה של התינוק',
    t3EatName2: 'טחינה',
    t3EatDesc2: 'סידן, ברזל ושומנים בריאים',
    t3EatName3: 'אבוקדו',
    t3EatDesc3: 'חומצה פולית, אשלגן ושומנים טובים',
    t3EatName4: 'שמן זית',
    t3EatDesc4: 'שומן בריא ואנטי-דלקתי',
    t3EatName5: 'ענבים ותמרים',
    t3EatDesc5: 'תמרים בשבועות האחרונים עשויים לסייע לצירים',

    // ── Trimester 3 – Avoid ──
    t3AvoidName1: 'אוכל חריף מאוד',
    t3AvoidDesc1: 'עלול להחמיר צרבת שכיחה בטרימסטר שלישי',
    t3AvoidName2: 'ארוחות כבדות',
    t3AvoidDesc2: 'עדיפות ארוחות קטנות ותכופות',
    t3AvoidName3: 'שתייה מוגזת',
    t3AvoidDesc3: 'מגבירה גזים ואי-נוחות',
    t3AvoidName4: 'סוכר מוגזם',
    t3AvoidDesc4: 'סיכון לסוכרת הריון וצמיחה מוגזמת',

    // ── Trimester 3 – Vitamins ──
    t3VitName1: 'ברזל + ויטמין C',
    t3VitDose1: '27 מ"ג + 75 מ"ג',
    t3VitNote1: 'ויטמין C משפר ספיגת ברזל',
    t3VitName2: 'סידן + D',
    t3VitDose2: '1000 מ"ג + 600 IU',
    t3VitNote2: 'בניית מלאי לתינוק',
    t3VitName3: 'כולין',
    t3VitDose3: '450 מ"ג',
    t3VitNote3: 'התפתחות מוחית אחרונה',

    // ── Trimester 3 – Exercises ──
    t3ExName1: 'הליכה קלה',
    t3ExDur1: '20 דק׳',
    t3ExDesc1: 'שמירה על כושר לקראת הלידה',
    t3ExName2: 'מדיטציה ונשימות',
    t3ExDur2: '15–20 דק׳',
    t3ExDesc2: 'הכנה מנטלית ללידה',
    t3ExName3: 'הידרותרפיה',
    t3ExDur3: '30 דק׳',
    t3ExDesc3: 'הקלה על כאבי גב ובצקות',
  },
  en: {
    pageTitle: '🥗 Pregnancy Nutrition',
    trimesterFirst: 'First',
    trimesterSecond: 'Second',
    trimesterThird: 'Third',
    trimesterWord: 'Trimester',
    recommendedFoods: '✅ Recommended Foods',
    avoidFoods: '🚫 Foods to Avoid',
    vitaminsAndSupplements: '💊 Vitamins & Supplements',
    recommendedExercise: '🏃‍♀️ Recommended Exercise',

    // Trimester labels
    tri1Label: 'First Trimester (Weeks 1–12)',
    tri2Label: 'Second Trimester (Weeks 13–26)',
    tri3Label: 'Third Trimester (Weeks 27–40)',

    // ── Trimester 1 – Eat ──
    t1EatName1: 'Green Leafy Vegetables',
    t1EatDesc1: 'Rich in folic acid and essential minerals',
    t1EatName2: 'Berries',
    t1EatDesc2: 'Antioxidants that protect fetal DNA',
    t1EatName3: 'Eggs',
    t1EatDesc3: 'High-quality protein and choline for brain development',
    t1EatName4: 'Fatty Fish',
    t1EatDesc4: 'Omega-3 – critical for neural development',
    t1EatName5: 'Legumes',
    t1EatDesc5: 'Iron, protein, and dietary fiber',

    // ── Trimester 1 – Avoid ──
    t1AvoidName1: 'High-Mercury Fish',
    t1AvoidDesc1: 'Tuna, swordfish, shark – may harm brain development',
    t1AvoidName2: 'Raw / Undercooked Meat',
    t1AvoidDesc2: 'Risk of listeria and toxoplasmosis',
    t1AvoidName3: 'Caffeine Over 200 mg',
    t1AvoidDesc3: 'May increase risk of miscarriage',
    t1AvoidName4: 'Sushi with Raw Fish',
    t1AvoidDesc4: 'Risk of bacteria and contaminants',

    // ── Trimester 1 – Vitamins ──
    t1VitName1: 'Folic Acid',
    t1VitDose1: '400–800 mcg',
    t1VitNote1: 'Essential for preventing neural tube defects',
    t1VitName2: 'Vitamin D',
    t1VitDose2: '400–2000 IU',
    t1VitNote2: 'Important for bone and immune system development',
    t1VitName3: 'Iron',
    t1VitDose3: '27 mg',
    t1VitNote3: 'Prevents anemia and maintains hemoglobin levels',

    // ── Trimester 1 – Exercises ──
    t1ExName1: 'Walking',
    t1ExDur1: '30 min',
    t1ExDesc1: 'Great for preventing nausea and improving mood',
    t1ExName2: 'Swimming',
    t1ExDur2: '30–45 min',
    t1ExDesc2: 'No joint stress, great for the back',
    t1ExName3: 'Prenatal Yoga',
    t1ExDur3: '45 min',
    t1ExDesc3: 'Breathing, flexibility, and relaxation',

    // ── Trimester 2 – Eat ──
    t2EatName1: 'Dairy Products',
    t2EatDesc1: 'Calcium for baby\'s bone development',
    t2EatName2: 'Whole Grains',
    t2EatDesc2: 'Balanced energy and magnesium',
    t2EatName3: 'Nuts and Seeds',
    t2EatDesc3: 'Healthy fats, vitamin E, and magnesium',
    t2EatName4: 'Carrots and Sweet Potatoes',
    t2EatDesc4: 'Vitamin A for vision development',
    t2EatName5: 'Blueberries',
    t2EatDesc5: 'Iron and antioxidants',

    // ── Trimester 2 – Avoid ──
    t2AvoidName1: 'Alcohol Completely',
    t2AvoidDesc1: 'No safe level during pregnancy',
    t2AvoidName2: 'Unpasteurized Soft Cheeses',
    t2AvoidDesc2: 'Risk of listeria',
    t2AvoidName3: 'Processed Meats',
    t2AvoidDesc3: 'High sodium and lower quality protein',
    t2AvoidName4: 'Excessive Salt',
    t2AvoidDesc4: 'May cause edema and increased blood pressure',

    // ── Trimester 2 – Vitamins ──
    t2VitName1: 'Iron',
    t2VitDose1: '27 mg',
    t2VitNote1: 'Essential as blood volume increases',
    t2VitName2: 'Calcium',
    t2VitDose2: '1000 mg',
    t2VitNote2: 'Strong bones for mom and baby',
    t2VitName3: 'Omega-3',
    t2VitDose3: '200 mg DHA',
    t2VitNote3: 'Brain and eye development',

    // ── Trimester 2 – Exercises ──
    t2ExName1: 'Light Weight Training',
    t2ExDur1: '20–30 min',
    t2ExDesc1: 'Maintain muscle mass and prevent back pain',
    t2ExName2: 'Stationary Bike',
    t2ExDur2: '30 min',
    t2ExDesc2: 'Safe cardio without jolting',
    t2ExName3: 'Prenatal Pilates',
    t2ExDur3: '45 min',
    t2ExDesc3: 'Strengthening pelvic floor muscles',

    // ── Trimester 3 – Eat ──
    t3EatName1: 'Lean Protein',
    t3EatDesc1: 'Needed more for the baby\'s final growth',
    t3EatName2: 'Tahini',
    t3EatDesc2: 'Calcium, iron, and healthy fats',
    t3EatName3: 'Avocado',
    t3EatDesc3: 'Folic acid, potassium, and good fats',
    t3EatName4: 'Olive Oil',
    t3EatDesc4: 'Healthy and anti-inflammatory fat',
    t3EatName5: 'Grapes and Dates',
    t3EatDesc5: 'Dates in the final weeks may help with labor',

    // ── Trimester 3 – Avoid ──
    t3AvoidName1: 'Very Spicy Food',
    t3AvoidDesc1: 'May worsen common heartburn in the third trimester',
    t3AvoidName2: 'Heavy Meals',
    t3AvoidDesc2: 'Prefer small and frequent meals',
    t3AvoidName3: 'Carbonated Drinks',
    t3AvoidDesc3: 'Increases gas and discomfort',
    t3AvoidName4: 'Excessive Sugar',
    t3AvoidDesc4: 'Risk of gestational diabetes and excessive growth',

    // ── Trimester 3 – Vitamins ──
    t3VitName1: 'Iron + Vitamin C',
    t3VitDose1: '27 mg + 75 mg',
    t3VitNote1: 'Vitamin C improves iron absorption',
    t3VitName2: 'Calcium + D',
    t3VitDose2: '1000 mg + 600 IU',
    t3VitNote2: 'Building reserves for the baby',
    t3VitName3: 'Choline',
    t3VitDose3: '450 mg',
    t3VitNote3: 'Final brain development',

    // ── Trimester 3 – Exercises ──
    t3ExName1: 'Light Walking',
    t3ExDur1: '20 min',
    t3ExDesc1: 'Maintaining fitness for delivery',
    t3ExName2: 'Meditation and Breathing',
    t3ExDur2: '15–20 min',
    t3ExDesc2: 'Mental preparation for labor',
    t3ExName3: 'Hydrotherapy',
    t3ExDur3: '30 min',
    t3ExDesc3: 'Relief for back pain and swelling',
  },
};

function getNutritionData(pt) {
  return {
    1: {
      label: pt('tri1Label'),
      eat: [
        { emoji: '🥦', name: pt('t1EatName1'), desc: pt('t1EatDesc1') },
        { emoji: '🫐', name: pt('t1EatName2'), desc: pt('t1EatDesc2') },
        { emoji: '🥚', name: pt('t1EatName3'), desc: pt('t1EatDesc3') },
        { emoji: '🐟', name: pt('t1EatName4'), desc: pt('t1EatDesc4') },
        { emoji: '🫘', name: pt('t1EatName5'), desc: pt('t1EatDesc5') },
      ],
      avoid: [
        { emoji: '🐟', name: pt('t1AvoidName1'), desc: pt('t1AvoidDesc1') },
        { emoji: '🥩', name: pt('t1AvoidName2'), desc: pt('t1AvoidDesc2') },
        { emoji: '☕', name: pt('t1AvoidName3'), desc: pt('t1AvoidDesc3') },
        { emoji: '🍣', name: pt('t1AvoidName4'), desc: pt('t1AvoidDesc4') },
      ],
      vitamins: [
        { emoji: '💊', name: pt('t1VitName1'), dose: pt('t1VitDose1'), note: pt('t1VitNote1') },
        { emoji: '🌞', name: pt('t1VitName2'), dose: pt('t1VitDose2'), note: pt('t1VitNote2') },
        { emoji: '🩸', name: pt('t1VitName3'), dose: pt('t1VitDose3'), note: pt('t1VitNote3') },
      ],
      exercises: [
        { emoji: '🚶‍♀️', name: pt('t1ExName1'), duration: pt('t1ExDur1'), desc: pt('t1ExDesc1') },
        { emoji: '🏊‍♀️', name: pt('t1ExName2'), duration: pt('t1ExDur2'), desc: pt('t1ExDesc2') },
        { emoji: '🧘‍♀️', name: pt('t1ExName3'), duration: pt('t1ExDur3'), desc: pt('t1ExDesc3') },
      ],
    },
    2: {
      label: pt('tri2Label'),
      eat: [
        { emoji: '🥛', name: pt('t2EatName1'), desc: pt('t2EatDesc1') },
        { emoji: '🌾', name: pt('t2EatName2'), desc: pt('t2EatDesc2') },
        { emoji: '🥜', name: pt('t2EatName3'), desc: pt('t2EatDesc3') },
        { emoji: '🥕', name: pt('t2EatName4'), desc: pt('t2EatDesc4') },
        { emoji: '🫐', name: pt('t2EatName5'), desc: pt('t2EatDesc5') },
      ],
      avoid: [
        { emoji: '🍷', name: pt('t2AvoidName1'), desc: pt('t2AvoidDesc1') },
        { emoji: '🧀', name: pt('t2AvoidName2'), desc: pt('t2AvoidDesc2') },
        { emoji: '🌭', name: pt('t2AvoidName3'), desc: pt('t2AvoidDesc3') },
        { emoji: '🧂', name: pt('t2AvoidName4'), desc: pt('t2AvoidDesc4') },
      ],
      vitamins: [
        { emoji: '💊', name: pt('t2VitName1'), dose: pt('t2VitDose1'), note: pt('t2VitNote1') },
        { emoji: '🦴', name: pt('t2VitName2'), dose: pt('t2VitDose2'), note: pt('t2VitNote2') },
        { emoji: '🐟', name: pt('t2VitName3'), dose: pt('t2VitDose3'), note: pt('t2VitNote3') },
      ],
      exercises: [
        { emoji: '🏋️‍♀️', name: pt('t2ExName1'), duration: pt('t2ExDur1'), desc: pt('t2ExDesc1') },
        { emoji: '🚴‍♀️', name: pt('t2ExName2'), duration: pt('t2ExDur2'), desc: pt('t2ExDesc2') },
        { emoji: '🤸‍♀️', name: pt('t2ExName3'), duration: pt('t2ExDur3'), desc: pt('t2ExDesc3') },
      ],
    },
    3: {
      label: pt('tri3Label'),
      eat: [
        { emoji: '🍗', name: pt('t3EatName1'), desc: pt('t3EatDesc1') },
        { emoji: '🌰', name: pt('t3EatName2'), desc: pt('t3EatDesc2') },
        { emoji: '🥑', name: pt('t3EatName3'), desc: pt('t3EatDesc3') },
        { emoji: '🫚', name: pt('t3EatName4'), desc: pt('t3EatDesc4') },
        { emoji: '🍇', name: pt('t3EatName5'), desc: pt('t3EatDesc5') },
      ],
      avoid: [
        { emoji: '🌶️', name: pt('t3AvoidName1'), desc: pt('t3AvoidDesc1') },
        { emoji: '🍕', name: pt('t3AvoidName2'), desc: pt('t3AvoidDesc2') },
        { emoji: '🥤', name: pt('t3AvoidName3'), desc: pt('t3AvoidDesc3') },
        { emoji: '🍰', name: pt('t3AvoidName4'), desc: pt('t3AvoidDesc4') },
      ],
      vitamins: [
        { emoji: '💊', name: pt('t3VitName1'), dose: pt('t3VitDose1'), note: pt('t3VitNote1') },
        { emoji: '🦴', name: pt('t3VitName2'), dose: pt('t3VitDose2'), note: pt('t3VitNote2') },
        { emoji: '🧠', name: pt('t3VitName3'), dose: pt('t3VitDose3'), note: pt('t3VitNote3') },
      ],
      exercises: [
        { emoji: '🚶‍♀️', name: pt('t3ExName1'), duration: pt('t3ExDur1'), desc: pt('t3ExDesc1') },
        { emoji: '🧘‍♀️', name: pt('t3ExName2'), duration: pt('t3ExDur2'), desc: pt('t3ExDesc2') },
        { emoji: '🏊‍♀️', name: pt('t3ExName3'), duration: pt('t3ExDur3'), desc: pt('t3ExDesc3') },
      ],
    },
  };
}

export default function NutritionPage() {
  const [trimester, setTrimester] = useState(1);
  const { isRTL } = useLanguage();
  const pt = usePageText(PAGE_TEXT);
  const nutritionData = getNutritionData(pt);
  const data = nutritionData[trimester];

  return (
    <div style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      <div className="page-header">
        <h1>{pt('pageTitle')}</h1>
      </div>

      {/* Trimester Tabs */}
      <div className="tabs">
        {[1, 2, 3].map(t => (
          <button
            key={t}
            className={`tab-btn${trimester === t ? ' active' : ''}`}
            onClick={() => setTrimester(t)}
          >
            {pt('trimesterWord')} {t === 1 ? pt('trimesterFirst') : t === 2 ? pt('trimesterSecond') : pt('trimesterThird')}
          </button>
        ))}
      </div>

      <div className="alert alert-info" style={{ marginBottom: 24 }}>
        ℹ️ <strong>{data.label}</strong>
      </div>

      {/* Foods to Eat */}
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 'var(--font-lg)', fontWeight: 800, marginBottom: 16 }}>
          {pt('recommendedFoods')}
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
          {pt('avoidFoods')}
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
          {pt('vitaminsAndSupplements')}
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
          {pt('recommendedExercise')}
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
