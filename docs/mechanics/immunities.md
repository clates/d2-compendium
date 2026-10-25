---
title: "Immunities"
type: "mechanics"
---
# Immunities

A monster's resistance cuts the damage it takes of that type by the same percentage: 40% fire
resistance means fire damage does 60%. At 100% or more, the monster is **immune** and takes none.
Each monster's resistances per difficulty are on its page in [Monsters](../monsters/index.md);
most Hell monsters are immune to at least one element.

Resistance can be lowered, and an immunity can be **broken**: brought below 100 so the damage
gets through. Only some effects can do that.

## What lowers resistance

| Source | Lowers | At level 1 / 20 | Notes |
|---|---|---|---|
| [Conviction](../classes/paladin/conviction.md) (aura) | fire, cold, lightning | -30 / -125 | capped at -150 |
| [Lower Resist](../classes/necromancer/lower-resist.md) (curse) | fire, cold, lightning, poison | -31 / -62 | approaches -70 |
| [Amplify Damage](../classes/necromancer/amplify-damage.md) (curse) | physical | -100 | |
| [Decrepify](../classes/necromancer/decrepify.md) (curse) | physical | -50 | |
| [Cold Mastery](../classes/sorceress/cold-mastery.md) and the other masteries | the caster's own damage of that element | 20 / 115 | called pierce; not a curse or aura |
| "-% to Enemy Fire Resistance" on items | that element | | |
| [Sunder charms](#sunder-charms) | one damage type | | |

The level numbers are from the skill table and are on each skill's page.

## Breaking an immunity

These are Maxroll's findings, not table data:

- **Only curses, auras and Sunder charms can break an immunity.** "-% to Enemy Resistance" on
  items and the masteries' pierce only work on monsters that aren't immune, or whose immunity
  something else has already broken.
- **Against an immune monster, curses and auras work at a fifth of their strength.** Conviction
  at level 20 does -25 instead of -125.
- So the reduction needed to break an immunity is five times what's above 99:
  `(resistance - 99) × 5`. A monster with 110 fire resistance needs 55 points of curse or aura:
  a level 1 Lower Resist (-31) and a level 1 Conviction (-30) together are enough.
- **Order:** Sunder charms first, then curses, then auras, then -% Enemy Resistance from items,
  then pierce.
- Resistance can't be pushed below -100.
- No curse or aura lowers magic resistance, so magic immunity can only be broken by the magic
  Sunder charm, [Black Cleft](../items/uniques/latent-black-cleft.md).

> **Unverified:** Maxroll's article is also read as saying that effects stay at a fifth of their
> strength after the immunity breaks, which contradicts its own worked example. Not tested.

## Sunder charms

A Sunder charm ("Monster Fire Immunity is Sundered") changes the immunity of every monster the
holder hits from immune to a resistance of 95. Then the usual reductions apply. Curses and
auras still work at a fifth of their strength on a sundered monster; -% Enemy Resistance from items works in full.
Each charm also lowers its holder's own resistance to that element.

| Charm | Sunders |
|---|---|
| [Latent Flame Rift](../items/uniques/latent-flame-rift.md) | fire |
| [Latent Cold Rupture](../items/uniques/latent-cold-rupture.md) | cold |
| [Latent Crack of the Heavens](../items/uniques/latent-crack-of-the-heavens.md) | lightning |
| [Latent Rotting Fissure](../items/uniques/latent-rotting-fissure.md) | poison |
| [Latent Bone Break](../items/uniques/latent-bone-break.md) | physical |
| [Latent Black Cleft](../items/uniques/latent-black-cleft.md) | magic |

Reign of the Warlock characters find the Latent versions and can upgrade them in the cube to
Renewed ones with extra stats; other characters find the [original six](../items/uniques/cold-rupture.md).
See [Terror zones](../world/terror-zones.md#heralds) for where they drop.

> **Unverified:** the value 95 and the fifth-strength rule on sundered monsters come from Maxroll.

## Monster modifiers that add resistance

Champions and uniques can get modifiers that raise their resistances (Maxroll):

| Modifier | Effect |
|---|---|
| Fire, Cold or Lightning Enchanted | +75 to that element |
| Magic Resistant | +40 fire, cold and lightning |
| Spectral Hit | +20 fire, cold and lightning |
| Mana Burn | +20 magic |
| Stone Skin | +50 physical |
| Ghostly (champions) | physical resistance set to 80 |

Unique monsters get one random modifier in Normal, two in Nightmare and three in Hell. Super
uniques keep their fixed modifiers and get one extra random one in Nightmare and two in Hell. See
[Elite modifiers](../monsters/elite-modifiers.md). Terrorized monsters in Hell get one more; see
[Terror zones](../world/terror-zones.md#extra-monster-modifier-hell).

## Sources

- Tables: `skills.txt` (`aurastat`, `aurastatcalc` and `passivestat` columns for the skill values;
  Conviction's `-min(ln34,150)` is the -150 cap), `monstats.txt` (resistances).
- [Maxroll, Immunities](https://maxroll.gg/d2/resources/immunities): breaking rules, order,
  Sunder charms, modifier resistances.
