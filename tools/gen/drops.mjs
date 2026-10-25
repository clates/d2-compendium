// Treasure classes: the drop tables monsters, chests and bosses roll on.
import { table, int, str } from '../lib/data.mjs';
import { mdTable, list, slug } from '../lib/md.mjs';
import * as I from '../lib/items.mjs';

const DIR = 'drops';
const tcs = table('treasureclassex').filter((r) => r['Treasure Class']);
const names = new Set(tcs.map((r) => r['Treasure Class']));

const PAGES = [
  ['act-1', 'Act 1 treasure classes', (n) => /^Act 1\b/.test(n)],
  ['act-2', 'Act 2 treasure classes', (n) => /^Act 2\b/.test(n)],
  ['act-3', 'Act 3 treasure classes', (n) => /^Act 3\b/.test(n)],
  ['act-4', 'Act 4 treasure classes', (n) => /^Act 4\b/.test(n)],
  ['act-5', 'Act 5 treasure classes', (n) => /^Act 5\b/.test(n)],
  ['items', 'Runes, gems, potions and jewelry', (n) => /^(Runes|Chipped|Flawed|Normal|Flawless|Perfect|Gold|Ammo|Misc|Jewelry|Hpotion|Potion|ROP|Sunder|All)\b/.test(n)],
  ['bosses', 'Bosses, quests and special drops', () => true],
];
const pageOf = (n) => PAGES.find(([, , t]) => t(n))[0];

// The game builds armoN / weapN / bowN / meleN itself: every base whose level is N-2..N.
const EQUIP = [['armo', 'armor'], ['weap', 'weapon'], ['bow', 'missile weapon'], ['mele', 'melee weapon']];
const bases = [...I.baseByCode.values()].filter((b) => b.spawnable === '1' && b.kind !== 'misc' && int(b.rarity) > 0 && !int(b.quest));
function equipTc(prefix, n) {
  return bases.filter((b) => {
    const lvl = int(b.level);
    if (lvl <= n - 3 || lvl > n) return false;
    if (prefix === 'armo') return b.kind === 'armor';
    if (prefix === 'weap') return b.kind === 'weapon';
    if (prefix === 'bow') return b.kind === 'weapon' && I.isType(b.code, 'miss');
    return b.kind === 'weapon' && I.isType(b.code, 'mele');
  });
}

export function register(site) {
  site.register('index:drops', `${DIR}/index.md`, 'Drops');
  for (const r of tcs) {
    const n = r['Treasure Class'];
    site.ids.set(`tc:${n}`, { path: `${DIR}/${pageOf(n)}.md#${slug(n)}`, title: n });
  }
  for (const [prefix] of EQUIP) {
    for (let n = 3; n <= 87; n += 3) site.ids.set(`tc:${prefix}${n}`, { path: `${DIR}/equipment.md#${prefix}${n}`, title: `${prefix}${n}` });
  }
}

function entry(site, p, raw) {
  const item = raw?.replace(/"/g, '');
  if (!item) return '';
  if (site.has(`tc:${item}`)) return site.link(p, `tc:${item}`, item);
  if (site.has(`uniquename:${item.trim()}`)) return `${site.link(p, `uniquename:${item.trim()}`)} (unique)`;
  const [code, ...opts] = item.split(',');
  if (code === 'gld') {
    const mul = opts.find((o) => o.startsWith('mul='));
    return `Gold${mul ? ` (x${int(mul.slice(4)) / 256})` : ''}`;
  }
  if (I.baseByCode.has(code)) {
    const name = I.baseName(code);
    return (site.has(`base:${code}`) ? site.link(p, `base:${code}`, name) : name) + (opts.length ? ` (${opts.join(', ')})` : '');
  }
  return item;
}

function section(site, p, r) {
  const n = r['Treasure Class'];
  const items = Array.from({ length: 10 }, (_, i) => [r[`Item${i + 1}`], int(r[`Prob${i + 1}`])]).filter(([it]) => it);
  const picks = int(r.Picks);
  const nodrop = int(r.NoDrop);
  const total = items.reduce((s, [, x]) => s + x, 0) + (picks > 0 ? nodrop : 0);
  const q = ['Unique', 'Set', 'Rare', 'Magic'].filter((k) => r[k]).map((k) => `${k} ${r[k]}`).join(', ');
  const head = [
    picks < 0 ? `Picks ${picks}: no random roll; each entry drops as many times as its number, in order, up to ${-picks} drops.` : `Picks ${picks}${nodrop ? `, NoDrop ${nodrop}` : ''}.`,
    q ? `Quality factors: ${q}.` : '',
    r.level ? `Level ${r.level}.` : '',
    r.firstLadderSeason ? `Ladder ${r.firstLadderSeason}${r.lastLadderSeason ? '-' + r.lastLadderSeason : '+'}.` : '',
  ].filter(Boolean).join(' ');
  const rows = items.map(([it, x]) => [entry(site, p, it), String(x), picks > 0 ? `${((100 * x) / total).toFixed(x / total < 0.01 ? 3 : 1)}%` : '']);
  if (picks > 0 && nodrop) rows.push(['(nothing)', String(nodrop), `${((100 * nodrop) / total).toFixed(1)}%`]);
  return `<a id="${slug(n)}"></a>\n### ${n}\n\n${head}\n\n${mdTable(['Entry', 'Weight', picks > 0 ? 'Per pick, 1 player' : ''], rows, [, 'r', 'r'])}\n`;
}

export function render(site) {
  for (const [file, title, test] of PAGES) {
    const p = `${DIR}/${file}.md`;
    const mine = tcs.filter((r) => pageOf(r['Treasure Class']) === file && test(r['Treasure Class']));
    site.page(p, title, { type: 'reference' }, `${mine.length} treasure classes. ${site.linkPath(p, `${DIR}/index.md`, 'How treasure classes work')}.\n\n${mine.map((r) => section(site, p, r)).join('\n')}`);
  }

  const ep = `${DIR}/equipment.md`;
  site.page(ep, 'Equipment treasure classes', { type: 'reference' }, `The game builds these itself, not from a table: \`armoN\` holds every armor base whose quality level is N-2 to N, \`weapN\` every weapon, \`bowN\` missile weapons and \`meleN\` melee weapons, each weighted by the base's rarity. Monster treasure classes point at them.

${EQUIP.map(([prefix, label]) => `## ${prefix}: ${label}s\n\n` + Array.from({ length: 29 }, (_, i) => (i + 1) * 3).map((n) => {
    const bs = equipTc(prefix, n);
    const items = bs.length ? bs.map((b) => `${site.link(ep, `base:${b.code}`, I.baseName(b.code))} (${b.rarity})`).join(', ') : 'No bases have a quality level in this band.';
    return `<a id="${prefix}${n}"></a>\n### ${prefix}${n}\n\n${items}\n`;
  }).join('\n')).join('\n')}
`);

  const ip = `${DIR}/index.md`;
  site.page(ip, 'Drops', { type: 'index' }, `When a monster dies, the game rolls on its treasure class (shown on each monster's page). A treasure class is a weighted list: each **pick** chooses one entry by weight, and an entry is either an item or another treasure class to roll on in turn. **NoDrop** is the weight of dropping nothing; more players in the game shrink it. Once an item base is chosen, its quality (unique, set, rare, magic...) is rolled using the quality factors along the way, the item level and magic find. See ${site.linkPath(ip, 'mechanics/item-generation.md', 'Item generation')}.

The "per pick" column is the chance of each entry on one pick with one player and no NoDrop reduction. It doesn't follow the chain into sub-classes.

${list([...PAGES.map(([f, t]) => site.linkPath(ip, `${DIR}/${f}.md`, t)), site.linkPath(ip, ep, 'Equipment treasure classes (armoN, weapN...)')])}
`);
}
