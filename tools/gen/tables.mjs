// Reference tables: experience, difficulty, mercenaries, shrines.
import { table, int, str, DIFFS } from '../lib/data.mjs';
import { mdTable, list } from '../lib/md.mjs';

const DIR = 'reference';
const fmt = (n) => Number(n).toLocaleString('en-US');

export function register(site) {
  site.register('page:experience', `${DIR}/experience.md`, 'Experience');
  site.register('page:difficulty', `${DIR}/difficulty.md`, 'Difficulty levels');
  site.register('page:mercenaries', 'mercenaries/index.md', 'Mercenaries');
  site.register('page:shrines', 'world/shrines.md', 'Shrines');
}

export function render(site) {
  experience(site);
  difficulty(site);
  mercenaries(site);
  shrines(site);
}

function experience(site) {
  const p = `${DIR}/experience.md`;
  const rows = table('experience').filter((r) => /^\d+$/.test(r.Level) && int(r.Level) < 99);
  const xp = (r) => Number(r.Amazon);
  const body = `Total experience needed for each character level. Every class uses the same table.

The last column is the share of experience a character of that level keeps from each kill (1024 = all of it). Above level 69 it drops sharply: at 98, a character gets 6/1024 of the experience a level 69 character would. Experience from monsters far below or above the character's level is reduced separately; see ${site.linkPath(p, 'mechanics/experience.md', 'Experience')}.

${mdTable(['Level', 'Total experience', 'From previous level', 'Experience kept (of 1024)'], rows.map((r, i) => {
    const prev = i ? xp(rows[i - 1]) : 0;
    return [String(int(r.Level) + 1), fmt(xp(r)), fmt(xp(r) - prev), r.ExpRatio];
  }), ['r', 'r', 'r', 'r'])}
`;
  site.page(p, 'Experience', { type: 'reference' }, body);
}

function difficulty(site) {
  const p = `${DIR}/difficulty.md`;
  const rows = table('difficultylevels');
  const F = [
    ['ResistPenalty', 'Resistance penalty'],
    ['ResistPenaltyNonExpansion', 'Resistance penalty (Classic)'],
    ['DeathExpPenalty', 'Experience lost on death (%)'],
    ['MonsterSkillBonus', 'Monster skill level bonus'],
    ['MonsterFreezeDivisor', 'Freeze duration divisor (on monsters)'],
    ['MonsterColdDivisor', 'Chill duration divisor (on monsters)'],
    ['AiCurseDivisor', 'AI curse divisor'],
    ['LifeStealDivisor', 'Life steal divisor'],
    ['ManaStealDivisor', 'Mana steal divisor'],
    ['UniqueDamageBonus', 'Unique monster damage bonus'],
    ['ChampionDamageBonus', 'Champion damage bonus'],
    ['PlayerDamagePercentVSPlayer', 'Player damage vs players (%)'],
    ['PlayerDamagePercentVSMercenary', 'Player damage vs mercenaries (%)'],
    ['PlayerDamagePercentVSPrimeEvil', 'Player damage vs Prime Evils (%)'],
    ['MercenaryDamagePercentVSBoss', 'Mercenary damage vs bosses (%)'],
    ['PrimeEvilDamagePercentVSPlayer', 'Prime Evil damage vs players (%)'],
    ['PrimeEvilDamagePercentVSMercenary', 'Prime Evil damage vs mercenaries (%)'],
    ['PrimeEvilDamagePercentVSPet', 'Prime Evil damage vs minions (%)'],
    ['StaticFieldMin', 'Static Field floor (% of max life)'],
    ['GambleRare', 'Gamble: rare chance (of 100,000)'],
    ['GambleSet', 'Gamble: set chance (of 100,000)'],
    ['GambleUnique', 'Gamble: unique chance (of 100,000)'],
    ['GambleUber', 'Gamble: exceptional factor'],
    ['GambleUltra', 'Gamble: elite factor'],
    ['ResistFloor', 'Lowest resistance'],
  ].filter(([c]) => rows.some((r) => r[c] !== undefined && r[c] !== ''));
  const body = `What changes between Normal, Nightmare and Hell. Values are the game's; the labels are this codex's reading of the column names. See ${site.linkPath(p, 'mechanics/difficulty.md', 'Difficulty')} for what each one does.

${mdTable(['', ...rows.map((r) => r.Name)], F.map(([c, label]) => [label, ...rows.map((r) => r[c])]), [, 'r', 'r', 'r'])}

A divisor of N divides that effect by N: in Hell, life steal works at a third of its Normal strength and freezes on monsters last a quarter as long.
`;
  site.page(p, 'Difficulty levels', { type: 'reference' }, body);
}

function mercenaries(site) {
  const p = 'mercenaries/index.md';
  const rows = table('hireling').filter((r) => r.Version === '100' && r.Hireling);
  const groups = new Map();
  for (const r of rows) {
    const k = `${r.Hireling}|${r['*SubType'].replace(/-?\s*(Normal|Nightmare|Hell)$/, '').trim()}`;
    if (!groups.has(k)) groups.set(k, []);
    groups.get(k).push(r);
  }
  const acts = new Map();
  for (const [k, rs] of groups) {
    const act = int(rs[0].Act);
    if (!acts.has(act)) acts.set(act, []);
    acts.get(act).push([k, rs]);
  }
  const skillCell = (r) => [1, 2, 3, 4, 5, 6].map((i) => (r[`Skill${i}`] ? `${r[`Skill${i}`]} ${r[`Level${i}`]}` : '')).filter(Boolean).join(', ');
  const body = `Every hireable mercenary. Each row is a level band: from that level on, a mercenary hired in that difficulty has the stats shown and gains the per-level amounts for life and defense. Skill levels and resistances also grow as the mercenary levels.

${[...acts].sort((a, b) => a[0] - b[0]).map(([act, gs]) => `## Act ${act}: ${gs[0][1][0].Hireling}\n\n` + gs.map(([k, rs]) => `### ${k.split('|')[1] || k.split('|')[0]}\n\n` +
    mdTable(['Hired in', 'From level', 'Life (+/level)', 'Defense (+/level)', 'Str / Dex', 'Damage', 'Resists', 'Skills'], rs.sort((a, b) => int(a.Difficulty) - int(b.Difficulty) || int(a.Level) - int(b.Level)).map((r) => [
      DIFFS[int(r.Difficulty) - 1] ?? r.Difficulty, r.Level, `${r.HP} (+${r['HP/Lvl']})`, `${r.Defense} (+${r['Def/Lvl']})`, `${r.Str} / ${r.Dex}`, `${r['Dmg-Min']}-${r['Dmg-Max']}`,
      r.ResistFire, skillCell(r),
    ]), [, 'r'])).join('\n\n')).join('\n\n')}
`;
  site.page(p, 'Mercenaries', { type: 'reference' }, body);
}

function shrines(site) {
  const p = 'world/shrines.md';
  const rows = table('shrines').filter((r) => int(r.Code) > 0);
  const body = `Every shrine type. Timed shrines last the duration shown; a shrine can be used again after its reset time.

${mdTable(['Shrine', 'Effect', 'Duration', 'Reset (min)', 'Area level from'], rows.map((r) => [
    str(r.StringName) || r.Name, r['*Effect'], r['Duration in frames'] ? `${int(r['Duration in frames']) / 25}s` : '', r['reset time in minutes'], r.LevelMin,
  ]), [, , 'r', 'r', 'r'])}
`;
  site.page(p, 'Shrines', { type: 'reference' }, body);
}
