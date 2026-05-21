// POST /api/lead — receives service inquiry forms, forwards to Sean via Resend.

import type { APIRoute } from 'astro';
import { z } from 'zod';
import { sendLeadEmail } from '../../lib/email';

const Body = z.object({
  service: z.string().min(1).max(200),
  name: z.string().min(1).max(200),
  email: z.string().email(),
  message: z.string().min(1).max(5000),
});

// Naive in-memory rate-limit. Reuses the same pattern as /api/subscribe.
const buckets = new Map<string, { count: number; resetAt: number }>();
const LIMIT = 5;
const WINDOW_MS = 60_000;
function rateLimited(ip: string) {
  const now = Date.now();
  const b = buckets.get(ip);
  if (!b || b.resetAt < now) {
    buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  b.count += 1;
  return b.count > LIMIT;
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const apiKey = import.meta.env.RESEND_API_KEY;
  if (!apiKey || apiKey === 're_xxx') {
    return new Response('Lead form not configured yet — RESEND_API_KEY missing.', { status: 503 });
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
    return new Response('Invalid input.', { status: 400 });
  }
  try {
    await sendLeadEmail(parsed.data);
  } catch (err) {
    return new Response((err as Error).message || 'Failed to send.', { status: 502 });
  }
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
