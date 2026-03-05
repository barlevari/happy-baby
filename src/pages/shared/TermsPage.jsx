import { Link } from 'react-router-dom';
import { useLanguage, usePageText } from '../../context/LanguageContext';

// ── Page-level translations ─────────────────────────────────
const PAGE_TEXT = {
  he: {
    title: 'תנאי שימוש',
    lastUpdated: 'עודכן לאחרונה: מרץ 2026',
    backToHome: '← חזרה לדף הבית',

    // 1. Introduction
    introTitle: '1. מבוא',
    introP1: 'ברוכים הבאים ל-Happy Baby (להלן: "השירות", "הפלטפורמה" או "האפליקציה"), בבעלות והפעלת רויטל לב ארי (להלן: "אנחנו", "שלנו" או "החברה").',
    introP2: 'השימוש בפלטפורמה מהווה הסכמה לתנאי שימוש אלה. אם אינך מסכימה לתנאים, אנא הימנעי משימוש בשירות. המשך השימוש בפלטפורמה לאחר עדכון תנאי השימוש מהווה הסכמה לתנאים המעודכנים.',

    // 2. Service Description
    serviceTitle: '2. תיאור השירות',
    serviceP1: 'Happy Baby היא פלטפורמה דיגיטלית המספקת:',
    serviceItem1: 'מעקב הריון שבועי ומידע על התפתחות העובר',
    serviceItem2: 'תוכן חינוכי בנושאי הריון, לידה, תזונה והכנה מנטלית',
    serviceItem3: 'צ\'אט AI חכם למענה על שאלות בנושאי הריון ולידה',
    serviceItem4: 'ספריית סרטונים וחומרי לימוד',
    serviceItem5: 'כלי תרגול והכנה ללידה',
    serviceItem6: 'אקדמיה מקצועית למטפלים ומלוות לידה',
    serviceP2: 'השירות מיועד למטרות מידע חינוכי בלבד ואינו מהווה תחליף לייעוץ רפואי מקצועי.',

    // 3. User Accounts
    accountsTitle: '3. חשבון משתמשת',
    accountsP1: 'כדי לגשת לתכנים מסוימים בפלטפורמה, נדרשת הרשמה ויצירת חשבון. בעת ההרשמה את מתחייבת:',
    accountsItem1: 'לספק מידע מדויק, עדכני ומלא',
    accountsItem2: 'לעדכן את פרטי החשבון בהתאם לשינויים',
    accountsItem3: 'לשמור על סודיות הסיסמה ופרטי הגישה',
    accountsItem4: 'להודיע לנו מיידית על כל שימוש לא מורשה בחשבונך',
    accountsP2: 'את אחראית לכל הפעילות המתבצעת תחת חשבונך. אנו שומרים את הזכות להשעות או לסגור חשבונות שמפרים את תנאי השימוש.',

    // 4. Content & IP
    contentTitle: '4. תוכן וקניין רוחני',
    contentP1: 'כל התכנים בפלטפורמה, לרבות טקסטים, תמונות, סרטונים, עיצובים, לוגואים, וחומרי לימוד, הם קניינה הרוחני של Happy Baby ורויטל לב ארי, ומוגנים על ידי חוקי זכויות יוצרים.',
    contentP2: 'השימוש בתכנים מותר למטרות אישיות ולא מסחריות בלבד. אין להעתיק, לשכפל, להפיץ, לשדר, להציג בפומבי, לערוך, להתאים, או ליצור יצירות נגזרות מתכני הפלטפורמה ללא הסכמה מראש ובכתב.',
    contentP3: 'שיתוף חומרים מהפלטפורמה עם צדדים שלישיים, לרבות צילומי מסך או העתקת תכנים, אסור בהחלט.',

    // 5. Medical Disclaimer
    medicalTitle: '5. הצהרה רפואית',
    medicalP1: 'השירות אינו מספק ייעוץ רפואי. כל המידע והתוכן בפלטפורמה נועדו למטרות חינוכיות ומידע כללי בלבד.',
    medicalP2: 'Happy Baby אינו תחליף לייעוץ, אבחון או טיפול רפואי מקצועי. תמיד יש לפנות לרופא/ה, מיילדת או איש/ת מקצוע רפואי מוסמך/ת לקבלת ייעוץ בנוגע למצבך הרפואי.',
    medicalP3: 'צ\'אט ה-AI מספק מידע כללי בלבד ואינו מהווה תחליף לייעוץ רפואי. אין לקבל החלטות רפואיות על סמך מידע שהתקבל מהצ\'אט.',
    medicalP4: 'במקרה חירום רפואי, יש לפנות מיידית לשירותי החירום או לבית החולים הקרוב.',

    // 6. User Responsibilities
    responsibilitiesTitle: '6. אחריות המשתמשת',
    responsibilitiesP1: 'בעת השימוש בפלטפורמה, את מתחייבת:',
    responsibilitiesItem1: 'להזין נתוני בריאות מדויקים ועדכניים (תאריכי הריון, מדדים גופניים וכו\')',
    responsibilitiesItem2: 'להשתמש בשירות למטרות חוקיות ומתאימות בלבד',
    responsibilitiesItem3: 'לא להעלות תוכן פוגעני, מזויף או מטעה',
    responsibilitiesItem4: 'לא לנסות לגשת למערכות או לנתונים שאינם מיועדים לך',
    responsibilitiesItem5: 'לא להשתמש בשירות באופן שעלול לפגוע בתפקודו או בחוויית המשתמשות האחרות',

    // 7. Privacy
    privacyTitle: '7. פרטיות',
    privacyP1: 'השימוש בפלטפורמה כפוף גם למדיניות הפרטיות שלנו, המפרטת כיצד אנו אוספים, משתמשים ומגנים על המידע שלך.',
    privacyLink: 'לצפייה במדיניות הפרטיות המלאה',

    // 8. Modifications
    modificationsTitle: '8. שינויים בשירות',
    modificationsP1: 'אנו שומרים את הזכות לעדכן, לשנות או להפסיק את השירות (או חלקים ממנו) בכל עת, עם או ללא הודעה מוקדמת. לא נישא באחריות כלפיך או כלפי צד שלישי בגין שינוי, השעיה או הפסקת השירות.',
    modificationsP2: 'אנו עשויים לעדכן תנאי שימוש אלה מעת לעת. שינויים מהותיים יפורסמו בפלטפורמה, והמשך השימוש לאחר העדכון מהווה הסכמה לתנאים החדשים.',

    // 9. Limitation of Liability
    liabilityTitle: '9. הגבלת אחריות',
    liabilityP1: 'השירות ניתן "כפי שהוא" (AS IS) ו-"כפי שזמין" (AS AVAILABLE). אנו אינם מתחייבים שהשירות יהיה רציף, מאובטח, או נקי משגיאות.',
    liabilityP2: 'במידה המרבית המותרת על פי חוק, Happy Baby, רויטל לב ארי, ועובדיהן לא יישאו באחריות לכל נזק ישיר, עקיף, מקרי, מיוחד או תוצאתי הנובע מהשימוש בשירות או מאי היכולת להשתמש בו.',
    liabilityP3: 'הגבלת אחריות זו חלה במידה המרבית המותרת על פי הדין הישראלי.',

    // 10. Contact
    contactTitle: '10. יצירת קשר',
    contactP1: 'לשאלות, הערות או בקשות בנוגע לתנאי שימוש אלה, ניתן לפנות אלינו:',
    contactEmail: 'אימייל: revital@happybaby.co.il',
    contactWhatsApp: 'וואטסאפ: 054-776-7676',
  },
  en: {
    title: 'Terms of Use',
    lastUpdated: 'Last updated: March 2026',
    backToHome: '← Back to Home',

    // 1. Introduction
    introTitle: '1. Introduction',
    introP1: 'Welcome to Happy Baby (hereinafter: "the Service", "the Platform", or "the App"), owned and operated by Revital Lev Ari (hereinafter: "we", "our", or "the Company").',
    introP2: 'By using the Platform, you agree to these Terms of Use. If you do not agree to these terms, please refrain from using the Service. Continued use of the Platform after updates to the Terms of Use constitutes acceptance of the updated terms.',

    // 2. Service Description
    serviceTitle: '2. Service Description',
    serviceP1: 'Happy Baby is a digital platform that provides:',
    serviceItem1: 'Weekly pregnancy tracking and fetal development information',
    serviceItem2: 'Educational content on pregnancy, birth, nutrition, and mental preparation',
    serviceItem3: 'A smart AI chat for answering pregnancy and birth-related questions',
    serviceItem4: 'A video library and learning materials',
    serviceItem5: 'Birth preparation practice tools',
    serviceItem6: 'A professional academy for practitioners and birth companions',
    serviceP2: 'The Service is intended for educational and informational purposes only and does not constitute a substitute for professional medical advice.',

    // 3. User Accounts
    accountsTitle: '3. User Accounts',
    accountsP1: 'To access certain content on the Platform, registration and account creation is required. When registering, you agree to:',
    accountsItem1: 'Provide accurate, current, and complete information',
    accountsItem2: 'Update your account details as changes occur',
    accountsItem3: 'Maintain the confidentiality of your password and login credentials',
    accountsItem4: 'Notify us immediately of any unauthorized use of your account',
    accountsP2: 'You are responsible for all activity that occurs under your account. We reserve the right to suspend or terminate accounts that violate these Terms of Use.',

    // 4. Content & IP
    contentTitle: '4. Content and Intellectual Property',
    contentP1: 'All content on the Platform, including texts, images, videos, designs, logos, and educational materials, is the intellectual property of Happy Baby and Revital Lev Ari, and is protected by copyright laws.',
    contentP2: 'Use of the content is permitted for personal, non-commercial purposes only. You may not copy, reproduce, distribute, transmit, publicly display, edit, adapt, or create derivative works from the Platform\'s content without prior written consent.',
    contentP3: 'Sharing materials from the Platform with third parties, including screenshots or copying of content, is strictly prohibited.',

    // 5. Medical Disclaimer
    medicalTitle: '5. Medical Disclaimer',
    medicalP1: 'The Service does not provide medical advice. All information and content on the Platform is intended for educational and general informational purposes only.',
    medicalP2: 'Happy Baby is NOT a substitute for professional medical advice, diagnosis, or treatment. Always consult your doctor, midwife, or qualified healthcare professional for advice regarding your medical condition.',
    medicalP3: 'The AI chat provides general information only and does not constitute a substitute for medical advice. Do not make medical decisions based on information received from the chat.',
    medicalP4: 'In case of a medical emergency, contact emergency services or go to the nearest hospital immediately.',

    // 6. User Responsibilities
    responsibilitiesTitle: '6. User Responsibilities',
    responsibilitiesP1: 'When using the Platform, you agree to:',
    responsibilitiesItem1: 'Enter accurate and up-to-date health data (pregnancy dates, physical measurements, etc.)',
    responsibilitiesItem2: 'Use the Service for lawful and appropriate purposes only',
    responsibilitiesItem3: 'Not upload offensive, fraudulent, or misleading content',
    responsibilitiesItem4: 'Not attempt to access systems or data not intended for you',
    responsibilitiesItem5: 'Not use the Service in a way that may harm its functionality or other users\' experience',

    // 7. Privacy
    privacyTitle: '7. Privacy',
    privacyP1: 'Use of the Platform is also subject to our Privacy Policy, which details how we collect, use, and protect your information.',
    privacyLink: 'View our full Privacy Policy',

    // 8. Modifications
    modificationsTitle: '8. Modifications to the Service',
    modificationsP1: 'We reserve the right to update, modify, or discontinue the Service (or parts thereof) at any time, with or without prior notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuation of the Service.',
    modificationsP2: 'We may update these Terms of Use from time to time. Material changes will be published on the Platform, and continued use after the update constitutes acceptance of the new terms.',

    // 9. Limitation of Liability
    liabilityTitle: '9. Limitation of Liability',
    liabilityP1: 'The Service is provided "AS IS" and "AS AVAILABLE". We do not guarantee that the Service will be continuous, secure, or error-free.',
    liabilityP2: 'To the maximum extent permitted by law, Happy Baby, Revital Lev Ari, and their employees shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from the use of, or inability to use, the Service.',
    liabilityP3: 'This limitation of liability applies to the maximum extent permitted under Israeli law.',

    // 10. Contact
    contactTitle: '10. Contact Information',
    contactP1: 'For questions, comments, or requests regarding these Terms of Use, please contact us:',
    contactEmail: 'Email: revital@happybaby.co.il',
    contactWhatsApp: 'WhatsApp: 054-776-7676',
  },
};

export default function TermsPage() {
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

          {/* 2. Service Description */}
          <div style={sectionStyle}>
            <h2 style={headingStyle}>{pt('serviceTitle')}</h2>
            <p style={paragraphStyle}>{pt('serviceP1')}</p>
            <ul style={listStyle}>
              <li style={listItemStyle}>{pt('serviceItem1')}</li>
              <li style={listItemStyle}>{pt('serviceItem2')}</li>
              <li style={listItemStyle}>{pt('serviceItem3')}</li>
              <li style={listItemStyle}>{pt('serviceItem4')}</li>
              <li style={listItemStyle}>{pt('serviceItem5')}</li>
              <li style={listItemStyle}>{pt('serviceItem6')}</li>
            </ul>
            <p style={paragraphStyle}>{pt('serviceP2')}</p>
          </div>

          {/* 3. User Accounts */}
          <div style={sectionStyle}>
            <h2 style={headingStyle}>{pt('accountsTitle')}</h2>
            <p style={paragraphStyle}>{pt('accountsP1')}</p>
            <ul style={listStyle}>
              <li style={listItemStyle}>{pt('accountsItem1')}</li>
              <li style={listItemStyle}>{pt('accountsItem2')}</li>
              <li style={listItemStyle}>{pt('accountsItem3')}</li>
              <li style={listItemStyle}>{pt('accountsItem4')}</li>
            </ul>
            <p style={paragraphStyle}>{pt('accountsP2')}</p>
          </div>

          {/* 4. Content & IP */}
          <div style={sectionStyle}>
            <h2 style={headingStyle}>{pt('contentTitle')}</h2>
            <p style={paragraphStyle}>{pt('contentP1')}</p>
            <p style={paragraphStyle}>{pt('contentP2')}</p>
            <p style={paragraphStyle}>{pt('contentP3')}</p>
          </div>

          {/* 5. Medical Disclaimer */}
          <div style={{
            ...sectionStyle,
            background: 'var(--color-sage-ultra)',
            borderRadius: 'var(--radius-md)',
            padding: '20px 24px',
            border: '1px solid var(--color-sage-light)',
          }}>
            <h2 style={headingStyle}>{pt('medicalTitle')}</h2>
            <p style={{ ...paragraphStyle, fontWeight: 600 }}>{pt('medicalP1')}</p>
            <p style={{ ...paragraphStyle, fontWeight: 700, color: 'var(--color-sage-dark)' }}>{pt('medicalP2')}</p>
            <p style={paragraphStyle}>{pt('medicalP3')}</p>
            <p style={paragraphStyle}>{pt('medicalP4')}</p>
          </div>

          {/* 6. User Responsibilities */}
          <div style={sectionStyle}>
            <h2 style={headingStyle}>{pt('responsibilitiesTitle')}</h2>
            <p style={paragraphStyle}>{pt('responsibilitiesP1')}</p>
            <ul style={listStyle}>
              <li style={listItemStyle}>{pt('responsibilitiesItem1')}</li>
              <li style={listItemStyle}>{pt('responsibilitiesItem2')}</li>
              <li style={listItemStyle}>{pt('responsibilitiesItem3')}</li>
              <li style={listItemStyle}>{pt('responsibilitiesItem4')}</li>
              <li style={listItemStyle}>{pt('responsibilitiesItem5')}</li>
            </ul>
          </div>

          {/* 7. Privacy */}
          <div style={sectionStyle}>
            <h2 style={headingStyle}>{pt('privacyTitle')}</h2>
            <p style={paragraphStyle}>{pt('privacyP1')}</p>
            <Link
              to="/privacy"
              style={{
                color: 'var(--color-sage)',
                fontWeight: 700,
                fontSize: '0.95rem',
                textDecoration: 'underline',
              }}
            >
              {pt('privacyLink')}
            </Link>
          </div>

          {/* 8. Modifications */}
          <div style={sectionStyle}>
            <h2 style={headingStyle}>{pt('modificationsTitle')}</h2>
            <p style={paragraphStyle}>{pt('modificationsP1')}</p>
            <p style={paragraphStyle}>{pt('modificationsP2')}</p>
          </div>

          {/* 9. Limitation of Liability */}
          <div style={sectionStyle}>
            <h2 style={headingStyle}>{pt('liabilityTitle')}</h2>
            <p style={paragraphStyle}>{pt('liabilityP1')}</p>
            <p style={paragraphStyle}>{pt('liabilityP2')}</p>
            <p style={paragraphStyle}>{pt('liabilityP3')}</p>
          </div>

          {/* 10. Contact */}
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
