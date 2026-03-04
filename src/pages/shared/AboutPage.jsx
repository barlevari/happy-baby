import { Link } from 'react-router-dom';
import { useLanguage, usePageText } from '../../context/LanguageContext';

// ── Page-level translations ─────────────────────────────────
const PAGE_TEXT = {
  he: {
    // Credentials
    cred1Title: 'רפואה סינית לילדים ותינוקות',
    cred1Desc: 'מומחית ברפואה סינית המיוחדת לתינוקות, ילדים, הריון ולידה — תחום ייחודי ונדיר.',
    cred2Title: '35+ שנות ניסיון קליני',
    cred2Desc: 'ניסיון קליני עשיר של למעלה מ-35 שנה בליווי נשים, תינוקות ומשפחות.',
    cred3Title: 'גישה הוליסטית ומחברת',
    cred3Desc: 'שיטת Happy Baby מאחדת רפואה סינית, מדע מודרני ואינטואיציה הורית ליצירת שגרה בריאה.',

    // Specialties
    spec1: 'רפואה סינית לתינוקות וילדים',
    spec2: 'ליווי הריון ולידה ברפואה סינית',
    spec3: 'טיפול בבעיות שינה אצל תינוקות',
    spec4: 'תמיכה בהנקה ותזונת תינוקות',
    spec5: 'הכנה ללידה והתאוששות לאחריה',
    spec6: 'טיפול בקוליק, גזים ואי-נוחות',

    // Hero
    imgAlt: 'רויטל לב ארי',
    heroName: 'רויטל לב ארי',
    heroTitle: 'מייסדת Happy Baby | מומחית ברפואה סינית לתינוקות, ילדים, הריון ולידה',
    heroIntro: 'נעים מאוד! אני רויטל לב ארי, נשואה לשחר ואמא לבר ואביב. מקדישה חיים ללימודי רפואה סינית ולממשק הייחודי של רפואה סינית לתינוקות, ילדים, הריון ולידה — תחום ייחודי ונדיר שאני גאה להיות בין המובילות בו בארץ.',

    // Story section
    storyTitle: '🌱 הסיפור שלי',
    storyP1: 'הדרך שלי לרפואה סינית התחילה מתוך סקרנות ואהבה עמוקה לרפואה הוליסטית. לאחר שנים של לימוד ופרקטיקה, התמחיתי בתחום שגיליתי שהוא הלב שלי — ליווי אמהות בהריון, לידה, ותקופת הגדילה של התינוקות.',
    storyP2: 'ניסיון קליני של למעלה מ-35 שנה לימד אותי שכל אמא, כל תינוק וכל משפחה הם עולם ומלואו. שיטת Happy Baby נולדה מתוך הרצון לתת לכל אמא — ולכל מי שמלווה אמהות — את הכלים, הידע והביטחון שהם צריכים.',
    storyP3: 'Happy Baby היא לא רק שיטה — זו פילוסופיה של ליווי חם, מקצועי ומבוסס ניסיון שמאמינה בכל אמא ובכל תינוק.',

    // Specialties section
    specialtiesTitle: '✨ תחומי התמחות',

    // Contact section
    contactTitle: '📬 בואו נתחבר',
    whatsapp: '💬 וואטסאפ',

    // Back link
    backToHome: '← חזרה לדף הבית',
  },
  en: {
    // Credentials
    cred1Title: 'Chinese Medicine for Children & Infants',
    cred1Desc: 'Specialist in Chinese medicine for infants, children, pregnancy, and birth — a unique and rare field.',
    cred2Title: '35+ Years of Clinical Experience',
    cred2Desc: 'Over 35 years of rich clinical experience supporting women, infants, and families.',
    cred3Title: 'Holistic & Integrative Approach',
    cred3Desc: 'The Happy Baby method unites Chinese medicine, modern science, and parental intuition to create a healthy routine.',

    // Specialties
    spec1: 'Chinese medicine for infants and children',
    spec2: 'Pregnancy and birth support with Chinese medicine',
    spec3: 'Treating infant sleep issues',
    spec4: 'Breastfeeding and infant nutrition support',
    spec5: 'Birth preparation and postpartum recovery',
    spec6: 'Treating colic, gas, and discomfort',

    // Hero
    imgAlt: 'Roital Lev Ari',
    heroName: 'Roital Lev Ari',
    heroTitle: 'Founder of Happy Baby | Chinese Medicine Specialist for Infants, Children, Pregnancy & Birth',
    heroIntro: 'Nice to meet you! I\'m Roital Lev Ari, married to Shachar and mother to Bar and Aviv. I\'ve dedicated my life to studying Chinese medicine and the unique intersection of Chinese medicine for infants, children, pregnancy, and birth — a unique and rare field that I\'m proud to be among the leaders of in Israel.',

    // Story section
    storyTitle: '🌱 My Story',
    storyP1: 'My journey to Chinese medicine began with curiosity and a deep love for holistic medicine. After years of study and practice, I specialized in the field I discovered was my heart\'s calling — supporting mothers through pregnancy, birth, and their babies\' growth.',
    storyP2: 'Over 35 years of clinical experience taught me that every mother, every baby, and every family is a world of their own. The Happy Baby method was born from the desire to give every mother — and everyone who supports mothers — the tools, knowledge, and confidence they need.',
    storyP3: 'Happy Baby is not just a method — it\'s a philosophy of warm, professional, experience-based care that believes in every mother and every baby.',

    // Specialties section
    specialtiesTitle: '✨ Areas of Expertise',

    // Contact section
    contactTitle: '📬 Let\'s Connect',
    whatsapp: '💬 WhatsApp',

    // Back link
    backToHome: '← Back to Home',
  },
};

export default function AboutPage() {
  const pt = usePageText(PAGE_TEXT);
  const { isRTL } = useLanguage();

  const CREDENTIALS = [
    {
      emoji: '🏥',
      title: pt('cred1Title'),
      desc: pt('cred1Desc'),
    },
    {
      emoji: '⏳',
      title: pt('cred2Title'),
      desc: pt('cred2Desc'),
    },
    {
      emoji: '🌿',
      title: pt('cred3Title'),
      desc: pt('cred3Desc'),
    },
  ];

  const SPECIALTIES = [
    pt('spec1'),
    pt('spec2'),
    pt('spec3'),
    pt('spec4'),
    pt('spec5'),
    pt('spec6'),
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, var(--color-cream), var(--color-sage-ultra))',
      direction: isRTL ? 'rtl' : 'ltr',
      padding: '40px 24px',
    }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>

        {/* Hero - Roital's profile */}
        <div className="card" style={{ textAlign: 'center', marginBottom: 32, padding: '40px 32px' }}>
          <div style={{
            width: 140,
            height: 140,
            borderRadius: '50%',
            overflow: 'hidden',
            margin: '0 auto 20px',
            boxShadow: 'var(--shadow-lg)',
            border: '4px solid var(--color-sage-light)',
          }}>
            <img
              src="/roital.jpg"
              alt={pt('imgAlt')}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={e => {
                e.target.style.display = 'none';
                e.target.parentElement.style.background = 'linear-gradient(135deg, var(--color-sage), var(--color-sage-dark))';
                e.target.parentElement.style.display = 'flex';
                e.target.parentElement.style.alignItems = 'center';
                e.target.parentElement.style.justifyContent = 'center';
                e.target.parentElement.style.fontSize = '4rem';
                e.target.parentElement.innerHTML = '<img src="/happy-baby-logo.png" style="width:80%;height:80%;object-fit:contain;mix-blend-mode:multiply" alt="happy baby"/>';
              }}
            />
          </div>
          <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 900, marginBottom: 8, color: 'var(--color-sage-dark)' }}>
            {pt('heroName')}
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--color-sage)', fontWeight: 700, marginBottom: 20 }}>
            {pt('heroTitle')}
          </p>
          <p style={{ lineHeight: 1.9, color: 'var(--color-text)', fontSize: '0.97rem', maxWidth: 620, margin: '0 auto' }}>
            {pt('heroIntro')}
          </p>
        </div>

        {/* Credentials cards */}
        <div className="grid-3" style={{ marginBottom: 32 }}>
          {CREDENTIALS.map((c, i) => (
            <div className="card" key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>{c.emoji}</div>
              <h3 style={{ fontWeight: 800, marginBottom: 8, fontSize: '1rem' }}>{c.title}</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', lineHeight: 1.7 }}>{c.desc}</p>
            </div>
          ))}
        </div>

        {/* About story */}
        <div className="card" style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: 16, color: 'var(--color-sage-dark)' }}>
            {pt('storyTitle')}
          </h2>
          <p style={{ lineHeight: 1.9, color: 'var(--color-text)', fontSize: '0.95rem', marginBottom: 14 }}>
            {pt('storyP1')}
          </p>
          <p style={{ lineHeight: 1.9, color: 'var(--color-text)', fontSize: '0.95rem', marginBottom: 14 }}>
            {pt('storyP2')}
          </p>
          <p style={{ lineHeight: 1.9, color: 'var(--color-text)', fontSize: '0.95rem' }}>
            {pt('storyP3')}
          </p>
        </div>

        {/* Specialties */}
        <div className="card" style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: 16, color: 'var(--color-sage-dark)' }}>
            {pt('specialtiesTitle')}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
            {SPECIALTIES.map((s, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 14px',
                background: 'var(--color-sage-ultra)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'var(--color-sage-dark)',
              }}>
                <span style={{ color: 'var(--color-sage)', flexShrink: 0 }}>✓</span>
                {s}
              </div>
            ))}
          </div>
        </div>

        {/* Contact & Social */}
        <div className="card" style={{ marginBottom: 32, textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: 20, color: 'var(--color-text)' }}>
            {pt('contactTitle')}
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
            <a
              href="https://wa.me/972522218646?text=היי%20רויטל%2C%20אשמח%20לקבל%20מידע%20נוסף%20על%20Happy%20Baby"
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              style={{ background: '#25D366', color: 'white', border: 'none', display: 'inline-flex', gap: 8, alignItems: 'center' }}
            >
              {pt('whatsapp')}
            </a>
            <a
              href="https://www.instagram.com/pikpikit/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
              style={{ display: 'inline-flex', gap: 8, alignItems: 'center', border: '2px solid #E1306C', color: '#E1306C' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="ig-grad" cx="30%" cy="107%" r="150%">
                    <stop offset="0%" stopColor="#fdf497"/>
                    <stop offset="5%" stopColor="#fdf497"/>
                    <stop offset="45%" stopColor="#fd5949"/>
                    <stop offset="60%" stopColor="#d6249f"/>
                    <stop offset="90%" stopColor="#285AEB"/>
                  </radialGradient>
                </defs>
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="url(#ig-grad)"/>
                <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="1.8" fill="none"/>
                <circle cx="17.5" cy="6.5" r="1.2" fill="white"/>
              </svg>
              @pikpikit
            </a>
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
