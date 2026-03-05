import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

export default function PaymentSuccess() {
  const { user } = useAuth();
  const { isRTL } = useLanguage();

  const dashboardPath = user?.role === 'moms' ? '/moms' : user?.role === 'student' ? '/academy' : '/';

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
        <div style={{ fontSize: '4rem', marginBottom: 20 }}>🎉</div>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--color-sage-dark)', marginBottom: 12 }}>
          {isRTL ? 'התשלום בוצע בהצלחה!' : 'Payment Successful!'}
        </h1>
        <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: 32, fontSize: '1rem' }}>
          {isRTL
            ? 'המנוי שלך הופעל. כעת יש לך גישה מלאה לכל התכנים.'
            : 'Your subscription is now active. You have full access to all content.'}
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
