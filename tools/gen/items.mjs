// Items: base families, uniques, sets, runewords, runes, gems and charms/jewels.
import { table, int, str, rotwOnly } from '../lib/data.mjs';
import { mdTable, list, slug } from '../lib/md.mjs';
import * as I from '../lib/items.mjs';

const DIR = 'items';

// Index sections, checked in order against a base's type ancestry.
export const CATEGORIES = [
  ['Helms', ['helm']], ['Body Armor', ['tors']], ['Shields', ['shld']], ['Gloves', ['glov']], ['Boots', ['boot']],
  ['Belts', ['belt']], ['Rings', ['ring']], ['Amulets', ['amul']], ['Charms', ['char']], ['Jewels', ['jewl']],
  ['Axes', ['axe']], ['Swords', ['swor']], ['Daggers', ['knif']], ['Javelins', ['jave']], ['Spears', ['spea']],
  ['Polearms', ['pole']], ['Maces', ['mace', 'club']], ['Hammers', ['hamm']], ['Scepters', ['scep']],
  ['Wands', ['wand']], ['Staves', ['staf']], ['Bows', ['bow']], ['Crossbows', ['xbow']], ['Orbs', ['orb']],
  ['Claws', ['h2h']],
];
export function categoryOf(code) {
  for (const [name, types] of CATEGORIES) if (types.some((t) => I.isType(code, t))) return name;
  return 'Other';
}
const catOrder = (c) => { const i = CATEGORIES.findIndex(([n]) => n === c); return i < 0 ? 99 : i; };

const ladder = (r) => {
  const a = r.firstLadderSeason, b = r.lastLadderSeason;
  if (!a) return undefined;
  return b ? `seasons ${a}-${b}` : `from season ${a}`;
};

/** A two-column facts table, skipping empty rows. */
const facts = (rows) => mdTable(['', ''], rows.filter(([, v]) => v !== undefined && v !== '' && v !== null));

const typeLabel = (c) => I.typeByCode.get(c)?.ItemType ?? c;

// ---------------------------------------------------------------------------------------------
// Data gathering

const weaponsArmor = [...table('weapons').map((r) => ({ ...r, kind: 'weapon' })), ...table('armor').map((r) => ({ ...r, kind: 'armor' }))]
  .filter((b) => b.code && b.spawnable === '1' && !int(b.quest) && I.knownCode(b.code));

// One family per normal-tier base: Cap / War Hat / Shako.
const families = new Map();
for (const b of weaponsArmor) {
  const key = b.normcode || b.code;
  if (!families.has(key)) families.set(key, []);
  families.get(key).push(b);
}
for (const tiers of families.values()) tiers.sort((a, b) => ['Normal', 'Exceptional', 'Elite'].indexOf(I.tierOf(a.code)) - ['Normal', 'Exceptional', 'Elite'].indexOf(I.tierOf(b.code)));
const familyOf = new Map();
for (const [key, tiers] of families) for (const b of tiers) familyOf.set(b.code, key);

// Uniques that never roll at random can still be named directly by a treasure class (the Colossal
// jewels, Latent Sunder charms) or made in the cube (Renewed Sunder charms). Classic: the tables
// characters without Reign of the Warlock use.
function namedInTcs(folder) {
  const out = new Map();
  for (const r of table('treasureclassex', folder)) {
    for (let i = 1; i <= 10; i++) {
      const it = r[`Item${i}`]?.replace(/"/g, '').trim();
      if (it) out.set(it, [...(out.get(it) ?? []), r['Treasure Class']]);
    }
  }
  return out;
}
const tcNamed = namedInTcs();
const tcNamedClassic = namedInTcs('excel-base');
const cubeMade = new Map(table('cubemain').filter((r) => r.enabled === '1').map((r) => [r.output.replace(/"/g, '').split(',')[0].trim(), r]));
const uniqueSource = (r) => {
  const k = r.index.trim();
  return { tcs: tcNamed.get(k), cube: cubeMade.get(k), classic: !tcNamed.has(k) && !cubeMade.has(k) && tcNamedClassic.has(k) };
};
const uniques = table('uniqueitems').filter((r) => {
  if (!r.code || !I.knownCode(r.code) || r.disabled === '1' || int(I.baseByCode.get(r.code)?.quest)) return false;
  const k = r.index.trim();
  return r.spawnable === '1' || tcNamed.has(k) || cubeMade.has(k) || tcNamedClassic.has(k);
});
const rotwUniques = rotwOnly('uniqueitems', 'index');
const setItems = table('setitems').filter((r) => r.item && I.knownCode(r.item) && r.set && r.spawnable === '1' && r.disabled !== '1');
const sets = table('sets').filter((s) => s.index && setItems.some((p) => p.set === s.index));
const runewords = table('runes').filter((r) => r.complete === '1');
const rotwRunewords = rotwOnly('runes', 'Name');
const gems = table('gems');
const misc = table('misc');
const miscByCode = new Map(misc.map((m) => [m.code, m]));
const runeRows = gems.filter((g) => /^r\d\d$/.test(g.code));
const runeName = (code) => str(miscByCode.get(code)?.namestr) || code;

/** Socket bonuses of one gem or rune row, for a slot: weapon, helm (armor and helms) or shield. */
function socketProps(g, slot) {
  return [1, 2, 3].map((i) => ({ code: g[`${slot}Mod${i}Code`], param: g[`${slot}Mod${i}Param`], min: int(g[`${slot}Mod${i}Min`]), max: int(g[`${slot}Mod${i}Max`]) })).filter((p) => p.code);
}
const SLOTS = [['weapon', 'Weapons', 'weap'], ['helm', 'Body armor and helms', 'tors'], ['shield', 'Shields', 'shie']];
const slotOfType = (type) => (I.typeAncestry(type).includes('weap') ? 'weapon' : I.typeAncestry(type).includes('shld') ? 'shield' : 'helm');

const cubemain = table('cubemain');

// ---------------------------------------------------------------------------------------------

/** What tells same-named uniques apart (the eight Rainbow Facets): element and trigger. */
function variantLabel(r) {
  const text = I.ownMods(r.code, I.Q.unique, r._row).mods.join(' ');
  const element = text.match(/(Fire|Cold|Lightning|Poison|Magic) Skill Damage/)?.[1];
  const trigger = /when you Die/i.test(text) ? 'Death' : /Level-?Up/i.test(text) ? 'Level-Up' : undefined;
  return [element, trigger].filter(Boolean).join(', ') || `#${r._row}`;
}

export function register(site) {
  for (const [key, tiers] of families) {
    const title = tiers.map((b) => I.baseName(b.code)).join(' / ');
    site.register(`family:${key}`, site.claim(`${DIR}/bases`, I.baseName(tiers[0].code)), title);
    for (const b of tiers) site.ids.set(`base:${b.code}`, { path: site.path(`family:${key}`), title: I.baseName(b.code) });
  }
  const count = new Map();
  for (const r of uniques) count.set(str(r.index), (count.get(str(r.index)) ?? 0) + 1);
  for (const r of uniques) {
    let name = str(r.index);
    if (count.get(str(r.index)) > 1) name += ` (${variantLabel(r)})`;
    site.register(`unique:${r._row}`, site.claim(`${DIR}/uniques`, name), name);
    site.ids.set(`uniquename:${r.index.trim()}`, site.ids.get(`unique:${r._row}`));
  }
  for (const s of sets) site.register(`set:${s.index}`, site.claim(`${DIR}/sets`, str(s.name)), str(s.name));
  for (const r of setItems) {
    const set = site.path(`set:${r.set}`);
    if (set) site.ids.set(`setitem:${r._row}`, { path: `${set}#${slug(str(r.index))}`, title: str(r.index) });
  }
  for (const r of runewords) site.register(`runeword:${r.Name}`, site.claim(`${DIR}/runewords`, r['*Rune Name']), r['*Rune Name']);
  site.register('page:runes', `${DIR}/runes.md`, 'Runes');
  for (const g of runeRows) site.ids.set(`rune:${g.code}`, { path: `${DIR}/runes.md#${slug(runeName(g.code))}`, title: runeName(g.code) });
  site.register('page:gems', `${DIR}/gems.md`, 'Gems');
  for (const k of ['uniques', 'sets', 'runewords', 'bases']) site.register(`index:${k}`, `${DIR}/${k}/index.md`, k);
}

export function render(site) {
  renderUniques(site);
  renderSets(site);
  renderRunewords(site);
  renderBases(site);
  renderRunes(site);
  renderGems(site);
  renderItemsIndex(site);
}

// ---------------------------------------------------------------------------------------------

function cubeText(site, p, r) {
  const input = r['input 1'].replace(/"/g, '').split(',')[0].trim();
  const named = site.has(`uniquename:${input}`) ? ` The unique that goes in is ${site.link(p, `uniquename:${input}`)}; the recipe text uses older names.` : '';
  return `It's made in the ${site.link(p, 'page:cube', 'Horadric Cube')}: ${r.description.trim().replace(/\s+/g, ' ')}.${named}`;
}

function baseLink(site, from, code) {
  return site.link(from, `base:${code}`, I.baseName(code));
}

function renderUniques(site) {
  const rows = [];
  const byBase = new Map();
  for (const r of uniques) {
    if (!byBase.has(r.code)) byBase.set(r.code, []);
    byBase.get(r.code).push(r);
  }
  let problems = 0;
  for (const r of uniques) {
    const id = `unique:${r._row}`;
    const p = site.path(id);
    const name = site.ids.get(id).title;
    const { implicit, mods, problems: n } = I.ownMods(r.code, I.Q.unique, r._row);
    problems += n;
    const lvl = I.reqLevel(r.code, I.Q.unique, r._row);
    const tier = I.tierOf(r.code);
    const cat = categoryOf(r.code);
    const src = uniqueSource(r);
    const random = r.spawnable === '1';
    const rotw = rotwUniques.has(r.index) || (!random && !src.classic && !tcNamedClassic.has(r.index.trim()));
    const siblings = byBase.get(r.code).filter((x) => x !== r && x.spawnable === '1');
    const shared = siblings.length
      ? `\n\n## Same base\n\nWhen a unique ${I.baseName(r.code)} drops, the game picks among the uniques of that base whose qlvl is at most the item level, weighted by rarity.\n\n` +
        mdTable(['Unique', 'qlvl', 'Rarity'], [[name, r.lvl, r.rarity], ...siblings.map((x) => [site.link(p, `unique:${x._row}`), x.lvl, x.rarity])])
      : '';
    const body = `Unique ${baseLink(site, p, r.code)}${tier ? ` (${tier})` : ''}, ${cat.toLowerCase().replace(/s$/, '')}.

${facts([
  ['Required level', String(lvl)],
  ['Quality level (qlvl)', r.lvl],
  ['Rarity', r.rarity],
  ['Ladder', ladder(r)],
  ['Reign of the Warlock only', rotw ? 'Yes' : undefined],
  ['Characters without Reign of the Warlock only', src.classic ? 'Yes' : undefined],
  ['Tracked in the Chronicle', r.disableChronicle === '1' ? 'No' : undefined],
])}

## Properties

${list(mods)}
${implicit.length ? `\n## Base\n\n${list(implicit)}\n` : ''}
## ${random ? 'Dropping' : 'Where it comes from'}

${[
  random ? `This unique can only roll on a ${I.baseName(r.code)} whose item level is at least ${r.lvl}. See ${site.linkPath(p, 'mechanics/item-generation.md', 'Item generation')}.` : `This unique never rolls when a ${I.baseName(r.code)} drops as a unique (\`spawnable\` is off).`,
  src.tcs ? `It drops by name from ${[...new Set(src.tcs)].map((t) => site.link(p, `tc:${t}`, t)).join(', ')}.` : '',
  src.classic ? `For characters without Reign of the Warlock it drops by name from the ${[...new Set(tcNamedClassic.get(r.index.trim()))].join(', ')} treasure class; Reign of the Warlock characters get the Latent version instead.` : '',
  src.cube ? cubeText(site, p, src.cube) : '',
].filter(Boolean).join(' ')}${random ? shared : ''}
`;
    site.page(p, name, {
      type: 'unique', base: I.baseName(r.code), category: cat, tier: tier || undefined, req_level: lvl,
      qlvl: int(r.lvl), rotw_only: rotw || undefined,
    }, body);
    rows.push({ cat, name: site.link(`${DIR}/uniques/index.md`, id), base: I.baseName(r.code), tier, lvl, qlvl: int(r.lvl), rotw });
  }
  if (problems) console.log(`uniques: ${problems} stats the tooltip engine couldn't place`);

  const cats = [...new Set(rows.map((r) => r.cat))].sort((a, b) => catOrder(a) - catOrder(b));
  const tierN = (t) => ['Normal', 'Exceptional', 'Elite', ''].indexOf(t);
  const body = `Every unique item that can drop: ${rows.length} in all. Reign of the Warlock additions are marked †.

${cats.map((c) => `- [${c}](#${slug(c)})`).join('\n')}

${cats.map((c) => `## ${c}\n\n` + mdTable(['Unique', 'Base', 'Tier', 'Req level', 'qlvl'],
    rows.filter((r) => r.cat === c).sort((a, b) => tierN(a.tier) - tierN(b.tier) || a.lvl - b.lvl || a.name.localeCompare(b.name))
      .map((r) => [r.name + (r.rotw ? ' †' : ''), r.base, r.tier, String(r.lvl), String(r.qlvl)]), [, , , 'r', 'r'])).join('\n\n')}
`;
  site.page(`${DIR}/uniques/index.md`, 'Unique items', { type: 'index' }, body);
}

function setBonusProps(s, n) {
  return ['a', 'b'].map((h) => ({ code: s[`PCode${n}${h}`], param: s[`PParam${n}${h}`], min: int(s[`PMin${n}${h}`]), max: int(s[`PMax${n}${h}`]) })).filter((p) => p.code);
}

function renderSets(site) {
  const rows = [];
  for (const s of sets) {
    const p = site.path(`set:${s.index}`);
    const pieces = setItems.filter((x) => x.set === s.index);
    const code = pieces[0].item;
    const partial = [];
    for (let n = 2; n <= 5; n++) {
      const lines = I.propLines(code, setBonusProps(s, n));
      if (lines.length) partial.push(`**${n} items:** ${lines.join(', ')}`);
    }
    const full = I.propLines(code, [1, 2, 3, 4, 5, 6, 7, 8]
      .map((i) => ({ code: s[`FCode${i}`], param: s[`FParam${i}`], min: int(s[`FMin${i}`]), max: int(s[`FMax${i}`]) })).filter((x) => x.code));
    const levels = [];
    const sections = pieces.map((r) => {
      const { implicit, mods } = I.ownMods(r.item, I.Q.set, r._row);
      const lvl = I.reqLevel(r.item, I.Q.set, r._row);
      levels.push(lvl);
      const own = [];
      if (int(r['add func'])) {
        for (let n = 1; n <= 5; n++) {
          const props = ['a', 'b'].map((h) => ({ code: r[`aprop${n}${h}`], param: r[`apar${n}${h}`], min: int(r[`amin${n}${h}`]), max: int(r[`amax${n}${h}`]) })).filter((x) => x.code);
          const lines = I.propLines(r.item, props);
          if (lines.length) own.push(`**${n + 1} items:** ${lines.join(', ')}`);
        }
      }
      return `## ${str(r.index)}

${baseLink(site, p, r.item)}${I.tierOf(r.item) ? ` (${I.tierOf(r.item)})` : ''}. Required level ${lvl}, qlvl ${r.lvl}, rarity ${r.rarity}.${ladder(r) ? ` Ladder: ${ladder(r)}.` : ''}

${list(mods)}
${own.length ? `\nWhile wearing more of the set (green text on this piece):\n\n${list(own)}\n` : ''}${implicit.length ? `\nBase: ${implicit.join(' · ')}\n` : ''}`;
    });
    const body = `${pieces.length}-piece set.

${mdTable(['Piece', 'Base', 'Req level'], pieces.map((r, i) => [`[${str(r.index)}](#${slug(str(r.index))})`, I.baseName(r.item), String(levels[i])]), [, , 'r'])}

## Set bonuses

${partial.length ? list(partial) + '\n\n' : ''}**Full set:**

${list(full)}

${sections.join('\n')}`;
    site.page(p, str(s.name), { type: 'set', pieces: pieces.length, req_level: Math.max(...levels) }, body);
    rows.push([site.link(`${DIR}/sets/index.md`, `set:${s.index}`), String(pieces.length), String(Math.max(...levels))]);
  }
  site.page(`${DIR}/sets/index.md`, 'Sets', { type: 'index' },
    `All ${rows.length} sets. Each page lists every piece, its own bonuses and the set bonuses.\n\n` +
    mdTable(['Set', 'Pieces', 'Highest req level'], rows, [, 'r', 'r']));
}

function runewordProps(r) {
  return [1, 2, 3, 4, 5, 6, 7].map((i) => ({ code: r[`T1Code${i}`], param: r[`T1Param${i}`], min: int(r[`T1Min${i}`]), max: int(r[`T1Max${i}`]) })).filter((x) => x.code);
}
const runesOf = (r) => [1, 2, 3, 4, 5, 6].map((i) => r[`Rune${i}`]).filter(Boolean);
const runeLevel = (code) => int(miscByCode.get(code)?.levelreq);

function renderRunewords(site) {
  const rows = [];
  for (const r of runewords) {
    const id = `runeword:${r.Name}`;
    const p = site.path(id);
    const runes = runesOf(r);
    const types = [1, 2, 3, 4, 5, 6].map((i) => r[`itype${i}`]).filter(Boolean);
    const excluded = [1, 2, 3].map((i) => r[`etype${i}`]).filter(Boolean);
    const slots = [...new Set(types.map(slotOfType))];
    const lvl = Math.max(...runes.map(runeLevel));
    const rotw = rotwRunewords.has(r.Name);
    const bySlot = slots.map((slot) => {
      const [, label, fallback] = SLOTS.find(([s]) => s === slot);
      const carrier = types.map(I.sampleBase).find((c) => c && slotOfType(I.baseByCode.get(c).type) === slot) ?? I.sampleBase(fallback);
      const props = [...runewordProps(r), ...runes.flatMap((c) => socketProps(gems.find((g) => g.code === c), slot))];
      return { label, lines: I.propLines(carrier, props) };
    });
    const body = `${runes.map((c) => site.link(p, `rune:${c}`, runeName(c).replace(' Rune', ''))).join(' + ')} in a ${runes.length}-socket ${types.map(typeLabel).join(', ').toLowerCase()}${excluded.length ? ` (not ${excluded.map(typeLabel).join(', ').toLowerCase()})` : ''}.

${facts([
  ['Sockets', String(runes.length)],
  ['Rune order', runes.map(runeName).join(', ')],
  ['Required level', `${lvl} (the highest rune's)`],
  ['Fits', types.map(typeLabel).join(', ')],
  ['Excludes', excluded.map(typeLabel).join(', ')],
  ['Ladder', ladder(r)],
  ['Reign of the Warlock only', rotw ? 'Yes' : undefined],
])}

## Properties

${bySlot.length === 1 ? list(bySlot[0].lines) : bySlot.map((s) => `### ${s.label}\n\n${list(s.lines)}`).join('\n\n')}

The list includes the runes' own socket bonuses. The base must be a normal, superior or low-quality item (not magic, rare, set or unique) with exactly ${runes.length} empty sockets, and the runes go in in the order above. See ${site.linkPath(p, 'mechanics/sockets-and-runewords.md', 'Sockets and runewords')}.
`;
    site.page(p, r['*Rune Name'], { type: 'runeword', runes: runes.map((c) => runeName(c).replace(' Rune', '')), sockets: runes.length, req_level: lvl, rotw_only: rotw || undefined }, body);
    rows.push({ name: site.link(`${DIR}/runewords/index.md`, id), runes: runes.map((c) => runeName(c).replace(' Rune', '')).join(' '), n: runes.length, types: types.map(typeLabel).join(', '), lvl, lad: ladder(r) ?? '', rotw });
  }
  rows.sort((a, b) => a.lvl - b.lvl || a.name.localeCompare(b.name));
  site.page(`${DIR}/runewords/index.md`, 'Runewords', { type: 'index' },
    `All ${rows.length} runewords, by required level. Reign of the Warlock additions are marked †.\n\n` +
    mdTable(['Runeword', 'Runes', 'Sockets', 'Fits', 'Req level', 'Ladder'], rows.map((r) => [r.name + (r.rotw ? ' †' : ''), r.runes, String(r.n), r.types, String(r.lvl), r.lad]), [, , 'r', , 'r']));
}

/** Socket limits by item level for one base: [[ilvlFrom, ilvlTo, n], ...]. */
function socketCaps(b) {
  const t = I.typeByCode.get(b.type);
  const max = int(b.gemsockets);
  if (!t || !max) return [];
  const t1 = int(t.MaxSocketsLevelThreshold1), t2 = int(t.MaxSocketsLevelThreshold2);
  return [[1, t1, int(t.MaxSockets1)], [t1 + 1, t2, int(t.MaxSockets2)], [t2 + 1, 99, int(t.MaxSockets3)]].map(([a, z, n]) => [a, z, Math.min(n, max)]);
}
function socketText(b) {
  const caps = socketCaps(b);
  if (!caps.length) return '0';
  if (caps.every(([, , n]) => n === caps[0][2])) return String(caps[0][2]);
  return caps.map(([a, z, n]) => `${n} (ilvl ${a}${z === 99 ? '+' : `-${z}`})`).join(', ');
}

function renderBases(site) {
  const uniqueByBase = new Map();
  for (const r of uniques) { if (!uniqueByBase.has(r.code)) uniqueByBase.set(r.code, []); uniqueByBase.get(r.code).push(r); }
  const setByBase = new Map();
  for (const r of setItems) { if (!setByBase.has(r.item)) setByBase.set(r.item, []); setByBase.get(r.item).push(r); }
  const index = [];
  for (const [key, tiers] of families) {
    const p = site.path(`family:${key}`);
    const first = tiers[0];
    const cat = categoryOf(first.code);
    const isWeapon = first.kind === 'weapon';
    const head = ['', ...tiers.map((b) => `${I.baseName(b.code)} (${I.tierOf(b.code)})`)];
    const row = (label, f) => [label, ...tiers.map(f)];
    const stats = [
      row('Quality level', (b) => b.level),
      row('Required level', (b) => b.levelreq || '0'),
      row('Required Strength', (b) => b.reqstr || '0'),
      row('Required Dexterity', (b) => b.reqdex || '0'),
      ...(isWeapon ? [
        row('One-hand damage', (b) => (b.mindam ? `${b.mindam}-${b.maxdam}` : '')),
        row('Two-hand damage', (b) => (b['2handmindam'] ? `${b['2handmindam']}-${b['2handmaxdam']}` : '')),
        row('Throw damage', (b) => (b.minmisdam ? `${b.minmisdam}-${b.maxmisdam}` : '')),
        row('Weapon speed modifier', (b) => b.speed || '0'),
        row('Range adder', (b) => b.rangeadder || '0'),
      ] : [
        row('Defense', (b) => `${b.minac}-${b.maxac}`),
        row('Block', (b) => (b.block && b.block !== '0' ? `${b.block}%` : '')),
        row('Smite damage', (b) => (I.isType(b.code, 'shld') && b.mindam ? `${b.mindam}-${b.maxdam}` : '')),
        row('Kick damage', (b) => (I.isType(b.code, 'boot') && b.mindam ? `${b.mindam}-${b.maxdam}` : '')),
      ]),
      row('Durability', (b) => (b.nodurability === '1' ? 'Indestructible' : b.durability)),
      row('Max sockets', socketText),
      row('Size', (b) => `${b.invwidth}x${b.invheight}`),
    ].filter((r) => r.slice(1).some((c) => c !== '' && c !== undefined));
    const named = [];
    for (const b of tiers) {
      for (const u of uniqueByBase.get(b.code) ?? []) named.push(`${site.link(p, `unique:${u._row}`)} (unique ${I.baseName(b.code)})`);
      for (const s of setByBase.get(b.code) ?? []) named.push(`${site.link(p, `setitem:${s._row}`)} (set ${I.baseName(b.code)}, ${site.link(p, `set:${s.set}`)})`);
    }
    const fitting = runewords.filter((r) => {
      const types = [1, 2, 3, 4, 5, 6].map((i) => r[`itype${i}`]).filter(Boolean);
      const ex = [1, 2, 3].map((i) => r[`etype${i}`]).filter(Boolean);
      const n = runesOf(r).length;
      return tiers.some((b) => types.some((t) => I.isType(b.code, t)) && !ex.some((t) => I.isType(b.code, t)) && Math.max(...socketCaps(b).map(([, , c]) => c), 0) >= n);
    });
    const type = typeLabel(first.type);
    const body = `${type}${first.type2 ? ` (also ${typeLabel(first.type2)})` : ''}.

${mdTable(head, stats)}

${tiers.map((b) => `**${I.baseName(b.code)}:** ${I.baseLines(b.code).join(' · ')}`).join('\n\n')}
${named.length ? `\n## Uniques and set items\n\n${list(named)}\n` : ''}${fitting.length ? `\n## Runewords that fit\n\nThe socket count must match exactly, and the item must be able to get that many. See ${site.linkPath(p, 'mechanics/sockets-and-runewords.md', 'Sockets and runewords')}.\n\n${fitting.map((r) => site.link(p, `runeword:${r.Name}`) + ` (${runesOf(r).length})`).join(', ')}\n` : ''}`;
    site.page(p, site.ids.get(`family:${key}`).title, { type: 'base', category: cat, item_type: type }, body);
    index.push({ cat, link: site.link(`${DIR}/bases/index.md`, `family:${key}`), type, lvl: tiers.map((b) => b.levelreq || '0').join(' / ') });
  }
  const cats = [...new Set(index.map((r) => r.cat))].sort((a, b) => catOrder(a) - catOrder(b));
  site.page(`${DIR}/bases/index.md`, 'Base items', { type: 'index' },
    `Every weapon and armor base, grouped with its exceptional and elite versions. Required levels are normal / exceptional / elite.\n\n` +
    cats.map((c) => `## ${c}\n\n` + mdTable(['Base', 'Type', 'Req level'], index.filter((r) => r.cat === c).map((r) => [r.link, r.type, r.lvl]))).join('\n\n'));
}

function renderRunes(site) {
  const p = 'items/runes.md';
  const rows = runeRows.map((g) => {
    const m = miscByCode.get(g.code);
    const cell = (slot) => I.propLines(I.sampleBase(SLOTS.find(([s]) => s === slot)[2]), socketProps(g, slot)).join(', ');
    return { g, m, name: runeName(g.code), lvl: int(m?.levelreq), weapon: cell('weapon'), helm: cell('helm'), shield: cell('shield') };
  });
  const recipes = cubemain.filter((c) => c.enabled === '1' && /^r\d\d$/.test(c.output) && /Rune/.test(c.description));
  const body = `All ${rows.length} runes in order. A rune in a socket gives a different bonus in a weapon, in body armor or a helm, and in a shield.

${mdTable(['#', 'Rune', 'Req level', 'Weapon', 'Armor or helm', 'Shield'], rows.map((r, i) => [String(i + 1), `<a id="${slug(r.name)}"></a>${r.name.replace(' Rune', '')}`, String(r.lvl), r.weapon, r.helm, r.shield]), ['r', , 'r'])}

## Cube upgrades

${list(recipes.map((c) => c.description.trim() + (c.firstLadderSeason ? ` (ladder ${c.firstLadderSeason}${c.lastLadderSeason ? '-' + c.lastLadderSeason : '+'})` : '')))}

## Runewords by rune

${rows.map((r) => {
    const used = runewords.filter((w) => runesOf(w).includes(r.g.code));
    return `**${r.name.replace(' Rune', '')}:** ${used.length ? used.map((w) => site.link(p, `runeword:${w.Name}`)).join(', ') : 'none'}`;
  }).join('\n\n')}
`;
  site.page(p, 'Runes', { type: 'reference' }, body);
}

function renderGems(site) {
  const p = 'items/gems.md';
  const list_ = gems.filter((g) => !/^r\d\d$/.test(g.code) && miscByCode.has(g.code));
  const cell = (g, slot) => I.propLines(I.sampleBase(SLOTS.find(([s]) => s === slot)[2]), socketProps(g, slot)).join(', ');
  const kinds = new Map();
  for (const g of list_) {
    const kind = typeLabel(miscByCode.get(g.code).type);
    if (!kinds.has(kind)) kinds.set(kind, []);
    kinds.get(kind).push(g);
  }
  const body = `Every gem grade and what it gives in a socket. Required levels are the gem's own.

${[...kinds].map(([kind, gs]) => `## ${kind}\n\n` + mdTable(['Gem', 'Req level', 'Weapon', 'Armor or helm', 'Shield'],
    gs.map((g) => [str(miscByCode.get(g.code).namestr), miscByCode.get(g.code).levelreq || '0', cell(g, 'weapon'), cell(g, 'helm'), cell(g, 'shield')]), [, 'r'])).join('\n\n')}

## Cube upgrades

Three gems of one grade make one of the next grade. Gem recipes in the cube:

${list(cubemain.filter((c) => c.enabled === '1' && /Gem|Skull|Amethyst|Diamond|Emerald|Ruby|Sapphire|Topaz/.test(c.description) && /^g/.test(c.output)).map((c) => c.description.trim()))}
`;
  site.page(p, 'Gems', { type: 'reference' }, body);
}

function renderItemsIndex(site) {
  const p = 'items/index.md';
  site.page(p, 'Items', { type: 'index' }, `
- ${site.linkPath(p, 'items/bases/index.md', 'Base items')}: every weapon and armor, with sockets, uniques and runewords that fit.
- ${site.linkPath(p, 'items/uniques/index.md', 'Unique items')}: ${uniques.length} uniques.
- ${site.linkPath(p, 'items/sets/index.md', 'Sets')}: ${sets.length} sets, ${setItems.length} pieces.
- ${site.linkPath(p, 'items/runewords/index.md', 'Runewords')}: ${runewords.length} runewords.
- ${site.linkPath(p, 'items/runes.md', 'Runes')} and ${site.linkPath(p, 'items/gems.md', 'Gems')}: socket bonuses and upgrades.
- ${site.linkPath(p, 'items/affixes/index.md', 'Magic affixes')}: every prefix and suffix, with levels and item types.
- ${site.linkPath(p, 'items/cube-recipes.md', 'Horadric Cube recipes')}.
`);
}
