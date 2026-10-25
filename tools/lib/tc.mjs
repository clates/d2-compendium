// Following treasure classes down to the items they can drop.
import { table, int } from './data.mjs';

const tcs = table('treasureclassex').filter((r) => r['Treasure Class']);
export const tcByName = new Map(tcs.map((r) => [r['Treasure Class'], r]));

export const entries = (r) => Array.from({ length: 10 }, (_, i) => [r[`Item${i + 1}`]?.replace(/"/g, '').trim(), int(r[`Prob${i + 1}`])]).filter(([it, w]) => it && w);

/**
 * Chance that rolling treasure class `name` once drops at least one item matching `want`
 * (a function of the entry text), with one player in the game (NoDrop at full weight).
 * Positive Picks are independent weighted rolls; negative Picks drop each entry as many times as
 * its number, in order, until -Picks items have dropped. Equipment classes the game builds
 * itself (armo3...) never match.
 */
export function chance(name, want, seen = new Set()) {
  if (want(name)) return 1;
  const r = tcByName.get(name);
  if (!r || seen.has(name)) return 0;
  const next = new Set(seen).add(name);
  const list = entries(r);
  const picks = int(r.Picks) || 1;
  if (picks < 0) {
    let none = 1;
    let left = -picks;
    for (const [it, n] of list) {
      const k = Math.min(n, left);
      none *= (1 - chance(it, want, next)) ** k;
      left -= k;
    }
    return 1 - none;
  }
  const total = list.reduce((s, [, w]) => s + w, 0) + int(r.NoDrop);
  const one = list.reduce((s, [it, w]) => s + w * chance(it, want, next), 0) / total;
  return 1 - (1 - one) ** picks;
}

/** "1 in 2,345" or "12.3%" for a chance. */
export function odds(p) {
  if (!p) return 'never';
  if (p >= 0.1) return `${(100 * p).toFixed(1)}%`;
  return `1 in ${Math.round(1 / p).toLocaleString('en-US')}`;
}
