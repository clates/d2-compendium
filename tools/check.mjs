// Check docs/: every relative link and anchor resolves, and no generated page was edited by hand.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parsePage, hash, walk } from './lib/md.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DOCS = path.join(ROOT, 'docs');
const files = [...walk(DOCS), path.join(ROOT, 'README.md'), path.join(ROOT, 'CONTRIBUTING.md')];

// Anchors a page offers: explicit <a id> tags and GitHub-style heading slugs (with -1, -2 for repeats).
const anchorCache = new Map();
function anchors(file) {
  if (anchorCache.has(file)) return anchorCache.get(file);
  const text = fs.readFileSync(file, 'utf8');
  const set = new Set([...text.matchAll(/<a id="([^"]+)"><\/a>/g)].map((m) => m[1]));
  const seen = new Map();
  for (const m of text.matchAll(/^#{1,6} (.+)$/gm)) {
    const base = m[1].trim().toLowerCase().replace(/[^\p{L}\p{N} _-]/gu, '').replace(/ /g, '-');
    const n = seen.get(base) ?? 0;
    seen.set(base, n + 1);
    set.add(n ? `${base}-${n}` : base);
  }
  anchorCache.set(file, set);
  return set;
}

const problems = [];
for (const file of files) {
  const rel = path.relative(ROOT, file);
  const text = fs.readFileSync(file, 'utf8');
  const page = parsePage(text);
  if (page && /^generated: true$/m.test(page.front)) {
    const want = page.front.match(/^hash: "([^"]+)"$/m)?.[1];
    if (want !== hash(page.body.replace(/\n$/, ''))) problems.push(`${rel}: generated part edited by hand (or hash missing); change the generator instead`);
  }
  for (const m of text.matchAll(/\]\(([^)\s]+)\)/g)) {
    const target = m[1];
    if (/^(https?:|mailto:)/.test(target)) continue;
    const [p, anchor] = target.split('#');
    const dest = p ? path.resolve(path.dirname(file), p) : file;
    if (!fs.existsSync(dest)) { problems.push(`${rel}: broken link ${target}`); continue; }
    if (anchor && dest.endsWith('.md') && !anchors(dest).has(anchor)) problems.push(`${rel}: missing anchor ${target}`);
  }
}
if (problems.length) {
  console.log(problems.slice(0, 200).join('\n'));
  console.log(`${problems.length} problems in ${files.length} files`);
  process.exit(1);
}
console.log(`${files.length} files, all links resolve, no hand edits to generated text`);
