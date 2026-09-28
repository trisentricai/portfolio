/**
 * One-shot live check against the EmailJS REST API using the credentials in
 * .env. Mirrors what src/lib/emailjs.ts sends.
 *
 * ---------------------------------------------------------------------------
 * LIMITATION — read before trusting a FAIL here.
 *
 * EmailJS rejects requests that do not come from a browser and returns
 * "The Public Key is required" regardless of whether the key is valid. Verified
 * on 2026-09-29: a well-formed request (user_id present and serialised
 * correctly) fails identically with no Origin header, with three different
 * Origin values, and with browser-like User-Agent/Sec-Fetch headers.
 *
 * So a PASS here is meaningful. A FAIL is NOT evidence of a bad credential.
 * Only a submission through the real form in a browser settles it.
 * ---------------------------------------------------------------------------
 */
import fs from 'node:fs';
import path from 'node:path';

const envPath = path.resolve('.env');
const env = {};
for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
  const match = /^([A-Z0-9_]+)=(.*)$/.exec(line.trim());
  if (match) env[match[1]] = match[2].trim();
}

const serviceId = env.VITE_EMAILJS_SERVICE_ID;
const templateId = env.VITE_EMAILJS_TEMPLATE_ID;
// Optional override so a candidate public key can be tried without editing .env.
const publicKey = process.argv[2] || env.VITE_EMAILJS_PUBLIC_KEY;

for (const [label, value, prefix] of [
  ['service', serviceId, 'service_'],
  ['template', templateId, 'template_'],
]) {
  if (!value?.startsWith(prefix)) {
    console.error(`FAIL  ${label} ID is not set or lacks the "${prefix}" prefix: "${value}"`);
    process.exit(1);
  }
}
if (!publicKey) {
  console.error('FAIL  public key is empty');
  process.exit(1);
}

const templateParams = {
  from_name: 'Automated delivery test',
  reply_to: 'delivery-test@example.com',
  company: 'Trisentric AI',
  service: 'ai-agents',
  budget: 'Not specified',
  timeline: 'Not specified',
  message:
    'This is an automated test of the contact form delivery path. If you are reading it in your inbox, EmailJS is configured correctly and the live site form will reach you.',
  submitted_at: new Date().toISOString(),
  page_url: 'https://www.trisentri.ai/contact',
};

const body = new URLSearchParams({
  service_id: serviceId,
  template_id: templateId,
  user_id: publicKey,
  template_params: JSON.stringify(templateParams),
});

console.log(`Sending test via service ${serviceId} / template ${templateId} ...`);

try {
  const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
  const text = await response.text();
  console.log(`status: ${response.status} ${response.statusText}`);
  console.log(`body:   ${text || '(empty)'}`);
  if (response.status === 200) {
    console.log('PASS  EmailJS accepted the send. Check the template To inbox.');
  } else {
    console.log('FAIL  EmailJS rejected the send. The body above names the reason.');
    process.exit(1);
  }
} catch (error) {
  console.error('FAIL  request could not be made:', error.message);
  process.exit(1);
}
