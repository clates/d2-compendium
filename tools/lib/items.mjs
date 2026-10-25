// Item text through d2itemtoolkit, a reimplementation of the game's own tooltip engine.
//
// Each item is rendered twice, every property at its minimum roll and then at its maximum, and the
// two tooltips are merged line by line: numbers that differ become a `lo-hi` range. That keeps the
// wording exactly what the game prints. (Approach from d2-rolls' build-data.mjs.)
import path from 'node:path';
import { TooltipEngine, GameVariant, D2DataFiles, createUnit, ItemTier } from 'd2itemtoolkit';
import { RAW, ROOT, table, int, str } from './data.mjs';

const DIST = path.join(ROOT, 'node_modules/d2itemtoolkit/dist');
// Not part of the package's public surface, but exactly the roller the range reconstruction uses.
const { PropertyApplier, RollEnd } = await import(path.join(DIST, 'Stats/PropertyApplier.js'));
const { ItemIdentity } = await import(path.join(DIST, 'Stats/ItemRecord.js'));

export const data = D2DataFiles.loadResurrected(
  GameVariant.ReignOfTheWarlock,
  path.join(RAW, 'excel'),
  path.join(RAW, 'strings'),
  path.join(RAW, 'strings-legacy'),
  path.join(RAW, 'global'),
);
export const engine = TooltipEngine.fromData(data);
const lowApplier = new PropertyApplier(data, engine.items, engine.types, RollEnd.Low);
const highApplier = new PropertyApplier(data, engine.items, engine.types, RollEnd.High);

export const Q = { low: 1, normal: 2, superior: 3, magic: 4, set: 5, rare: 6, unique: 7, crafted: 8 };

const classIdByCode = new Map();
for (let i = 0; i < engine.items.rowCount; i++) classIdByCode.set(engine.items.rowAt(i).code, i);
export const knownCode = (code) => classIdByCode.has(code);

export const baseByCode = new Map();
for (const [kind, name] of [['weapon', 'weapons'], ['armor', 'armor'], ['misc', 'misc']]) {
  for (const r of table(name)) if (r.code) baseByCode.set(r.code, { ...r, kind });
}
export const typeByCode = new Map(table('itemtypes').map((t) => [t.Code, t]));

export function tierOf(code) {
  const b = baseByCode.get(code);
  if (!b || b.kind === 'misc') return '';
  const t = engine.items.rowAt(classIdByCode.get(code))?.tier;
  return t === ItemTier.Elite ? 'Elite' : t === ItemTier.Exceptional ? 'Exceptional' : 'Normal';
}
export const baseName = (code) => str(baseByCode.get(code)?.namestr) || code;
export const typeName = (code) => typeByCode.get(baseByCode.get(code)?.type)?.ItemType ?? '';

// ---------------------------------------------------------------------------------------------

const NUM = /\d+(?:\.\d+)?/g;
const stripColor = (s) => (s ?? '').replace(/ÿc./g, '').replace(/\n+$/, '');

function mergeLine(lo, hi) {
  if (lo === hi) return lo;
  const skelLo = lo.replace(NUM, '#');
  const skelHi = hi.replace(NUM, '#');
  if (skelLo !== skelHi) return hi;
  const a = lo.match(NUM);
  const b = hi.match(NUM);
  let i = 0;
  return skelHi.replace(/#/g, () => {
    const x = a[i];
    const y = b[i++];
    if (x === y) return y;
    const [mn, mx] = parseFloat(x) <= parseFloat(y) ? [x, y] : [y, x];
    return `(${mn}-${mx})`;
  });
}

function mergeLines(loLines, hiLines) {
  if (loLines.length !== hiLines.length) {
    // A stat that rounds to nothing at its low end drops its line; pair by stat instead.
    const byKey = new Map(loLines.map((l) => [l.key, l.text]));
    return hiLines.map((l) => ({ ...l, text: mergeLine(byKey.get(l.key) ?? l.text, l.text) }));
  }
  return hiLines.map((l, i) => ({ ...l, text: mergeLine(loLines[i].text, l.text) }));
}

const isc = table('itemstatcost');
const opParam = new Map(isc.map((r) => [int(r['*ID']), int(r['op param']) + int(r.ValShift)]));

/** "+0 to Life (Based on Character Level)" -> "+1.5 to Life per Character Level". */
function perLevel(text, statId, raw) {
  const m = text.match(/^([+-]?)0(%?.*?)\s*\(Based on Character Level\)$/);
  if (!m) return text;
  const v = Math.round((raw / 2 ** (opParam.get(statId) ?? 0)) * 1000) / 1000;
  return `${m[1]}${v}${m[2]} per Character Level`;
}

function linesOf(tip, sections) {
  return tip.lines
    .filter((l) => sections.has(l.section) && stripColor(l.text))
    .flatMap((l) => stripColor(l.text).split('\n').map((t) => ({
      text: t, key: `${l.section}:${l.statId}:${l.layer}`, statId: l.statId, layer: l.layer, section: l.section,
    })));
}

// Required Level is shown on its own.
const BASE_SECTIONS = new Set(['ArmorClass', 'WeaponDamage', 'Durability', 'RequiredStrength', 'RequiredDexterity',
  'ClassRestriction', 'AttackSpeed', 'SmiteOrKickDamage', 'CharmDescription']);
const MOD_SECTIONS = new Set(['Modifiers']);

/** The block line needs a viewer to draw, so it comes from the table instead. */
function withBlock(code, implicit) {
  const block = int(baseByCode.get(code)?.block);
  if (!block) return implicit;
  const at = implicit.findIndex((l) => l.startsWith('Defense'));
  const out = [...implicit];
  out.splice(at + 1, 0, `Chance to Block: ${block}%`);
  return out;
}

/** The base stats a fresh copy of this item type carries, at the min or max Defense roll. */
function baseStats(code, end) {
  const b = baseByCode.get(code);
  const stats = [];
  if (!b) return stats;
  if (b.kind === 'armor') stats.push({ id: 31, value: int(end === 'low' ? b.minac : b.maxac) });
  if (b.kind === 'weapon') {
    if (b.mindam) stats.push({ id: 21, value: int(b.mindam) }, { id: 22, value: int(b.maxdam) });
    if (b['2handmindam']) stats.push({ id: 23, value: int(b['2handmindam']) }, { id: 24, value: int(b['2handmaxdam']) });
    if (b.minmisdam) stats.push({ id: 159, value: int(b.minmisdam) }, { id: 160, value: int(b.maxmisdam) });
  }
  if (b.durability && b.nodurability !== '1') {
    stats.push({ id: 72, value: int(b.durability) }, { id: 73, value: int(b.durability) });
  }
  return stats;
}

const statKey = (stat, layer) => ((layer & 0xffff) << 16) | (stat & 0xffff);
const isPacked = (id) => id === 204 || (id >= 268 && id <= 303);

function renderBoth({ code, quality, fileIndex, own, sections }) {
  const classId = classIdByCode.get(code);
  const tips = ['low', 'high'].map((end) => {
    const stats = own.map((s) => ({ id: s.id, layer: s.layer, value: isPacked(s.id) ? s.high : s[end] }));
    const unit = createUnit({
      unitType: 4, classId, quality, fileIndex, itemFlags: 16, itemLevel: 99, format: 100,
      statsLists: [
        { stateNo: 0, flags: 0x80000000, stats: baseStats(code, end) },
        { stateNo: 0, flags: 0x40, stats },
      ],
    });
    return engine.render(unit, null, null);
  });
  const lines = mergeLines(linesOf(tips[0], sections), linesOf(tips[1], sections));
  const highRaw = new Map(own.map((s) => [statKey(s.id, s.layer), s.high]));
  return lines.map((l) => ({ ...l, text: perLevel(l.text, l.statId, highRaw.get(statKey(l.statId, l.layer)) ?? 0) }));
}

const skills = table('skills');
const skillIdByName = new Map(skills.map((s) => [s.skill.toLowerCase(), int(s['*Id'])]));
function parseParam(p) {
  if (!p) return 0;
  if (/^-?\d+$/.test(p)) return int(p);
  return skillIdByName.get(p.toLowerCase()) ?? 0;
}

/** Roll a property list at both ends into [{id, layer, low, high}]. */
function rollProps(code, props) {
  const identity = Object.assign(new ItemIdentity(), { classId: classIdByCode.get(code), code, quality: 5, itemLevel: 99, format: 100 });
  const lo = new Map();
  const hi = new Map();
  for (const p of props) {
    const propertyId = lowApplier.properties.rowForCode(p.code);
    if (propertyId < 0) continue;
    const prop = { propertyId, param: parseParam(p.param), min: p.min, max: p.max };
    lowApplier.apply(PropertyApplier.PropModeGem, identity, prop, lo);
    highApplier.apply(PropertyApplier.PropModeGem, identity, prop, hi);
  }
  const keys = new Set([...lo.keys(), ...hi.keys()]);
  return [...keys].map((k) => ({ id: k & 0xffff, layer: k >>> 16, low: lo.get(k) ?? 0, high: hi.get(k) ?? 0 }));
}

/** Mod lines for bare stats on a throwaway magic copy of `code`, minus what the base prints itself. */
const baselineCache = new Map();
function modLines(code, own) {
  if (!own.length) return [];
  if (!baselineCache.has(code)) {
    baselineCache.set(code, new Set(renderBoth({ code, quality: 4, fileIndex: 0, own: [], sections: MOD_SECTIONS }).map((l) => l.text)));
  }
  const baseline = baselineCache.get(code);
  return renderBoth({ code, quality: 4, fileIndex: 0, own, sections: MOD_SECTIONS }).map((l) => l.text).filter((t) => !baseline.has(t));
}

/** Tooltip lines for a property list ({code, param, min, max}) as it would print on `code`. */
export const propLines = (code, props) => modLines(code, rollProps(code, props));

const playerClass = table('playerclass');
const skillClass = new Map(skills.map((s) => [int(s['*Id']), s.charclass]));
const classByCode = new Map(playerClass.filter((c) => c.Code).map((c) => [c.Code, c['Player Class']]));

function layerVariesLine(lv) {
  const value = lv.value;
  if (lv.statId === 107 || lv.statId === 97) {
    const cls = classByCode.get(skillClass.get(lv.layerLow));
    return `+${value} to a Random ${cls ?? ''} Skill`.replace('  ', ' ');
  }
  if (lv.statId === 83) return `+${value} to a Random Class's Skill Levels`;
  if (lv.statId === 188) return `+${value} to a Random Skill Tab`;
  return `+${value} to a Random Skill`;
}

function choiceLines(code, choice) {
  const opts = [];
  for (const o of choice.options) {
    for (const v of o.variants) {
      const lines = modLines(code, v.stats.map((s) => ({ id: s.statId, layer: s.layer, low: s.low, high: s.high })));
      if (lines.length) opts.push(lines.join(', '));
    }
  }
  const unique = [...new Set(opts)];
  if (!unique.length) return [];
  const n = choice.countLow === choice.countHigh ? choice.countHigh : `${choice.countLow}-${choice.countHigh}`;
  const head = n === 1 || choice.pickMode === 25 ? 'One of' : `${n} of`;
  return [`${head}: ${unique.join(' · ')}`];
}

/** An item's own tooltip: base lines (`implicit`) and its modifiers (`mods`), with roll ranges. */
export function ownMods(code, quality, fileIndex) {
  const identity = Object.assign(new ItemIdentity(), {
    classId: classIdByCode.get(code), code, quality, fileIndex, flags: 16, itemLevel: 99, format: 100,
  });
  const rg = engine.rangesReconstructor.reconstruct(identity, null, null, null, true, false);
  const own = rg.stats
    .map((s) => ({ id: s.statId, layer: s.layer, low: s.low, high: s.high }))
    .filter((s) => s.low || s.high);
  const lines = renderBoth({ code, quality, fileIndex, own, sections: new Set([...BASE_SECTIONS, ...MOD_SECTIONS]) });
  const implicit = withBlock(code, lines.filter((l) => BASE_SECTIONS.has(l.section)).map((l) => l.text));
  const mods = lines.filter((l) => MOD_SECTIONS.has(l.section)).map((l) => l.text);
  for (const lv of rg.layerVaries) mods.push(layerVariesLine(lv));
  for (const c of rg.choices) mods.push(...choiceLines(code, c));
  return { implicit, mods, problems: [...rg.outOfRange, ...rg.unattributed].length };
}

/** A plain white copy's base lines. */
export function baseLines(code) {
  return withBlock(code, renderBoth({ code, quality: 2, fileIndex: 0, own: [], sections: BASE_SECTIONS }).map((l) => l.text));
}

export function reqLevel(code, quality, fileIndex) {
  const unit = createUnit({ unitType: 4, classId: classIdByCode.get(code), quality, fileIndex, itemFlags: 16, itemLevel: 99, format: 100 });
  return engine.requirements(unit, null).level;
}

/** Item type codes in `code`'s ancestry (itemtypes Equiv1/Equiv2), itself first. */
export function typeAncestry(code) {
  const out = [];
  const walk = (c) => {
    if (!c || out.includes(c)) return;
    out.push(c);
    const t = typeByCode.get(c);
    walk(t?.Equiv1); walk(t?.Equiv2);
  };
  walk(code);
  return out;
}

/** Does a base item count as item type `type` (directly or through its ancestors)? */
export function isType(baseCode, type) {
  const b = baseByCode.get(baseCode);
  if (!b) return false;
  return typeAncestry(b.type).includes(type) || (b.type2 && typeAncestry(b.type2).includes(type));
}

/** A spawnable base of item type `type`, for rendering mods that need a carrier. */
export function sampleBase(type) {
  for (const [code, b] of baseByCode) if (b.spawnable === '1' && knownCode(code) && isType(code, type)) return code;
  return null;
}
