/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Absolute site origin, e.g. `https://www.trisentri.ai`. */
  readonly VITE_SITE_URL?: string;
  /** POST endpoint for the contact form. When unset the form runs in demo mode. */
  readonly VITE_CONTACT_ENDPOINT?: string;
  /** Set to `false` to force the static hero lattice on every device. */
  readonly VITE_HERO_3D?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
