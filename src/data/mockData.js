// ============================================================
// Happy Baby – Mock Data
// ============================================================

export const MOCK_VIDEOS = [
  { id: 1, title: 'הכנה ללידה – כל מה שצריך לדעת', category: 'לידה', views: 1240, thumbnail: '🤱', durationMinutes: 28 },
  { id: 2, title: 'שינה בריאה לתינוק – שיטת Happy Baby', category: 'שינה', views: 980, thumbnail: '😴', durationMinutes: 22 },
  { id: 3, title: 'הנקה – התחלה נכונה ומוצלחת', category: 'האכלה', views: 876, thumbnail: '🍼', durationMinutes: 35 },
  { id: 4, title: 'התפתחות מוטורית 0–3 חודשים', category: 'התפתחות', views: 754, thumbnail: '🐣', durationMinutes: 19 },
  { id: 5, title: 'תזונה בהריון – מה מותר ומה אסור', category: 'כללי', views: 1102, thumbnail: '🥗', durationMinutes: 31 },
  { id: 6, title: 'טיפול בקוליק – שיטות הרגעה', category: 'שינה', views: 645, thumbnail: '😮‍💨', durationMinutes: 18 },
  { id: 7, title: 'גמילה מחיתולים בגיל שנה וחצי', category: 'התפתחות', views: 512, thumbnail: '🌟', durationMinutes: 24 },
  { id: 8, title: 'אוכל מוצק ראשון – מתי ואיך', category: 'האכלה', views: 689, thumbnail: '🥄', durationMinutes: 27 },
  { id: 9, title: 'שגרת ערב מרגיעה לתינוק', category: 'שינה', views: 823, thumbnail: '🌙', durationMinutes: 15 },
  { id: 10, title: 'חיסוני תינוקות – מדריך מלא להורים', category: 'כללי', views: 934, thumbnail: '💉', durationMinutes: 20 },
];

export const MOCK_ARTICLES = [
  { id: 1, title: 'כל מה שצריך לדעת על הטרימסטר הראשון', excerpt: 'גלי הבחילות, העייפות הגדולה ושינויים הורמונליים – הכל נורמלי. הנה מדריך מלא להתמודדות.', category: 'הריון', readMinutes: 8, emoji: '🤰' },
  { id: 2, title: 'תזונה מאוזנת בהנקה', excerpt: 'מה לאכול, כמה לשתות ואיך לשמור על ערכים תקינים בזמן הנקה. כולל רשימת מזונות מומלצים.', category: 'תזונה', readMinutes: 6, emoji: '🥛' },
  { id: 3, title: 'שיטת 5 ה-S להרגעת תינוק', excerpt: 'ד"ר הארווי קארפ פיתח שיטה מוכחת להרגעת תינוקות. נסביר כל שלב ואיך ליישם אותו.', category: 'שינה', readMinutes: 5, emoji: '😴' },
  { id: 4, title: 'דיכאון אחרי לידה – לזהות ולטפל', excerpt: 'כ-15% מהאמהות חוות דיכאון לאחר לידה. אלה הסימנים שיש לשים לב אליהם ואיפה לפנות לעזרה.', category: 'בריאות נפשית', readMinutes: 10, emoji: '💙' },
  { id: 5, title: 'בחירת עגלה – מדריך השוואה מלא', excerpt: 'עגלת תינוק היא אחד הרכישות הגדולות. כך תבחרי את הדגם המתאים לסגנון חייך ולתקציב שלך.', category: 'ציוד', readMinutes: 12, emoji: '🛒' },
  { id: 6, title: 'שינויים גופניים לאחר הלידה', excerpt: 'הגוף עבר תהליך מדהים. נסביר מה לצפות בשבועות הראשונים ואיך לדאוג לעצמך.', category: 'הריון', readMinutes: 7, emoji: '🌸' },
  { id: 7, title: 'זוגיות לאחר לידה – איך לשמור על הקשר', excerpt: 'תינוק חדש יכול לאתגר את הזוגיות. טיפים מעשיים לשמירה על קשר חזק עם הפרטנר.', category: 'בריאות נפשית', readMinutes: 9, emoji: '💑' },
  { id: 8, title: 'חזרה לפעילות גופנית אחרי לידה', excerpt: 'מתי בטוח להתחיל להתאמן שוב ואיזה תרגילים מותרים. מדריך מדויק לפי שבועות מהלידה.', category: 'בריאות', readMinutes: 8, emoji: '🏃‍♀️' },
];

export const MOCK_EVENTS = [
  { id: 1, title: 'סדנת לידה טבעית – מחזור 14', date: '2026-03-15', type: 'inPerson', spots: 8, location: 'תל אביב' },
  { id: 2, title: 'וובינר: שאלות ותשובות עם מיילדת', date: '2026-03-22', type: 'online', spots: 50, location: 'זום' },
  { id: 3, title: 'מפגש הנקה – קבוצת תמיכה', date: '2026-04-01', type: 'inPerson', spots: 12, location: 'הרצליה' },
  { id: 4, title: 'יוגה פרינטל – מפגש שבועי', date: '2026-04-08', type: 'inPerson', spots: 15, location: 'רמת גן' },
  { id: 5, title: 'הרצאה: תינוק בריא בשנה הראשונה', date: '2026-04-20', type: 'online', spots: 100, location: 'זום' },
];

export const MOCK_LESSONS = [
  { id: 1, title: 'מבוא לשיטת Happy Baby', estimatedMinutes: 45, status: 'completed', videoUrl: '#', readingUrl: '#' },
  { id: 2, title: 'פיזיולוגיה של שינת תינוקות', estimatedMinutes: 60, status: 'unlocked', videoUrl: '#', readingUrl: '#' },
  { id: 3, title: 'מחזורי שינה – הבנה מעמיקה', estimatedMinutes: 55, status: 'locked', videoUrl: '#', readingUrl: '#' },
  { id: 4, title: 'גיבוש שגרת שינה בריאה', estimatedMinutes: 70, status: 'locked', videoUrl: '#', readingUrl: '#' },
  { id: 5, title: 'הרגעת תינוק בוכה – טכניקות מתקדמות', estimatedMinutes: 50, status: 'locked', videoUrl: '#', readingUrl: '#' },
  { id: 6, title: 'ליווי הורים – כלים פרקטיים', estimatedMinutes: 65, status: 'locked', videoUrl: '#', readingUrl: '#' },
  { id: 7, title: 'מקרי אירוע וסימולציות', estimatedMinutes: 80, status: 'locked', videoUrl: '#', readingUrl: '#' },
  { id: 8, title: 'סיכום והסמכה – שיטת Happy Baby', estimatedMinutes: 40, status: 'locked', videoUrl: '#', readingUrl: '#' },
];

export const MOCK_TESTS = [
  { id: 1, name: 'בדיקות דם כלליות', recommendedWeek: 8, status: 'done', date: '2024-10-28' },
  { id: 2, name: 'שקיפות עורפית + NT', recommendedWeek: 12, status: 'done', date: '2024-11-25' },
  { id: 3, name: 'סקירת מערכות מוקדמת', recommendedWeek: 16, status: 'done', date: '2025-01-05' },
  { id: 4, name: 'סקר גנטי – NIFTY', recommendedWeek: 14, status: 'done', date: '2024-12-15' },
  { id: 5, name: 'סקירת מערכות מאוחרת', recommendedWeek: 22, status: 'pending', date: null },
  { id: 6, name: 'עקומת סוכר – GCT', recommendedWeek: 26, status: 'pending', date: null },
  { id: 7, name: 'בדיקת ברזל ופריטין', recommendedWeek: 24, status: 'pending', date: null },
  { id: 8, name: 'בדיקת סטרפטוקוק – GBS', recommendedWeek: 35, status: 'pending', date: null },
  { id: 9, name: 'אולטרסאונד לתפקוד שליה', recommendedWeek: 32, status: 'pending', date: null },
  { id: 10, name: 'CTG – ניטור עוברי', recommendedWeek: 38, status: 'pending', date: null },
];

export const MOCK_HEALTH_METRICS = [
  { date: '2025-09-01', weight: 65.2, bpSystolic: 112, bpDiastolic: 72, bloodSugar: 88 },
  { date: '2025-10-01', weight: 66.8, bpSystolic: 115, bpDiastolic: 74, bloodSugar: 90 },
  { date: '2025-11-01', weight: 68.5, bpSystolic: 118, bpDiastolic: 76, bloodSugar: 92 },
  { date: '2025-12-01', weight: 70.1, bpSystolic: 120, bpDiastolic: 78, bloodSugar: 95 },
  { date: '2026-01-01', weight: 72.4, bpSystolic: 122, bpDiastolic: 80, bloodSugar: 93 },
  { date: '2026-02-01', weight: 74.9, bpSystolic: 125, bpDiastolic: 82, bloodSugar: 97 },
];

export const BABY_SIZES = {
  8:  { emoji: '🫐', name: 'אוכמנית' },
  12: { emoji: '🍋', name: 'לימון' },
  16: { emoji: '🥑', name: 'אבוקדו' },
  20: { emoji: '🍌', name: 'בננה' },
  24: { emoji: '🌽', name: 'תירס' },
  28: { emoji: '🍆', name: 'חציל' },
  32: { emoji: '🥦', name: 'ברוקולי' },
  36: { emoji: '🥬', name: 'כרוב' },
  40: { emoji: '🍉', name: 'אבטיח' },
};

export const WEEKLY_TIPS = [
  { week: 8, category: 'תזונה', tip: 'התחילי ליטול חומצה פולית ויטמין D מדי יום. אכלי ארוחות קטנות ותכופות להפחתת בחילות.', emoji: '🥦' },
  { week: 12, category: 'פעילות', tip: 'הליכה קלה של 30 דקות ביום מצוינת בשלב זה. הימנעי מתרגילים עם לחץ על הבטן.', emoji: '🚶‍♀️' },
  { week: 16, category: 'בריאות', tip: 'הגיע הזמן לסקירה המוקדמת! אל תשכחי לבדוק את ערכי הברזל שלך – רבות מפתחות אנמיה.', emoji: '❤️' },
  { week: 20, category: 'הכנה', tip: 'אמצע ההריון! הגיע הזמן לחשוב על שם לתינוק ולחפש סדנת לידה. כיף גדול לפניך.', emoji: '✨' },
  { week: 24, category: 'תזונה', tip: 'הגדילי צריכת סידן לפחות ל-1000 מ"ג ביום. גבינה, יוגורט, טחינה וברוקולי הם חברים טובים.', emoji: '🥛' },
  { week: 28, category: 'שינה', tip: 'שכבי על הצד השמאלי לשיפור זרימת הדם לרחם. כרית הריון בין הרגליים תעזור מאוד.', emoji: '🛌' },
  { week: 32, category: 'הכנה', tip: 'הכיני את תיק הבית חולים! רשמי את הנשימות ואל תהססי לבדוק כל תנועה חריגה.', emoji: '👜' },
  { week: 36, category: 'לידה', tip: 'בשבועות האחרונים הכוויצות אמנוניות מתגברות. למדי להבדיל בין כוויצות שוא ללידה אמיתית.', emoji: '🤱' },
];
