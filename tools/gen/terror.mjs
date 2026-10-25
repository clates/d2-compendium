// Terror zones (internally "desecrated"), Heralds, Worldstone Shards and the Colossal Ancients,
// from desecratedzones.json and the treasure classes.
import fs from 'node:fs';
import path from 'node:path';
import { RAW, table, int, str } from '../lib/data.mjs';
import { mdTable, list } from '../lib/md.mjs';
import { chance, odds, tcByName } from '../lib/tc.mjs';
import * as I from '../lib/items.mjs';

const TZ = 'world/terror-zones.md';
const CA = 'world/colossal-ancients.md';
const config = JSON.parse(fs.readFileSync(path.join(RAW, 'global', 'desecratedzones.json'), 'utf8').replace(/^﻿/, '')).desecrated_zones[0];
const levels = new Map(table('levels').map((r) => [int(r.Id), r]));
const monumod = new Map(table('monumod').map((u) => [int(u.id), u.uniquemod]));
const DIFF = [['normal', 'Normal'], ['nightmare', 'Nightmare'], ['hell', 'Hell']];

// monumod's internal names, as the game shows them on a monster.
const MOD = {
  strong: 'Extra Strong', fast: 'Extra Fast', curse: 'Cursed', resist: 'Magic Resistant', fire: 'Fire Enchanted',
  lightning: 'Lightning Enchanted', cold: 'Cold Enchanted', manahit: 'Mana Burn', spectralhit: 'Spectral Hit',
  stoneskin: 'Stone Skin', teleport: 'Teleportation', multishot: 'Multiple Shots', aura: 'Aura Enchanted',
};
const modName = (id) => MOD[monumod.get(id)] ?? monumod.get(id) ?? String(id);

const isShard = (x) => /^xa\d$/.test(x);
const isStatue = (x) => /^ua\d$/.test(x);
const isSunder = (x) => /^PreCrafted /.test(x);
const ACTS = [1, 2, 3, 4, 5];
// The act boss treasure classes in Hell, and their terrorized versions (the game picks a letter).
const BOSSES = [
  ['Andariel', 'Andarielq (H)', /^Andarielq Item \(H\) Desecrated [A-Z]$/, 'ua1'],
  ['Duriel', 'Duriel (H) - Base', /^Duriel \(H\) - Base Desecrated [A-Z]$/, 'ua2'],
  ['Mephisto', 'Mephisto (H)', /^Mephisto Item \(H\) Desecrated [A-Z]$/, 'ua3'],
  ['Diablo', 'Diablo (H)', /^Diablo Item \(H\) Desecrated [A-Z]$/, 'ua4'],
  ['Baal', 'Baal (H)', /^Baal Item \(H\) Desecrated$/, 'ua5'],
];

export function register(site) {
  site.register('page:terror-zones', TZ, 'Terror zones');
  site.register('page:colossal-ancients', CA, 'Colossal Ancients');
}

const areaLink = (site, p, id) => (site.has(`area:${id}`) ? site.link(p, `area:${id}`) : str(levels.get(id)?.LevelName) || String(id));
const itemLink = (site, p, code) => (site.has(`base:${code}`) ? site.link(p, `base:${code}`, I.baseName(code)) : I.baseName(code));
const span = (ps) => {
  const lo = Math.min(...ps);
  const hi = Math.max(...ps);
  return odds(lo) === odds(hi) ? odds(lo) : `${odds(hi)} to ${odds(lo)}`;
};

function renderTerror(site) {
  const p = TZ;
  const rotw = config.game_difficulties.rotw;
  const hell = rotw.hell;
  const tiers = hell.defaults.herald_tiers ?? [];
  const pool = hell.always_unique_mod_pool ?? [];
  const poolTotal = pool.reduce((s, m) => s + m.chance, 0);
  const zoneRows = config.zones.map((z) => {
    const ids = [...new Set(z.levels.map((l) => l.level_id))].filter((id) => levels.has(id));
    const act = int(levels.get(ids[0])?.Act) + 1;
    return [String(act), ids.map((id) => areaLink(site, p, id)).join(', ')];
  });

  const shardRows = ACTS.map((a) => {
    const champ = ['A', 'B', 'C'].map((l) => `Act ${a} (H) Champ ${l}`).filter((n) => tcByName.has(n));
    const uniq = ['A', 'B', 'C'].map((l) => `Act ${a} (H) Unique ${l}`).filter((n) => tcByName.has(n));
    return [`Act ${a}`, span(champ.map((n) => chance(n, isShard))), span(uniq.map((n) => chance(n, isShard)))];
  });
  const heraldTcs = [...tcByName.keys()].filter((n) => /^Act \d \(H\) Herald [A-Z]$/.test(n));
  const herald = (want) => span(heraldTcs.map((n) => chance(n, want)));

  const body = `A terror zone is a group of areas that is terrorized for ${config.zone_duration_minutes} minutes, then the next group takes over. While an area is terrorized, its monsters are raised to near the character's level, give more experience, and use their own treasure classes. In Hell, Reign of the Warlock characters also meet [Heralds](#heralds), and every monster has an extra modifier. The game calls them *desecrated* zones internally.

## Monster level and experience

Terrorized monsters are ${rotw.normal.defaults.boost_level} levels above the character (champions and uniques add their usual bonus on top), but never below or above the difficulty's bounds:

${mdTable(['Difficulty', 'Lowest monster level', 'Highest monster level', 'Bonus experience', 'Herald tiers'], DIFF.map(([k, label]) => {
    const d = rotw[k].defaults;
    return [label, String(d.bound_incl_min), String(d.bound_incl_max), `+${d.boost_experience_percent}%`, String(rotw[k].max_herald_tiers || '')];
  }), [, 'r', 'r', 'r', 'r'])}

Characters without Reign of the Warlock have the same bounds and bonus, and no Heralds.

> **Unverified:** whether the character level used is the highest in the party or each player's own.

## The zones

${config.zones.length} zones. Each zone is the areas in its row; they are terrorized together.

${mdTable(['Act', 'Areas'], zoneRows, ['r'])}

## Extra monster modifier (Hell)

In Hell, terrorized monsters get one more modifier, drawn from this pool:

${mdTable(['Modifier', 'Weight', 'Chance'], pool.map((m) => [modName(m.unique_mod), String(m.chance), `${((100 * m.chance) / poolTotal).toFixed(1)}%`]), [, 'r', 'r'])}

See ${site.link(p, 'page:elite-mods', 'Elite modifiers')}.

> **Unverified:** whether one modifier is drawn per game or per monster. Blizzard's patch notes say every monster in a game's terror zones gets the same random affix.

## Heralds

A Herald is a monster of the zone promoted to a boss with minions. They only appear in Hell, for Reign of the Warlock characters. Each tier is stronger and drops from a higher treasure class level:

${mdTable(['Tier', 'Herald life', 'Herald damage', 'Minions', 'Minion life', 'Minion damage', 'Modifiers', 'Drop level boost'], tiers.map((t, i) => [
    String(i + 1), `+${t.herald_health_boost_percent}%`, `+${t.herald_damage_boost_percent}%`, t.min_minions === t.max_minions ? String(t.min_minions) : `${t.min_minions}-${t.max_minions}`,
    `+${t.minion_health_boost_percent}%`, `+${t.minion_damage_boost_percent}%`, t.min_unique_mods === t.max_unique_mods ? String(t.min_unique_mods) : `${t.min_unique_mods}-${t.max_unique_mods}`,
    `+${t.herald_treasure_class_level_boost ?? 0}`,
  ]), ['r', 'r', 'r', 'r', 'r', 'r', 'r', 'r'])}

The chance that a Herald appears follows a curve set per tier (\`zone_chance_*\` in the file: slope, midpoint, asymptote, vertical shift):

${mdTable(['Tier', 'Slope', 'Midpoint', 'Asymptote', 'Shift'], tiers.map((t, i) => [String(i + 1), String(t.zone_chance_slope), String(t.zone_chance_midpoint), String(t.zone_chance_asymptote), String(t.zone_chance_vertical_shift)]), ['r', 'r', 'r', 'r', 'r'])}

> **Unverified:** what the curve's input is. The shape (a logistic curve, asymptote / (1 + e^(-slope × (x - midpoint))) + shift) suggests a percent chance that rises with the number of monsters killed in the zone, which matches Blizzard's description, but the game code isn't documented.

Every monster that can be terrorized has a Herald treasure class in Hell (\`TreasureClassHerald(H)\`). Each Herald roll drops six items: its act's Herald item class twice, its "1 Extra" and "2 Extra" versions once each, and potions twice. From one Herald, with one player:

${mdTable(['Item', 'Chance'], [
    ['A Worldstone Shard', herald(isShard)],
    ['A Latent Sunder charm', herald(isSunder)],
  ], [, 'r'])}

> **Unverified:** whether every tier rolls the "Extra" classes, or only higher tiers. The numbers above assume all six drops roll.

## Worldstone Shards

A Worldstone Shard terrorizes every area of one act for the rest of the game. There is one per act:

${mdTable(['Shard', 'Act'], ['xa1', 'xa2', 'xa3', 'xa4', 'xa5'].map((c, i) => [itemLink(site, p, c), String(i + 1)]), [, 'r'])}

Shards drop from champions and uniques in Hell, terrorized or not, and from Heralds. Chance per monster killed, with one player:

${mdTable(['Act', 'Champion', 'Unique'], shardRows, [, 'r', 'r'])}

When a shard drops, it's two shards: one from the act's shard table and one from the all-acts table, where each shard is equally likely. The act's table favours a different act's shard: Act 1 monsters lean towards the Southern Worldstone Shard (Act 3). See ${site.link(p, 'tc:Act 1 Terrorize Act Consumable', 'the shard tables')}.

> **Unverified:** these are the tables' odds. The game code may add conditions on top (Blizzard's notes say shard odds no longer depend on player count, which the tables alone wouldn't need). The two-shard reading follows the table (\`Picks -2\` in "Worldstone Shard Parent Citem A"). The tables also have chains named "Act N Worldstone Shards 1-12" and "Herald Charm 1-10" that nothing in the tables points to; the game code may use them.

## Sources

- Tables: \`desecratedzones.json\` (zones, levels, experience, Heralds, the modifier pool), \`treasureclassex.txt\` (all drop chances, worked out through the chain of treasure classes), \`monstats.txt\` (\`TreasureClassHerald\`).
- [Blizzard, PTR 3.2 patch notes](https://news.blizzard.com/en-us/article/24266710): Heralds hunting after kills, shard and Sunder charm changes.
- [d2emu, Reign of the Warlock endgame](https://d2emu.com/guides/reign-of-the-warlock-endgame): Herald behaviour, as a second reading.
`;
  site.page(p, 'Terror zones', { type: 'reference' }, body);
}

function renderAncients(site) {
  const p = CA;
  const recipe = table('cubemain').find((r) => r.enabled === '1' && /Red Portal/.test(r.output) && /ua1/.test(r['input 1']));
  const portalLevel = recipe?.output.match(/lvl=(\d+)/)?.[1];
  const ancients = table('monstats').filter((r) => /^colossal\d$/.test(r.Id));
  const bossRows = BOSSES.map(([name, base, desecrated, code]) => {
    const terror = [...tcByName.keys()].filter((n) => desecrated.test(n));
    return [name, itemLink(site, p, code), odds(chance(base, (x) => x === code)), span(terror.map((n) => chance(n, (x) => x === code))), odds(chance(base, isStatue)), span(terror.map((n) => chance(n, isStatue)))];
  });
  const body = `The Colossal Ancients are Talic, Madawc and Korlic's colossal forms, fought in Hell by Reign of the Warlock characters. Put the five Colossal Ancient statues in the ${site.link(p, 'page:cube', 'Horadric Cube')} to open a red portal to them${portalLevel ? ` (area ${areaLink(site, p, int(portalLevel))})` : ''}.

## The statues

Each act boss in Hell can drop a statue, most often its own. Chance per kill, one player:

${mdTable(['Boss', 'Statue', 'Chance', 'Terrorized', 'Any statue', 'Any statue, terrorized'], bossRows, [, , 'r', 'r', 'r', 'r'])}

"Terrorized" covers the boss's terrorized treasure classes; the game picks one of them, so it's shown as a range.

## The Ancients

${mdTable(['Monster', 'Level', 'Drops'], ancients.map((m) => [
    site.has(`mon:${m.Id}`) ? site.link(p, `mon:${m.Id}`, str(m.NameStr)) : str(m.NameStr), m['Level(H)'] || m.Level,
    [m['TreasureClassQuest(H)'], m['TreasureClass(H)']].filter((t) => t && tcByName.has(t)).map((t) => site.link(p, `tc:${t}`, t)).join(', '),
  ]), [, 'r'])}

Each Ancient's treasure class holds two of the six Colossal jewels:
${list(ancients.map((m) => m['TreasureClassQuest(H)'] || m['TreasureClass(H)']).filter((t) => tcByName.has(t)).map((t) => `${t}: ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => tcByName.get(t)[`Item${i}`]).filter(Boolean).map((u) => (site.has(`uniquename:${u}`) ? site.link(p, `uniquename:${u}`) : u)).join(', ')}`))}

The Renewed Sunder charm recipes take Worldstone Shards, not statues; see ${site.link(p, 'page:cube', 'Horadric Cube recipes')}.

## Sources

- Tables: \`cubemain.txt\` (the portal recipe), \`treasureclassex.txt\` (statue and jewel drops), \`monstats.txt\` (the Ancients).
`;
  site.page(p, 'Colossal Ancients', { type: 'reference', rotw_only: true }, body);
}

export function render(site) {
  renderTerror(site);
  renderAncients(site);
}
