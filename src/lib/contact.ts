/**
 * Contact submission service.
 *
 * Three delivery paths, picked automatically from configuration:
 *  1. **EmailJS** — all three `VITE_EMAILJS_*` values set: mail is sent through
 *     the visitor's own browser.
 *  2. **Endpoint** — `VITE_CONTACT_ENDPOINT` set: JSON is POSTed to your own
 *     backend with a timeout and an abort guard. Takes priority over EmailJS
 *     when both are configured, since it keeps the API key server-side.
 *  3. **Demo** — nothing configured: the request is simulated with a short
 *     delay and resolves as accepted *without* claiming a message was sent.
 *     The UI tells the visitor this honestly.
 */
import { CONFIG, hasContactEndpoint, hasEmailJs } from '@/lib/config';
import { sendViaEmailJs } from '@/lib/emailjs';

export interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  budget?: string;
  timeline?: string;
  service: string;
  message: string;
  /** Honeypot — must stay empty. Bots that fill it are rejected silently. */
  website?: string;
}

export type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

/** Which transport a submission will use. Surfaced in the UI so the visitor is
 *  never told a message was sent when it was not. */
export type ContactProvider = 'emailjs' | 'endpoint' | 'demo';

export const CONTACT_PROVIDER: ContactProvider = hasContactEndpoint
  ? 'endpoint'
  : hasEmailJs
    ? 'emailjs'
    : 'demo';

/** True when a submission will actually reach a human. */
export const hasContactDelivery = CONTACT_PROVIDER !== 'demo';

export interface SubmitResult {
  ok: boolean;
  /** True when the message was delivered to a real transport. */
  delivered: boolean;
  message: string;
  /** Field-level errors returned by the endpoint, if any. */
  fieldErrors?: Record<string, string>;
}

const TIMEOUT_MS = 15000;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

export async function submitContact(payload: ContactPayload, startedAt = Date.now()): Promise<SubmitResult> {
  // Honeypot: never respond with an error, just drop it.
  if (payload.website) {
    await delay(400);
    return { ok: true, delivered: false, message: 'Thank you — your message has been received.' };
  }

  if (CONTACT_PROVIDER === 'emailjs') {
    const result = await sendViaEmailJs(payload, startedAt);
    return { ok: result.ok, delivered: result.ok, message: result.message };
  }

  if (CONTACT_PROVIDER === 'demo') {
    await delay(CONFIG.demoLatencyMs);
    return {
      ok: true,
      delivered: false,
      message:
        'This is a demonstration submission — no message was sent because no delivery method is configured. Add the EmailJS or endpoint values to enable real delivery.',
    };
  }

  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(CONFIG.contactEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(CONFIG.contactApiKey ? { Authorization: `Bearer ${CONFIG.contactApiKey}` } : {}),
      },
      body: JSON.stringify({
        ...payload,
        source: 'trisentri.ai',
        submittedAt: new Date().toISOString(),
      }),
      signal: controller.signal,
    });

    if (response.status === 422) {
      const body = (await response.json().catch(() => ({}))) as {
        errors?: Record<string, string>;
        message?: string;
      };
      return {
        ok: false,
        delivered: false,
        message: body.message ?? 'Some details need attention.',
        fieldErrors: body.errors,
      };
    }

    if (!response.ok) {
      return {
        ok: false,
        delivered: false,
        message: 'We could not send your message just now. Please email us directly instead.',
      };
    }

    return {
      ok: true,
      delivered: true,
      message: 'Thank you — your message is with our team and we will reply shortly.',
    };
  } catch (error) {
    const aborted = error instanceof DOMException && error.name === 'AbortError';
    return {
      ok: false,
      delivered: false,
      message: aborted
        ? 'The request timed out. Please try again, or email us directly.'
        : 'Something went wrong sending your message. Please try again.',
    };
  } finally {
    window.clearTimeout(timer);
  }
}

export { hasContactEndpoint, hasEmailJs };
