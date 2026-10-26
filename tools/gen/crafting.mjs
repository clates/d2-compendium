// Crafting guides: one page per crafted-item recipe. Who would craft it and which affixes they
// want is hand-written (PLANS); which tier of each affix the base can roll, the item level that
// tier needs and the targets to aim for are computed from the affix and base tables.
import { table, int, str } from '../lib/data.mjs';
import { mdTable, slug } from '../lib/md.mjs';
import * as I from '../lib/items.mjs';

const DIR = 'items/crafting';
const CRAFT = /-> ((Hit Power|Blood|Caster|Safety) \w+)$/;

// Affix groups by mod code. Several codes are one stat at different strengths (cast1 10% FCR,
// cast3 20%...), so a want lists them all and the best tier the base can roll wins.
const FCR = ['cast1', 'cast2', 'cast3'];
const IAS = ['swing1', 'swing2', 'swing3'];
const FHR = ['balance1', 'balance2', 'balance3'];
const FRW = ['move1', 'move2', 'move3'];
const W = {
  fcr: ['Faster Cast Rate', FCR], ias: ['Increased Attack Speed', IAS], fhr: ['Faster Hit Recovery', FHR], frw: ['Faster Run/Walk', FRW],
  life: ['Life', ['hp']], mana: ['Mana', ['mana']], str: ['Strength', ['str']], dex: ['Dexterity', ['dex']], enr: ['Energy', ['enr']],
  allres: ['All Resistances', ['res-all']], fire: ['Fire Resist', ['res-fire']], cold: ['Cold Resist', ['res-cold']], ltng: ['Lightning Resist', ['res-ltng']], pois: ['Poison Resist', ['res-pois']],
  ll: ['Life Leech', ['lifesteal']], ml: ['Mana Leech', ['manasteal']], ar: ['Attack Rating', ['att']], ed: ['Enhanced Damage', ['dmg%']], maxdmg: ['Maximum Damage', ['dmg-max']],
  def: ['Enhanced Defense', ['ac%']], dr: ['Damage Reduced', ['red-dmg']], mdr: ['Magic Damage Reduced', ['red-mag']], block: ['Increased Chance of Blocking', ['block']],
  regen: ['Replenish Life', ['regen']], mf: ['Magic Find', ['mag%']], ease: ['Requirements', ['ease']],
};
const tab = (n, label) => [label, [`skilltab/${n}`]];
const cls = (code, label) => [label, [code]];

// Who crafts each recipe, why, the base they'd put in, and what they want, best first.
const PLANS = {
  'Hit Power Helm': { who: 'An Act 2 mercenary', base: 'uhl', why: 'A Giant Conch is cheap to find, and the fixed Defense vs. Missile and thorns cost the mercenary nothing. Rolling life and two resistances on top makes a stopgap until a runeword or unique helm.', want: [W.life, W.fire, W.ltng, W.cold, W.def] },
  'Hit Power Boots': { who: 'A kicking Assassin (Dragon Talon)', base: 'umb', why: 'Boots add their damage to kicks, so a heavy base matters more than for anyone else, and the fixed Defense vs. Melee helps a character who stands in melee range.', want: [W.frw, W.dex, W.fire, W.ltng, W.cold] },
  'Hit Power Gloves': { who: 'A Javelin Amazon', base: 'umg', why: 'The best possible roll is +2 to Javelin and Spear skills with 20% attack speed, which no unique gloves offer together. Knockback is a nuisance with melee but harmless when throwing.', want: [tab(2, '+ Javelin and Spear skills'), W.ias, W.str, W.dex, W.fire, W.ltng] },
  'Hit Power Belt': { who: 'A melee character short on Strength', base: 'utc', why: 'Belts are where Strength rolls highest (of Atlas). Damage Taken Goes to Mana helps characters who use mana on every attack.', want: [W.str, W.life, W.fhr, W.fire, W.ltng, W.cold] },
  'Hit Power Shield': { who: 'A Zeal Paladin before a Spirit shield', base: 'uts', why: 'Wards can roll +skills to Paladin skill trees and all resistances. The fixed block chance helps a character who gets hit a lot.', want: [cls('pal', '+ Paladin skills'), tab(9, '+ Paladin Combat Skills'), W.allres, W.fhr, W.life] },
  'Hit Power Body': { who: 'A melee character on a budget', base: 'uld', why: 'The fixed Faster Hit Recovery is rare on body armor, and the body is one of the few slots where Strength and damage reduction roll together.', want: [W.str, W.life, W.dr, W.fhr, W.def] },
  'Hit Power Amulet': { who: 'A Barbarian', base: 'amu', why: 'Amulets roll +2 to Barbarian skills, and the suffix side offers Strength, Dexterity and life. The fixed modifiers are filler.', want: [cls('bar', '+ Barbarian skills'), W.allres, W.str, W.dex, W.life, W.ll] },
  'Hit Power Ring': { who: 'A Bow Amazon', base: 'rin', why: 'The fixed Dexterity adds to the bow damage she gains from Dexterity, so the ring has a head start on her main stat.', want: [W.dex, W.ar, W.ll, W.str, W.life, W.allres] },
  'Hit Power Weapon': { who: 'A Blessed Hammer Paladin', base: '7ws', why: 'Blunt weapons include scepters. A Caduceus can roll +2 Paladin skills, +2 Combat Skills (Blessed Hammer) and Faster Cast Rate on the same item.', want: [cls('pal', '+ Paladin skills'), tab(9, '+ Paladin Combat Skills'), W.fcr, W.str, W.mana] },
  'Blood Helm': { who: 'A Frenzy Barbarian', base: 'ulm', why: 'The fixed Deadly Strike, leech and life are melee stats. An Armet also rolls +Combat Skills for the Barbarian, which a plain helm otherwise can\'t.', want: [tab(12, '+ Barbarian Combat Skills'), W.life, W.fire, W.ltng, W.def] },
  'Blood Boots': { who: 'Any melee character', base: 'utb', why: 'Leech, life and Replenish Life are fixed, so the random affixes only have to bring run speed, Dexterity and resistances.', want: [W.frw, W.dex, W.fire, W.ltng, W.cold] },
  'Blood Gloves': { who: 'A Zeal Paladin or any physical melee', base: 'uvg', why: 'Crushing Blow is fixed. Add 20% attack speed, Strength, Dexterity and leech and the gloves can beat most uniques for a melee build.', want: [W.ias, W.str, W.dex, W.ll, W.fire, W.ltng] },
  'Blood Belt': { who: 'A Smiter or other single-target melee', base: 'umc', why: 'Open Wounds is fixed and stacks well with Crushing Blow from Blood Gloves. Strength and hit recovery are the rolls that matter.', want: [W.str, W.life, W.fhr, W.fire, W.ltng] },
  'Blood Shield': { who: 'A Paladin levelling with a Zeal build', base: 'upk', why: 'A Blade Barrier can roll +Paladin skills and all resistances, and the fixed leech and thorns suit a melee character.', want: [cls('pal', '+ Paladin skills'), W.allres, W.fhr, W.life, W.block] },
  'Blood Body': { who: 'An Act 5 Barbarian mercenary', base: 'ult', why: 'Mercenaries benefit from leech more than anyone, and Hellforge Plate gives them a high base defense.', want: [W.str, W.life, W.dr, W.def, W.fhr] },
  'Blood Amulet': { who: 'A Whirlwind Barbarian', base: 'amu', why: 'The fixed run speed, leech and life are all things he wants, so the random affixes can go to +Barbarian skills and stats.', want: [cls('bar', '+ Barbarian skills'), W.str, W.dex, W.allres, W.life] },
  'Blood Ring': { who: 'A Fury Druid or other physical melee', base: 'rin', why: 'Leech and Strength are fixed. Attack rating and Dexterity are the usual hunt.', want: [W.ar, W.dex, W.str, W.life, W.allres] },
  'Blood Weapon': { who: 'A Whirlwind Barbarian', base: '7wa', why: 'A Berserker Axe can roll +Barbarian skills, Enhanced Damage and attack speed. The fixed Enhanced Damage and leech add to them.', want: [cls('bar', '+ Barbarian skills'), tab(13, '+ Barbarian Masteries'), W.ed, W.ias, W.maxdmg] },
  'Caster Helm': { who: 'A Mind Blast Assassin', base: 'usk', why: 'Demonheads roll +Shadow Disciplines skills, and the fixed mana leech and regeneration keep her mana up between casts.', want: [tab(19, '+ Assassin Shadow Disciplines'), W.life, W.fire, W.ltng, W.cold] },
  'Caster Boots': { who: 'Any caster', base: 'ulb', why: 'The fixed mana suits a caster. The prize is 30% run speed with two resistances and Dexterity for blocking.', want: [W.frw, W.fire, W.ltng, W.cold, W.dex, W.mana] },
  'Caster Gloves': { who: 'A martial-arts Assassin (Phoenix Strike)', base: 'ulg', why: 'Gloves can roll +Martial Arts skills, and the fixed mana per kill and regeneration suit a build that spends mana on every charge-up.', want: [tab(20, '+ Assassin Martial Arts'), W.ias, W.str, W.dex, W.fire, W.ltng] },
  'Caster Belt': { who: 'A Sorceress chasing a cast-rate breakpoint', base: 'uvc', why: 'Faster Cast Rate is fixed, and no other belt slot item gives it alongside life and Strength. It\'s often what lets a character reach the next breakpoint.', want: [W.str, W.life, W.fhr, W.fire, W.ltng, W.cold] },
  'Caster Shield': { who: 'A Sorceress or Necromancer who wants a shield over Spirit', base: 'uml', why: 'A Luna can roll all resistances, life and hit recovery, and the fixed block chance adds to a high base block.', want: [W.allres, W.life, W.fhr, W.str, W.def] },
  'Caster Body': { who: 'A caster short on Strength', base: 'utp', why: 'Archon Plate can roll of the Titan (+20 Strength) and life on a body armor with a low Strength requirement.', want: [W.str, W.life, W.fhr, W.dr, W.def] },
  'Caster Amulet': { who: 'A Sorceress', base: 'amu', why: 'The amulet that people craft most: fixed Faster Cast Rate, and amulets can roll +2 to Sorceress skills. With Strength or Dexterity on the suffix side it rivals Mara\'s.', want: [cls('sor', '+ Sorceress skills'), W.allres, W.str, W.dex, W.life] },
  'Caster Ring': { who: 'Any caster', base: 'rin', why: 'Faster Cast Rate on a ring is rare. With resistances and Strength or Dexterity it saves points for Vitality.', want: [W.fcr, W.allres, W.str, W.dex, W.life, W.mana] },
  'Caster Weapon': { who: 'A Poison or Bone Necromancer', base: '7bw', why: 'Rods include wands. A Lich Wand can roll +2 Necromancer skills, +2 Poison and Bone skills and 20% Faster Cast Rate together.', want: [cls('nec', '+ Necromancer skills'), tab(7, '+ Poison and Bone Skills'), W.fcr, W.mana] },
  'Safety Helm': { who: 'A Hardcore character', base: 'urn', why: 'Damage reduction and lightning resistance are fixed, and a Corona can roll Godly enhanced defense, life and two more resistances.', want: [W.life, W.fire, W.cold, W.def] },
  'Safety Boots': { who: 'A Hardcore melee character', base: 'uhb', why: 'Fixed damage reduction and fire resistance; run speed and more resistances complete them.', want: [W.frw, W.ltng, W.cold, W.dex, W.def] },
  'Safety Gloves': { who: 'A Hardcore melee character', base: 'uhg', why: 'Fixed damage reduction and cold resistance, on gloves that can also roll attack speed and Strength.', want: [W.ias, W.str, W.dex, W.ll, W.fire, W.ltng] },
  'Safety Belt': { who: 'A Hardcore character', base: 'ulc', why: 'Fixed poison resistance and damage reduction; Strength, life and hit recovery are the useful rolls.', want: [W.str, W.life, W.fhr, W.fire, W.ltng] },
  'Safety Shield': { who: 'A Hardcore character who blocks', base: 'uit', why: 'A Monarch has high block, and the fixed magic resistance and damage reduction add survival. All resistances is the roll to hope for.', want: [W.allres, W.fhr, W.life, W.str, W.def] },
  'Safety Body': { who: 'A Hardcore character', base: 'urs', why: 'Fixed Half Freeze Duration and damage reduction cover two dangers; Strength and life complete it.', want: [W.str, W.life, W.dr, W.fhr, W.def] },
  'Safety Amulet': { who: 'A Hardcore Barbarian', base: 'amu', why: 'Damage reduction and block chance are fixed. +Barbarian skills and all resistances on top make a safe amulet.', want: [cls('bar', '+ Barbarian skills'), W.allres, W.str, W.dex, W.life, W.dr] },
  'Safety Ring': { who: 'A Hardcore character', base: 'rin', why: 'Damage reduction stacks well from two rings, and Vitality is fixed.', want: [W.allres, W.str, W.dex, W.life, W.dr] },
  'Safety Weapon': { who: 'An Act 2 mercenary', base: '7st', why: 'Act 2 mercenaries use spears. A Ghost Spear with Enhanced Damage, attack speed and leech keeps them alive and killing, and the fixed damage reduction helps too.', want: [W.ed, W.ias, W.ll, W.maxdmg, W.str] },
};

/** Affix level of an item with this item level on base `code` (Item generation's formula). */
function alvl(code, ilvl) {
  const b = I.baseByCode.get(code);
  const q = int(b.level);
  let i = Math.max(Math.min(ilvl, 99), q);
  const magic = int(b['magic lvl']);
  const a = magic ? i + magic : i < 99 - q / 2 ? i - Math.floor(q / 2) : 2 * i - 99;
  return Math.min(a, 99);
}

/** The lowest item level whose affix level reaches `level`, or null. */
function ilvlFor(code, level) {
  for (let i = 1; i <= 99; i++) if (alvl(code, i) >= level) return i;
  return null;
}

/** Rare-eligible affixes that can roll on base `code`. */
function affixesFor(code) {
  const out = [];
  for (const [file, side] of [['magicprefix', 'prefix'], ['magicsuffix', 'suffix']]) {
    for (const r of table(file)) {
      if (!r.Name || r.spawnable !== '1' || !int(r.frequency) || r.rare !== '1') continue;
      const it = [1, 2, 3, 4, 5, 6, 7].map((i) => r[`itype${i}`]).filter(Boolean);
      const ex = [1, 2, 3, 4, 5].map((i) => r[`etype${i}`]).filter(Boolean);
      if (!it.some((t) => I.isType(code, t)) || ex.some((t) => I.isType(code, t))) continue;
      const props = [1, 2, 3].map((i) => ({ code: r[`mod${i}code`], param: r[`mod${i}param`], min: int(r[`mod${i}min`]), max: int(r[`mod${i}max`]) })).filter((x) => x.code);
      const key = /skill|tab/.test(r.mod1code) ? `${r.mod1code}/${r.mod1param}` : r.mod1code;
      out.push({ key, side, name: str(r.Name), lvl: int(r.level), max: int(r.maxlevel), req: int(r.levelreq), freq: int(r.frequency), text: I.propLines(code, props).join(', ') });
    }
  }
  return out;
}

/** The two best tiers of a want on this base: [best, next], each with the ilvl it needs. */
function tiers(code, all, codes) {
  const seen = new Set();
  return all.filter((a) => codes.includes(a.key) && !a.max)
    .map((a) => ({ ...a, ilvl: ilvlFor(code, a.lvl) }))
    .filter((a) => a.ilvl && !seen.has(a.text) && seen.add(a.text))
    .sort((a, b) => b.lvl - a.lvl).slice(0, 2);
}

// Affix counts by crafted item level (cube-recipes.md, Crafting).
const COUNTS = [[1, '1-4 (40% one)'], [31, '2-4 (60% two)'], [51, '3-4 (80% three)'], [71, '4']];
const countAt = (i) => COUNTS.filter(([lo]) => i >= lo).pop()[1];

export function register(site) {
  site.register('index:crafting', `${DIR}/index.md`, 'Crafting guides');
  for (const name of Object.keys(PLANS)) site.register(`craft:${name}`, `${DIR}/${slug(name)}.md`, name);
}

export function render(site) {
  const recipes = new Map();
  for (const r of table('cubemain')) {
    const m = r.enabled === '1' && r.description.trim().match(CRAFT);
    if (m) recipes.set(m[1], r);
  }
  const summary = [];
  for (const [name, plan] of Object.entries(PLANS)) {
    const r = recipes.get(name);
    if (!r) throw new Error(`no recipe for ${name}`);
    const p = `${DIR}/${slug(name)}.md`;
    const code = plan.base;
    const base = site.has(`base:${code}`) ? site.link(p, `base:${code}`, I.baseName(code)) : I.baseName(code);
    const b = I.baseByCode.get(code);
    const all = affixesFor(code);
    const ins = [1, 2, 3, 4, 5, 6, 7].map((i) => r[`input ${i}`]).filter(Boolean).map((x) => x.replace(/"/g, '').split(',')[0]);
    const rows = [];
    const missing = [];
    const best = [];
    for (const [label, codes] of plan.want) {
      const t = tiers(code, all, codes);
      if (!t.length) { missing.push(label); continue; }
      best.push({ label, ...t[0] });
      for (const [i, a] of t.entries()) rows.push([i ? '' : label, a.side, `${a.name}: ${a.text}`, String(a.lvl), a.ilvl === 1 ? 'any' : String(a.ilvl), String(a.req), String(a.freq)]);
    }
    // Targets: 71 for four affixes, then each item level where a wanted best tier opens up.
    const marks = [...new Set([71, ...best.map((a) => a.ilvl).filter((i) => i > 71)])].sort((x, y) => x - y);
    const target = marks.map((i) => {
      const open = best.filter((a) => a.ilvl <= i);
      const opened = best.filter((a) => a.ilvl === i || (i === 71 && a.ilvl <= 71)).map((a) => a.label);
      const req = Math.max(...open.map((a) => a.req), 0) + 10 + 3 * 4;
      const input = [80, 90, 99].map((c) => { const n = 2 * i - c; return n > 99 ? '–' : String(Math.max(n, 1)); }).join(' / ');
      return [String(i), countAt(i), i === 71 ? `${opened.join(', ') || '—'} (every best tier up to 71)` : opened.join(', '), input, `about ${Math.min(req, 99)}`];
    });
    const plvl = int(r.plvl), ilvlPct = int(r.ilvl);
    const top = marks[marks.length - 1];
    summary.push([site.link(DIR + '/index.md', `craft:${name}`), plan.who, I.baseName(code), marks.join(', ')]);
    const an = (w) => (/^[AEIOU]/.test(w) ? `an ${w}` : `a ${w}`);
    const lift = alvl(code, 1) > 1 ? ` Its qlvl is high enough that the game treats any lower item level as ${int(b.level)}, giving affix level ${alvl(code, 1)} at least, so "any" below means every item level reaches it.` : '';
    const body = `**Who:** ${plan.who}. **Why:** ${plan.why}

**Recipe:** a magic ${I.baseName(ins[0]) !== ins[0] ? `${I.baseName(ins[0])} (any tier)` : (I.typeByCode.get(ins[0])?.ItemType ?? ins[0]).toLowerCase()} + ${ins.slice(1).map((c) => I.baseName(c)).join(' + ')}. See ${site.linkPath(p, 'items/cube-recipes.md#crafted-items', 'Cube recipes')} for the fixed modifiers every one gets. The plan below assumes ${an(I.baseName(code)).replace(I.baseName(code), base)} (qlvl ${int(b.level)}${int(b['magic lvl']) ? `, magic level ${int(b['magic lvl'])}` : ''}).${lift}

## Affixes to look for

Best first. Each row is the best tier this base can roll and the one below it; **Level** is the affix level it needs, **Item level** the crafted item's level that reaches it on ${an(I.baseName(code))}, **Req** the required level the affix adds, **Freq** its weight against every other affix the base can roll (higher is likelier).

${mdTable(['Want', 'Side', 'Affix', 'Level', 'Item level', 'Req', 'Freq'], rows, [, , , 'r', 'r', 'r', 'r'])}
${missing.length ? `\nCan't roll on this base as a crafted item: ${missing.join(', ')}.\n` : ''}
## Item levels to aim for

${mdTable(['Item level', 'Random affixes', 'Opens up', 'Input item level at character level 80 / 90 / 99', 'Required level if it rolls the best of these'], target, ['r', , , 'r', 'r'])}

The crafted item's level is ${plvl}% of the character's level plus ${ilvlPct}% of the input item's, so the input column is ${ilvlPct === 50 && plvl === 50 ? '2 × target − character level' : 'worked out from those shares'}; "–" means that character level can't reach it. ${top > 71 ? `Above ${top} nothing new on this list opens up.` : 'Above 71 nothing on this list gets better, so 71 is the target.'}

- Prefixes and suffixes compete for slots: a crafted item, like a rare, has at most three of each.
- Higher item levels don't push the lower tiers out: they stay in the pool unless their table row has a maximum level.
- Each affix is picked by weight among everything the base can roll, so a wanted affix is never guaranteed.

> **Unverified:** the required level estimate uses the community rule (highest affix requirement + 10 + 3 per affix, for four affixes), the three-and-three limit applies to crafted items as it does to rares, and the item level rounds down. None of these are in the tables.

## Sources

- Tables: \`cubemain.txt\` (recipe, item level shares), \`magicprefix.txt\` and \`magicsuffix.txt\` (affixes, \`rare\` column), the base's qlvl. Affix level formula: ${site.linkPath(p, 'mechanics/item-generation.md', 'Item generation')}.
- Who uses it and why is this site's judgment, not game data.
`;
    site.page(p, name, { type: 'guide' }, body);
  }
  const ip = `${DIR}/index.md`;
  site.page(ip, 'Crafting guides', { type: 'index' }, `One page per crafting recipe: a character who would use it, why, which affixes they want, and the item levels where those affixes become possible. The affix levels and item levels are computed from the tables; the choice of character is a suggestion.

${mdTable(['Recipe', 'For', 'Base assumed', 'Item levels to aim for'], summary)}

See ${site.linkPath(ip, 'items/cube-recipes.md#crafting', 'Cube recipes: crafting')} for how crafting works.
`);
}
