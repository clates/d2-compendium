// Monsters, grouped by family (monstats BaseId), with resistances, life, experience, drops and
// where they spawn; super uniques and elite modifiers.
import { table, int, str, hasStr, DIFFS } from '../lib/data.mjs';
import { mdTable, list, slug } from '../lib/md.mjs';
import { levels, spawns, areaName, areaLevels } from './world.mjs';

const DIR = 'monsters';
const monstats = table('monstats');
const byId = new Map(monstats.map((m) => [m.Id, m]));
const monlvl = table('monlvl');                 // row index = level
const superuniques = table('superuniques').filter((s) => s.Superunique);
const monumod = table('monumod');
const SUFFIX = ['', '(N)', '(H)'];
const RES = [['ResDm', 'Physical'], ['ResMa', 'Magic'], ['ResFi', 'Fire'], ['ResLi', 'Lightning'], ['ResCo', 'Cold'], ['ResPo', 'Poison']];

// Monsters worth a page: everything that spawns somewhere, super uniques' classes, bosses, and
// their minions and spawns.
const shown = new Set();
const add = (id) => {
  const m = byId.get(id);
  if (!m || shown.has(id) || m.enabled === '0' || m.killable !== '1' || !hasStr(m.NameStr)) return;
  shown.add(id);
  for (const c of [m.minion1, m.minion2, m.spawn]) if (c) add(c);
};
const where = new Map();                         // monster id -> Set of level ids
for (const r of levels) {
  const s = spawns(r);
  for (const id of [...s.normal, ...s.nmh, ...s.uniq]) {
    add(id);
    if (!where.has(id)) where.set(id, new Set());
    where.get(id).add(r.Id);
  }
}
for (const s of superuniques) add(s.Class);
for (const m of monstats) if (m.boss === '1' || m.primeevil === '1') add(m.Id);

const families = new Map();
for (const id of shown) {
  const m = byId.get(id);
  const base = m.BaseId && byId.has(m.BaseId) ? m.BaseId : id;
  if (!families.has(base)) families.set(base, []);
  families.get(base).push(m);
}
const name = (m) => str(m.NameStr);

const lvlRow = (lvl) => monlvl[Math.max(0, Math.min(lvl, monlvl.length - 1))];
/** Expansion: a monster's stat is its monstats percentage of the MonLvl value at its level. */
const scaled = (m, col, mcol, d, lvl) => {
  const c = d ? col[0].toUpperCase() + col.slice(1) : col;      // minHP, but MinHP(N) and MinHP(H)
  return Math.floor(int(lvlRow(lvl)[`L-${mcol}${SUFFIX[d]}`]) * int(m[`${c}${SUFFIX[d]}`]) / 100);
};

function flags(m) {
  return [m.lUndead === '1' || m.hUndead === '1' ? 'Undead' : '', m.demon === '1' ? 'Demon' : '', m.boss === '1' ? 'Boss' : '', m.primeevil === '1' ? 'Prime Evil' : '', m.flying === '1' ? 'Flying' : ''].filter(Boolean);
}

export function register(site) {
  site.register('index:monsters', `${DIR}/index.md`, 'Monsters');
  site.register('page:superuniques', `${DIR}/super-uniques.md`, 'Super uniques');
  site.register('page:elite-mods', `${DIR}/elite-modifiers.md`, 'Elite modifiers');
  for (const [base, ms] of families) {
    const p = site.claim(DIR, name(byId.get(base)) || base);
    site.register(`family:mon:${base}`, p, name(byId.get(base)) || base);
    for (const m of ms) site.ids.set(`mon:${m.Id}`, { path: `${p}#${slug(name(m) + '-' + m.Id)}`, title: name(m) });
  }
}

const tcLink = (site, p, tc) => (tc ? site.link(p, `tc:${tc}`, tc) : '');

function variant(site, p, m) {
  const res = mdTable(['', ...RES.map(([, n]) => n)], DIFFS.map((d, i) => [d, ...RES.map(([c]) => {
    const v = m[`${c}${SUFFIX[i]}`];
    return v === '' ? '0' : int(v) >= 100 ? `**${v} (immune)**` : v;
  })]), [, 'r', 'r', 'r', 'r', 'r', 'r']);
  const lvl = int(m.Level);
  const hp = [scaled(m, 'minHP', 'HP', 0, lvl), scaled(m, 'maxHP', 'HP', 0, lvl)];
  const xp = scaled(m, 'Exp', 'XP', 0, lvl);
  const tcs = DIFFS.map((d, i) => [d, ...['TreasureClass', 'TreasureClassChamp', 'TreasureClassUnique'].map((c) => tcLink(site, p, m[`${c}${SUFFIX[i]}`]))]);
  const areas = [...(where.get(m.Id) ?? [])].map((id) => levels.find((r) => r.Id === id)).filter(Boolean);
  const hell = areas.filter((r) => areaLevels(r)[2]).map((r) => {
    const ml = areaLevels(r)[2];
    return [site.link(p, `area:${r.Id}`), String(ml), `${scaled(m, 'minHP', 'HP', 2, ml)}-${scaled(m, 'maxHP', 'HP', 2, ml)}`, String(scaled(m, 'Exp', 'XP', 2, ml))];
  });
  const f = flags(m);
  const boss = m.boss === '1' || m.primeevil === '1';
  const fixed = boss ? mdTable(['', 'Level', 'Life', 'Experience', 'Defense'], DIFFS.map((d, i) => {
    const l = int(m[`Level${SUFFIX[i]}`]);
    return [d, String(l), `${scaled(m, 'minHP', 'HP', i, l)}-${scaled(m, 'maxHP', 'HP', i, l)}`, String(scaled(m, 'Exp', 'XP', i, l)), String(scaled(m, 'AC', 'AC', i, l))];
  }), [, 'r', 'r', 'r', 'r']) : '';
  return `<a id="${slug(name(m) + '-' + m.Id)}"></a>
## ${name(m)}

${list([
  `ID \`${m.Id}\`${f.length ? ', ' + f.join(', ').toLowerCase() : ''}.`,
  boss ? 'A boss: its level is fixed in each difficulty (one player):' : `Monster level (Normal): ${lvl}. In Nightmare and Hell, the area level.`,
  ...(boss ? [] : [`Normal: ${hp[0]}-${hp[1]} life, ${xp} experience, defense ${scaled(m, 'AC', 'AC', 0, lvl)}.`]),
])}
${fixed ? '\n' + fixed + '\n' : ''}
${res}
${m.TreasureClass ? `\n**Drops** (regular / champion / unique):\n\n${mdTable(['', 'Regular', 'Champion', 'Unique'], tcs)}\n` : ''}${hell.length ? `\n**In Hell** (one player):\n\n${mdTable(['Area', 'Level', 'Life', 'Experience'], hell, [, 'r', 'r', 'r'])}\n` : ''}`;
}

export function render(site) {
  const index = [];
  for (const [base, ms] of families) {
    const p = site.path(`family:mon:${base}`);
    ms.sort((a, b) => int(a.Level) - int(b.Level));
    const types = [...new Set(ms.map((m) => m.MonType).filter(Boolean))];
    const body = `${ms.length === 1 ? 'One variant.' : `${ms.length} variants: ${ms.map((m) => `[${name(m)}](#${slug(name(m) + '-' + m.Id)})`).join(', ')}.`}

Resistances of 100 or more make the monster immune to that damage type. Life and experience are computed from the monster's percentages of the game's per-level table; see ${site.linkPath(p, 'mechanics/monster-level.md', 'Monster level')}.

${ms.map((m) => variant(site, p, m)).join('\n')}`;
    site.page(p, site.ids.get(`family:mon:${base}`).title, { type: 'monster', monster_type: types.join(', ') || undefined }, body);
    index.push([site.link(`${DIR}/index.md`, `family:mon:${base}`), ms.map(name).filter((n, i, a) => a.indexOf(n) === i).join(', '), flags(byId.get(base)).join(', ')]);
  }
  index.sort((a, b) => a[0].localeCompare(b[0]));

  // Super uniques
  const sp = `${DIR}/super-uniques.md`;
  const modName = (id) => monumod.find((u) => u.id === id)?.uniquemod ?? id;
  site.page(sp, 'Super uniques', { type: 'reference' }, `Named unique monsters with fixed modifiers, like Pindleskin and Bishibosh. Each one always spawns in its own spot. Modifier names are the game's internal ones; see ${site.link(sp, 'page:elite-mods', 'Elite modifiers')}.

${mdTable(['Super unique', 'Monster', 'Fixed modifiers', 'Minions', 'Drops (Normal / Nightmare / Hell)'], superuniques.map((s) => [
    str(s.Name) || s.Superunique,
    site.link(sp, `mon:${s.Class}`, name(byId.get(s.Class) ?? {}) || s.Class),
    [s.Mod1, s.Mod2, s.Mod3].filter((x) => x && x !== '0').map(modName).join(', '),
    s.MaxGrp && s.MaxGrp !== '0' ? `${s.MinGrp}-${s.MaxGrp}` : '',
    [s.TC, s['TC(N)'], s['TC(H)']].map((tc) => tcLink(site, sp, tc)).join(' / '),
  ]))}
`);

  // Elite modifiers
  const ep = `${DIR}/elite-modifiers.md`;
  site.page(ep, 'Elite modifiers', { type: 'reference' }, `The modifiers unique and champion monsters can get (monumod). Unique monsters get random ones from this list, super uniques fixed ones as well, and champions have their own set. Names are the game's internal names.

${mdTable(['ID', 'Modifier', 'Enabled', 'Champions', 'Unique pick weight (N / NM / H)'], monumod.filter((u) => u.uniquemod).map((u) => [
    u.id, u.uniquemod, u.enabled === '1' ? 'yes' : 'no', u.champion === '1' ? 'yes' : '', [u.upick, u['upick (N)'], u['upick (H)']].join(' / '),
  ]), ['r'])}
`);

  const ip = `${DIR}/index.md`;
  site.page(ip, 'Monsters', { type: 'index' }, `${list([site.link(ip, 'page:superuniques'), site.link(ip, 'page:elite-mods')])}

## Monster families

${mdTable(['Family', 'Variants', 'Type'], index)}
`);
}
