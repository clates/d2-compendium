---
title: "Safety Shield"
type: "guide"
data_version: "3.3.94995"
generated: true
hash: "da11b0d974b3b974"
---
# Safety Shield

**Who:** A Hardcore character who blocks. **Why:** A Monarch has high block, and the fixed magic resistance and damage reduction add survival. All resistances is the roll to hope for.

**Recipe:** a magic Kite Shield (any tier) + Jewel + Nef Rune + Perfect Emerald. See [Cube recipes](../cube-recipes.md#crafted-items) for the fixed modifiers every one gets. The plan below assumes a [Monarch](../bases/kite-shield.md) (qlvl 72). Its qlvl is high enough that the game treats any lower item level as 72, giving affix level 45 at least, so "any" below means every item level reaches it.

## Affixes to look for

Best first. Each row is the best tier this base can roll and the one below it; **Level** is the affix level it needs, **Item level** the crafted item's level that reaches it on a Monarch, **Req** the required level the affix adds, **Freq** its weight against every other affix the base can roll (higher is likelier).

| Want | Side | Affix | Level | Item level | Req | Freq |
| --- | --- | --- | ---: | ---: | ---: | ---: |
| All Resistances | prefix | Prismatic: All Resistances +(16-20) | 39 | any | 31 | 4 |
|  | prefix | Scintillating: All Resistances +(12-15) | 28 | any | 21 | 5 |
| Faster Hit Recovery | suffix | of Equilibrium: +17% Faster Hit Recovery | 9 | any | 6 | 4 |
|  | suffix | of Balance: +10% Faster Hit Recovery | 5 | any | 3 | 4 |
| Life | suffix | of the Mammoth: +(31-40) to Life | 59 | 79 | 51 | 3 |
|  | suffix | of the Tiger: +(21-30) to Life | 43 | any | 35 | 3 |
| Strength | suffix | of the Ox: +(6-9) to Strength | 45 | any | 37 | 3 |
|  | suffix | of Might: +(3-5) to Strength | 33 | any | 25 | 3 |
| Enhanced Defense | prefix | Godly: +(101-200)% Enhanced Defense | 50 | 75 | 43 | 1 |
|  | prefix | Holy: +(81-100)% Enhanced Defense | 36 | any | 27 | 6 |

## Item levels to aim for

| Item level | Random affixes | Opens up | Input item level at character level 80 / 90 / 99 | Required level if it rolls the best of these |
| ---: | --- | --- | ---: | ---: |
| 71 | 4 | All Resistances, Faster Hit Recovery, Strength (every best tier up to 71) | 62 / 52 / 43 | about 59 |
| 75 | 4 | Enhanced Defense | 70 / 60 / 51 | about 65 |
| 79 | 4 | Life | 78 / 68 / 59 | about 73 |

The crafted item's level is 50% of the character's level plus 50% of the input item's, so the input column is 2 × target − character level; "–" means that character level can't reach it. Above 79 nothing new on this list opens up.

- Prefixes and suffixes compete for slots: a crafted item, like a rare, has at most three of each.
- Higher item levels don't push the lower tiers out: they stay in the pool unless their table row has a maximum level.
- Each affix is picked by weight among everything the base can roll, so a wanted affix is never guaranteed.

> **Unverified:** the required level estimate uses the community rule (highest affix requirement + 10 + 3 per affix, for four affixes), the three-and-three limit applies to crafted items as it does to rares, and the item level rounds down. None of these are in the tables.

## Sources

- Tables: `cubemain.txt` (recipe, item level shares), `magicprefix.txt` and `magicsuffix.txt` (affixes, `rare` column), the base's qlvl. Affix level formula: [Item generation](../../mechanics/item-generation.md).
- Who uses it and why is this site's judgment, not game data.

<!-- NOTES: hand-written text below this line is kept when pages are regenerated -->
