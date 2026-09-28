/**
 * EmailJS delivery.
 *
 * EmailJS sends mail straight from the browser, so there is no server here and
 * the public key is not a secret — it ships in the bundle by design. What *is*
 * worth controlling is spam, so this module pairs a honeypot with an optional
 * minimum time-to-submit: a real person takes more than a few seconds to fill
 * in the form, whereas a bot that posts the moment the page loads does not.
 */
import emailjs from '@emailjs/browser';
import { CONFIG } from '@/lib/config';
import type { ContactPayload } from '@/lib/contact';

/** EmailJS rejects with a `status` and a `text` body; normalise both. */
function describeError(error: unknown): string {
  if (typeof error === 'object' && error !== null) {
    const { status, text } = error as { status?: number; text?: string };
    if (status === 400) return 'EmailJS rejected the request (400). Check the service, template and public key.';
    if (status === 401 || status === 402) {
      return 'EmailJS refused the request — the account is over its monthly send limit or the key is invalid.';
    }
    if (status === 429) return 'Too many submissions from this address. Please try again later.';
    if (text) return `Email delivery failed (${status ?? 'no status'}): ${text}`;
  }
  return 'Email delivery failed. Please try again, or email us directly.';
}

export interface EmailJsResult {
  ok: boolean;
  message: string;
}

/** Wall-clock milliseconds a human plausibly needs to complete the form. */
const MIN_FILL_MS = 4000;

export async function sendViaEmailJs(payload: ContactPayload, startedAt: number): Promise<EmailJsResult> {
  // Too fast to be human — treat as a bot and report success so it does not
  // learn to retry with a slower script.
  if (payload.website || Date.now() - startedAt < MIN_FILL_MS) {
    return { ok: true, message: 'Thank you — your message has been received.' };
  }

  try {
    const response = await emailjs.send(
      CONFIG.emailjs.serviceId,
      CONFIG.emailjs.templateId,
      {
        // `reply_to` is what lets the team hit Reply and reach the sender.
        // `to_email` is defined on the EmailJS template, not here.
        from_name: payload.name,
        reply_to: payload.email,
        company: payload.company || 'Not provided',
        service: payload.service,
        budget: payload.budget || 'Not specified',
        timeline: payload.timeline || 'Not specified',
        message: payload.message,
        submitted_at: new Date().toISOString(),
        page_url: typeof window === 'undefined' ? '' : window.location.href,
      },
      { publicKey: CONFIG.emailjs.publicKey },
    );

    if (response.status === 200) {
      return { ok: true, message: 'Thank you — your message is on its way and we will reply shortly.' };
    }

    return { ok: false, message: describeError(response) };
  } catch (error) {
    return { ok: false, message: describeError(error) };
  }
}
