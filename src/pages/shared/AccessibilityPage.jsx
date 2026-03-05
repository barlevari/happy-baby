import { Link } from 'react-router-dom';
import { useLanguage, usePageText } from '../../context/LanguageContext';

// ── Page-level translations ─────────────────────────────────
const PAGE_TEXT = {
  he: {
    title: 'הצהרת נגישות',
    lastUpdated: 'עודכן לאחרונה: מרץ 2026',
    backToHome: '← חזרה לדף הבית',

    // 1. Commitment
    commitmentTitle: '1. המחויבות שלנו לנגישות',
    commitmentP1: 'Happy Baby מחויבת להנגשת הפלטפורמה לכלל המשתמשות, כולל אנשים עם מוגבלויות. אנו שואפים לעמוד בתקן WCAG 2.1 ברמה AA (Web Content Accessibility Guidelines), ופועלים באופן שוטף לשיפור הנגישות של הפלטפורמה.',
    commitmentP2: 'אנו מאמינים שכל אישה בהריון ראויה לגישה שווה למידע, לכלים ולתמיכה שהפלטפורמה מציעה, ללא קשר ליכולותיה הפיזיות או הקוגניטיביות.',

    // 2. Current Features
    featuresTitle: '2. תכונות נגישות קיימות',
    featuresP1: 'הפלטפורמה שלנו כוללת את תכונות הנגישות הבאות:',

    featureRTLTitle: 'תמיכה בכיוון טקסט (RTL)',
    featureRTLDesc: 'הפלטפורמה תומכת באופן מלא בעברית עם כיוון טקסט מימין לשמאל (RTL), כולל מעבר חלק לאנגלית (LTR).',

    featureKeyboardTitle: 'ניווט מקלדת',
    featureKeyboardDesc: 'כל הפונקציות העיקריות של הפלטפורמה נגישות באמצעות מקלדת, כולל ניווט בתפריטים, טפסים ולחצנים.',

    featureSemanticTitle: 'HTML סמנטי',
    featureSemanticDesc: 'הפלטפורמה בנויה עם תגיות HTML סמנטיות (כותרות, רשימות, טפסים, לחצנים) המספקות מבנה ברור לקוראי מסך ולטכנולוגיות מסייעות.',

    featureResponsiveTitle: 'עיצוב רספונסיבי',
    featureResponsiveDesc: 'הפלטפורמה מותאמת לכל גודל מסך, ממכשירים ניידים ועד מסכי מחשב רחבים, ותומכת בהגדלת טקסט עד 200% ללא אובדן תוכן.',

    featureContrastTitle: 'ניגודיות גבוהה',
    featureContrastDesc: 'צבעי הטקסט והרקע נבחרו כדי לעמוד ביחסי ניגודיות מינימליים בהתאם לתקן WCAG, לנוחות קריאה מרבית.',

    featureScreenReaderTitle: 'תמיכה בקוראי מסך',
    featureScreenReaderDesc: 'הפלטפורמה כוללת תוויות ARIA, תיאורי תמונות (alt text), ומבנה לוגי המאפשרים שימוש יעיל בקוראי מסך כגון NVDA, JAWS ו-VoiceOver.',

    // 3. Known Limitations
    limitationsTitle: '3. מגבלות ידועות ושיפורים מתמשכים',
    limitationsP1: 'אנו מכירים בכך שלא כל חלקי הפלטפורמה עומדים במלואם בתקני הנגישות. מגבלות ידועות כוללות:',
    limitationsItem1: 'חלק מתכני הווידאו עדיין חסרים כתוביות בעברית',
    limitationsItem2: 'ממשק צ\'אט ה-AI עשוי לדרוש שיפורים נוספים בנגישות',
    limitationsItem3: 'חלק מהתרשימים הגרפיים עשויים שלא להיות נגישים במלואם לקוראי מסך',
    limitationsP2: 'אנו עובדים באופן שוטף לתיקון מגבלות אלה ולשיפור הנגישות הכוללת של הפלטפורמה.',

    // 4. Technologies
    techTitle: '4. טכנולוגיות בשימוש',
    techP1: 'הפלטפורמה בנויה באמצעות הטכנולוגיות הבאות התומכות בנגישות:',
    techItem1: 'React - ספריית ממשק משתמש עם תמיכה מובנית ב-ARIA',
    techItem2: 'ARIA Landmarks - סימני דרך להנחיית ניווט בקוראי מסך',
    techItem3: 'HTML5 סמנטי - שימוש בתגיות מובנות למבנה ברור',
    techItem4: 'CSS Custom Properties - עיצוב מותאם הנתמך בהגדלת טקסט ומצב ניגודיות גבוהה',

    // 5. Report Issues
    reportTitle: '5. דיווח על בעיות נגישות',
    reportP1: 'אם נתקלת בבעיית נגישות בפלטפורמה, נשמח לשמוע ממך. אנא ספרי לנו:',
    reportItem1: 'תיאור הבעיה שנתקלת בה',
    reportItem2: 'העמוד או התכונה שבהם נתקלת בבעיה',
    reportItem3: 'הטכנולוגיה המסייעת בה השתמשת (אם רלוונטי)',
    reportItem4: 'סוג הדפדפן והמכשיר',
    reportP2: 'אנו מתחייבים להגיב לפניות נגישות תוך 5 ימי עסקים ולפעול לתיקון הבעיה בהקדם האפשרי.',

    // 6. Contact
    contactTitle: '6. יצירת קשר לנושאי נגישות',
    contactP1: 'לדיווח על בעיות נגישות, שאלות או הצעות לשיפור:',
    contactEmail: 'אימייל: revital@happybaby.co.il',
    contactWhatsApp: 'וואטסאפ: 054-776-7676',
    contactNote: 'ניתן גם לפנות אלינו בכל אחד מערוצי התקשורת המופיעים באתר.',

    // 7. Third-party
    thirdPartyTitle: '7. תוכן צד שלישי',
    thirdPartyP1: 'הפלטפורמה עשויה לכלול תוכן מצדדים שלישיים (כגון סרטוני YouTube מוטמעים או שירותי תשלום חיצוניים). תכנים אלה עשויים שלא לעמוד בכל תקני הנגישות, ואנו ממליצים לפנות אלינו אם נתקלת בבעיות בתוכן חיצוני.',
  },
  en: {
    title: 'Accessibility Statement',
    lastUpdated: 'Last updated: March 2026',
    backToHome: '← Back to Home',

    // 1. Commitment
    commitmentTitle: '1. Our Commitment to Accessibility',
    commitmentP1: 'Happy Baby is committed to making our Platform accessible to all users, including people with disabilities. We strive to conform to WCAG 2.1 Level AA (Web Content Accessibility Guidelines), and continuously work to improve the accessibility of our Platform.',
    commitmentP2: 'We believe every pregnant woman deserves equal access to the information, tools, and support that our Platform offers, regardless of physical or cognitive abilities.',

    // 2. Current Features
    featuresTitle: '2. Current Accessibility Features',
    featuresP1: 'Our Platform includes the following accessibility features:',

    featureRTLTitle: 'RTL Text Direction Support',
    featureRTLDesc: 'The Platform fully supports Hebrew with right-to-left (RTL) text direction, including seamless switching to English (LTR).',

    featureKeyboardTitle: 'Keyboard Navigation',
    featureKeyboardDesc: 'All main Platform functions are accessible via keyboard, including menu navigation, forms, and buttons.',

    featureSemanticTitle: 'Semantic HTML',
    featureSemanticDesc: 'The Platform is built with semantic HTML tags (headings, lists, forms, buttons) that provide clear structure for screen readers and assistive technologies.',

    featureResponsiveTitle: 'Responsive Design',
    featureResponsiveDesc: 'The Platform adapts to all screen sizes, from mobile devices to wide desktop monitors, and supports text enlargement up to 200% without content loss.',

    featureContrastTitle: 'High Contrast',
    featureContrastDesc: 'Text and background colors are chosen to meet minimum contrast ratios according to WCAG standards for maximum reading comfort.',

    featureScreenReaderTitle: 'Screen Reader Support',
    featureScreenReaderDesc: 'The Platform includes ARIA labels, image descriptions (alt text), and a logical structure that enable effective use of screen readers such as NVDA, JAWS, and VoiceOver.',

    // 3. Known Limitations
    limitationsTitle: '3. Known Limitations and Ongoing Improvements',
    limitationsP1: 'We acknowledge that not all parts of the Platform fully meet accessibility standards. Known limitations include:',
    limitationsItem1: 'Some video content still lacks Hebrew captions',
    limitationsItem2: 'The AI chat interface may require additional accessibility improvements',
    limitationsItem3: 'Some graphical charts may not be fully accessible to screen readers',
    limitationsP2: 'We are continuously working to address these limitations and improve the overall accessibility of the Platform.',

    // 4. Technologies
    techTitle: '4. Technologies Used',
    techP1: 'The Platform is built using the following accessibility-supporting technologies:',
    techItem1: 'React - UI library with built-in ARIA support',
    techItem2: 'ARIA Landmarks - navigation waypoints for screen reader guidance',
    techItem3: 'Semantic HTML5 - using native tags for clear document structure',
    techItem4: 'CSS Custom Properties - adaptable styling supporting text enlargement and high contrast mode',

    // 5. Report Issues
    reportTitle: '5. Reporting Accessibility Issues',
    reportP1: 'If you encounter an accessibility issue on the Platform, we would like to hear from you. Please tell us:',
    reportItem1: 'A description of the issue you encountered',
    reportItem2: 'The page or feature where you encountered the issue',
    reportItem3: 'The assistive technology you were using (if applicable)',
    reportItem4: 'Your browser type and device',
    reportP2: 'We commit to responding to accessibility inquiries within 5 business days and to resolving issues as quickly as possible.',

    // 6. Contact
    contactTitle: '6. Accessibility Contact',
    contactP1: 'To report accessibility issues, ask questions, or suggest improvements:',
    contactEmail: 'Email: revital@happybaby.co.il',
    contactWhatsApp: 'WhatsApp: 054-776-7676',
    contactNote: 'You may also reach us through any of the communication channels listed on the website.',

    // 7. Third-party
    thirdPartyTitle: '7. Third-Party Content',
    thirdPartyP1: 'The Platform may include third-party content (such as embedded YouTube videos or external payment services). This content may not meet all accessibility standards, and we recommend contacting us if you encounter issues with external content.',
  },
};

export default function AccessibilityPage() {
  const { isRTL } = useLanguage();
  const pt = usePageText(PAGE_TEXT);

  const sectionStyle = {
    marginBottom: 28,
  };

  const headingStyle = {
    fontSize: '1.1rem',
    fontWeight: 800,
    color: 'var(--color-sage-dark)',
    marginBottom: 12,
  };

  const paragraphStyle = {
    lineHeight: 1.9,
    color: 'var(--color-text)',
    fontSize: '0.95rem',
    marginBottom: 10,
  };

  const listStyle = {
    paddingInlineStart: 24,
    marginBottom: 10,
  };

  const listItemStyle = {
    lineHeight: 1.9,
    color: 'var(--color-text)',
    fontSize: '0.95rem',
    marginBottom: 4,
  };

  const featureCardStyle = {
    background: 'var(--color-sage-ultra)',
    borderRadius: 'var(--radius-md)',
    padding: '16px 20px',
    marginBottom: 12,
    border: '1px solid var(--color-border)',
  };

  const featureTitleStyle = {
    fontSize: '0.95rem',
    fontWeight: 700,
    color: 'var(--color-sage-dark)',
    marginBottom: 6,
  };

  const featureDescStyle = {
    fontSize: '0.9rem',
    lineHeight: 1.8,
    color: 'var(--color-text)',
    margin: 0,
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, var(--color-cream), var(--color-sage-ultra))',
      direction: isRTL ? 'rtl' : 'ltr',
      padding: '40px 24px',
    }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>

        {/* Header */}
        <div className="card" style={{ textAlign: 'center', marginBottom: 32, padding: '40px 32px' }}>
          <h1 style={{
            fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
            fontWeight: 900,
            marginBottom: 8,
            color: 'var(--color-sage-dark)',
          }}>
            {pt('title')}
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
            {pt('lastUpdated')}
          </p>
        </div>

        {/* Content */}
        <div className="card" style={{ marginBottom: 32, padding: '32px 28px' }}>

          {/* 1. Commitment */}
          <div style={sectionStyle}>
            <h2 style={headingStyle}>{pt('commitmentTitle')}</h2>
            <p style={paragraphStyle}>{pt('commitmentP1')}</p>
            <p style={paragraphStyle}>{pt('commitmentP2')}</p>
          </div>

          {/* 2. Current Features */}
          <div style={sectionStyle}>
            <h2 style={headingStyle}>{pt('featuresTitle')}</h2>
            <p style={paragraphStyle}>{pt('featuresP1')}</p>

            <div style={featureCardStyle}>
              <h3 style={featureTitleStyle}>{pt('featureRTLTitle')}</h3>
              <p style={featureDescStyle}>{pt('featureRTLDesc')}</p>
            </div>

            <div style={featureCardStyle}>
              <h3 style={featureTitleStyle}>{pt('featureKeyboardTitle')}</h3>
              <p style={featureDescStyle}>{pt('featureKeyboardDesc')}</p>
            </div>

            <div style={featureCardStyle}>
              <h3 style={featureTitleStyle}>{pt('featureSemanticTitle')}</h3>
              <p style={featureDescStyle}>{pt('featureSemanticDesc')}</p>
            </div>

            <div style={featureCardStyle}>
              <h3 style={featureTitleStyle}>{pt('featureResponsiveTitle')}</h3>
              <p style={featureDescStyle}>{pt('featureResponsiveDesc')}</p>
            </div>

            <div style={featureCardStyle}>
              <h3 style={featureTitleStyle}>{pt('featureContrastTitle')}</h3>
              <p style={featureDescStyle}>{pt('featureContrastDesc')}</p>
            </div>

            <div style={featureCardStyle}>
              <h3 style={featureTitleStyle}>{pt('featureScreenReaderTitle')}</h3>
              <p style={featureDescStyle}>{pt('featureScreenReaderDesc')}</p>
            </div>
          </div>

          {/* 3. Known Limitations */}
          <div style={sectionStyle}>
            <h2 style={headingStyle}>{pt('limitationsTitle')}</h2>
            <p style={paragraphStyle}>{pt('limitationsP1')}</p>
            <ul style={listStyle}>
              <li style={listItemStyle}>{pt('limitationsItem1')}</li>
              <li style={listItemStyle}>{pt('limitationsItem2')}</li>
              <li style={listItemStyle}>{pt('limitationsItem3')}</li>
            </ul>
            <p style={paragraphStyle}>{pt('limitationsP2')}</p>
          </div>

          {/* 4. Technologies */}
          <div style={sectionStyle}>
            <h2 style={headingStyle}>{pt('techTitle')}</h2>
            <p style={paragraphStyle}>{pt('techP1')}</p>
            <ul style={listStyle}>
              <li style={listItemStyle}>{pt('techItem1')}</li>
              <li style={listItemStyle}>{pt('techItem2')}</li>
              <li style={listItemStyle}>{pt('techItem3')}</li>
              <li style={listItemStyle}>{pt('techItem4')}</li>
            </ul>
          </div>

          {/* 5. Report Issues */}
          <div style={{
            ...sectionStyle,
            background: 'var(--color-sage-ultra)',
            borderRadius: 'var(--radius-md)',
            padding: '20px 24px',
            border: '1px solid var(--color-sage-light)',
          }}>
            <h2 style={headingStyle}>{pt('reportTitle')}</h2>
            <p style={paragraphStyle}>{pt('reportP1')}</p>
            <ul style={listStyle}>
              <li style={listItemStyle}>{pt('reportItem1')}</li>
              <li style={listItemStyle}>{pt('reportItem2')}</li>
              <li style={listItemStyle}>{pt('reportItem3')}</li>
              <li style={listItemStyle}>{pt('reportItem4')}</li>
            </ul>
            <p style={{ ...paragraphStyle, fontWeight: 600 }}>{pt('reportP2')}</p>
          </div>

          {/* 6. Contact */}
          <div style={sectionStyle}>
            <h2 style={headingStyle}>{pt('contactTitle')}</h2>
            <p style={paragraphStyle}>{pt('contactP1')}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
              <a
                href="mailto:revital@happybaby.co.il"
                style={{ color: 'var(--color-sage)', fontWeight: 600, fontSize: '0.95rem' }}
              >
                {pt('contactEmail')}
              </a>
              <a
                href="https://wa.me/972547767676"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--color-sage)', fontWeight: 600, fontSize: '0.95rem' }}
              >
                {pt('contactWhatsApp')}
              </a>
            </div>
            <p style={{ ...paragraphStyle, marginTop: 8, fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
              {pt('contactNote')}
            </p>
          </div>

          {/* 7. Third-party */}
          <div style={{ marginBottom: 0 }}>
            <h2 style={headingStyle}>{pt('thirdPartyTitle')}</h2>
            <p style={paragraphStyle}>{pt('thirdPartyP1')}</p>
          </div>
        </div>

        {/* Back Link */}
        <div style={{ textAlign: 'center' }}>
          <Link to="/" style={{ color: 'var(--color-sage-dark)', fontWeight: 600, fontSize: '0.875rem' }}>
            {pt('backToHome')}
          </Link>
        </div>
      </div>
    </div>
  );
}
