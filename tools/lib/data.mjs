// The game's tables and strings, read from raw/ (see tools/extract.py).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
export const RAW = path.join(ROOT, 'raw');
export const DOCS = path.join(ROOT, 'docs');

if (!fs.existsSync(path.join(RAW, 'version.txt'))) {
  console.error('raw/ is missing: run tools/extract.py first (see README).');
  process.exit(1);
}
export const VERSION = fs.readFileSync(path.join(RAW, 'version.txt'), 'utf8').trim();

const cache = new Map();

/**
 * Rows of one table as objects. `folder` is 'excel' (RotW characters) or 'excel-base' (non-RotW).
 * "Expansion" divider rows are dropped; `_row` numbers the rest the way the game does.
 */
export function table(name, folder = 'excel') {
  const key = folder + '/' + name;
  if (cache.has(key)) return cache.get(key);
  const file = path.join(RAW, folder, name.toLowerCase() + '.txt');
  const text = fs.readFileSync(file, 'latin1').replace(/\r/g, '');
  const [head, ...lines] = text.split('\n');
  const cols = head.split('\t');
  const rows = lines
    .filter((l) => l.length && !l.startsWith('Expansion\t'))
    .map((l, row) => {
      const cells = l.split('\t');
      const o = { _row: row };
      cols.forEach((c, i) => { if (!(c in o)) o[c] = cells[i] ?? ''; });
      return o;
    });
  cache.set(key, rows);
  return rows;
}

export const int = (v) => (v === '' || v === undefined || v === null ? 0 : parseInt(v, 10) || 0);

// Strings: every HD string file, first definition of a key wins. chinese-overlay.json replaces
// some names for the Chinese release ("Fierce Battle Foothills"), so it's skipped.
const strings = new Map();
for (const f of fs.readdirSync(path.join(RAW, 'strings')).sort()) {
  if (!f.endsWith('.json') || f === 'chinese-overlay.json') continue;
  for (const e of JSON.parse(fs.readFileSync(path.join(RAW, 'strings', f), 'utf8').replace(/^﻿/, ''))) {
    if (!strings.has(e.Key)) strings.set(e.Key, e.enUS);
  }
}

/** The English string for a key, without colour codes; the key itself when it has none. */
export function str(key) {
  if (!key) return '';
  const s = strings.get(key);
  return s === undefined ? key : clean(s);
}
export const hasStr = (key) => strings.has(key);
export const clean = (s) => (s ?? '').replace(/ÿc[0-9a-zA-Z;:]/g, '').replace(/\[[a-z]+\]/gi, '').trim();

/** Keys present in `name` for RotW characters but not in the base (non-RotW) table. */
export function rotwOnly(name, keyCol) {
  const base = new Set(table(name, 'excel-base').map((r) => r[keyCol]));
  return new Set(table(name).map((r) => r[keyCol]).filter((k) => k && !base.has(k)));
}

export const DIFFS = ['Normal', 'Nightmare', 'Hell'];
/** A per-difficulty column: col, col(N), col(H). */
export const byDiff = (r, col) => [r[col], r[`${col}(N)`], r[`${col}(H)`]];
