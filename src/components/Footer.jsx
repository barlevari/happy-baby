import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

const FOOTER_TEXT = {
  he: {
    brandDesc: 'ליווי הריון ולידה מקצועי, עם כלים דיגיטליים מתקדמים ותמיכה אישית לאורך כל המסע.',
    servicesTitle: 'שירותים',
    weeklyTracking: 'מעקב הריון שבועי',
    nutritionGuide: 'מדריך תזונה להריון',
    mentalPrep: 'הכנה מנטלית ללידה',
    videoLibrary: 'ספריית סרטונים',
    aiChat: 'צ\'אט AI חכם',
    academy: 'אקדמיה',
    academyTitle: 'אקדמיית Hapby Baby',
    professionalCourse: 'קורס מקצועי',
    practiceTools: 'כלי תרגול',
    eventsCommunity: 'אירועים וקהילה',
    digitalLibrary: 'ספרייה דיגיטלית',
    supportTitle: 'תמיכה',
    contactUs: 'צרי קשר',
    aboutUs: 'אודות',
    termsOfUse: 'תנאי שימוש',
    privacyPolicy: 'מדיניות פרטיות',
    accessibility: 'נגישות',
    faq: 'שאלות נפוצות',
    contactTitle: 'יצירת קשר',
    phone: '054-776-7676',
    email: 'revital@happybaby.co.il',
    whatsapp: 'WhatsApp',
    instagram: 'Instagram',
    contactWriteMessage: 'כתבי לנו באתר',
    contactWhatsApp: 'שלחי הודעה בוואטסאפ',
    contactEmail: 'שלחי מייל',
    copyright: `\u00A9 ${new Date().getFullYear()} Hapby Baby. כל הזכויות שמורות.`,
    madeWith: 'נבנה באהבה עבור אמהות וילדים',
  },
  en: {
    brandDesc: 'Professional pregnancy and birth support, with advanced digital tools and personal guidance throughout the journey.',
    servicesTitle: 'Services',
    weeklyTracking: 'Weekly Pregnancy Tracking',
    nutritionGuide: 'Pregnancy Nutrition Guide',
    mentalPrep: 'Mental Birth Preparation',
    videoLibrary: 'Video Library',
    aiChat: 'Smart AI Chat',
    academy: 'Academy',
    academyTitle: 'Hapby Baby Academy',
    professionalCourse: 'Professional Course',
    practiceTools: 'Practice Tools',
    eventsCommunity: 'Events & Community',
    digitalLibrary: 'Digital Library',
    supportTitle: 'Support',
    contactUs: 'Contact Us',
    aboutUs: 'About Us',
    termsOfUse: 'Terms of Use',
    privacyPolicy: 'Privacy Policy',
    accessibility: 'Accessibility',
    faq: 'FAQ',
    contactTitle: 'Contact',
    phone: '054-776-7676',
    email: 'revital@happybaby.co.il',
    whatsapp: 'WhatsApp',
    instagram: 'Instagram',
    contactWriteMessage: 'Write us on the site',
    contactWhatsApp: 'Message us on WhatsApp',
    contactEmail: 'Send us an email',
    copyright: `\u00A9 ${new Date().getFullYear()} Hapby Baby. All rights reserved.`,
    madeWith: 'Built with love for mothers and children',
  },
};

const footerHeadingStyle = {
  fontSize: '1rem',
  fontWeight: 800,
  color: 'white',
  marginBottom: 18,
  letterSpacing: '0.1em',
  paddingBottom: 10,
  borderBottom: '2px solid rgba(255,255,255,0.25)',
  display: 'inline-block',
};

const footerLinkStyle = {
  color: 'rgba(255,255,255,0.7)',
  textDecoration: 'none',
  fontSize: '0.85rem',
  transition: 'color 0.2s',
};

const contactItemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  color: 'rgba(255,255,255,0.85)',
  textDecoration: 'none',
  fontSize: '0.85rem',
  transition: 'color 0.2s, background 0.2s',
  padding: '6px 10px',
  borderRadius: 8,
  background: 'rgba(255,255,255,0.06)',
};

export default function Footer() {
  const { lang, isRTL } = useLanguage();
  const { user } = useAuth();
  const t = FOOTER_TEXT[lang] || FOOTER_TEXT.he;

  // Determine base path for links based on user role
  const momsBase = user?.role === 'moms' ? '/moms' : '/register?role=moms';
  const academyBase = user?.role === 'student' ? '/academy' : '/register?role=student';

  return (
    <footer style={{
      background: 'var(--color-sage-dark)',
      color: 'rgba(255,255,255,0.85)',
      direction: isRTL ? 'rtl' : 'ltr',
      marginTop: 48,
    }}>
      {/* Main footer content */}
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: '48px 24px 32px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '40px 32px',
      }}>
        {/* Brand Column */}
        <div style={{ maxWidth: 280 }}>
          <div style={{
            fontSize: '1.5rem',
            fontWeight: 800,
            color: 'white',
            marginBottom: 16,
            lineHeight: 1.2,
          }}>
            hapby baby
          </div>
          <p style={{ fontSize: '0.85rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.7)', margin: 0 }}>
            {t.brandDesc}
          </p>
          {/* Social icons */}
          <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
            <a
              href="https://wa.me/972547767676"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                color: 'white', textDecoration: 'none', fontSize: '1.1rem',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#25D366'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
              title={t.whatsapp}
            >
              💬
            </a>
            <a
              href="https://instagram.com/happybaby"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                color: 'white', textDecoration: 'none', fontSize: '1.1rem',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#E4405F'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
              title={t.instagram}
            >
              📸
            </a>
            <a
              href="tel:+972547767676"
              style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                color: 'white', textDecoration: 'none', fontSize: '1.1rem',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--color-sage)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
              title={t.phone}
            >
              📞
            </a>
          </div>
        </div>

        {/* Services Column */}
        <div>
          <h4 style={footerHeadingStyle}>
            ✨ {t.servicesTitle}
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { label: t.weeklyTracking, to: momsBase },
              { label: t.nutritionGuide, to: user?.role === 'moms' ? '/moms/nutrition' : momsBase },
              { label: t.mentalPrep, to: user?.role === 'moms' ? '/moms/mental' : momsBase },
              { label: t.videoLibrary, to: user?.role === 'moms' ? '/moms/videos' : momsBase },
              { label: t.aiChat, to: user ? '/chat' : '/login' },
            ].map((item, i) => (
              <li key={i}>
                <Link to={item.to} style={footerLinkStyle}
                onMouseEnter={e => e.currentTarget.style.color = 'white'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Academy Column */}
        <div>
          <h4 style={footerHeadingStyle}>
            🎓 {t.academyTitle}
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { label: t.professionalCourse, to: academyBase },
              { label: t.practiceTools, to: user?.role === 'student' ? '/academy/practice' : academyBase },
              { label: t.eventsCommunity, to: user?.role === 'student' ? '/academy/events' : academyBase },
              { label: t.digitalLibrary, to: user?.role === 'student' ? '/academy/library' : academyBase },
            ].map((item, i) => (
              <li key={i}>
                <Link to={item.to} style={footerLinkStyle}
                onMouseEnter={e => e.currentTarget.style.color = 'white'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support & Contact Column */}
        <div>
          <h4 style={footerHeadingStyle}>
            💛 {t.supportTitle}
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <li>
              <Link to="/about" style={footerLinkStyle}
              onMouseEnter={e => e.currentTarget.style.color = 'white'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
              >
                {t.aboutUs}
              </Link>
            </li>
            <li>
              <Link to="/faq" style={footerLinkStyle}
              onMouseEnter={e => e.currentTarget.style.color = 'white'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
              >
                {t.faq}
              </Link>
            </li>
            <li>
              <Link to="/terms" style={footerLinkStyle}
              onMouseEnter={e => e.currentTarget.style.color = 'white'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
              >
                {t.termsOfUse}
              </Link>
            </li>
            <li>
              <Link to="/privacy" style={footerLinkStyle}
              onMouseEnter={e => e.currentTarget.style.color = 'white'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
              >
                {t.privacyPolicy}
              </Link>
            </li>
            <li>
              <Link to="/accessibility" style={footerLinkStyle}
              onMouseEnter={e => e.currentTarget.style.color = 'white'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
              >
                {t.accessibility}
              </Link>
            </li>
          </ul>

          {/* Contact Us - multiple options */}
          <div style={{
            marginTop: 20,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}>
            <div style={{
              fontSize: '0.8rem',
              fontWeight: 700,
              color: 'rgba(255,255,255,0.9)',
              marginBottom: 4,
              letterSpacing: '0.05em',
            }}>
              {t.contactTitle}
            </div>
            <Link
              to="/contact"
              style={contactItemStyle}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'white'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; }}
            >
              <span style={{ fontSize: '1rem' }}>💬</span>
              {t.contactWriteMessage}
            </Link>
            <a
              href="https://wa.me/972547767676"
              target="_blank"
              rel="noopener noreferrer"
              style={contactItemStyle}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(37,211,102,0.2)'; e.currentTarget.style.color = 'white'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; }}
            >
              <span style={{ fontSize: '1rem' }}>📱</span>
              {t.contactWhatsApp}
            </a>
            <a
              href="mailto:revital@happybaby.co.il"
              style={contactItemStyle}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'white'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; }}
            >
              <span style={{ fontSize: '1rem' }}>✉️</span>
              {t.contactEmail}
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.15)',
        padding: '20px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 12,
        maxWidth: 1100,
        margin: '0 auto',
      }}>
        <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
          {t.copyright}
        </span>
        <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.65)', fontWeight: 500 }}>
          💜 {t.madeWith}
        </span>
      </div>
    </footer>
  );
}
