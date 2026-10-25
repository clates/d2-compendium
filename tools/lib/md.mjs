// Writing generated pages: cross-links, hand-written notes kept across runs, stale pages removed.
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { DOCS, VERSION } from './data.mjs';

export const NOTES = '<!-- NOTES: hand-written text below this line is kept when pages are regenerated -->';

export const slug = (s) =>
  String(s).normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase()
    .replace(/['’]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'x';

export const hash = (s) => crypto.createHash('sha256').update(s).digest('hex').slice(0, 16);

/** Markdown table. Cells are strings; pipes and newlines are escaped. */
export function mdTable(head, rows, align) {
  const esc = (c) => String(c ?? '').replace(/\|/g, '\\|').replace(/\n/g, '<br>');
  const sep = head.map((_, i) => (align?.[i] === 'r' ? '---:' : '---'));
  return [head, sep, ...rows].map((r, i) => '| ' + (i === 1 ? r : r.map(esc)).join(' | ') + ' |').join('\n');
}

export const list = (items) => items.map((t) => '- ' + t).join('\n');
export const range = (a, b) => (a === b || b === undefined ? String(a) : `${a}-${b}`);

function yaml(front) {
  const v = (x) => (typeof x === 'number' || typeof x === 'boolean' ? String(x)
    : Array.isArray(x) ? '[' + x.map(v).join(', ') + ']' : JSON.stringify(String(x)));
  return Object.entries(front).filter(([, x]) => x !== undefined && x !== '' && x !== null)
    .map(([k, x]) => `${k}: ${v(x)}`).join('\n');
}

/** Split a page into front matter (raw), generated body and notes. */
export function parsePage(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) return null;
  const at = m[2].indexOf(NOTES);
  return {
    front: m[1],
    body: at < 0 ? m[2] : m[2].slice(0, at),
    notes: at < 0 ? '' : m[2].slice(at + NOTES.length),
  };
}

export class Site {
  constructor() {
    this.ids = new Map();      // entity id -> { path, title }
    this.pages = new Map();    // path -> { front, body }
  }

  /** Reserve a page for an entity so other generators can link to it before it is written. */
  register(id, rel, title) {
    if (this.ids.has(id)) throw new Error(`duplicate id ${id}`);
    this.ids.set(id, { path: rel, title });
    return rel;
  }

  /** A unique page path under `dir` for `name`. */
  claim(dir, name) {
    let rel = `${dir}/${slug(name)}.md`;
    for (let n = 2; [...this.ids.values()].some((e) => e.path === rel); n++) rel = `${dir}/${slug(name)}-${n}.md`;
    return rel;
  }

  has(id) { return this.ids.has(id); }
  path(id) { return this.ids.get(id)?.path; }

  /** A relative link from page `from` to entity `id`, or plain text when it has no page. */
  link(from, id, text) {
    const e = this.ids.get(id);
    if (!e) return text ?? id;
    return `[${text ?? e.title}](${rel(from, e.path)})`;
  }

  /** A relative link to a page by path (for hand-written or index pages). */
  linkPath(from, to, text) { return `[${text}](${rel(from, to)})`; }

  page(relPath, title, front, body) {
    if (this.pages.has(relPath)) throw new Error(`page written twice: ${relPath}`);
    this.pages.set(relPath, { title, front, body: `# ${title}\n\n${body.trim()}\n` });
  }

  /** Write every page, keeping notes; remove generated pages this run didn't produce. */
  flush() {
    let wrote = 0, same = 0;
    const kept = [];
    for (const [relPath, p] of this.pages) {
      const file = path.join(DOCS, relPath);
      const old = fs.existsSync(file) ? parsePage(fs.readFileSync(file, 'utf8')) : null;
      const notes = old?.notes ?? '\n';
      const front = yaml({ title: p.title, ...p.front, data_version: VERSION, generated: true, hash: hash(p.body) });
      const text = `---\n${front}\n---\n${p.body}\n${NOTES}${notes}`;
      if (old && fs.readFileSync(file, 'utf8') === text) { same++; continue; }
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.writeFileSync(file, text);
      wrote++;
    }
    for (const file of this.partial ? [] : walk(DOCS)) {
      const relPath = path.relative(DOCS, file).split(path.sep).join('/');
      if (this.pages.has(relPath)) continue;
      const old = parsePage(fs.readFileSync(file, 'utf8'));
      if (!old || !/^generated: true$/m.test(old.front)) continue;
      if (old.notes.trim()) { kept.push(relPath); continue; }
      fs.unlinkSync(file);
    }
    console.log(`${this.pages.size} pages: ${wrote} written, ${same} unchanged`);
    if (kept.length) console.log('no longer generated but kept for their notes:\n  ' + kept.join('\n  '));
  }
}

export function rel(from, to) {
  const r = path.posix.relative(path.posix.dirname(from), to);
  return r || path.posix.basename(to);
}

export function* walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (e.name.endsWith('.md')) yield p;
  }
}
