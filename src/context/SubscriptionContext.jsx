import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { isStripeConfigured } from '../lib/stripe';

const SubscriptionContext = createContext(null);

export function SubscriptionProvider({ children }) {
  const { user, isSupabaseMode } = useAuth();
  const [subscription, setSubscription] = useState('none');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      setSubscription('none');
      return;
    }

    if (!isStripeConfigured || !isSupabaseMode) {
      // No payment system configured – grant full access
      setSubscription('active');
      return;
    }

    // Check subscription status from profile
    setSubscription(user.subscriptionStatus || 'none');
  }, [user, isSupabaseMode]);

  const hasAccess = useCallback((feature) => {
    // When Stripe is not configured, everything is accessible
    if (!isStripeConfigured) return true;

    // Admins always have access
    if (user?.role === 'admin') return true;

    // Active subscription = full access
    if (subscription === 'active') return true;

    // Free features (always accessible)
    const freeFeatures = ['dashboard', 'about', 'settings', 'chat'];
    if (freeFeatures.includes(feature)) return true;

    return false;
  }, [subscription, user]);

  return (
    <SubscriptionContext.Provider value={{
      subscription,
      loading,
      hasAccess,
      isPaymentEnabled: isStripeConfigured,
    }}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export const useSubscription = () => {
  const ctx = useContext(SubscriptionContext);
  if (!ctx) throw new Error('useSubscription must be used inside SubscriptionProvider');
  return ctx;
};
