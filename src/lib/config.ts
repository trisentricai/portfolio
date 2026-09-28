/**
 * Runtime configuration.
 *
 * Everything environment-specific is read here and nowhere else, so pointing
 * the site at a different backend is a one-file change.
 */

const env = import.meta.env;

export const CONFIG = {
  /** When set, the contact form POSTs JSON here. Leave empty to stay in demo mode. */
  contactEndpoint: (env.VITE_CONTACT_ENDPOINT as string | undefined) ?? '',
  /** Optional bearer token / API key for the endpoint above. */
  contactApiKey: (env.VITE_CONTACT_API_KEY as string | undefined) ?? '',
  /** Public site origin, used for canonical URLs and Open Graph. */
  siteUrl: (env.VITE_SITE_URL as string | undefined) ?? 'https://www.trisentri.ai',
  contactEmail: (env.VITE_CONTACT_EMAIL as string | undefined) ?? 'hello@trisentri.ai',
  /**
   * Careers mailbox. Falls back to the general contact address rather than
   * guessing a second address that may not exist.
   */
  careersEmail:
    (env.VITE_CAREERS_EMAIL as string | undefined) ?? ((env.VITE_CONTACT_EMAIL as string | undefined) ?? 'hello@trisentri.ai'),
  /** Simulated latency for the demo path so loading states are observable. */
  demoLatencyMs: Number(env.VITE_DEMO_LATENCY_MS ?? 1100),
  /** Feature flag: the hero 3D visualization is opt-out on low-power devices. */
  enableHero3D: env.VITE_ENABLE_HERO_3D !== 'false',
} as const;

/** True when a real delivery endpoint has been configured. */
export const hasContactEndpoint = Boolean(CONFIG.contactEndpoint);
