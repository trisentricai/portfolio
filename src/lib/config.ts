/**
 * Runtime configuration.
 *
 * Everything environment-specific is read here and nowhere else, so pointing
 * the site at a different backend is a one-file change.
 *
 * Variables are read as explicit `env.VITE_FOO` properties rather than through
 * a loop, so a typo or a renamed variable shows up in review instead of silently
 * resolving to `undefined` at runtime.
 */

const env = import.meta.env;

const text = (value: string | undefined): string => value?.trim() ?? '';

/**
 * EmailJS credentials.
 *
 * These are public by design — EmailJS calls are made directly from the browser
 * and the public key is not a secret, which is why they come from `VITE_`
 * variables. All three are required: EmailJS fails without a public key, so
 * partial configuration is treated as "not configured" rather than producing a
 * runtime error on submit.
 */
const emailjs = {
  serviceId: text(env.VITE_EMAILJS_SERVICE_ID),
  templateId: text(env.VITE_EMAILJS_TEMPLATE_ID),
  publicKey: text(env.VITE_EMAILJS_PUBLIC_KEY),
} as const;

export const CONFIG = {
  /** When set, the contact form POSTs JSON here. Takes priority over EmailJS. */
  contactEndpoint: text(env.VITE_CONTACT_ENDPOINT),
  /** Optional bearer token / API key for the endpoint above. */
  contactApiKey: text(env.VITE_CONTACT_API_KEY),
  emailjs,
  /** Public site origin, used for canonical URLs and Open Graph. */
  siteUrl: text(env.VITE_SITE_URL) || 'https://www.trisentri.ai',
  contactEmail: text(env.VITE_CONTACT_EMAIL) || 'hello@trisentri.ai',
  /**
   * Careers mailbox. Falls back to the general contact address rather than
   * guessing a second address that may not exist.
   */
  careersEmail: text(env.VITE_CAREERS_EMAIL) || text(env.VITE_CONTACT_EMAIL) || 'hello@trisentri.ai',
  /** Simulated latency for the demo path so loading states are observable. */
  demoLatencyMs: Number(env.VITE_DEMO_LATENCY_MS ?? 1100),
  /** Feature flag: the hero 3D visualization is opt-out on low-power devices. */
  enableHero3D: env.VITE_ENABLE_HERO_3D !== 'false',
} as const;

/** True when a real HTTP delivery endpoint has been configured. */
export const hasContactEndpoint = Boolean(CONFIG.contactEndpoint);

/** True only when all three EmailJS values are present. */
export const hasEmailJs = Boolean(emailjs.serviceId && emailjs.templateId && emailjs.publicKey);

/**
 * The three EmailJS values are easy to paste into the wrong slot, and a
 * mismatched one fails as an opaque "service ID not found" 400 at submit time
 * — long after the mistake was made. EmailJS formats them predictably, so the
 * obvious swaps are caught here instead. Dev-only: it costs nothing in
 * production and never blocks the form.
 */
if (import.meta.env.DEV && hasEmailJs) {
  if (!emailjs.serviceId.startsWith('service_')) {
    console.error(
      `[contact] VITE_EMAILJS_SERVICE_ID looks wrong ("${emailjs.serviceId}"). ` +
        'A service ID always begins with "service_". A short key-like string in this ' +
        'slot is usually the public key — find the real one under Email Services.',
    );
  }
  if (!emailjs.templateId.startsWith('template_')) {
    console.error(
      `[contact] VITE_EMAILJS_TEMPLATE_ID looks wrong ("${emailjs.templateId}"). ` +
        'A template ID always begins with "template_".',
    );
  }
}
