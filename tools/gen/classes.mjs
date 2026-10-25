// Classes and skills: starting stats, skill trees, and per-level skill numbers from skills.txt.
import { table, int, str } from '../lib/data.mjs';
import { mdTable, list } from '../lib/md.mjs';

const DIR = 'classes';
const skills = table('skills');
const skilldesc = new Map(table('skilldesc').map((d) => [d.skilldesc, d]));
const charstats = table('charstats').filter((c) => c.class && c.class !== 'Expansion');
const playerClass = table('playerclass').filter((c) => c.Code);
const classCode = new Map(playerClass.map((c) => [c['Player Class'], c.Code.toLowerCase()]));
const byName = new Map(skills.map((s) => [s.skill, s]));
const LEVELS = [...Array.from({ length: 20 }, (_, i) => i + 1), 25, 30, 35, 40];

/**
 * Tree names. charstats' StrSkillTabN (the "+N to Fire Skills" item text) follows skilldesc's
 * SkillPage, but the SkillCategory tab names are numbered differently per class, so match by words.
 */
function treeName(c, page) {
  const words = (t) => new Set(t.toLowerCase().replace(/[%+d]+ to /, '').split(/\W+/).filter((w) => w && !['skills', 'and', 'd'].includes(w)));
  const want = words(str(c[`StrSkillTab${page}`]));
  const cats = [1, 2, 3].map((i) => str(`SkillCategory${c.class.slice(0, 2)}${i}`));
  const score = (t) => { const w = [...words(t)]; return 10 * w.filter((x) => want.has(x)).length - w.length; };
  return cats.reduce((best, t) => (score(t) > score(best) ? t : best), cats[0]);
}

const skillName = (s) => str(skilldesc.get(s.skilldesc)?.['str name']) || s.skill;
const isc = new Map(table('itemstatcost').map((r) => [r.Stat, r]));
// Stats without a tooltip string of their own.
const STAT = {
  velocitypercent: 'Movement speed %', attackrate: 'Attack speed %', skill_armor_percent: 'Enemy defense %', other_animrate: 'Animation speed %',
  passive_critical_strike: 'Critical Strike %', passive_dodge: 'Dodge %', passive_avoid: 'Avoid %', passive_evade: 'Evade %', skill_pierce: 'Pierce %',
  bonearmor: 'Absorbs damage', thorns_percent: 'Thorns damage %', hitpoints: 'Life', curse_resistance: 'Curse resistance %', coldlength: 'Cold length',
  stunlength: 'Stun length', passive_weaponblock: 'Block chance %', skill_staminapercent: 'Stamina %', skill_passive_staminapercent: 'Stamina %',
  psychicward: 'Absorbs damage', passive_summon_resist: 'Summon resistances %', damageresist: 'Physical Resist %',
  passive_mastery_melee_th: 'Attack rating %', passive_mastery_melee_dmg: 'Damage %', passive_mastery_melee_crit: 'Critical Strike %',
  passive_mastery_throw_th: 'Attack rating %', passive_mastery_throw_dmg: 'Damage %', passive_mastery_throw_crit: 'Critical Strike %',
  passive_mastery_noconsume: 'Chance not to use up a throw %', passive_mastery_item_req_percent: 'Item requirements %',
  skill_handofathena: 'Attack rating %', skill_missile_damage_scale: 'Missile damage %',
};
/** "Fire Resist %" from "Fire Resist %+d%%". */
function statLabel(stat) {
  if (STAT[stat]) return STAT[stat];
  const t = str(isc.get(stat)?.descstrpos);
  if (!t) return stat;
  const label = t.replace(/[+-]?%[+]?d(%%)?/g, '').replace(/\s+/g, ' ').replace(/^ ?(to |by )?/, '').trim();
  return /%%/.test(t) ? `${label} %` : label;
}

const byDisplay = new Map(skills.filter((s) => s.charclass).map((s) => [skillName(s), s.skill]));
const classSkills = (code) => skills.filter((s) => s.charclass === code && int(skilldesc.get(s.skilldesc)?.SkillPage) > 0);

// ---------------------------------------------------------------------------------------------
// Skill calc expressions: numbers, parN, lvl, lnXY / dmXY, + - * / ( ), min(), max().
// Anything that needs a live character (synergy levels, stats) evaluates to null.

const lin = (a, b, lvl) => a + b * (lvl - 1);
// The game rounds 110 * lvl / (lvl + 6) down first: Lower Resist is 31% at level 1, not 32%.
const dim = (a, b, lvl) => Math.trunc(((b - a) * Math.trunc((110 * lvl) / (lvl + 6))) / 100) + a;

export function evalCalc(expr, s, lvl) {
  const par = (n) => int(s[`Param${n}`]);
  // skill('Other'.parN) reads another skill's parameter.
  expr = expr.replace(/skill\('([^']+)'\.(?:par?)(\d+)\)/g, (all, n, k) => (byName.has(n) ? String(int(byName.get(n)[`Param${k}`])) : all));
  const tokens = expr.replace(/[\s"]+/g, '').match(/\d+(?:\.\d+)?|[a-z]+\d*|[()+\-*/,]|./gi) ?? [];
  let i = 0;
  const peek = () => tokens[i];
  const next = () => tokens[i++];
  function primary() {
    const t = next();
    if (t === undefined) throw new Error('end');
    if (t === '(') { const v = cond(); next(); return v; }
    if (t === '-') return -primary();
    if (/^\d+(\.\d+)?$/.test(t)) return Number(t);
    if (t === 'lvl' || t === 'blvl') return lvl;
    let m = t.match(/^par(\d+)$/) || t.match(/^pa(\d+)$/);
    if (m) return par(m[1]);
    m = t.match(/^(ln|dm)(\d)(\d)$/);
    if (m) return (m[1] === 'ln' ? lin : dim)(par(m[2]), par(m[3]), lvl);
    if (t === 'min' || t === 'max') {
      next(); const a = cond(); next(); const b = cond(); next();
      return t === 'min' ? Math.min(a, b) : Math.max(a, b);
    }
    throw new Error('unknown ' + t);
  }
  function product() {
    let v = primary();
    while (peek() === '*' || peek() === '/') v = next() === '*' ? v * primary() : Math.trunc(v / primary());
    return v;
  }
  function sum() {
    let v = product();
    while (peek() === '+' || peek() === '-') v = next() === '+' ? v + product() : v - product();
    return v;
  }
  // a > b ? x : y, as the RotW skills use.
  function cond() {
    let v = sum();
    if (peek() === '>' || peek() === '<') v = next() === '>' ? (v > sum() ? 1 : 0) : (v < sum() ? 1 : 0);
    if (peek() !== '?') return v;
    next(); const a = cond(); next(); const b = cond();
    return v ? a : b;
  }
  try {
    const v = cond();
    return i === tokens.length && Number.isFinite(v) ? v : null;
  } catch {
    return null;
  }
}

/** A value that grows by a different amount per level in the 2-8, 9-16, 17-22, 23-28 and 29+ bands. */
function banded(base, steps, lvl) {
  const bands = [[2, 8], [9, 16], [17, 22], [23, 28], [29, 999]];
  let v = base;
  bands.forEach(([a, z], k) => { if (lvl >= a) v += steps[k] * (Math.min(lvl, z) - a + 1); });
  return v;
}

const mana = (s, lvl) => {
  if (!s.mana && !s.lvlmana) return null;
  const v = ((int(s.mana) + int(s.lvlmana) * (lvl - 1)) * 2 ** int(s.manashift)) / 256;
  return Math.max(v, int(s.minmana));
};
const shift = (s, v) => (v * 2 ** int(s.HitShift)) / 256;
const ELEM = { fire: 'Fire', ltng: 'Lightning', cold: 'Cold', pois: 'Poison', mag: 'Magic', stun: 'Stun', burn: 'Burning', frze: 'Freeze' };

function elemental(s, lvl) {
  if (!s.EType || (!s.EMin && !s.EMax)) return null;
  const lo = shift(s, banded(int(s.EMin), [1, 2, 3, 4, 5].map((k) => int(s[`EMinLev${k}`])), lvl));
  const hi = shift(s, banded(int(s.EMax), [1, 2, 3, 4, 5].map((k) => int(s[`EMaxLev${k}`])), lvl));
  if (s.EType === 'pois') {
    const frames = length(s, lvl) ?? 0;
    return `${Math.floor(lo * frames)}-${Math.floor(hi * frames)} over ${(frames / 25).toFixed(1)}s`;
  }
  return `${Math.floor(lo)}-${Math.floor(hi)}`;
}
function physical(s, lvl) {
  if (!s.MinDam && !s.MaxDam) return null;
  const lo = shift(s, banded(int(s.MinDam), [1, 2, 3, 4, 5].map((k) => int(s[`MinLevDam${k}`])), lvl));
  const hi = shift(s, banded(int(s.MaxDam), [1, 2, 3, 4, 5].map((k) => int(s[`MaxLevDam${k}`])), lvl));
  return `${Math.floor(lo)}-${Math.floor(hi)}`;
}
/** ELen in frames (25 per second): grows per level in the 2-8, 9-16 and 17+ bands. */
function length(s, lvl) {
  if (!s.ELen) return null;
  const bands = [[2, 8], [9, 16], [17, 999]];
  let v = int(s.ELen);
  bands.forEach(([a, z], k) => { if (lvl >= a) v += int(s[`ELevLen${k + 1}`]) * (Math.min(lvl, z) - a + 1); });
  return v;
}

/** printf for the game's description strings: %s, %d, %+d, %%, in argument order. */
function printf(fmt, args) {
  let k = 0;
  return fmt.replace(/%(\+?)(d|s|%)/g, (all, plus, t) => {
    if (t === '%') return '%';
    const v = args[k++];
    if (t === 's') return v;
    const n = Number.isInteger(v) ? String(v) : String(Math.round(v * 100) / 100);
    return plus && v >= 0 ? `+${n}` : n;
  });
}

/**
 * Synergies as the in-game tooltip lists them: skilldesc's dsc3 lines. Line 40 is the
 * "Receives Bonuses From" header, 18 a skill name with no number, 76 "name: +a per level",
 * 77 "name: +a per b levels", 79 "name: a/b per level".
 */
function synergies(s) {
  const d = skilldesc.get(s.skilldesc);
  const out = [];
  for (let i = 1; i <= 7; i++) {
    const line = int(d?.[`dsc3line${i}`]);
    if (!line || line === 40) continue;
    const ta = str(d[`dsc3texta${i}`]);
    const tb = str(d[`dsc3textb${i}`]);
    const a = evalCalc(d[`dsc3calca${i}`]?.trim() || '0', s, 1);
    const b = evalCalc(d[`dsc3calcb${i}`]?.trim() || '0', s, 1);
    let text;
    if (line === 18) text = ta;
    else if (line === 76) text = printf(ta, [tb, a]);
    else if (line === 77) text = printf(ta, [tb, a, b]);
    else if (line === 79) text = printf(ta, [tb, b ? a / b : a]);
    else continue;
    if (a === null || b === null) text = `${text} (formula: \`${d[`dsc3calca${i}`]}\`)`;
    const name = line === 18 ? ta : tb;
    out.push({ names: [name], text });
  }
  return out.length ? out : formulaSynergies(s);
}

/** Fallback when the tooltip has no lines: parse (skill('A'.blvl)+skill('B'.blvl))*par8 forms. */
function formulaSynergies(s) {
  const out = [];
  for (const [expr, what] of [[s.EDmgSymPerCalc, `${ELEM[s.EType] ?? ''} Damage`.trim()], [s.DmgSymPerCalc, 'Damage'], [s.ELenSymPerCalc, 'Duration']]) {
    for (const m of (expr ?? '').matchAll(/\(?((?:\s*skill\('[^']+'\.blvl\)\s*\+?)+)\)?\s*\*\s*\(?(pa?r?\d+|\d+)\)?/g)) {
      const v = evalCalc(m[2], s, 1);
      if (!v) continue;
      for (const [, n] of m[1].matchAll(/skill\('([^']+)'\.blvl\)/g)) {
        const name = skillName(byName.get(n) ?? { skill: n });
        out.push({ names: [name], text: `${name}: +${v}% ${what} per Level` });
      }
    }
  }
  return out;
}

// ---------------------------------------------------------------------------------------------

export function register(site) {
  site.register('index:classes', `${DIR}/index.md`, 'Classes');
  for (const c of charstats) {
    const code = classCode.get(c.class);
    site.register(`class:${code}`, `${DIR}/${c.class.toLowerCase()}/index.md`, c.class);
    for (const s of classSkills(code)) site.register(`skill:${s.skill}`, site.claim(`${DIR}/${c.class.toLowerCase()}`, skillName(s)), skillName(s));
  }
}

/** What an aura, curse or passive gives: aurastatN (on targets) and passivestatN (on the caster). */
function auraStats(s) {
  const aura = [1, 2, 3, 4, 5, 6].map((k) => [s[`aurastatcalc${k}`], s[`aurastat${k}`]]).filter(([e, st]) => e && st);
  const self = [1, 2, 3, 4, 5, 6].map((k) => [s[`passivecalc${k}`], s[`passivestat${k}`]]).filter(([e, st]) => e && st);
  const out = aura.map(([e, st]) => [e, statLabel(st)]);
  for (const [e, st] of self) out.push([e, aura.length ? `${statLabel(st)} (self)` : statLabel(st)]);
  // Same stat in several columns with the same formula (Conviction's three resists): show once.
  const seen = new Map();
  for (const [e, label] of out) seen.set(e, [...(seen.get(e) ?? []), label]);
  const and = (xs) => (xs.length > 1 ? `${xs.slice(0, -1).join(', ')} and ${xs.at(-1)}` : xs[0]);
  return [...seen].map(([e, labels]) => [e, labels.length > 1 && labels.every((l) => l.endsWith(' Resist %')) ? `${and(labels.map((l) => l.slice(0, -9)))} Resist %` : and(labels)]);
}

function skillPage(site, c, code, s) {
  const p = site.path(`skill:${s.skill}`);
  const d = skilldesc.get(s.skilldesc);
  const tabName = treeName(c, d.SkillPage);
  const reqs = [s.reqskill1, s.reqskill2, s.reqskill3].filter(Boolean);
  const syn = synergies(s);
  const cooldown = int(s.localdelay) || int(s.globaldelay);
  const calcs = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((k) => [s[`calc${k}`], (s[`*calc${k} desc`] ?? s[`*calc${k}desc`])?.replace(/\s*\(from [^)]*\)/, '')]).filter(([e]) => e);
  const cols = [
    ['Mana', (l) => { const v = mana(s, l); return v === null ? null : Number.isInteger(v) ? String(v) : v.toFixed(1); }],
    [ELEM[s.EType] ? `${ELEM[s.EType]} damage` : 'Elemental damage', (l) => elemental(s, l)],
    ['Physical damage', (l) => physical(s, l)],
    ['Duration (s)', (l) => (s.ELen && s.EType !== 'pois' ? (length(s, l) / 25).toFixed(1) : null)],
    ...auraStats(s).map(([e, label]) => [label, (l) => { const v = evalCalc(e, s, l); return v === null ? null : String(v); }]),
    ...calcs.map(([e, label]) => [label || e, (l) => { const v = evalCalc(e, s, l); return v === null ? null : String(v); }]),
  ].filter(([, f]) => LEVELS.some((l) => f(l) !== null && f(l) !== '0' && f(l) !== '0-0'));
  const varying = cols.filter(([, f]) => new Set(LEVELS.map(f)).size > 1);
  const fixed = cols.filter(([, f]) => new Set(LEVELS.map(f)).size === 1);
  const desc = str(d['str long']).replace(/\n/g, ' ');
  const body = `${c.class} skill, ${tabName} tree. ${desc ? `In game: *${desc}*` : ''}

${mdTable(['', ''], [
    ['Required level', s.reqlevel || '1'],
    ['Requires', reqs.map((r) => site.link(p, `skill:${r}`, skillName(byName.get(r) ?? { skill: r }))).join(', ')],
    ['Tree position', `${tabName}, row ${d.SkillRow}, column ${d.SkillColumn}`],
    ['Cooldown', cooldown ? `${cooldown / 25} s (${cooldown} frames)${!int(s.localdelay) ? ', global (`globaldelay`)' : ''}` : ''],
    ...fixed.map(([label, f]) => [label, f(1)]),
  ].filter(([, v]) => v))}
${syn.length ? `\n## Synergies\n\n${list(syn.map((x) => x.names.reduce((t, n) => (byDisplay.has(n) ? t.replace(n, site.link(p, `skill:${byDisplay.get(n)}`, n)) : t), x.text)))}\n` : ''}${varying.length ? `
## By skill level

Base values from the skill table, before synergies, masteries and +damage from items. Levels past 20 come from +skills.${s.EType === 'fire' && s.ELen ? ' For burning skills the in-game tooltip shows damage per second; the numbers here are the raw table values.' : ''} See ${site.linkPath(p, 'mechanics/skill-numbers.md', 'Skill numbers')}.

${mdTable(['Level', ...varying.map(([l]) => l)], LEVELS.map((l) => [String(l), ...varying.map(([, f]) => f(l) ?? '')]), ['r', ...varying.map(() => 'r')])}
` : ''}`;
  site.page(p, skillName(s), { type: 'skill', class: c.class, tree: tabName, req_level: int(s.reqlevel) || 1 }, body);
}

export function render(site) {
  const ip = `${DIR}/index.md`;
  const overview = [];
  for (const c of charstats) {
    const code = classCode.get(c.class);
    const p = site.path(`class:${code}`);
    const mine = classSkills(code);
    for (const s of mine) skillPage(site, c, code, s);
    const q = (v) => int(v) / 4;
    const tabs = [1, 2, 3].map((t) => {
      const rows = mine.filter((s) => int(skilldesc.get(s.skilldesc).SkillPage) === t)
        .sort((a, b) => int(skilldesc.get(a.skilldesc).SkillRow) - int(skilldesc.get(b.skilldesc).SkillRow) || int(skilldesc.get(a.skilldesc).SkillColumn) - int(skilldesc.get(b.skilldesc).SkillColumn));
      return `## ${treeName(c, t)}\n\n` + mdTable(['Skill', 'Req level', 'Requires'], rows.map((s) => [
        site.link(p, `skill:${s.skill}`), s.reqlevel || '1', [s.reqskill1, s.reqskill2, s.reqskill3].filter(Boolean).map((r) => skillName(byName.get(r) ?? { skill: r })).join(', '),
      ]), [, 'r']);
    });
    const body = `${mdTable(['', ''], [
      ['Starting Strength / Dexterity / Energy / Vitality', `${c.str} / ${c.dex} / ${c.int} / ${c.vit}`],
      ['Starting life', String(int(c.vit) + int(c.hpadd))],
      ['Starting stamina', c.stamina],
      ['Life per level / per Vitality', `${q(c.LifePerLevel)} / ${q(c.LifePerVitality)}`],
      ['Mana per level / per Energy', `${q(c.ManaPerLevel)} / ${q(c.ManaPerMagic)}`],
      ['Stamina per level / per Vitality', `${q(c.StaminaPerLevel)} / ${q(c.StaminaPerVitality)}`],
      ['Stat points / skill points per level', `${c.StatPerLevel} / ${c.SkillsPerLevel}`],
      ['Attack rating bonus', c.ToHitFactor],
      ['Block factor', c.BlockFactor],
    ])}

${tabs.join('\n\n')}
`;
    site.page(p, c.class, { type: 'class' }, body);
    overview.push([site.link(ip, `class:${code}`), `${c.str}/${c.dex}/${c.int}/${c.vit}`, String(int(c.vit) + int(c.hpadd)), `${q(c.LifePerLevel)} / ${q(c.LifePerVitality)}`, `${q(c.ManaPerLevel)} / ${q(c.ManaPerMagic)}`]);
  }
  site.page(ip, 'Classes', { type: 'index' }, `The ${overview.length} classes. Each page has its skill trees; each skill page has its synergies and numbers per level.\n\n` +
    mdTable(['Class', 'Str/Dex/Ene/Vit', 'Life', 'Life per level / Vit', 'Mana per level / Ene'], overview));
}
