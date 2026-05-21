// POST /api/webhooks/stripe — receives Stripe webhook events.
//
// Expected event: `checkout.session.completed`. On success, logs the
// order to data/orders.jsonl (deferred to DB later) and sends a
// post-purchase email via Resend.
//
// Configure the endpoint in Stripe dashboard once the preview URL is up.

import type { APIRoute } from 'astro';
import Stripe from 'stripe';
import { sendPostPurchaseEmail } from '../../../lib/email';
import { appendFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

export const POST: APIRoute = async ({ request }) => {
  const secret = import.meta.env.STRIPE_SECRET_KEY;
  const whSecret = import.meta.env.STRIPE_WEBHOOK_SECRET;

  if (!secret || !whSecret || secret === 'sk_test_xxx' || whSecret === 'whsec_xxx') {
    return new Response('Stripe webhook not configured.', { status: 503 });
  }

  const sig = request.headers.get('stripe-signature');
  if (!sig) return new Response('No signature.', { status: 400 });

  const body = await request.text();
  const stripe = new Stripe(secret);
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, whSecret);
  } catch (err) {
    return new Response(`Webhook signature verification failed: ${(err as Error).message}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const productSlug = session.metadata?.productSlug;
    const customerEmail = session.customer_details?.email;

    // Append to JSONL log (idempotent on session.id via downstream dedupe if needed)
    const logPath = resolve(process.cwd(), 'data', 'orders.jsonl');
    try {
      await mkdir(dirname(logPath), { recursive: true });
      await appendFile(
        logPath,
        JSON.stringify({
          sessionId: session.id,
          productSlug,
          customerEmail,
          amountTotal: session.amount_total,
          currency: session.currency,
          createdAt: new Date().toISOString(),
        }) + '\n',
      );
    } catch (err) {
      // Filesystem write may fail in serverless — degrade gracefully
      console.warn('Order log write failed:', (err as Error).message);
    }

    if (customerEmail && productSlug) {
      try {
        await sendPostPurchaseEmail({
          to: customerEmail,
          productSlug,
          sessionId: session.id,
        });
      } catch (err) {
        console.warn('Post-purchase email failed:', (err as Error).message);
      }
    }
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
};
