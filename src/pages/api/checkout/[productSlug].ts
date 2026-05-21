// POST /api/checkout/<slug> — creates a Stripe Checkout Session and 303-redirects.
//
// Env vars required: STRIPE_SECRET_KEY, plus the product's Price ID under
// the env key declared in its frontmatter (`stripePriceEnvKey`).
// If unconfigured, returns a friendly 503 instead of crashing.

import type { APIRoute } from 'astro';
import { getEntry } from 'astro:content';
import Stripe from 'stripe';

export const POST: APIRoute = async ({ params, url }) => {
  const productSlug = params.productSlug!;
  const entry = await getEntry('products', productSlug);
  if (!entry) return new Response('Product not found.', { status: 404 });

  const secret = import.meta.env.STRIPE_SECRET_KEY;
  if (!secret || secret === 'sk_test_xxx') {
    return new Response(
      'Stripe is not configured yet. Set STRIPE_SECRET_KEY in your environment.',
      { status: 503 },
    );
  }

  const priceEnvKey = entry.data.stripePriceEnvKey;
  // @ts-expect-error — dynamic env lookup
  const priceId = priceEnvKey ? import.meta.env[priceEnvKey] : undefined;
  if (!priceId || priceId === 'price_xxx') {
    return new Response(
      `No Stripe Price ID configured for this product. Set ${priceEnvKey} in env.`,
      { status: 503 },
    );
  }

  const stripe = new Stripe(secret);
  const origin = import.meta.env.PUBLIC_SITE_URL || url.origin;

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${origin}/thanks/${entry.slug}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/products/${entry.slug}/`,
    metadata: {
      productSlug: entry.slug,
      productTitle: entry.data.title,
    },
  });

  return Response.redirect(session.url!, 303);
};
