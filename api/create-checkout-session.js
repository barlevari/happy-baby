import Stripe from 'stripe';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    return res.status(500).json({ error: 'Stripe is not configured' });
  }

  const stripe = new Stripe(stripeSecretKey);

  try {
    const { priceId, userId, userEmail, successUrl, cancelUrl } = req.body;

    if (!priceId || !userEmail) {
      return res.status(400).json({ error: 'Missing required fields: priceId, userEmail' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      customer_email: userEmail,
      client_reference_id: userId || undefined,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl || `${req.headers.origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${req.headers.origin}/payment/cancel`,
      metadata: {
        userId: userId || '',
      },
    });

    return res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error('Stripe checkout error:', error.message);
    return res.status(400).json({ error: error.message });
  }
}
