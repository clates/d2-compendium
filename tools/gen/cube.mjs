// Horadric Cube recipes, grouped by what they make, with crafted items' fixed modifiers.
import { table, int, str, rotwOnly } from '../lib/data.mjs';
import { mdTable, list } from '../lib/md.mjs';
import * as I from '../lib/items.mjs';

const P = 'items/cube-recipes.md';

const GROUPS = [
  ['Quests and portals', (d) => /Portal|Horadric Staff|Khalim|Staff of Kings/i.test(d)],
  ['Crafted items', (d) => /-> (Hit Power|Blood|Caster|Safety) /.test(d)],
  ['Reign of the Warlock crafting', (d, rotw) => rotw && /-> (Virulent|Gelid|Magnetic|Incendiary|Breaching|Mystical) /.test(d)],
  ['Rune upgrades', (d) => /Runes? .*-> \w+ Rune$/.test(d)],
  ['Gem upgrades', (d) => /^3 (Chipped|Flawed|Standard|Flawless) .*-> (Flawed|Standard|Flawless|Perfect) /.test(d)],
  ['Item upgrades (normal to exceptional to elite)', (d) => /-> (Exceptional|Elite) /.test(d)],
  ['Sockets', (d) => /Socketed/.test(d)],
  ['Repair and recharge', (d) => /Repaired|Recharged/.test(d)],
  ['Rerolls and rings, amulets and jewelry', (d) => /Re-rolled|Ring|Amulet|Jewel|Charm|Rare Item/.test(d)],
  ['Potions', (d) => /Potion/.test(d)],
  ['Everything else', () => true],
];

// Input and output flags: the item has to be (or is made) this.
const QUALITY = { low: 'low quality', nor: 'normal', hiq: 'superior', mag: 'magic', set: 'set', rar: 'rare', uni: 'unique', crf: 'crafted', tmp: 'tempered' };
const TIER = { bas: 'normal-tier', exc: 'exceptional', eli: 'elite' };
const INPUT = { nos: 'with no sockets', sock: 'with sockets', eth: 'ethereal', noe: 'not ethereal', nru: 'not a runeword' };
const OUTPUT = {
  mod: 'keeps its modifiers', uns: 'sockets emptied (contents destroyed)', rem: 'socketed items removed', reg: 'unique re-rolled',
  exc: 'upgraded to exceptional', eli: 'upgraded to elite', rep: 'fully repaired', rch: 'charges refilled',
};

const uniqueNames = new Map(table('uniqueitems').map((r) => [r.index.trim(), r]));

/** A base code, item type or unique index, as words, linked where there's a page. */
function itemWords(site, code, upg) {
  if (code === 'any') return 'any item';
  if (uniqueNames.has(code)) return site.has(`uniquename:${code}`) ? site.link(P, `uniquename:${code}`) : str(code);
  if (I.knownCode(code)) {
    const b = I.baseByCode.get(code);
    const name = (c) => (site.has(`base:${c}`) ? site.link(P, `base:${c}`, I.baseName(c)) : I.baseName(c));
    if (upg && b) return [...new Set([code, b.ubercode, b.ultracode].filter((c) => c && I.knownCode(c)))].map(name).join(' / ');
    return name(code);
  }
  const t = I.typeByCode.get(code);
  return t ? `any ${t.ItemType.replace(/^Any /, '')}` : code;
}

function inputWords(site, raw) {
  const [code, ...flags] = raw.replace(/"/g, '').split(',').map((x) => x.trim());
  const qty = flags.find((f) => f.startsWith('qty='));
  const adj = [...flags.filter((f) => TIER[f]).map((f) => TIER[f]), ...flags.filter((f) => QUALITY[f]).map((f) => QUALITY[f])];
  const extra = flags.filter((f) => INPUT[f]).map((f) => INPUT[f]);
  const words = itemWords(site, code, flags.includes('upg'));
  const what = adj.length && words.startsWith('any ') ? `any ${adj.join(' ')} ${words.slice(4)}` : `${adj.length ? adj.join(' ') + ' ' : ''}${words}`;
  return `${qty ? `${qty.slice(4)} × ` : ''}${what}${extra.length ? ` (${extra.join(', ')})` : ''}`;
}

function outputWords(site, r, raw) {
  const [code, ...flags] = raw.replace(/"/g, '').split(',').map((x) => x.trim());
  const what = code === 'useitem' ? 'the same item' : code === 'usetype' ? 'item of the same base' : itemWords(site, code);
  const q = flags.filter((f) => QUALITY[f] && !(code === 'useitem' && f === 'exc')).map((f) => QUALITY[f]);
  const notes = [
    ...flags.filter((f) => OUTPUT[f]).map((f) => OUTPUT[f]),
    ...flags.filter((f) => f.startsWith('sock=')).map((f) => `+${f.slice(5)} socket`),
  ];
  const qty = flags.find((f) => f.startsWith('qty='));
  if (qty && !flags.includes('rep')) notes.unshift(`${qty.slice(4)} of them`);
  if (code === 'useitem' && !notes.length) notes.push('sockets added: a random number, up to what the base can have at its item level');
  const named = `${q.length ? q.join(' ') + ' ' : ''}${what}`;
  return `${code === 'usetype' ? `a new ${named}` : named}${notes.length ? ` (${notes.join(', ')})` : ''}`;
}

export function register(site) { site.register('page:cube', P, 'Horadric Cube recipes'); }

function carrierFor(r) {
  let token = r.output.replace(/"/g, '').split(',')[0];
  if (token === 'usetype' || token === 'useitem') token = r['input 1'].replace(/"/g, '').split(',')[0];
  if (I.knownCode(token)) return token;
  return I.sampleBase(token);
}

export function render(site) {
  const rows = table('cubemain').filter((r) => r.enabled === '1' && r.description.trim());
  const rotw = rotwOnly('cubemain', 'description');
  const prefixes = table('magicprefix');
  const grouped = new Map(GROUPS.map(([g]) => [g, []]));
  for (const r of rows) {
    const d = r.description.trim();
    const g = GROUPS.find(([, test]) => test(d, rotw.has(r.description)))[0];
    const notes = [];
    if (r.firstLadderSeason) notes.push(`ladder ${r.firstLadderSeason}${r.lastLadderSeason ? '-' + r.lastLadderSeason : '+'}`);
    if (r['min diff'] && r['min diff'] !== '0') notes.push(['', 'Nightmare or Hell only', 'Hell only'][int(r['min diff'])]);
    if (r.class) notes.push(`${r.class} only`);
    if (rotw.has(r.description)) notes.push('RotW only');
    if (r.plvl || r.ilvl) notes.push(`item level ${int(r.plvl)}% of character level + ${int(r.ilvl)}% of the input's`);
    const pre = r.output.match(/pre=(\d+)/);
    if (pre) notes.push(`adds the ${prefixes[int(pre[1])]?.Name ?? '?'} prefix`);
    const mods = [1, 2, 3, 4, 5].map((i) => ({ code: r[`mod ${i}`], param: r[`mod ${i} param`], min: int(r[`mod ${i} min`]), max: int(r[`mod ${i} max`]), chance: int(r[`mod ${i} chance`]) })).filter((m) => m.code);
    let fixed = '';
    if (mods.length) {
      const c = carrierFor(r);
      if (c) {
        const always = I.propLines(c, mods.filter((m) => !m.chance || m.chance >= 100));
        const maybe = mods.filter((m) => m.chance && m.chance < 100).map((m) => `${I.propLines(c, [m]).join(', ')} (${m.chance}% chance)`);
        fixed = [...always, ...maybe].join(', ');
      }
    }
    const ins = [1, 2, 3, 4, 5, 6, 7].map((i) => r[`input ${i}`]).filter(Boolean).map((x) => inputWords(site, x));
    const outs = ['output', 'output b', 'output c'].map((k) => r[k]).filter(Boolean).map((x) => outputWords(site, r, x));
    const exact = `${ins.join(' + ')} → ${outs.join(' + ')}`;
    grouped.get(g).push({ d: `${d.replace(/\s+/g, ' ')}<br>*Exactly:* ${exact}`, notes: notes.join(', '), fixed });
  }
  const body = `Every recipe the Horadric Cube accepts: ${rows.length} in all. Put the inputs in the cube and press Transmute. The recipe text is the game's own description of each recipe.

${[...grouped].filter(([, rs]) => rs.length).map(([g]) => `- [${g}](#${g.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')})`).join('\n')}

${[...grouped].filter(([, rs]) => rs.length).map(([g, rs]) => {
    const withMods = rs.some((r) => r.fixed);
    return `## ${g}\n\n` + (withMods
      ? mdTable(['Recipe', 'Fixed modifiers', 'Notes'], rs.map((r) => [r.d, r.fixed, r.notes]))
      : mdTable(['Recipe', 'Notes'], rs.map((r) => [r.d, r.notes])));
  }).join('\n\n')}

## Reading the recipes

The first line of each recipe is the game's own description. Some are out of date (the Sunder charm recipes name items that were renamed), so the *Exactly* line under it is read from the recipe's real inputs and outputs:

${mdTable(['Word', 'Meaning'], [
  ['any Helm, any Weapon...', 'any item of that type, at any tier'],
  ['A / B / C', 'the recipe takes the base at any tier: normal, exceptional or elite (`upg`)'],
  ['normal-tier, exceptional', 'the base has to be that tier (`bas`, `exc`)'],
  ['low quality, normal, magic, rare, set, unique', 'the item has to be that quality; normal means plain white, not superior (`low`, `nor`, `mag`, `rar`, `set`, `uni`)'],
  ['with no sockets / with sockets', '`nos`, `sock`'],
  ['not ethereal', 'ethereal items are refused (`noe`), which is why ethereal items can\'t be repaired in the cube'],
  ['the same item', 'the input item is changed, not replaced (`useitem`)'],
  ['a new item of the same base', 'the input is destroyed and a new item of the same base is rolled (`usetype`)'],
  ['keeps its modifiers', 'upgrades keep every modifier (`mod`); sockets, what is in them, and ethereal state stay too'],
])}

## Crafting

A crafted item gets the fixed modifiers in its row plus random magic affixes. Its item level is half the character's level plus half the input item's level, as the Notes column says; only the input item's level counts, not the jewel's, rune's or gem's. The input's own affixes are lost, since a new item is rolled on the same base.

The number of random affixes depends on that item level:

${mdTable(['Item level', '1 affix', '2 affixes', '3 affixes', '4 affixes'], [
  ['1-30', '40%', '20%', '20%', '20%'],
  ['31-50', '', '60%', '20%', '20%'],
  ['51-70', '', '', '80%', '20%'],
  ['71+', '', '', '', '100%'],
], [, 'r', 'r', 'r', 'r'])}

> **Unverified:** the required level of a crafted item is the highest required level among its affixes, plus 10, plus 3 per affix. Community rule; not in the tables.

## Sockets

The four socket recipes (Tal + Thul + Perfect Topaz for body armor, and so on) only take normal-quality items with no sockets. They don't refuse ethereal items. The number of sockets is random, up to what the base can have at its item level; see ${site.linkPath(P, 'mechanics/sockets-and-runewords.md', 'Sockets and runewords')}. The rare-item recipe with The Stone of Jordan adds exactly one socket.

## Sources

- Tables: \`cubemain.txt\` (inputs, outputs, item levels and modifiers).
- Affix counts and what carries over in crafting: [Maxroll, Crafted Items](https://maxroll.gg/d2/items/crafted-items).
`;
  site.page(P, 'Horadric Cube recipes', { type: 'reference' }, body);
}
