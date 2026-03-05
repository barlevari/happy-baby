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
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({ error: 'Missing sessionId' });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return res.status(200).json({
      status: session.payment_status,       // 'paid' | 'unpaid' | 'no_payment_required'
      subscriptionId: session.subscription,
      customerId: session.customer,
      userId: session.metadata?.userId || session.client_reference_id,
    });
  } catch (error) {
    console.error('Verify checkout error:', error.message);
    return res.status(400).json({ error: error.message });
  }
}
