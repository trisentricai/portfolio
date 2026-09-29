/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Absolute site origin, e.g. `https://trisentricai.in`. */
  readonly VITE_SITE_URL?: string;

  /** Public address shown in the UI and used for the mailto fallback. */
  readonly VITE_CONTACT_EMAIL?: string;
  /** Optional separate careers mailbox. Falls back to VITE_CONTACT_EMAIL. */
  readonly VITE_CAREERS_EMAIL?: string;

  /**
   * Contact delivery — EmailJS (preferred for a static site).
   * All three are required; partial configuration is treated as "not
   * configured" and the form falls back to demo mode. These are public by
   * design: EmailJS sends from the browser and the public key is not a secret.
   */
  readonly VITE_EMAILJS_SERVICE_ID?: string;
  readonly VITE_EMAILJS_TEMPLATE_ID?: string;
  readonly VITE_EMAILJS_PUBLIC_KEY?: string;

  /**
   * Contact delivery — custom backend. Takes priority over EmailJS when set,
   * because it keeps any API key server-side.
   */
  readonly VITE_CONTACT_ENDPOINT?: string;
  readonly VITE_CONTACT_API_KEY?: string;

  /** Simulated latency (ms) for the demo path so loading states are observable. */
  readonly VITE_DEMO_LATENCY_MS?: string;

  /** Social profiles are opt-in; empty values are hidden everywhere. */
  readonly VITE_SOCIAL_LINKEDIN?: string;
  readonly VITE_SOCIAL_GITHUB?: string;
  readonly VITE_SOCIAL_X?: string;

  /** Set to `false` to force the static hero lattice on every device. */
  readonly VITE_ENABLE_HERO_3D?: string;
  readonly VITE_HERO_3D?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
