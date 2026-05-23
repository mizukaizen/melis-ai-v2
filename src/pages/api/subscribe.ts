// POST /api/subscribe — adds a subscriber to BeeHiiv.
//
// Required env: BEEHIIV_API_KEY, BEEHIIV_PUBLICATION_ID.
// If either is missing, returns 503 — Sean populates them post-deploy.

import type { APIRoute } from 'astro';
import { z } from 'zod';

const Body = z.object({
  email: z.string().email(),
  utm_source: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_medium: z.string().optional(),
});

// Naive in-memory rate limit. Deferred to Redis once traffic justifies it.
const buckets = new Map<string, { count: number; resetAt: number }>();
const LIMIT = 10;
const WINDOW_MS = 60_000;

function rateLimited(ip: string) {
  const now = Date.now();
  const b = buckets.get(ip);
  if (!b || b.resetAt < now) {
    buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  b.count += 1;
  if (b.count > LIMIT) return true;
  return false;
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const apiKey = import.meta.env.BEEHIIV_API_KEY;
  const pubId = import.meta.env.BEEHIIV_PUBLICATION_ID;

  if (!apiKey || apiKey === 'xxx' || !pubId || pubId === 'pub_xxx') {
    return new Response('Newsletter not configured yet — env vars missing.', { status: 503 });
  }

  if (rateLimited(clientAddress || 'unknown')) {
    return new Response('Too many requests.', { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response('Invalid JSON.', { status: 400 });
  }
  const parsed = Body.safeParse(body);
  if (!parsed.success) {
    return new Response('Invalid email.', { status: 400 });
  }

  const { email, utm_source, utm_campaign, utm_medium } = parsed.data;

  const res = await fetch(`https://api.beehiiv.com/v2/publications/${pubId}/subscriptions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      reactivate_existing: true,
      send_welcome_email: true,
      utm_source: utm_source || 'melis-ai-website',
      utm_campaign: utm_campaign || 'organic',
      utm_medium: utm_medium || 'website',
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    return new Response(text || 'BeeHiiv error.', { status: res.status });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
