---
title: "Breakpoints"
type: "mechanics"
---
# Breakpoints

Casting, recovering from a hit and blocking are animations. The game runs at 25 frames a second, and an animation
always takes a whole number of frames. Faster Cast Rate, Faster Hit Recovery and Faster Block Rate
speed the animation up, but you only gain when the total crosses the next **breakpoint** and the animation loses a
frame. Faster Cast Rate past the last breakpoint does nothing.

Read each row as "with at least this much, the animation takes this many frames". For example, a
Sorceress with 105% Faster Cast Rate casts in 8 frames (0.32 seconds); she needs 200% for 7.

These tables are the community's, from Maxroll. They aren't generated from the game's
animation data. There are none yet for the Warlock.

> **Unverified:** the Warlock's breakpoints, and whether Reign of the Warlock changed any other
> class's animations. Maxroll's tables were made before the Warlock.

## How they're calculated

The diminishing returns formula is the same for all three stats: effective value =
`floor(value × 120 / (value + 120))`. Faster Cast Rate is capped at an effective 75, so 200% is
the most that helps. The frame count is then the class's base frames for that animation, sped up by the
effective value. Maxroll gives the full formulas and each class's base frames.

Some casting breakpoints change only the point in the cast where the spell comes out (the action frame), not
the total frames; those aren't listed here. Holy Shield adds 50 to effective block rate, which is
why the Paladin's row with it is so short.

## Faster Cast Rate

| Class | Breakpoints: stat → frames |
|---|---|
| Amazon, bow | 0 → 19, 7 → 18, 14 → 17, 22 → 16, 32 → 15, 48 → 14, 68 → 13, 99 → 12, 152 → 11 |
| Amazon, crossbow or two-handed sword | 0 → 19, 7 → 18, 14 → 17, 22 → 16, 32 → 15, 48 → 14, 68 → 13, 99 → 12, 152 → 11 |
| Amazon, no weapon | 0 → 19, 7 → 18, 14 → 17, 22 → 16, 32 → 15, 48 → 14, 68 → 13, 99 → 12, 152 → 11 |
| Amazon, other weapons | 0 → 19, 7 → 18, 14 → 17, 22 → 16, 32 → 15, 48 → 14, 68 → 13, 99 → 12, 152 → 11 |
| Assassin | 0 → 16, 8 → 15, 16 → 14, 27 → 13, 42 → 12, 65 → 11, 102 → 10, 174 → 9 |
| Barbarian | 0 → 13, 9 → 12, 20 → 11, 37 → 10, 63 → 9, 105 → 8, 200 → 7 |
| Druid | 0 → 18, 4 → 17, 10 → 16, 19 → 15, 30 → 14, 46 → 13, 68 → 12, 99 → 11, 163 → 10 |
| Druid, Werewolf | 0 → 16, 6 → 15, 14 → 14, 26 → 13, 40 → 12, 60 → 11, 95 → 10, 157 → 9 |
| Druid, Werebear | 0 → 16, 7 → 15, 15 → 14, 26 → 13, 40 → 12, 63 → 11, 99 → 10, 163 → 9 |
| Necromancer | 0 → 15, 9 → 14, 18 → 13, 30 → 12, 48 → 11, 75 → 10, 125 → 9 |
| Necromancer, Vampire form | 0 → 23, 6 → 22, 11 → 21, 18 → 20, 24 → 19, 35 → 18, 48 → 17, 65 → 16, 86 → 15, 120 → 14, 180 → 13 |
| Paladin | 0 → 15, 9 → 14, 18 → 13, 30 → 12, 48 → 11, 75 → 10, 125 → 9 |
| Sorceress | 0 → 13, 9 → 12, 20 → 11, 37 → 10, 63 → 9, 105 → 8, 200 → 7 |
| Sorceress, Lightning and Chain Lightning | 0 → 19, 7 → 18, 15 → 17, 23 → 16, 35 → 15, 52 → 14, 78 → 13, 117 → 12, 194 → 11 |
| Act 3 mercenary | 0 → 17, 8 → 16, 15 → 15, 26 → 14, 39 → 13, 58 → 12, 86 → 11, 138 → 10 |

## Faster Hit Recovery

| Class | Breakpoints: stat → frames |
|---|---|
| Amazon | 0 → 11, 6 → 10, 13 → 9, 20 → 8, 32 → 7, 52 → 6, 86 → 5, 174 → 4 |
| Assassin | 0 → 9, 7 → 8, 15 → 7, 27 → 6, 48 → 5, 86 → 4, 200 → 3 |
| Barbarian | 0 → 9, 7 → 8, 15 → 7, 27 → 6, 48 → 5, 86 → 4, 200 → 3 |
| Druid, one-handed swinging weapons | 0 → 14, 3 → 13, 7 → 12, 13 → 11, 19 → 10, 29 → 9, 42 → 8, 63 → 7, 99 → 6, 174 → 5, 456 → 4 |
| Druid, other weapons | 0 → 13, 5 → 12, 10 → 11, 16 → 10, 26 → 9, 39 → 8, 56 → 7, 86 → 6, 152 → 5, 377 → 4 |
| Druid, Werewolf | 0 → 7, 9 → 6, 20 → 5, 42 → 4, 86 → 3, 280 → 2 |
| Druid, Werebear | 0 → 13, 5 → 12, 10 → 11, 16 → 10, 24 → 9, 37 → 8, 54 → 7, 86 → 6, 152 → 5, 360 → 4 |
| Necromancer | 0 → 13, 5 → 12, 10 → 11, 16 → 10, 26 → 9, 39 → 8, 56 → 7, 86 → 6, 152 → 5, 377 → 4 |
| Necromancer, Vampire form | 0 → 15, 2 → 14, 6 → 13, 10 → 12, 16 → 11, 24 → 10, 34 → 9, 48 → 8, 72 → 7, 117 → 6, 208 → 5 |
| Paladin, spears and staves | 0 → 13, 3 → 12, 7 → 11, 13 → 10, 20 → 9, 32 → 8, 48 → 7, 75 → 6, 129 → 5, 280 → 4 |
| Paladin, other weapons | 0 → 9, 7 → 8, 15 → 7, 27 → 6, 48 → 5, 86 → 4, 200 → 3 |
| Sorceress | 0 → 15, 5 → 14, 9 → 13, 14 → 12, 20 → 11, 30 → 10, 42 → 9, 60 → 8, 86 → 7, 142 → 6, 280 → 5 |
| Act 1 mercenary | 0 → 11, 6 → 10, 13 → 9, 20 → 8, 32 → 7, 52 → 6, 86 → 5, 174 → 4 |
| Act 2 mercenary | 0 → 15, 5 → 14, 9 → 13, 14 → 12, 20 → 11, 30 → 10, 42 → 9, 60 → 8, 86 → 7, 142 → 6 |
| Act 3 mercenary | 0 → 17, 5 → 16, 8 → 15, 13 → 14, 18 → 13, 24 → 12, 32 → 11, 46 → 10, 63 → 9, 86 → 8, 133 → 7, 232 → 6 |
| Act 5 mercenary | 0 → 9, 7 → 8, 15 → 7, 27 → 6, 48 → 5, 86 → 4, 200 → 3 |

## Faster Block Rate

| Class | Breakpoints: stat → frames |
|---|---|
| Amazon, one-handed swinging weapons | 0 → 17, 4 → 16, 6 → 15, 11 → 14, 15 → 13, 23 → 12, 29 → 11, 40 → 10, 56 → 9, 80 → 8, 120 → 7 |
| Amazon, other weapons | 0 → 5, 13 → 4, 32 → 3, 86 → 2 |
| Assassin | 0 → 5, 13 → 4, 32 → 3, 86 → 2 |
| Barbarian | 0 → 7, 9 → 6, 20 → 5, 42 → 4, 86 → 3 |
| Druid | 0 → 11, 6 → 10, 13 → 9, 20 → 8, 32 → 7, 52 → 6, 86 → 5 |
| Druid, Werewolf | 0 → 9, 7 → 8, 15 → 7, 27 → 6, 48 → 5, 86 → 4 |
| Druid, Werebear | 0 → 12, 5 → 11, 10 → 10, 16 → 9, 27 → 8, 40 → 7, 65 → 6, 109 → 5 |
| Necromancer | 0 → 11, 6 → 10, 13 → 9, 20 → 8, 32 → 7, 52 → 6, 86 → 5 |
| Paladin | 0 → 5, 13 → 4, 32 → 3, 86 → 2 |
| Paladin, with Holy Shield | 0 → 2, 86 → 1 |
| Sorceress | 0 → 9, 7 → 8, 15 → 7, 27 → 6, 48 → 5, 86 → 4 |

Faster Cast Rate does nothing for the Act 1 mercenary (Maxroll), and the Act 2 and Act 5
mercenaries don't cast spells. Maxroll has no block tables for mercenaries.

Attack speed (Increased Attack Speed and weapon speed) works differently, per weapon and skill.
See Maxroll's attack speed calculator.

## Sources

- [Maxroll, Breakpoints and Animations](https://maxroll.gg/d2/resources/breakpoints-animations):
  every table on this page, and the formulas.
