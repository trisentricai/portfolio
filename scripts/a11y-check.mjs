/**
 * Static accessibility sweep (`npm run a11y`).
 *
 * Regex-based, so it is a smell test rather than a substitute for axe or a real
 * audit — but it reliably catches mistakes that otherwise ship: images with no
 * alt attribute, positive `tabIndex`, and `target="_blank"` without a hardened
 * `rel`. Heading order is checked per file as a second pass.
 */
import { readdir, readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';

const SRC = 'src';

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (extname(entry.name) === '.tsx') out.push(full);
  }
  return out;
}

const findings = [];
const add = (file, line, rule, detail) => findings.push({ file, line, rule, detail });

for (const file of await walk(SRC)) {
  const source = await readFile(file, 'utf8');
  const lines = source.split('\n');

  /** Line number for a character offset, for readable findings. */
  const lineAt = (offset) => source.slice(0, offset).split('\n').length;

  // Tag-level checks: attributes can wrap across lines, so match whole tags.
  for (const match of source.matchAll(/<(a|img|iframe)\b[^>]*>/g)) {
    const [tag] = match;
    const name = /^<(\w+)/.exec(tag)[1];

    if (name === 'img' && !/\balt\s*=/.test(tag)) {
      add(file, lineAt(match.index), 'img-alt', tag.replace(/\s+/g, ' ').slice(0, 72));
    }

    if (/target\s*=\s*"_blank"/.test(tag) && !/\brel\s*=/.test(tag)) {
      add(file, lineAt(match.index), 'blank-rel', tag.replace(/\s+/g, ' ').slice(0, 72));
    }
  }

  lines.forEach((text, index) => {
    const trimmed = text.trim();
    if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('*')) return;

    if (/tabIndex\s*=\s*\{?\s*[1-9]/.test(text)) add(file, index + 1, 'tabindex', trimmed.slice(0, 72));
  });

  // Heading order, per file.
  let previous = null;
  lines.forEach((text, index) => {
    const match = text.match(/<h([1-6])\b/);
    if (!match) return;
    const level = Number(match[1]);
    if (previous !== null && level > previous + 1) {
      add(file, index + 1, 'heading-order', `h${previous} then h${level}`);
    }
    previous = level;
  });
}

if (findings.length === 0) {
  console.log('✓ No accessibility smells found in the heuristic sweep.');
} else {
  console.log(`${findings.length} finding(s):\n`);
  for (const finding of findings) {
    console.log(`  [${finding.rule}] ${finding.file}:${finding.line}  ${finding.detail}`);
  }
  process.exitCode = 1;
}
