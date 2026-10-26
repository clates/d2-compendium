---
title: "Blood Shield"
type: "guide"
data_version: "3.3.94995"
generated: true
hash: "3bc1415357a34f5b"
---
# Blood Shield

**Who:** A Paladin levelling with a Zeal build. **Why:** A Blade Barrier can roll +Paladin skills and all resistances, and the fixed leech and thorns suit a melee character.

**Recipe:** a magic Spiked Shield (any tier) + Jewel + Ith Rune + Perfect Ruby. See [Cube recipes](../cube-recipes.md#crafted-items) for the fixed modifiers every one gets. The plan below assumes a [Blade Barrier](../bases/spiked-shield.md) (qlvl 68). Its qlvl is high enough that the game treats any lower item level as 68, giving affix level 37 at least, so "any" below means every item level reaches it.

## Affixes to look for

Best first. Each row is the best tier this base can roll and the one below it; **Level** is the affix level it needs, **Item level** the crafted item's level that reaches it on a Blade Barrier, **Req** the required level the affix adds, **Freq** its weight against every other affix the base can roll (higher is likelier).

| Want | Side | Affix | Level | Item level | Req | Freq |
| --- | --- | --- | ---: | ---: | ---: | ---: |
| + Paladin skills | prefix | Priest's: +2 to Paladin Skill Levels | 65 | 82 | 58 | 2 |
|  | prefix | Monk's: +1 to Paladin Skill Levels | 35 | any | 27 | 4 |
| All Resistances | prefix | Prismatic: All Resistances +(16-20) | 39 | 69 | 31 | 4 |
|  | prefix | Scintillating: All Resistances +(12-15) | 28 | any | 21 | 5 |
| Faster Hit Recovery | suffix | of Equilibrium: +17% Faster Hit Recovery | 9 | any | 6 | 4 |
|  | suffix | of Balance: +10% Faster Hit Recovery | 5 | any | 3 | 4 |
| Life | suffix | of the Mammoth: +(31-40) to Life | 59 | 79 | 51 | 3 |
|  | suffix | of the Tiger: +(21-30) to Life | 43 | 71 | 35 | 3 |
| Increased Chance of Blocking | suffix | of Deflecting: +30% Faster Block Rate, 20% Increased Chance of Blocking | 11 | any | 8 | 6 |
|  | suffix | of Blocking: +15% Faster Block Rate, 10% Increased Chance of Blocking | 1 | any | 1 | 7 |

## Item levels to aim for

| Item level | Random affixes | Opens up | Input item level at character level 80 / 90 / 99 | Required level if it rolls the best of these |
| ---: | --- | --- | ---: | ---: |
| 71 | 4 | All Resistances, Faster Hit Recovery, Increased Chance of Blocking (every best tier up to 71) | 62 / 52 / 43 | about 53 |
| 79 | 4 | Life | 78 / 68 / 59 | about 73 |
| 82 | 4 | + Paladin skills | 84 / 74 / 65 | about 80 |

The crafted item's level is 50% of the character's level plus 50% of the input item's, so the input column is 2 × target − character level; "–" means that character level can't reach it. Above 82 nothing new on this list opens up.

- Prefixes and suffixes compete for slots: a crafted item, like a rare, has at most three of each.
- Higher item levels don't push the lower tiers out: they stay in the pool unless their table row has a maximum level.
- Each affix is picked by weight among everything the base can roll, so a wanted affix is never guaranteed.

> **Unverified:** the required level estimate uses the community rule (highest affix requirement + 10 + 3 per affix, for four affixes), the three-and-three limit applies to crafted items as it does to rares, and the item level rounds down. None of these are in the tables.

## Sources

- Tables: `cubemain.txt` (recipe, item level shares), `magicprefix.txt` and `magicsuffix.txt` (affixes, `rare` column), the base's qlvl. Affix level formula: [Item generation](../../mechanics/item-generation.md).
- Who uses it and why is this site's judgment, not game data.

<!-- NOTES: hand-written text below this line is kept when pages are regenerated -->
