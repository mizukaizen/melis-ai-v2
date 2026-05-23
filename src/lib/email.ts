// Transactional email via Resend. All callers are best-effort —
// they should never throw into the request handler.

import { Resend } from 'resend';

interface PostPurchaseArgs {
  to: string;
  productSlug: string;
  sessionId: string;
}

export async function sendPostPurchaseEmail(args: PostPurchaseArgs) {
  const apiKey = import.meta.env.RESEND_API_KEY;
  const from = import.meta.env.RESEND_FROM_EMAIL || 'sean@melis.ai';
  if (!apiKey || apiKey === 're_xxx') {
    console.warn('Resend not configured — skipping post-purchase email.');
    return;
  }
  const resend = new Resend(apiKey);
  const productUrl = `${import.meta.env.PUBLIC_SITE_URL}/products/${args.productSlug}/`;
  await resend.emails.send({
    from,
    to: args.to,
    subject: 'Your melis.ai purchase',
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; max-width: 540px; margin: 0 auto; padding: 24px;">
        <h2 style="font-family: Georgia, serif; color: #050505;">Thanks for the order.</h2>
        <p style="color: #444; line-height: 1.6;">
          Your purchase of <strong>${args.productSlug}</strong> is confirmed.
          The download link will be in a follow-up email shortly.
        </p>
        <p style="color: #666; font-size: 13px;">
          Session: ${args.sessionId}<br>
          <a href="${productUrl}">${productUrl}</a>
        </p>
        <p style="margin-top: 32px; color: #999; font-size: 12px;">
          melis.ai · 2026 · operator-built · Australia
        </p>
      </div>
    `,
  });
}

interface LeadArgs {
  service: string;
  name: string;
  email: string;
  message: string;
}

export async function sendLeadEmail(args: LeadArgs) {
  const apiKey = import.meta.env.RESEND_API_KEY;
  const from = import.meta.env.RESEND_FROM_EMAIL || 'sean@melis.ai';
  const to = import.meta.env.LEAD_FORM_RECIPIENT || 'sean@melis.ai';
  if (!apiKey || apiKey === 're_xxx') {
    console.warn('Resend not configured — skipping lead email.');
    return;
  }
  const resend = new Resend(apiKey);
  await resend.emails.send({
    from,
    to,
    replyTo: args.email,
    subject: `New lead — ${args.service}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; max-width: 540px;">
        <h2>New service lead</h2>
        <p><strong>Service:</strong> ${args.service}</p>
        <p><strong>From:</strong> ${args.name} &lt;${args.email}&gt;</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap; padding: 12px; background: #f5f5f5; border-radius: 6px;">${args.message}</p>
      </div>
    `,
  });
}
