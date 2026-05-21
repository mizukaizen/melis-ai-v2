/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL: string;
  readonly STRIPE_SECRET_KEY: string;
  readonly STRIPE_WEBHOOK_SECRET: string;
  readonly STRIPE_PUBLISHABLE_KEY: string;
  readonly BEEHIIV_API_KEY: string;
  readonly BEEHIIV_PUBLICATION_ID: string;
  readonly RESEND_API_KEY: string;
  readonly RESEND_FROM_EMAIL: string;
  readonly LEAD_FORM_RECIPIENT: string;
  // STRIPE_PRICE_* — dynamic per product, accessed via bracket lookup
  readonly [key: `STRIPE_PRICE_${string}`]: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
