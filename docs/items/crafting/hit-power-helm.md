---
title: "Hit Power Helm"
type: "guide"
data_version: "3.3.94995"
generated: true
hash: "ff29813c49bb7e00"
---
# Hit Power Helm

**Who:** An Act 2 mercenary. **Why:** A Giant Conch is cheap to find, and the fixed Defense vs. Missile and thorns cost the mercenary nothing. Rolling life and two resistances on top makes a stopgap until a runeword or unique helm.

**Recipe:** a magic Full Helm (any tier) + Jewel + Ith Rune + Perfect Sapphire. See [Cube recipes](../cube-recipes.md#crafted-items) for the fixed modifiers every one gets. The plan below assumes a [Giant Conch](../bases/full-helm.md) (qlvl 54). Its qlvl is high enough that the game treats any lower item level as 54, giving affix level 27 at least, so "any" below means every item level reaches it.

## Affixes to look for

Best first. Each row is the best tier this base can roll and the one below it; **Level** is the affix level it needs, **Item level** the crafted item's level that reaches it on a Giant Conch, **Req** the required level the affix adds, **Freq** its weight against every other affix the base can roll (higher is likelier).

| Want | Side | Affix | Level | Item level | Req | Freq |
| --- | --- | --- | ---: | ---: | ---: | ---: |
| Life | suffix | of the Mammoth: +(31-40) to Life | 68 | 84 | 60 | 3 |
|  | suffix | of the Tiger: +(21-30) to Life | 51 | 75 | 43 | 3 |
| Fire Resist | prefix | Garnet: Fire Resist +(21-30)% | 18 | any | 13 | 3 |
|  | prefix | Russet: Fire Resist +(11-20)% | 12 | any | 9 | 4 |
| Lightning Resist | prefix | Coral: Lightning Resist +(21-30)% | 18 | any | 13 | 3 |
|  | prefix | Ocher: Lightning Resist +(11-20)% | 12 | any | 9 | 4 |
| Cold Resist | prefix | Cobalt: Cold Resist +(21-30)% | 18 | any | 13 | 3 |
|  | prefix | Lapis: Cold Resist +(11-20)% | 12 | any | 9 | 4 |
| Enhanced Defense | prefix | Godly: +(101-200)% Enhanced Defense | 50 | 75 | 43 | 1 |
|  | prefix | Holy: +(81-100)% Enhanced Defense | 36 | 63 | 27 | 6 |

## Item levels to aim for

| Item level | Random affixes | Opens up | Input item level at character level 80 / 90 / 99 | Required level if it rolls the best of these |
| ---: | --- | --- | ---: | ---: |
| 71 | 4 | Fire Resist, Lightning Resist, Cold Resist (every best tier up to 71) | 62 / 52 / 43 | about 35 |
| 75 | 4 | Enhanced Defense | 70 / 60 / 51 | about 65 |
| 84 | 4 | Life | 88 / 78 / 69 | about 82 |

The crafted item's level is 50% of the character's level plus 50% of the input item's, so the input column is 2 × target − character level; "–" means that character level can't reach it. Above 84 nothing new on this list opens up.

- Prefixes and suffixes compete for slots: a crafted item, like a rare, has at most three of each.
- Higher item levels don't push the lower tiers out: they stay in the pool unless their table row has a maximum level.
- Each affix is picked by weight among everything the base can roll, so a wanted affix is never guaranteed.

> **Unverified:** the required level estimate uses the community rule (highest affix requirement + 10 + 3 per affix, for four affixes), the three-and-three limit applies to crafted items as it does to rares, and the item level rounds down. None of these are in the tables.

## Sources

- Tables: `cubemain.txt` (recipe, item level shares), `magicprefix.txt` and `magicsuffix.txt` (affixes, `rare` column), the base's qlvl. Affix level formula: [Item generation](../../mechanics/item-generation.md).
- Who uses it and why is this site's judgment, not game data.

<!-- NOTES: hand-written text below this line is kept when pages are regenerated -->
