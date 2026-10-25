---
title: "Skill numbers"
type: "mechanics"
---
# Skill numbers

How the per-level numbers on the skill pages are computed from the skill table. They're base
values: synergies, masteries, +damage on items and the target's resistances all come after.

## Mana cost

```
mana cost = (mana + lvlmana × (level - 1)) × 2^manashift / 256, at least minmana
```

Fire Ball: mana 10, lvlmana 1, manashift 7, so 5 mana at level 1 and 14.5 at level 20.

## Damage

Elemental damage (`EMin`, `EMax`) and physical damage (`MinDam`, `MaxDam`) start at a level 1
value and grow by a different amount per level in five bands:

| Levels | Growth per level from |
|---|---|
| 2-8 | `EMinLev1` / `MinLevDam1` |
| 9-16 | `EMinLev2` / `MinLevDam2` |
| 17-22 | `EMinLev3` / `MinLevDam3` |
| 23-28 | `EMinLev4` / `MinLevDam4` |
| 29+ | `EMinLev5` / `MinLevDam5` |

The total is then scaled by `2^HitShift / 256`: HitShift 8 means the table is in whole points,
7 means halves.

Fire Ball at level 20: `12 + 13×7 + 23×8 + 28×4 = 399`, halved (HitShift 7) is 199 minimum. The
maximum works out to 226, which is what the game shows.

**Poison** damage is per frame (25 frames a second): the skill pages give the total over the
duration. **Burning** skills (fire walls and trails) also deal damage per frame, and the game's
tooltip shows it per second; their pages show the raw table values.

## Duration

`ELen` is in frames (25 a second). It grows per level by `ELevLen1` (levels 2-8), `ELevLen2`
(9-16) and `ELevLen3` (17+).

## Calc columns

Many numbers live in calculation columns (`calc1`-`calc4`) built from the skill's parameters:

| Expression | Value at skill level L |
|---|---|
| `parN` | Parameter N |
| `lnXY` | `parX + parY × (L - 1)`: linear growth |
| `dmXY` | `parX + (parY - parX) × floor(110 × L / (L + 6)) / 100`, rounded down: grows fast, then levels off towards parY. The inner part is rounded down first: Lower Resist (25 to 70) is 31% at level 1 |

The skill pages label each one with the table's own description of it (e.g. "Damage %").

## Synergies

A synergy adds a percentage per **base** level (hard points, not +skills) of another skill. The
skill pages read them from `EDmgSymPerCalc` (elemental damage), `DmgSymPerCalc` (physical
damage) and `ELenSymPerCalc` (duration).

> **Unverified:** the `dm` formula is as the Phrozen Keep documents it; rounding may differ from
> the game by a point.

## Sources

- Tables: `skills.txt` (`mana`, `lvlmana`, `manashift`, `minmana`, `EMin`-`EMaxLev5`,
  `MinDam`-`MaxLevDam5`, `HitShift`, `ELen`-`ELevLen3`, `calc1`-`calc4`, `Param1`-`Param8`),
  `skilldesc.txt` (tree positions).
- [Phrozen Keep: skills.txt guide](https://d2mods.info/forum/kb/viewarticle?a=320).
