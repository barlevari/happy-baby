import { useSubscription } from '../context/SubscriptionContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { redirectToCheckout } from '../lib/stripe';

export default function Paywall({ feature, children }) {
  const { hasAccess, isPaymentEnabled } = useSubscription();
  const { user } = useAuth();
  const { isRTL } = useLanguage();

  // If payment is not enabled or user has access, render children
  if (!isPaymentEnabled || hasAccess(feature)) {
    return children;
  }

  const handleSubscribe = async () => {
    try {
      await redirectToCheckout({
        priceId: import.meta.env.VITE_STRIPE_PRICE_ID,
        userId: user.id,
        userEmail: user.email,
      });
    } catch (err) {
      console.error('Checkout error:', err);
    }
  };

  return (
    <div style={{
      textAlign: 'center',
      padding: '64px 32px',
      direction: isRTL ? 'rtl' : 'ltr',
    }}>
      <div style={{ fontSize: '4rem', marginBottom: 20 }}>🔒</div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--color-sage-dark)', marginBottom: 12 }}>
        {isRTL ? 'תוכן פרימיום' : 'Premium Content'}
      </h2>
      <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, maxWidth: 420, margin: '0 auto 28px', fontSize: '0.95rem' }}>
        {isRTL
          ? 'תוכן זה זמין למנויים בלבד. הירשמי למנוי כדי לקבל גישה מלאה לכל הסרטונים, המאמרים והכלים.'
          : 'This content is available to subscribers only. Subscribe to get full access to all videos, articles, and tools.'}
      </p>
      <button
        onClick={handleSubscribe}
        className="btn btn-primary"
        style={{ fontSize: '1.05rem', padding: '14px 36px' }}
      >
        {isRTL ? '✨ הרשמה למנוי' : '✨ Subscribe Now'}
      </button>
    </div>
  );
}
