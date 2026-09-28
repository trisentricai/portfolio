/**
 * Static integrity check (`npm run check`).
 *
 * Verifies that every internal link target in src/ matches a route declared in
 * App.tsx, and that every icon name referenced in data/ exists in the icon
 * registry. Catches the two failure modes TypeScript cannot see: a link to a
 * page that was never registered, and a data file pointing at a missing icon.
 * Regex-based, so it runs without a build step.
 */
import { readdir, readFile } from 'node:fs/promises';
import { join, extname } from 'node:path';

const SRC = 'src';
const ROUTE_PARAMS = /:[^/]+/g;

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (['.ts', '.tsx'].includes(extname(entry.name))) out.push(full);
  }
  return out;
}

const files = await walk(SRC);

// ---- 1. Declared routes ----
const app = await readFile(join(SRC, 'App.tsx'), 'utf8');
const declared = new Set(
  [...app.matchAll(/path="([^"]*)"/g)]
    .map((m) => m[1])
    .filter((p) => p !== '*')
    .map((p) => p.replace(ROUTE_PARAMS, '')),
);

// ---- 2. Internal link targets ----
const targets = new Map();
for (const file of files) {
  const source = await readFile(file, 'utf8');
  for (const m of source.matchAll(/\b(?:to|href)="(\/[^"#?]*)"/g)) {
    const target = m[1].replace(ROUTE_PARAMS, '').replace(/\/$/, '') || '/';
    if (target.startsWith('/assets') || target === '/') continue;
    if (!targets.has(target)) targets.set(target, new Set());
    targets.get(target).add(file);
  }
}

console.log(`Declared routes: ${[...declared].sort().join(', ')}\n`);

const broken = [...targets.entries()].filter(([target]) => !declared.has(target));
if (broken.length === 0) {
  console.log('✓ All internal links resolve to a declared route.');
} else {
  console.log(`✗ ${broken.length} unresolved link target(s):`);
  for (const [target, where] of broken) console.log(`  ${target}  ← ${[...where].join(', ')}`);
}

// ---- 3. Icon names used in data ----
const icons = await readFile(join(SRC, 'lib/icons.ts'), 'utf8');
const registry = icons.slice(icons.indexOf('const REGISTRY'), icons.indexOf('const FALLBACK'));
const known = new Set([...registry.matchAll(/^\s{2}([A-Za-z0-9_]+),$/gm)].map((m) => m[1]));

const missing = new Set();
for (const file of files.filter((f) => f.includes('data') || f.includes('pages'))) {
  const source = await readFile(file, 'utf8');
  for (const m of source.matchAll(/icon:\s*'([A-Za-z0-9_]+)'/g)) {
    if (!known.has(m[1])) missing.add(`${m[1]}  ← ${file}`);
  }
}

if (missing.size === 0) {
  console.log('✓ All data icon names exist in the registry.');
} else {
  console.log(`\n✗ ${missing.size} unknown icon name(s):`);
  for (const entry of [...missing].sort()) console.log(`  ${entry}`);
}
