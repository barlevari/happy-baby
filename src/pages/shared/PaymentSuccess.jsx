import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';

export default function PaymentSuccess() {
  const { user } = useAuth();
  const { isRTL } = useLanguage();
  const [searchParams] = useSearchParams();
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);

  const dashboardPath = user?.role === 'moms' ? '/moms' : user?.role === 'student' ? '/academy' : '/';

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (!sessionId) {
      setVerifying(false);
      setVerified(true); // No session ID = direct navigation, show success anyway
      return;
    }

    async function verifyPayment() {
      try {
        const res = await fetch('/api/verify-checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        });

        const data = await res.json();

        if (data.status === 'paid' && isSupabaseConfigured && user?.id) {
          // Update subscription status in database
          await supabase.from('profiles').update({
            subscription_status: 'active',
            stripe_customer_id: data.customerId || null,
            updated_at: new Date().toISOString(),
          }).eq('id', user.id);
        }

        setVerified(data.status === 'paid');
      } catch {
        setVerified(false);
      } finally {
        setVerifying(false);
      }
    }

    verifyPayment();
  }, [searchParams, user]);

  if (verifying) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(160deg, var(--color-cream) 0%, var(--color-sage-ultra) 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24, direction: isRTL ? 'rtl' : 'ltr',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>⏳</div>
          <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)' }}>
            {isRTL ? 'מאמתת את התשלום...' : 'Verifying payment...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, var(--color-cream) 0%, var(--color-sage-ultra) 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24, direction: isRTL ? 'rtl' : 'ltr',
    }}>
      <div style={{
        width: '100%', maxWidth: 480,
        background: 'var(--color-white)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-xl)',
        padding: '56px 40px',
        textAlign: 'center',
        border: '1px solid var(--color-border)',
      }}>
        <div style={{ fontSize: '4rem', marginBottom: 20 }}>{verified ? '🎉' : '⚠️'}</div>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 900, color: verified ? 'var(--color-sage-dark)' : 'var(--color-text)', marginBottom: 12 }}>
          {verified
            ? (isRTL ? 'התשלום בוצע בהצלחה!' : 'Payment Successful!')
            : (isRTL ? 'בעיה באימות התשלום' : 'Payment Verification Issue')}
        </h1>
        <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: 32, fontSize: '1rem' }}>
          {verified
            ? (isRTL
              ? 'המנוי שלך הופעל. כעת יש לך גישה מלאה לכל התכנים.'
              : 'Your subscription is now active. You have full access to all content.')
            : (isRTL
              ? 'לא הצלחנו לאמת את התשלום. אם חויבת, צרי קשר עם התמיכה.'
              : 'We could not verify your payment. If you were charged, please contact support.')}
        </p>
        <Link
          to={dashboardPath}
          className="btn btn-primary"
          style={{ display: 'inline-block', padding: '14px 40px', fontSize: '1rem', textDecoration: 'none' }}
        >
          {isRTL ? 'לדשבורד שלי →' : '← Go to Dashboard'}
        </Link>
      </div>
    </div>
  );
}
