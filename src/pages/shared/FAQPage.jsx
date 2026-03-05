import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage, usePageText } from '../../context/LanguageContext';

// ── Page-level translations ─────────────────────────────────
const PAGE_TEXT = {
  he: {
    pageTitle: 'שאלות נפוצות',
    pageSubtitle: 'מצאי תשובות לשאלות הנפוצות ביותר על Hapby Baby',
    searchPlaceholder: 'חיפוש שאלה...',
    noResults: 'לא נמצאו תוצאות. נסי לחפש במילים אחרות או פני אלינו ישירות.',
    contactPrompt: 'לא מצאת תשובה?',
    contactLink: 'צרי איתנו קשר',
    backToHome: 'חזרה לדף הבית',

    // Category names
    catGeneral: 'כללי',
    catPregnancy: 'מעקב הריון',
    catContent: 'תוכן וסרטונים',
    catAcademy: 'אקדמיה',
    catTechnical: 'טכני',
    catBilling: 'תשלומים ומנויים',

    // General
    q1: 'מה זה Hapby Baby?',
    a1: 'Hapby Baby היא פלטפורמה דיגיטלית מקיפה לליווי נשים במהלך ההריון, הלידה ותקופת ההתאוששות. הפלטפורמה שלנו מבוססת על למעלה מ-35 שנות ניסיון קליני ברפואה סינית, ומשלבת ידע מסורתי עם כלים טכנולוגיים מתקדמים. תוכלי למצוא אצלנו סרטונים, מאמרים, מעקב הריון מותאם אישית ועוד.',

    q2: 'למי מיועדת Hapby Baby?',
    a2: 'Hapby Baby מיועדת לנשים בהריון, אמהות טריות ובני זוגן, וכן לסטודנטיות ומטפלות ברפואה משלימה שרוצות להעמיק את הידע שלהן. המסלולים שלנו מותאמים בנפרד לכל קהל יעד, כך שכל משתמשת מקבלת את התוכן הרלוונטי ביותר עבורה.',

    q3: 'איך נרשמים לפלטפורמה?',
    a3: 'ההרשמה פשוטה ומהירה. לחצי על כפתור "הרשמה" בדף הבית, הזיני שם, אימייל וסיסמה, ובחרי את המסלול המתאים לך (מטופלות או סטודנטיות). לאחר אימות האימייל, תוכלי להתחיל לגלוש בתכנים מיד.',

    // Pregnancy Tracking
    q4: 'איך עובד מעקב ההריון?',
    a4: 'מעקב ההריון שלנו מבוסס על תאריך המחזור האחרון (LMP) שהזנת בהגדרות. המערכת מחשבת את שבוע ההריון שלך אוטומטית ומציגה מידע מותאם, כולל שינויים צפויים אצלך ואצל התינוק, בדיקות מומלצות וטיפים שבועיים מרויטל.',

    q5: 'אילו נתונים אני צריכה להזין?',
    a5: 'כדי לקבל חוויה מותאמת אישית, מומלץ להזין את תאריך המחזור האחרון שלך. בנוסף, תוכלי לעדכן את הפרופיל שלך עם נתוני בריאות בסיסיים. ככל שהמידע מדויק יותר, כך התוכן שתקבלי יהיה רלוונטי יותר לשלב שבו את נמצאת.',

    q6: 'האם הנתונים שלי מאובטחים?',
    a6: 'בהחלט. אנחנו מתייחסים לפרטיות שלך ברצינות רבה. כל המידע האישי מוצפן ומאובטח בהתאם לתקנים המחמירים ביותר. אנחנו לא משתפים את הנתונים שלך עם צדדים שלישיים, והגישה למידע מוגנת באמצעות מנגנוני הרשאה מתקדמים.',

    // Content & Videos
    q7: 'אילו תכנים זמינים בפלטפורמה?',
    a7: 'הפלטפורמה כוללת סרטוני הדרכה מקצועיים, מאמרי תזונה מותאמים לכל שליש, תכנים להכנה מנטלית ללידה, טיפים שבועיים ומדריכים מקיפים. כל התכנים מוכנים ומוגשים על ידי רויטל לב ארי, עם למעלה מ-35 שנות ניסיון קליני.',

    q8: 'באיזו תדירות מתעדכנים התכנים?',
    a8: 'אנחנו מוסיפים תכנים חדשים באופן שוטף, כולל סרטונים חדשים, מאמרים ועדכונים עונתיים. בנוסף, התכנים הקיימים מתעדכנים בהתאם למחקרים ולידע החדש ביותר. מומלץ להפעיל התראות כדי לקבל עדכונים על תכנים חדשים.',

    q9: 'האם אפשר להוריד סרטונים לצפייה אופליין?',
    a9: 'כרגע הסרטונים זמינים לצפייה בסטרימינג באתר בלבד. אנחנו עובדים על פיתוח אפשרות לצפייה אופליין באפליקציה העתידית. בינתיים, ניתן לצפות בסרטונים מכל מכשיר עם חיבור לאינטרנט.',

    // Academy
    q10: 'מהי האקדמיה של Hapby Baby?',
    a10: 'האקדמיה היא מסלול לימודי מעמיק המיועד לסטודנטיות ומטפלות ברפואה משלימה. המסלול כולל סילבוס מקצועי, ספריית לימוד, תרגולים מעשיים ומפגשים חיים. זהו המסלול המתקדם ביותר שלנו, שנועד להכשיר דור חדש של מטפלות.',

    q11: 'מי יכולה להצטרף לאקדמיה?',
    a11: 'האקדמיה פתוחה למטפלות ברפואה משלימה, סטודנטיות לרפואה סינית, דולות, יועצות שינה ואנשי מקצוע נוספים בתחום. כדי להצטרף, יש להירשם למסלול הסטודנטיות בתהליך ההרשמה. לפרטים נוספים, ניתן ליצור קשר ישיר עם רויטל.',

    q12: 'מה לומדים באקדמיה?',
    a12: 'תוכנית הלימודים כוללת רפואה סינית לתינוקות וילדים, ליווי הריון ולידה, טיפול בבעיות שינה והנקה, תזונה ברפואה סינית ועוד. הלימוד משלב תיאוריה, צפייה בסרטונים מקצועיים, תרגולים מעשיים ומפגשים חיים לתרגול ושאלות.',

    // Technical
    q13: 'באילו דפדפנים האתר נתמך?',
    a13: 'האתר נתמך בכל הדפדפנים המודרניים, כולל Chrome, Firefox, Safari ו-Edge. מומלץ להשתמש בגרסה העדכנית ביותר של הדפדפן לחוויה מיטבית. האתר מותאם גם למובייל ולטאבלט.',

    q14: 'האם יש אפליקציה למובייל?',
    a14: 'כרגע הפלטפורמה פועלת כאפליקציית ווב מותאמת למובייל (PWA), וניתן לגשת אליה מכל דפדפן בטלפון. אנחנו מפתחים אפליקציה ייעודית ל-iOS ול-Android שצפויה להשיק בקרוב. הישארי מעודכנת דרך הניוזלטר שלנו.',

    q15: 'איך מאפסים סיסמה?',
    a15: 'כדי לאפס את הסיסמה, גשי לדף ההתחברות ולחצי על "שכחתי סיסמה". הזיני את כתובת האימייל שלך ותקבלי קישור לאיפוס בתוך מספר דקות. אם הבעיה נמשכת, צרי קשר עם התמיכה דרך וואטסאפ.',

    // Billing
    q16: 'כמה עולה המנוי?',
    a16: 'אנחנו מציעים מספר מסלולי מנוי בהתאם לצרכים שלך. קיים מסלול חינמי עם תכנים בסיסיים, ומסלולים בתשלום עם גישה מלאה לכל התכנים, הסרטונים ומעקב ההריון המותאם אישית. לפרטי מחירים עדכניים, בדקי בדף התמחור באתר.',

    q17: 'איך מבטלים מנוי?',
    a17: 'ביטול מנוי אפשרי בכל עת דרך דף ההגדרות בחשבון שלך. לאחר הביטול, תוכלי להמשיך להשתמש בתכנים עד סוף תקופת החיוב הנוכחית. אם יש בעיה, ניתן לפנות אלינו ישירות דרך וואטסאפ ונטפל בזה.',

    q18: 'מהי מדיניות ההחזרים?',
    a18: 'אנחנו מציעים אחריות שביעות רצון של 14 יום. אם אינך מרוצה מהשירות, ניתן לבקש החזר מלא תוך 14 יום מרגע הרכישה. לאחר תקופה זו, ההחזר יהיה יחסי בהתאם לתקופת השימוש. לבקשת החזר, פני אלינו בוואטסאפ.',
  },
  en: {
    pageTitle: 'Frequently Asked Questions',
    pageSubtitle: 'Find answers to the most common questions about Hapby Baby',
    searchPlaceholder: 'Search questions...',
    noResults: 'No results found. Try different keywords or contact us directly.',
    contactPrompt: 'Didn\'t find your answer?',
    contactLink: 'Contact us',
    backToHome: 'Back to Home',

    // Category names
    catGeneral: 'General',
    catPregnancy: 'Pregnancy Tracking',
    catContent: 'Content & Videos',
    catAcademy: 'Academy',
    catTechnical: 'Technical',
    catBilling: 'Billing & Subscriptions',

    // General
    q1: 'What is Hapby Baby?',
    a1: 'Hapby Baby is a comprehensive digital platform for supporting women throughout pregnancy, birth, and recovery. Our platform is based on over 35 years of clinical experience in Chinese medicine, combining traditional knowledge with advanced technological tools. You\'ll find videos, articles, personalized pregnancy tracking, and more.',

    q2: 'Who is Hapby Baby for?',
    a2: 'Hapby Baby is designed for pregnant women, new mothers and their partners, as well as students and practitioners in complementary medicine who want to deepen their knowledge. Our tracks are separately tailored for each audience, so every user receives the most relevant content for them.',

    q3: 'How do I register?',
    a3: 'Registration is quick and easy. Click the "Sign Up" button on the homepage, enter your name, email, and password, then choose the track that suits you (patients or students). After verifying your email, you can start browsing content right away.',

    // Pregnancy Tracking
    q4: 'How does pregnancy tracking work?',
    a4: 'Our pregnancy tracking is based on the last menstrual period (LMP) date you entered in settings. The system automatically calculates your pregnancy week and displays tailored information, including expected changes for you and your baby, recommended tests, and weekly tips from Roital.',

    q5: 'What data do I need to enter?',
    a5: 'For a personalized experience, we recommend entering your last menstrual period date. Additionally, you can update your profile with basic health information. The more accurate the information, the more relevant the content will be for your current stage.',

    q6: 'Is my data secure?',
    a6: 'Absolutely. We take your privacy very seriously. All personal information is encrypted and secured according to the strictest standards. We do not share your data with third parties, and access to information is protected through advanced authorization mechanisms.',

    // Content & Videos
    q7: 'What content is available on the platform?',
    a7: 'The platform includes professional instructional videos, nutrition articles tailored to each trimester, mental preparation content for birth, weekly tips, and comprehensive guides. All content is prepared and presented by Roital Lev Ari, with over 35 years of clinical experience.',

    q8: 'How often is the content updated?',
    a8: 'We add new content on a regular basis, including new videos, articles, and seasonal updates. Additionally, existing content is updated according to the latest research and knowledge. We recommend enabling notifications to stay updated on new content.',

    q9: 'Can I download videos for offline viewing?',
    a9: 'Currently, videos are available for streaming on the website only. We are working on developing offline viewing capability in the upcoming mobile app. In the meantime, you can watch videos from any device with an internet connection.',

    // Academy
    q10: 'What is the Hapby Baby Academy?',
    a10: 'The Academy is an in-depth learning track designed for students and practitioners in complementary medicine. The track includes a professional syllabus, study library, practical exercises, and live sessions. This is our most advanced track, designed to train a new generation of practitioners.',

    q11: 'Who can join the Academy?',
    a11: 'The Academy is open to complementary medicine practitioners, Chinese medicine students, doulas, sleep consultants, and other professionals in the field. To join, register for the student track during the sign-up process. For more details, you can contact Roital directly.',

    q12: 'What do you learn in the Academy?',
    a12: 'The curriculum covers Chinese medicine for infants and children, pregnancy and birth support, treating sleep and breastfeeding issues, nutrition in Chinese medicine, and more. Learning combines theory, professional video viewing, practical exercises, and live sessions for practice and questions.',

    // Technical
    q13: 'Which browsers are supported?',
    a13: 'The site is supported on all modern browsers, including Chrome, Firefox, Safari, and Edge. We recommend using the latest browser version for the best experience. The site is also optimized for mobile and tablet devices.',

    q14: 'Is there a mobile app?',
    a14: 'Currently, the platform operates as a mobile-responsive web application (PWA) accessible from any phone browser. We are developing a dedicated iOS and Android app expected to launch soon. Stay updated through our newsletter.',

    q15: 'How do I reset my password?',
    a15: 'To reset your password, go to the login page and click "Forgot Password." Enter your email address and you\'ll receive a reset link within a few minutes. If the issue persists, contact support via WhatsApp.',

    // Billing
    q16: 'How much does the subscription cost?',
    a16: 'We offer several subscription plans based on your needs. There is a free plan with basic content, and paid plans with full access to all content, videos, and personalized pregnancy tracking. For current pricing details, check the pricing page on the site.',

    q17: 'How do I cancel my subscription?',
    a17: 'You can cancel your subscription at any time through the Settings page in your account. After cancellation, you can continue using the content until the end of the current billing period. If you have any issues, contact us directly via WhatsApp and we\'ll take care of it.',

    q18: 'What is the refund policy?',
    a18: 'We offer a 14-day satisfaction guarantee. If you are not satisfied with the service, you can request a full refund within 14 days of purchase. After this period, the refund will be prorated based on the usage period. To request a refund, contact us on WhatsApp.',
  },
};

// ── FAQ data structure ──────────────────────────────────────
const FAQ_CATEGORIES = [
  {
    id: 'general',
    nameKey: 'catGeneral',
    icon: 'info',
    items: [
      { qKey: 'q1', aKey: 'a1' },
      { qKey: 'q2', aKey: 'a2' },
      { qKey: 'q3', aKey: 'a3' },
    ],
  },
  {
    id: 'pregnancy',
    nameKey: 'catPregnancy',
    icon: 'pregnancy',
    items: [
      { qKey: 'q4', aKey: 'a4' },
      { qKey: 'q5', aKey: 'a5' },
      { qKey: 'q6', aKey: 'a6' },
    ],
  },
  {
    id: 'content',
    nameKey: 'catContent',
    icon: 'video',
    items: [
      { qKey: 'q7', aKey: 'a7' },
      { qKey: 'q8', aKey: 'a8' },
      { qKey: 'q9', aKey: 'a9' },
    ],
  },
  {
    id: 'academy',
    nameKey: 'catAcademy',
    icon: 'academy',
    items: [
      { qKey: 'q10', aKey: 'a10' },
      { qKey: 'q11', aKey: 'a11' },
      { qKey: 'q12', aKey: 'a12' },
    ],
  },
  {
    id: 'technical',
    nameKey: 'catTechnical',
    icon: 'technical',
    items: [
      { qKey: 'q13', aKey: 'a13' },
      { qKey: 'q14', aKey: 'a14' },
      { qKey: 'q15', aKey: 'a15' },
    ],
  },
  {
    id: 'billing',
    nameKey: 'catBilling',
    icon: 'billing',
    items: [
      { qKey: 'q16', aKey: 'a16' },
      { qKey: 'q17', aKey: 'a17' },
      { qKey: 'q18', aKey: 'a18' },
    ],
  },
];

// ── Category icon component ─────────────────────────────────
function CategoryIcon({ type, size = 20 }) {
  const icons = {
    info: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    ),
    pregnancy: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a3 3 0 0 0-3 3v1a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
        <path d="M9 10c-3 0-5 2-5 6 0 3 2 6 5 6h1c1 0 2-.5 2.5-1.5.5 1 1.5 1.5 2.5 1.5h1c3 0 5-3 5-6 0-4-2-6-5-6" />
      </svg>
    ),
    video: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
    ),
    academy: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5" />
      </svg>
    ),
    technical: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    billing: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
  };
  return icons[type] || icons.info;
}

// ── Chevron icon for accordion ──────────────────────────────
function ChevronIcon({ isOpen, isRTL }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        transition: 'transform 0.3s ease',
        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
        flexShrink: 0,
      }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

// ── Single FAQ item ─────────────────────────────────────────
function FAQItem({ question, answer, isOpen, onToggle, isRTL }) {
  return (
    <div style={{
      borderBottom: '1px solid var(--color-border)',
    }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          padding: '16px 4px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: isRTL ? 'right' : 'left',
          direction: isRTL ? 'rtl' : 'ltr',
          fontFamily: 'inherit',
        }}
      >
        <span style={{
          fontWeight: 700,
          fontSize: '0.95rem',
          color: isOpen ? 'var(--color-sage-dark)' : 'var(--color-text)',
          lineHeight: 1.5,
          flex: 1,
          transition: 'color 0.2s ease',
        }}>
          {question}
        </span>
        <ChevronIcon isOpen={isOpen} isRTL={isRTL} />
      </button>
      <div style={{
        maxHeight: isOpen ? 500 : 0,
        overflow: 'hidden',
        transition: 'max-height 0.35s ease, opacity 0.3s ease',
        opacity: isOpen ? 1 : 0,
      }}>
        <p style={{
          padding: '0 4px 16px',
          margin: 0,
          fontSize: '0.9rem',
          lineHeight: 1.85,
          color: 'var(--color-text-muted)',
        }}>
          {answer}
        </p>
      </div>
    </div>
  );
}

// ── Main FAQ Page ───────────────────────────────────────────
export default function FAQPage() {
  const { isRTL } = useLanguage();
  const pt = usePageText(PAGE_TEXT);

  const [openItems, setOpenItems] = useState({});
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleItem = (key) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Filter FAQ items by search query
  const getFilteredCategories = () => {
    if (!searchQuery.trim()) {
      if (activeCategory) {
        return FAQ_CATEGORIES.filter((cat) => cat.id === activeCategory);
      }
      return FAQ_CATEGORIES;
    }

    const query = searchQuery.toLowerCase().trim();
    return FAQ_CATEGORIES.map((cat) => ({
      ...cat,
      items: cat.items.filter((item) => {
        const q = pt(item.qKey).toLowerCase();
        const a = pt(item.aKey).toLowerCase();
        return q.includes(query) || a.includes(query);
      }),
    })).filter((cat) => cat.items.length > 0);
  };

  const filteredCategories = getFilteredCategories();
  const totalResults = filteredCategories.reduce((sum, cat) => sum + cat.items.length, 0);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, var(--color-cream), var(--color-sage-ultra))',
      direction: isRTL ? 'rtl' : 'ltr',
      padding: '40px 24px',
    }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h1 style={{
            fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
            fontWeight: 900,
            color: 'var(--color-sage-dark)',
            marginBottom: 8,
          }}>
            {pt('pageTitle')}
          </h1>
          <p style={{
            fontSize: '1rem',
            color: 'var(--color-text-muted)',
            maxWidth: 500,
            margin: '0 auto',
            lineHeight: 1.6,
          }}>
            {pt('pageSubtitle')}
          </p>
        </div>

        {/* Search bar */}
        <div style={{ marginBottom: 24 }}>
          <div style={{
            position: 'relative',
            maxWidth: 500,
            margin: '0 auto',
          }}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-text-muted)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                ...(isRTL ? { right: 14 } : { left: 14 }),
                pointerEvents: 'none',
              }}
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setActiveCategory(null);
              }}
              placeholder={pt('searchPlaceholder')}
              style={{
                width: '100%',
                padding: isRTL ? '12px 42px 12px 16px' : '12px 16px 12px 42px',
                borderRadius: 'var(--radius-full)',
                border: '2px solid var(--color-border)',
                background: 'white',
                fontSize: '0.9rem',
                fontFamily: 'inherit',
                color: 'var(--color-text)',
                outline: 'none',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                boxSizing: 'border-box',
                direction: isRTL ? 'rtl' : 'ltr',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--color-sage)';
                e.target.style.boxShadow = '0 0 0 3px var(--color-sage-ultra)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--color-border)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
        </div>

        {/* Category filter chips */}
        {!searchQuery && (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 8,
            justifyContent: 'center',
            marginBottom: 28,
          }}>
            <button
              onClick={() => setActiveCategory(null)}
              style={{
                padding: '8px 16px',
                borderRadius: 'var(--radius-full)',
                border: '2px solid',
                borderColor: !activeCategory ? 'var(--color-sage)' : 'var(--color-border)',
                background: !activeCategory ? 'var(--color-sage)' : 'white',
                color: !activeCategory ? 'white' : 'var(--color-text-muted)',
                fontWeight: 600,
                fontSize: '0.8rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontFamily: 'inherit',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              {isRTL ? 'הכל' : 'All'}
            </button>
            {FAQ_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-full)',
                  border: '2px solid',
                  borderColor: activeCategory === cat.id ? 'var(--color-sage)' : 'var(--color-border)',
                  background: activeCategory === cat.id ? 'var(--color-sage)' : 'white',
                  color: activeCategory === cat.id ? 'white' : 'var(--color-text-muted)',
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontFamily: 'inherit',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <CategoryIcon type={cat.icon} size={14} />
                </span>
                {pt(cat.nameKey)}
              </button>
            ))}
          </div>
        )}

        {/* FAQ sections */}
        {filteredCategories.length > 0 ? (
          filteredCategories.map((cat) => (
            <div key={cat.id} className="card" style={{ marginBottom: 20, padding: '24px 28px' }}>
              {/* Category header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 16,
                paddingBottom: 12,
                borderBottom: '2px solid var(--color-sage-ultra)',
              }}>
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--color-sage-ultra)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-sage-dark)',
                  flexShrink: 0,
                }}>
                  <CategoryIcon type={cat.icon} size={18} />
                </div>
                <h2 style={{
                  fontSize: '1.05rem',
                  fontWeight: 800,
                  color: 'var(--color-sage-dark)',
                  margin: 0,
                }}>
                  {pt(cat.nameKey)}
                </h2>
              </div>

              {/* FAQ items */}
              {cat.items.map((item, idx) => {
                const key = `${cat.id}-${idx}`;
                return (
                  <FAQItem
                    key={key}
                    question={pt(item.qKey)}
                    answer={pt(item.aKey)}
                    isOpen={!!openItems[key]}
                    onToggle={() => toggleItem(key)}
                    isRTL={isRTL}
                  />
                );
              })}
            </div>
          ))
        ) : (
          <div className="card" style={{
            textAlign: 'center',
            padding: '48px 24px',
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
            </div>
            <p style={{
              color: 'var(--color-text-muted)',
              fontSize: '0.95rem',
              lineHeight: 1.7,
            }}>
              {pt('noResults')}
            </p>
          </div>
        )}

        {/* Contact prompt */}
        <div className="card" style={{
          textAlign: 'center',
          padding: '28px 24px',
          marginBottom: 24,
          background: 'var(--color-sage-ultra)',
          border: '2px solid var(--color-sage-light)',
        }}>
          <p style={{
            fontSize: '0.95rem',
            color: 'var(--color-text)',
            marginBottom: 12,
            fontWeight: 600,
          }}>
            {pt('contactPrompt')}
          </p>
          <a
            href="https://wa.me/972522218646?text=היי%20רויטל%2C%20יש%20לי%20שאלה%20לגבי%20Happy%20Baby"
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
            style={{
              background: '#25D366',
              color: 'white',
              border: 'none',
              display: 'inline-flex',
              gap: 8,
              alignItems: 'center',
              fontWeight: 700,
              padding: '10px 24px',
              borderRadius: 'var(--radius-full)',
              textDecoration: 'none',
              fontSize: '0.9rem',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {pt('contactLink')}
          </a>
        </div>

        {/* Back link */}
        <div style={{ textAlign: 'center' }}>
          <Link to="/" style={{
            color: 'var(--color-sage-dark)',
            fontWeight: 600,
            fontSize: '0.875rem',
            textDecoration: 'none',
          }}>
            {isRTL ? '← ' : ''}{pt('backToHome')}{!isRTL ? ' →' : ''}
          </Link>
        </div>
      </div>
    </div>
  );
}
