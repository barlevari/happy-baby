import { Link } from 'react-router-dom';
import { useLanguage, usePageText } from '../../context/LanguageContext';

// ── Page-level translations ─────────────────────────────────
const PAGE_TEXT = {
  he: {
    title: 'מדיניות פרטיות',
    lastUpdated: 'עודכן לאחרונה: מרץ 2026',
    backToHome: '← חזרה לדף הבית',

    // 1. Introduction
    introTitle: '1. מבוא',
    introP1: 'Hapby Baby (להלן: "אנחנו", "שלנו" או "הפלטפורמה"), בבעלות רויטל לב ארי, מחויבת להגנה על פרטיותך. מדיניות פרטיות זו מסבירה כיצד אנו אוספים, משתמשים, מאחסנים ומגנים על המידע האישי שלך בעת השימוש בפלטפורמה.',
    introP2: 'השימוש בשירות מהווה הסכמה לאיסוף ולשימוש במידע כמתואר במדיניות זו.',

    // 2. Information Collected
    collectedTitle: '2. מידע שאנו אוספים',
    collectedP1: 'אנו אוספים את סוגי המידע הבאים:',
    collectedSub1: 'מידע אישי שנמסר בעת ההרשמה:',
    collectedItem1: 'שם מלא',
    collectedItem2: 'כתובת אימייל',
    collectedItem3: 'מספר טלפון (אופציונלי)',
    collectedSub2: 'מידע בריאותי שנמסר מרצון:',
    collectedItem4: 'תאריך לידה משוער ותאריכי הריון',
    collectedItem5: 'מדדים בריאותיים (משקל, לחץ דם וכו\') שהוזנו על ידך',
    collectedItem6: 'מידע הקשור להריון ולתזונה שהזנת באופן יזום',
    collectedSub3: 'מידע טכני:',
    collectedItem7: 'סוג דפדפן ומכשיר',
    collectedItem8: 'כתובת IP',
    collectedItem9: 'דפים שנצפו ופעילות בפלטפורמה',

    // 3. How We Use
    useTitle: '3. כיצד אנו משתמשים במידע',
    useP1: 'אנו משתמשים במידע שנאסף למטרות הבאות:',
    useItem1: 'אספקת השירות וניהול חשבונך',
    useItem2: 'התאמה אישית של תוכן בהתאם לשבוע ההריון שלך',
    useItem3: 'שליחת עדכונים, טיפים שבועיים ותזכורות (בהסכמתך)',
    useItem4: 'שיפור הפלטפורמה וחוויית המשתמש',
    useItem5: 'מענה לפניות ותמיכה טכנית',
    useItem6: 'ניתוח סטטיסטי ואנונימי לצורך שיפור השירות',

    // 4. Data Storage
    storageTitle: '4. אחסון מידע',
    storageP1: 'המידע שלך מאוחסן בשרתי Supabase, ספק שירותי ענן מאובטח. הנתונים מוצפנים הן בהעברה (TLS/SSL) והן באחסון.',
    storageP2: 'הפעילות העסקית שלנו מתנהלת מישראל, והמידע עשוי להישמר בשרתים בינלאומיים בהתאם לתשתית הענן של ספק השירות.',

    // 5. Data Sharing
    sharingTitle: '5. שיתוף מידע',
    sharingP1: 'אנו לא מוכרים, סוחרים או משכירים את המידע האישי שלך לצדדים שלישיים.',
    sharingP2: 'אנו עשויים לשתף מידע רק במקרים הבאים:',
    sharingItem1: 'עם ספקי שירות הפועלים מטעמנו (כגון שירותי אחסון ותשלום), הכפופים להסכמי סודיות',
    sharingItem2: 'כאשר נדרש על פי חוק, צו בית משפט או הליך משפטי',
    sharingItem3: 'להגנה על זכויותינו, רכושנו או בטיחות המשתמשים',

    // 6. Cookies
    cookiesTitle: '6. עוגיות וניתוח נתונים',
    cookiesP1: 'אנו משתמשים בכמות מינימלית של עוגיות (cookies) הנדרשות לתפקוד הפלטפורמה, כגון שמירת העדפות שפה ומצב התחברות.',
    cookiesP2: 'אנו משתמשים ב-Vercel Analytics לניתוח תנועה כללי. ניתוח זה הוא אנונימי ואינו עוקב אחר משתמשים ספציפיים.',

    // 7. User Rights
    rightsTitle: '7. זכויות המשתמשת',
    rightsP1: 'יש לך את הזכויות הבאות בנוגע למידע האישי שלך:',
    rightsItem1: 'גישה: לצפות במידע האישי שאספנו עלייך',
    rightsItem2: 'תיקון: לבקש תיקון מידע שגוי או לא מעודכן',
    rightsItem3: 'מחיקה: לבקש מחיקת המידע האישי שלך',
    rightsItem4: 'ייצוא: לבקש עותק של הנתונים שלך בפורמט קריא',
    rightsItem5: 'הסרת הסכמה: לבטל הסכמה לקבלת תקשורת שיווקית בכל עת',
    rightsP2: 'למימוש זכויות אלה, ניתן לפנות אלינו באמצעות פרטי הקשר המופיעים בתחתית מדיניות זו.',

    // 8. Children
    childrenTitle: '8. פרטיות קטינים',
    childrenP1: 'השירות אינו מיועד לשימוש על ידי קטינים מתחת לגיל 18. אנו לא אוספים ביודעין מידע אישי מקטינים. אם נודע לנו כי נאסף מידע מקטין, נמחק אותו בהקדם.',

    // 9. Retention
    retentionTitle: '9. שמירת מידע',
    retentionP1: 'אנו שומרים את המידע האישי שלך כל עוד חשבונך פעיל ונדרש לצורך מתן השירות.',
    retentionP2: 'לאחר מחיקת חשבונך, המידע האישי יימחק תוך 30 יום. מידע אנונימי וסטטיסטי עשוי להישמר לצורך שיפור השירות.',
    retentionP3: 'ניתן לבקש מחיקת חשבון ונתונים בכל עת באמצעות פנייה אלינו.',

    // 10. Security
    securityTitle: '10. אמצעי אבטחה',
    securityP1: 'אנו נוקטים באמצעי אבטחה מתקדמים להגנה על המידע שלך:',
    securityItem1: 'הצפנת נתונים בהעברה ובאחסון (TLS/SSL, AES-256)',
    securityItem2: 'אימות מאובטח באמצעות Supabase Auth',
    securityItem3: 'מדיניות Row Level Security (RLS) להגנה ברמת בסיס הנתונים',
    securityItem4: 'גישה מוגבלת למידע על בסיס צורך בלבד',
    securityItem5: 'ניטור ותיקוני אבטחה שוטפים',
    securityP2: 'למרות מאמצינו, שום שיטת העברה או אחסון אלקטרוני אינה מאובטחת ב-100%. אנו פועלים ללא הרף לשיפור אמצעי האבטחה.',

    // 11. Changes
    changesTitle: '11. שינויים במדיניות',
    changesP1: 'אנו עשויים לעדכן מדיניות פרטיות זו מעת לעת. שינויים מהותיים יפורסמו בפלטפורמה ויישלח עליהם עדכון. המשך השימוש לאחר העדכון מהווה הסכמה למדיניות המעודכנת.',

    // 12. Contact
    contactTitle: '12. יצירת קשר',
    contactP1: 'לשאלות, בקשות או הערות בנוגע למדיניות פרטיות זו או לטיפול במידע האישי שלך, ניתן לפנות אלינו:',
    contactEmail: 'אימייל: revital@happybaby.co.il',
    contactWhatsApp: 'וואטסאפ: 054-776-7676',
  },
  en: {
    title: 'Privacy Policy',
    lastUpdated: 'Last updated: March 2026',
    backToHome: '← Back to Home',

    // 1. Introduction
    introTitle: '1. Introduction',
    introP1: 'Hapby Baby (hereinafter: "we", "our", or "the Platform"), owned by Revital Lev Ari, is committed to protecting your privacy. This Privacy Policy explains how we collect, use, store, and protect your personal information when using the Platform.',
    introP2: 'By using the Service, you consent to the collection and use of information as described in this policy.',

    // 2. Information Collected
    collectedTitle: '2. Information We Collect',
    collectedP1: 'We collect the following types of information:',
    collectedSub1: 'Personal information provided during registration:',
    collectedItem1: 'Full name',
    collectedItem2: 'Email address',
    collectedItem3: 'Phone number (optional)',
    collectedSub2: 'Health information provided voluntarily:',
    collectedItem4: 'Estimated due date and pregnancy dates',
    collectedItem5: 'Health metrics (weight, blood pressure, etc.) entered by you',
    collectedItem6: 'Pregnancy and nutrition-related information entered proactively',
    collectedSub3: 'Technical information:',
    collectedItem7: 'Browser and device type',
    collectedItem8: 'IP address',
    collectedItem9: 'Pages viewed and activity on the Platform',

    // 3. How We Use
    useTitle: '3. How We Use Your Information',
    useP1: 'We use the collected information for the following purposes:',
    useItem1: 'Providing the Service and managing your account',
    useItem2: 'Personalizing content according to your pregnancy week',
    useItem3: 'Sending updates, weekly tips, and reminders (with your consent)',
    useItem4: 'Improving the Platform and user experience',
    useItem5: 'Responding to inquiries and providing technical support',
    useItem6: 'Anonymous statistical analysis to improve the Service',

    // 4. Data Storage
    storageTitle: '4. Data Storage',
    storageP1: 'Your information is stored on Supabase servers, a secure cloud service provider. Data is encrypted both in transit (TLS/SSL) and at rest.',
    storageP2: 'Our business operations are based in Israel, and data may be stored on international servers according to the cloud provider\'s infrastructure.',

    // 5. Data Sharing
    sharingTitle: '5. Data Sharing',
    sharingP1: 'We do NOT sell, trade, or rent your personal information to third parties.',
    sharingP2: 'We may share information only in the following cases:',
    sharingItem1: 'With service providers acting on our behalf (such as hosting and payment services), who are bound by confidentiality agreements',
    sharingItem2: 'When required by law, court order, or legal proceedings',
    sharingItem3: 'To protect our rights, property, or the safety of our users',

    // 6. Cookies
    cookiesTitle: '6. Cookies and Analytics',
    cookiesP1: 'We use a minimal amount of cookies required for the Platform\'s functionality, such as saving language preferences and login status.',
    cookiesP2: 'We use Vercel Analytics for general traffic analysis. This analysis is anonymous and does not track individual users.',

    // 7. User Rights
    rightsTitle: '7. Your Rights',
    rightsP1: 'You have the following rights regarding your personal information:',
    rightsItem1: 'Access: View the personal information we have collected about you',
    rightsItem2: 'Correction: Request correction of inaccurate or outdated information',
    rightsItem3: 'Deletion: Request deletion of your personal information',
    rightsItem4: 'Export: Request a copy of your data in a readable format',
    rightsItem5: 'Withdraw consent: Cancel consent to receive marketing communications at any time',
    rightsP2: 'To exercise these rights, please contact us using the contact details at the bottom of this policy.',

    // 8. Children
    childrenTitle: '8. Children\'s Privacy',
    childrenP1: 'The Service is not intended for use by minors under the age of 18. We do not knowingly collect personal information from minors. If we become aware that information has been collected from a minor, we will delete it promptly.',

    // 9. Retention
    retentionTitle: '9. Data Retention',
    retentionP1: 'We retain your personal information as long as your account is active and as needed to provide the Service.',
    retentionP2: 'After your account is deleted, personal information will be removed within 30 days. Anonymous and statistical data may be retained for Service improvement purposes.',
    retentionP3: 'You may request account and data deletion at any time by contacting us.',

    // 10. Security
    securityTitle: '10. Security Measures',
    securityP1: 'We employ advanced security measures to protect your information:',
    securityItem1: 'Data encryption in transit and at rest (TLS/SSL, AES-256)',
    securityItem2: 'Secure authentication via Supabase Auth',
    securityItem3: 'Row Level Security (RLS) policies for database-level protection',
    securityItem4: 'Restricted access to information on a need-to-know basis',
    securityItem5: 'Ongoing security monitoring and patches',
    securityP2: 'Despite our efforts, no method of electronic transmission or storage is 100% secure. We continuously work to improve our security measures.',

    // 11. Changes
    changesTitle: '11. Changes to This Policy',
    changesP1: 'We may update this Privacy Policy from time to time. Material changes will be published on the Platform and notified to users. Continued use after updates constitutes acceptance of the updated policy.',

    // 12. Contact
    contactTitle: '12. Contact Information',
    contactP1: 'For questions, requests, or comments regarding this Privacy Policy or the handling of your personal information, please contact us:',
    contactEmail: 'Email: revital@happybaby.co.il',
    contactWhatsApp: 'WhatsApp: 054-776-7676',
  },
};

export default function PrivacyPage() {
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

  const subHeadingStyle = {
    fontSize: '0.95rem',
    fontWeight: 700,
    color: 'var(--color-text)',
    marginBottom: 6,
    marginTop: 12,
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

          {/* 1. Introduction */}
          <div style={sectionStyle}>
            <h2 style={headingStyle}>{pt('introTitle')}</h2>
            <p style={paragraphStyle}>{pt('introP1')}</p>
            <p style={paragraphStyle}>{pt('introP2')}</p>
          </div>

          {/* 2. Information Collected */}
          <div style={sectionStyle}>
            <h2 style={headingStyle}>{pt('collectedTitle')}</h2>
            <p style={paragraphStyle}>{pt('collectedP1')}</p>

            <p style={subHeadingStyle}>{pt('collectedSub1')}</p>
            <ul style={listStyle}>
              <li style={listItemStyle}>{pt('collectedItem1')}</li>
              <li style={listItemStyle}>{pt('collectedItem2')}</li>
              <li style={listItemStyle}>{pt('collectedItem3')}</li>
            </ul>

            <p style={subHeadingStyle}>{pt('collectedSub2')}</p>
            <ul style={listStyle}>
              <li style={listItemStyle}>{pt('collectedItem4')}</li>
              <li style={listItemStyle}>{pt('collectedItem5')}</li>
              <li style={listItemStyle}>{pt('collectedItem6')}</li>
            </ul>

            <p style={subHeadingStyle}>{pt('collectedSub3')}</p>
            <ul style={listStyle}>
              <li style={listItemStyle}>{pt('collectedItem7')}</li>
              <li style={listItemStyle}>{pt('collectedItem8')}</li>
              <li style={listItemStyle}>{pt('collectedItem9')}</li>
            </ul>
          </div>

          {/* 3. How We Use */}
          <div style={sectionStyle}>
            <h2 style={headingStyle}>{pt('useTitle')}</h2>
            <p style={paragraphStyle}>{pt('useP1')}</p>
            <ul style={listStyle}>
              <li style={listItemStyle}>{pt('useItem1')}</li>
              <li style={listItemStyle}>{pt('useItem2')}</li>
              <li style={listItemStyle}>{pt('useItem3')}</li>
              <li style={listItemStyle}>{pt('useItem4')}</li>
              <li style={listItemStyle}>{pt('useItem5')}</li>
              <li style={listItemStyle}>{pt('useItem6')}</li>
            </ul>
          </div>

          {/* 4. Data Storage */}
          <div style={sectionStyle}>
            <h2 style={headingStyle}>{pt('storageTitle')}</h2>
            <p style={paragraphStyle}>{pt('storageP1')}</p>
            <p style={paragraphStyle}>{pt('storageP2')}</p>
          </div>

          {/* 5. Data Sharing */}
          <div style={{
            ...sectionStyle,
            background: 'var(--color-sage-ultra)',
            borderRadius: 'var(--radius-md)',
            padding: '20px 24px',
            border: '1px solid var(--color-sage-light)',
          }}>
            <h2 style={headingStyle}>{pt('sharingTitle')}</h2>
            <p style={{ ...paragraphStyle, fontWeight: 700, color: 'var(--color-sage-dark)' }}>{pt('sharingP1')}</p>
            <p style={paragraphStyle}>{pt('sharingP2')}</p>
            <ul style={listStyle}>
              <li style={listItemStyle}>{pt('sharingItem1')}</li>
              <li style={listItemStyle}>{pt('sharingItem2')}</li>
              <li style={listItemStyle}>{pt('sharingItem3')}</li>
            </ul>
          </div>

          {/* 6. Cookies */}
          <div style={sectionStyle}>
            <h2 style={headingStyle}>{pt('cookiesTitle')}</h2>
            <p style={paragraphStyle}>{pt('cookiesP1')}</p>
            <p style={paragraphStyle}>{pt('cookiesP2')}</p>
          </div>

          {/* 7. User Rights */}
          <div style={sectionStyle}>
            <h2 style={headingStyle}>{pt('rightsTitle')}</h2>
            <p style={paragraphStyle}>{pt('rightsP1')}</p>
            <ul style={listStyle}>
              <li style={listItemStyle}>{pt('rightsItem1')}</li>
              <li style={listItemStyle}>{pt('rightsItem2')}</li>
              <li style={listItemStyle}>{pt('rightsItem3')}</li>
              <li style={listItemStyle}>{pt('rightsItem4')}</li>
              <li style={listItemStyle}>{pt('rightsItem5')}</li>
            </ul>
            <p style={paragraphStyle}>{pt('rightsP2')}</p>
          </div>

          {/* 8. Children */}
          <div style={sectionStyle}>
            <h2 style={headingStyle}>{pt('childrenTitle')}</h2>
            <p style={paragraphStyle}>{pt('childrenP1')}</p>
          </div>

          {/* 9. Retention */}
          <div style={sectionStyle}>
            <h2 style={headingStyle}>{pt('retentionTitle')}</h2>
            <p style={paragraphStyle}>{pt('retentionP1')}</p>
            <p style={paragraphStyle}>{pt('retentionP2')}</p>
            <p style={paragraphStyle}>{pt('retentionP3')}</p>
          </div>

          {/* 10. Security */}
          <div style={sectionStyle}>
            <h2 style={headingStyle}>{pt('securityTitle')}</h2>
            <p style={paragraphStyle}>{pt('securityP1')}</p>
            <ul style={listStyle}>
              <li style={listItemStyle}>{pt('securityItem1')}</li>
              <li style={listItemStyle}>{pt('securityItem2')}</li>
              <li style={listItemStyle}>{pt('securityItem3')}</li>
              <li style={listItemStyle}>{pt('securityItem4')}</li>
              <li style={listItemStyle}>{pt('securityItem5')}</li>
            </ul>
            <p style={paragraphStyle}>{pt('securityP2')}</p>
          </div>

          {/* 11. Changes */}
          <div style={sectionStyle}>
            <h2 style={headingStyle}>{pt('changesTitle')}</h2>
            <p style={paragraphStyle}>{pt('changesP1')}</p>
          </div>

          {/* 12. Contact */}
          <div style={{ marginBottom: 0 }}>
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
