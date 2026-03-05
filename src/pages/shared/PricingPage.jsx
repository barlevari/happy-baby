import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage, usePageText } from '../../context/LanguageContext';

// ── Page-level translations ─────────────────────────────────
const PAGE_TEXT = {
  he: {
    // Header
    pageTitle: 'בחרי את המסלול שלך',
    pageSubtitle: 'הצטרפי לאלפי אמהות שכבר נהנות מליווי מקצועי לאורך ההריון והלידה',

    // Billing toggle
    monthly: 'חודשי',
    yearly: 'שנתי',
    saveBadge: 'חסכי 47%',

    // Free tier
    freeTitle: 'חינם',
    freeSubtitle: 'התחלה מושלמת למסע ההריון',
    freePrice: '₪0',
    freePeriod: 'לתמיד',
    freeCta: 'התחילי בחינם',
    freeFeature1: 'מעקב הריון בסיסי',
    freeFeature2: 'טיפים שבועיים',
    freeFeature3: 'גישה לקהילה',
    freeFeature4: 'סרטונים מוגבלים (3 בחודש)',
    freeFeature5: 'לוח בדיקות הריון',
    freeFeature6: 'מחשבון תאריך לידה',

    // Premium tier
    premiumTitle: 'פרימיום',
    premiumSubtitle: 'חוויית ליווי מלאה ומקיפה',
    premiumPriceMonthly: '₪79',
    premiumPriceYearly: '₪499',
    premiumPeriodMonthly: 'לחודש',
    premiumPeriodYearly: 'לשנה',
    premiumYearlySaving: 'במקום ₪948 — חסכון של ₪449!',
    premiumCta: 'שדרגי לפרימיום',
    premiumBadge: 'מומלץ',
    premiumFeatureIntro: 'הכל בחינם, ובנוסף:',
    premiumFeature1: 'ספריית סרטונים מלאה ללא הגבלה',
    premiumFeature2: 'תוכניות תזונה מותאמות אישית',
    premiumFeature3: 'הכנה מנטלית ללידה',
    premiumFeature4: "צ'אט AI אישי — שאלי כל שאלה 24/7",
    premiumFeature5: 'תמיכה בוואטסאפ בעדיפות גבוהה',
    premiumFeature6: 'גישה לאירועים ומפגשים קרובים',
    premiumFeature7: 'תכנים חדשים כל שבוע',

    // WhatsApp message
    whatsappMessage: 'היי רויטל! אשמח לשדרג למנוי פרימיום של Happy Baby 🌿',

    // Comparison section
    comparisonTitle: 'השוואת מסלולים',
    feature: 'תכונה',
    free: 'חינם',
    premium: 'פרימיום',
    compFeature1: 'מעקב הריון',
    compValue1Free: 'בסיסי',
    compValue1Premium: 'מתקדם',
    compFeature2: 'סרטוני הדרכה',
    compValue2Free: '3 בחודש',
    compValue2Premium: 'ללא הגבלה',
    compFeature3: 'קהילה',
    compFeature4: 'תוכניות תזונה',
    compFeature5: 'הכנה מנטלית',
    compFeature6: "צ'אט AI אישי",
    compFeature7: 'תמיכת וואטסאפ',
    compValue7Free: 'רגילה',
    compValue7Premium: 'עדיפות גבוהה',
    compFeature8: 'אירועים ומפגשים',

    // FAQ section
    faqTitle: 'שאלות נפוצות',
    faq1Q: 'איך מתבצע התשלום?',
    faq1A: 'התשלום מתבצע באופן מאובטח. ניתן לשלם בכרטיס אשראי או בהעברה בנקאית. לאחר הרשמה, תקבלי גישה מיידית לכל תכני הפרימיום.',
    faq2Q: 'האם אפשר לבטל בכל עת?',
    faq2A: 'בהחלט! אפשר לבטל את המנוי בכל רגע ללא התחייבות. המנוי יישאר פעיל עד סוף תקופת החיוב.',
    faq3Q: 'מה קורה כשהמנוי מסתיים?',
    faq3A: 'כשהמנוי מסתיים, תחזרי למסלול החינמי ותמשיכי ליהנות מהתכונות הבסיסיות. כל הנתונים שלך נשמרים.',
    faq4Q: 'האם יש תקופת ניסיון?',
    faq4A: 'המסלול החינמי הוא למעשה תקופת ניסיון ללא הגבלת זמן! את יכולה להשתמש בו כמה שתרצי ולשדרג כשמתחשק לך.',
    faq5Q: 'האם התכנים מתאימים לכל שלבי ההריון?',
    faq5A: 'בהחלט! התכנים מותאמים לכל שלב — מתחילת ההריון, דרך הלידה ועד תקופת הלידה. הכל מותאם אישית לפי השבוע שלך.',
    faq6Q: 'איך אפשר ליצור קשר לשאלות נוספות?',
    faq6A: 'אפשר לשלוח הודעה ברויטל בוואטסאפ בכל עת. אנחנו כאן בשבילך!',

    // Footer
    backToHome: 'חזרה לדף הבית',
    guarantee: 'אחריות שביעות רצון מלאה',
    guaranteeDesc: 'אם את לא מרוצה תוך 14 יום — החזר כספי מלא, ללא שאלות.',
  },
  en: {
    // Header
    pageTitle: 'Choose Your Plan',
    pageSubtitle: 'Join thousands of mothers already enjoying professional support throughout pregnancy and birth',

    // Billing toggle
    monthly: 'Monthly',
    yearly: 'Yearly',
    saveBadge: 'Save 47%',

    // Free tier
    freeTitle: 'Free',
    freeSubtitle: 'A perfect start to your pregnancy journey',
    freePrice: '₪0',
    freePeriod: 'Forever',
    freeCta: 'Get Started Free',
    freeFeature1: 'Basic pregnancy tracking',
    freeFeature2: 'Weekly tips',
    freeFeature3: 'Community access',
    freeFeature4: 'Limited videos (3 per month)',
    freeFeature5: 'Pregnancy test schedule',
    freeFeature6: 'Due date calculator',

    // Premium tier
    premiumTitle: 'Premium',
    premiumSubtitle: 'Complete and comprehensive support experience',
    premiumPriceMonthly: '₪79',
    premiumPriceYearly: '₪499',
    premiumPeriodMonthly: '/month',
    premiumPeriodYearly: '/year',
    premiumYearlySaving: 'Instead of ₪948 — Save ₪449!',
    premiumCta: 'Upgrade to Premium',
    premiumBadge: 'Recommended',
    premiumFeatureIntro: 'Everything in Free, plus:',
    premiumFeature1: 'Full video library — unlimited access',
    premiumFeature2: 'Personalized nutrition plans',
    premiumFeature3: 'Mental birth preparation',
    premiumFeature4: 'Personal AI chat — ask anything 24/7',
    premiumFeature5: 'Priority WhatsApp support',
    premiumFeature6: 'Access to upcoming events & meetups',
    premiumFeature7: 'New content every week',

    // WhatsApp message
    whatsappMessage: 'Hi Revital! I\'d like to upgrade to a Happy Baby Premium subscription 🌿',

    // Comparison section
    comparisonTitle: 'Plan Comparison',
    feature: 'Feature',
    free: 'Free',
    premium: 'Premium',
    compFeature1: 'Pregnancy tracking',
    compValue1Free: 'Basic',
    compValue1Premium: 'Advanced',
    compFeature2: 'Tutorial videos',
    compValue2Free: '3/month',
    compValue2Premium: 'Unlimited',
    compFeature3: 'Community',
    compFeature4: 'Nutrition plans',
    compFeature5: 'Mental preparation',
    compFeature6: 'Personal AI chat',
    compFeature7: 'WhatsApp support',
    compValue7Free: 'Standard',
    compValue7Premium: 'Priority',
    compFeature8: 'Events & meetups',

    // FAQ section
    faqTitle: 'Frequently Asked Questions',
    faq1Q: 'How does payment work?',
    faq1A: 'Payment is processed securely. You can pay by credit card or bank transfer. After signing up, you get immediate access to all Premium content.',
    faq2Q: 'Can I cancel anytime?',
    faq2A: 'Absolutely! You can cancel your subscription at any time with no commitment. Your subscription stays active until the end of the billing period.',
    faq3Q: 'What happens when the subscription ends?',
    faq3A: 'When your subscription ends, you return to the Free plan and continue enjoying the basic features. All your data is preserved.',
    faq4Q: 'Is there a free trial?',
    faq4A: 'The Free plan is essentially an unlimited trial! You can use it as long as you want and upgrade whenever you\'re ready.',
    faq5Q: 'Is the content suitable for all pregnancy stages?',
    faq5A: 'Absolutely! Content is tailored for every stage — from early pregnancy, through birth, and postpartum. Everything is personalized to your current week.',
    faq6Q: 'How can I reach out for more questions?',
    faq6A: 'You can message Revital on WhatsApp anytime. We\'re here for you!',

    // Footer
    backToHome: 'Back to Home',
    guarantee: 'Full Satisfaction Guarantee',
    guaranteeDesc: 'If you\'re not satisfied within 14 days — full refund, no questions asked.',
  },
};

export default function PricingPage() {
  const { isRTL } = useLanguage();
  const pt = usePageText(PAGE_TEXT);
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [openFaq, setOpenFaq] = useState(null);

  const whatsappUrl = `https://wa.me/972547767676?text=${encodeURIComponent(pt('whatsappMessage'))}`;

  const freeFeatures = [
    pt('freeFeature1'),
    pt('freeFeature2'),
    pt('freeFeature3'),
    pt('freeFeature4'),
    pt('freeFeature5'),
    pt('freeFeature6'),
  ];

  const premiumFeatures = [
    pt('premiumFeature1'),
    pt('premiumFeature2'),
    pt('premiumFeature3'),
    pt('premiumFeature4'),
    pt('premiumFeature5'),
    pt('premiumFeature6'),
    pt('premiumFeature7'),
  ];

  const comparisonRows = [
    { feature: pt('compFeature1'), free: pt('compValue1Free'), premium: pt('compValue1Premium') },
    { feature: pt('compFeature2'), free: pt('compValue2Free'), premium: pt('compValue2Premium') },
    { feature: pt('compFeature3'), free: true, premium: true },
    { feature: pt('compFeature4'), free: false, premium: true },
    { feature: pt('compFeature5'), free: false, premium: true },
    { feature: pt('compFeature6'), free: false, premium: true },
    { feature: pt('compFeature7'), free: pt('compValue7Free'), premium: pt('compValue7Premium') },
    { feature: pt('compFeature8'), free: false, premium: true },
  ];

  const faqs = [
    { q: pt('faq1Q'), a: pt('faq1A') },
    { q: pt('faq2Q'), a: pt('faq2A') },
    { q: pt('faq3Q'), a: pt('faq3A') },
    { q: pt('faq4Q'), a: pt('faq4A') },
    { q: pt('faq5Q'), a: pt('faq5A') },
    { q: pt('faq6Q'), a: pt('faq6A') },
  ];

  const CheckIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="10" cy="10" r="10" fill="var(--color-sage-ultra)" />
      <path d="M6 10.5L8.5 13L14 7.5" stroke="var(--color-sage-dark)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const PremiumCheckIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="10" cy="10" r="10" fill="var(--color-sage)" />
      <path d="M6 10.5L8.5 13L14 7.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const CrossIcon = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="9" cy="9" r="9" fill="var(--color-border)" />
      <path d="M6.5 6.5L11.5 11.5M11.5 6.5L6.5 11.5" stroke="var(--color-text-muted)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );

  const TableCheck = () => (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="11" r="11" fill="#E6F4EA" />
      <path d="M7 11.5L9.5 14L15 8.5" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const TableCross = () => (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="11" r="11" fill="#FDEAEA" />
      <path d="M8 8L14 14M14 8L8 14" stroke="var(--color-danger)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, var(--color-cream), var(--color-sage-ultra))',
      direction: isRTL ? 'rtl' : 'ltr',
      padding: '40px 24px 60px',
    }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>

        {/* ── Header ── */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1 style={{
            fontSize: 'clamp(1.8rem, 5vw, 2.6rem)',
            fontWeight: 900,
            color: 'var(--color-sage-dark)',
            marginBottom: 12,
            lineHeight: 1.2,
          }}>
            {pt('pageTitle')}
          </h1>
          <p style={{
            fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
            color: 'var(--color-text-muted)',
            maxWidth: 560,
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            {pt('pageSubtitle')}
          </p>
        </div>

        {/* ── Billing Toggle ── */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          marginBottom: 40,
        }}>
          <div style={{
            display: 'flex',
            background: 'var(--color-white)',
            borderRadius: 'var(--radius-full)',
            padding: 4,
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid var(--color-border)',
          }}>
            <button
              onClick={() => setBillingCycle('monthly')}
              style={{
                padding: '10px 24px',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                fontFamily: 'var(--font-family)',
                fontSize: 'var(--font-sm)',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all var(--transition-base)',
                background: billingCycle === 'monthly' ? 'var(--color-sage)' : 'transparent',
                color: billingCycle === 'monthly' ? 'var(--color-white)' : 'var(--color-text-muted)',
              }}
            >
              {pt('monthly')}
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              style={{
                padding: '10px 24px',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                fontFamily: 'var(--font-family)',
                fontSize: 'var(--font-sm)',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all var(--transition-base)',
                background: billingCycle === 'yearly' ? 'var(--color-sage)' : 'transparent',
                color: billingCycle === 'yearly' ? 'var(--color-white)' : 'var(--color-text-muted)',
              }}
            >
              {pt('yearly')}
            </button>
          </div>
          {billingCycle === 'yearly' && (
            <span style={{
              background: 'linear-gradient(135deg, var(--color-rose), var(--color-rose-dark))',
              color: 'white',
              padding: '4px 12px',
              borderRadius: 'var(--radius-full)',
              fontSize: 'var(--font-xs)',
              fontWeight: 800,
              whiteSpace: 'nowrap',
            }}>
              {pt('saveBadge')}
            </span>
          )}
        </div>

        {/* ── Pricing Cards ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 24,
          marginBottom: 56,
          alignItems: 'start',
        }}>

          {/* Free Card */}
          <div style={{
            background: 'var(--color-white)',
            borderRadius: 'var(--radius-xl)',
            border: '2px solid var(--color-border)',
            padding: '36px 28px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: 'var(--shadow-sm)',
            transition: 'all var(--transition-base)',
          }}>
            <div style={{ marginBottom: 24 }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 'var(--radius-md)',
                background: 'var(--color-sage-ultra)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                marginBottom: 16,
              }}>
                🌱
              </div>
              <h2 style={{
                fontSize: '1.4rem',
                fontWeight: 900,
                color: 'var(--color-text)',
                marginBottom: 6,
              }}>
                {pt('freeTitle')}
              </h2>
              <p style={{
                fontSize: 'var(--font-sm)',
                color: 'var(--color-text-muted)',
                lineHeight: 1.5,
              }}>
                {pt('freeSubtitle')}
              </p>
            </div>

            <div style={{ marginBottom: 28 }}>
              <span style={{
                fontSize: '2.8rem',
                fontWeight: 900,
                color: 'var(--color-text)',
                lineHeight: 1,
              }}>
                {pt('freePrice')}
              </span>
              <span style={{
                fontSize: 'var(--font-sm)',
                color: 'var(--color-text-muted)',
                fontWeight: 500,
                marginInlineStart: 8,
              }}>
                {pt('freePeriod')}
              </span>
            </div>

            <Link
              to="/register"
              className="btn btn-secondary"
              style={{
                width: '100%',
                padding: '14px 24px',
                fontSize: 'var(--font-base)',
                fontWeight: 700,
                justifyContent: 'center',
                marginBottom: 28,
                textDecoration: 'none',
              }}
            >
              {pt('freeCta')}
            </Link>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {freeFeatures.map((feat, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <CheckIcon />
                  <span style={{
                    fontSize: 'var(--font-sm)',
                    color: 'var(--color-text)',
                    fontWeight: 500,
                    lineHeight: 1.4,
                  }}>
                    {feat}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Premium Card */}
          <div style={{
            background: 'var(--color-white)',
            borderRadius: 'var(--radius-xl)',
            border: '2px solid var(--color-sage)',
            padding: '36px 28px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: 'var(--shadow-lg)',
            position: 'relative',
            transform: 'scale(1.02)',
            transition: 'all var(--transition-base)',
          }}>
            {/* Recommended badge */}
            <div style={{
              position: 'absolute',
              top: -14,
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(135deg, var(--color-sage), var(--color-sage-dark))',
              color: 'white',
              padding: '6px 24px',
              borderRadius: 'var(--radius-full)',
              fontSize: 'var(--font-xs)',
              fontWeight: 800,
              letterSpacing: '0.03em',
              boxShadow: 'var(--shadow-md)',
              whiteSpace: 'nowrap',
            }}>
              {pt('premiumBadge')}
            </div>

            <div style={{ marginBottom: 24 }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 'var(--radius-md)',
                background: 'linear-gradient(135deg, var(--color-sage-ultra), var(--color-sage-light))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                marginBottom: 16,
              }}>
                👑
              </div>
              <h2 style={{
                fontSize: '1.4rem',
                fontWeight: 900,
                color: 'var(--color-sage-dark)',
                marginBottom: 6,
              }}>
                {pt('premiumTitle')}
              </h2>
              <p style={{
                fontSize: 'var(--font-sm)',
                color: 'var(--color-text-muted)',
                lineHeight: 1.5,
              }}>
                {pt('premiumSubtitle')}
              </p>
            </div>

            <div style={{ marginBottom: 8 }}>
              <span style={{
                fontSize: '2.8rem',
                fontWeight: 900,
                color: 'var(--color-sage-dark)',
                lineHeight: 1,
              }}>
                {billingCycle === 'monthly' ? pt('premiumPriceMonthly') : pt('premiumPriceYearly')}
              </span>
              <span style={{
                fontSize: 'var(--font-sm)',
                color: 'var(--color-text-muted)',
                fontWeight: 500,
                marginInlineStart: 8,
              }}>
                {billingCycle === 'monthly' ? pt('premiumPeriodMonthly') : pt('premiumPeriodYearly')}
              </span>
            </div>
            {billingCycle === 'yearly' && (
              <p style={{
                fontSize: 'var(--font-xs)',
                color: 'var(--color-rose-dark)',
                fontWeight: 700,
                marginBottom: 20,
              }}>
                {pt('premiumYearlySaving')}
              </p>
            )}
            {billingCycle === 'monthly' && <div style={{ marginBottom: 20 }} />}

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              style={{
                width: '100%',
                padding: '14px 24px',
                fontSize: 'var(--font-base)',
                fontWeight: 700,
                justifyContent: 'center',
                marginBottom: 28,
                textDecoration: 'none',
                background: 'linear-gradient(135deg, var(--color-sage), var(--color-sage-dark))',
                color: 'white',
                border: '2px solid var(--color-sage)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              {pt('premiumCta')}
            </a>

            <p style={{
              fontSize: 'var(--font-xs)',
              fontWeight: 700,
              color: 'var(--color-sage-dark)',
              marginBottom: 14,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}>
              {pt('premiumFeatureIntro')}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {premiumFeatures.map((feat, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <PremiumCheckIcon />
                  <span style={{
                    fontSize: 'var(--font-sm)',
                    color: 'var(--color-text)',
                    fontWeight: 500,
                    lineHeight: 1.4,
                  }}>
                    {feat}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Guarantee Banner ── */}
        <div style={{
          background: 'linear-gradient(135deg, var(--color-sage-ultra), var(--color-rose-light))',
          borderRadius: 'var(--radius-xl)',
          padding: '28px 32px',
          textAlign: 'center',
          marginBottom: 56,
          border: '1px solid var(--color-border)',
        }}>
          <div style={{ fontSize: '2rem', marginBottom: 8 }}>🛡️</div>
          <h3 style={{
            fontSize: '1.1rem',
            fontWeight: 800,
            color: 'var(--color-sage-dark)',
            marginBottom: 8,
          }}>
            {pt('guarantee')}
          </h3>
          <p style={{
            fontSize: 'var(--font-sm)',
            color: 'var(--color-text-muted)',
            lineHeight: 1.7,
            maxWidth: 480,
            margin: '0 auto',
          }}>
            {pt('guaranteeDesc')}
          </p>
        </div>

        {/* ── Comparison Table ── */}
        <div style={{ marginBottom: 56 }}>
          <h2 style={{
            fontSize: 'clamp(1.3rem, 3.5vw, 1.6rem)',
            fontWeight: 900,
            color: 'var(--color-sage-dark)',
            textAlign: 'center',
            marginBottom: 28,
          }}>
            {pt('comparisonTitle')}
          </h2>
          <div style={{
            background: 'var(--color-white)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)',
            overflow: 'hidden',
          }}>
            {/* Table Header */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 100px 100px',
              padding: '16px 24px',
              background: 'var(--color-sage-ultra)',
              borderBottom: '2px solid var(--color-border)',
              fontWeight: 800,
              fontSize: 'var(--font-sm)',
              color: 'var(--color-sage-dark)',
            }}>
              <span>{pt('feature')}</span>
              <span style={{ textAlign: 'center' }}>{pt('free')}</span>
              <span style={{ textAlign: 'center' }}>{pt('premium')}</span>
            </div>
            {/* Table Rows */}
            {comparisonRows.map((row, i) => (
              <div key={i} style={{
                display: 'grid',
                gridTemplateColumns: '1fr 100px 100px',
                padding: '14px 24px',
                borderBottom: i < comparisonRows.length - 1 ? '1px solid var(--color-border)' : 'none',
                alignItems: 'center',
                fontSize: 'var(--font-sm)',
                transition: 'background var(--transition-fast)',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--color-sage-ultra)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <span style={{ fontWeight: 600, color: 'var(--color-text)' }}>{row.feature}</span>
                <span style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  {row.free === true ? <TableCheck /> :
                   row.free === false ? <TableCross /> :
                   <span style={{ fontSize: 'var(--font-xs)', fontWeight: 600, color: 'var(--color-text-muted)' }}>{row.free}</span>}
                </span>
                <span style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  {row.premium === true ? <TableCheck /> :
                   row.premium === false ? <TableCross /> :
                   <span style={{ fontSize: 'var(--font-xs)', fontWeight: 700, color: 'var(--color-sage-dark)' }}>{row.premium}</span>}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── FAQ Section ── */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{
            fontSize: 'clamp(1.3rem, 3.5vw, 1.6rem)',
            fontWeight: 900,
            color: 'var(--color-sage-dark)',
            textAlign: 'center',
            marginBottom: 28,
          }}>
            {pt('faqTitle')}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 720, margin: '0 auto' }}>
            {faqs.map((faq, i) => (
              <div
                key={i}
                style={{
                  background: 'var(--color-white)',
                  borderRadius: 'var(--radius-lg)',
                  border: `1.5px solid ${openFaq === i ? 'var(--color-sage-light)' : 'var(--color-border)'}`,
                  overflow: 'hidden',
                  transition: 'border-color var(--transition-base)',
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '18px 24px',
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-family)',
                    fontSize: 'var(--font-sm)',
                    fontWeight: 700,
                    color: openFaq === i ? 'var(--color-sage-dark)' : 'var(--color-text)',
                    textAlign: isRTL ? 'right' : 'left',
                    gap: 16,
                    transition: 'color var(--transition-fast)',
                  }}
                >
                  <span>{faq.q}</span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    style={{
                      flexShrink: 0,
                      transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform var(--transition-base)',
                    }}
                  >
                    <path
                      d="M5 7.5L10 12.5L15 7.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <div
                  style={{
                    maxHeight: openFaq === i ? 200 : 0,
                    opacity: openFaq === i ? 1 : 0,
                    overflow: 'hidden',
                    transition: 'max-height var(--transition-slow), opacity var(--transition-base)',
                  }}
                >
                  <p style={{
                    padding: '0 24px 18px',
                    fontSize: 'var(--font-sm)',
                    color: 'var(--color-text-muted)',
                    lineHeight: 1.8,
                  }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Back Link ── */}
        <div style={{ textAlign: 'center' }}>
          <Link to="/" style={{
            color: 'var(--color-sage-dark)',
            fontWeight: 600,
            fontSize: 'var(--font-sm)',
          }}>
            {isRTL ? `${pt('backToHome')} ←` : `← ${pt('backToHome')}`}
          </Link>
        </div>
      </div>
    </div>
  );
}
