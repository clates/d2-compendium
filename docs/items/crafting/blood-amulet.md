---
title: "Blood Amulet"
type: "guide"
data_version: "3.3.94995"
generated: true
hash: "42afe46c5cb7b1f0"
---
# Blood Amulet

**Who:** A Whirlwind Barbarian. **Why:** The fixed run speed, leech and life are all things he wants, so the random affixes can go to +Barbarian skills and stats.

**Recipe:** a magic amulet + Jewel + Amn Rune + Perfect Ruby. See [Cube recipes](../cube-recipes.md#crafted-items) for the fixed modifiers every one gets. The plan below assumes an Amulet (qlvl 1).

## Affixes to look for

Best first. Each row is the best tier this base can roll and the one below it; **Level** is the affix level it needs, **Item level** the crafted item's level that reaches it on an Amulet, **Req** the required level the affix adds, **Freq** its weight against every other affix the base can roll (higher is likelier).

| Want | Side | Affix | Level | Item level | Req | Freq |
| --- | --- | --- | ---: | ---: | ---: | ---: |
| + Barbarian skills | prefix | Berserker's: +2 to Barbarian Skill Levels | 90 | 90 | 67 | 2 |
|  | prefix | Slayer's: +1 to Barbarian Skill Levels | 36 | 36 | 27 | 4 |
| Strength | suffix | of Atlas: +(21-30) to Strength | 71 | 71 | 63 | 3 |
|  | suffix | of the Titan: +(16-20) to Strength | 58 | 58 | 50 | 3 |
| Dexterity | suffix | of Perfection: +(16-20) to Dexterity | 59 | 59 | 51 | 3 |
|  | suffix | of Precision: +(10-15) to Dexterity | 43 | 43 | 35 | 3 |
| All Resistances | prefix | Prismatic: All Resistances +(16-20) | 42 | 42 | 31 | 4 |
|  | prefix | Scintillating: All Resistances +(12-15) | 34 | 34 | 25 | 5 |
| Life | suffix | of the Colossus: +(41-60) to Life | 30 | 30 | 22 | 3 |
|  | suffix | of the Mammoth: +(31-40) to Life | 25 | 25 | 18 | 3 |

## Item levels to aim for

| Item level | Random affixes | Opens up | Input item level at character level 80 / 90 / 99 | Required level if it rolls the best of these |
| ---: | --- | --- | ---: | ---: |
| 71 | 4 | Strength, Dexterity, All Resistances, Life (every best tier up to 71) | 62 / 52 / 43 | about 85 |
| 90 | 4 | + Barbarian skills | – / 90 / 81 | about 89 |

The crafted item's level is 50% of the character's level plus 50% of the input item's, so the input column is 2 × target − character level; "–" means that character level can't reach it. Above 90 nothing new on this list opens up.

- Prefixes and suffixes compete for slots: a crafted item, like a rare, has at most three of each.
- Higher item levels don't push the lower tiers out: they stay in the pool unless their table row has a maximum level.
- Each affix is picked by weight among everything the base can roll, so a wanted affix is never guaranteed.

> **Unverified:** the required level estimate uses the community rule (highest affix requirement + 10 + 3 per affix, for four affixes), the three-and-three limit applies to crafted items as it does to rares, and the item level rounds down. None of these are in the tables.

## Sources

- Tables: `cubemain.txt` (recipe, item level shares), `magicprefix.txt` and `magicsuffix.txt` (affixes, `rare` column), the base's qlvl. Affix level formula: [Item generation](../../mechanics/item-generation.md).
- Who uses it and why is this site's judgment, not game data.

<!-- NOTES: hand-written text below this line is kept when pages are regenerated -->
