import { loadStripe } from '@stripe/stripe-js';

const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

// Stripe is optional — app works without payment when not configured
export const isStripeConfigured = !!stripePublicKey;

let stripePromise = null;

export function getStripe() {
  if (!isStripeConfigured) return null;
  if (!stripePromise) {
    stripePromise = loadStripe(stripePublicKey);
  }
  return stripePromise;
}

// Redirect to Stripe Checkout
// In production, the checkout session should be created on a backend (Supabase Edge Function)
// This is a client-side helper that calls your backend endpoint
export async function redirectToCheckout({ priceId, userId, userEmail, successUrl, cancelUrl }) {
  if (!isStripeConfigured) {
    console.warn('Stripe is not configured. Set VITE_STRIPE_PUBLIC_KEY.');
    return;
  }

  // Call your backend to create a checkout session
  const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      priceId,
      userId,
      userEmail,
      successUrl: successUrl || `${window.location.origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: cancelUrl || `${window.location.origin}/payment/cancel`,
    }),
  });

  const { sessionId, error } = await response.json();
  if (error) throw new Error(error);

  const stripe = await getStripe();
  const { error: stripeError } = await stripe.redirectToCheckout({ sessionId });
  if (stripeError) throw stripeError;
}
