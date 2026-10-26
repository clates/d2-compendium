---
title: "Hit Power Weapon"
type: "guide"
data_version: "3.3.94995"
generated: true
hash: "fc2e93422cefe01d"
---
# Hit Power Weapon

**Who:** A Blessed Hammer Paladin. **Why:** Blunt weapons include scepters. A Caduceus can roll +2 Paladin skills, +2 Combat Skills (Blessed Hammer) and Faster Cast Rate on the same item.

**Recipe:** a magic blunt + Jewel + Tir Rune + Perfect Sapphire. See [Cube recipes](../cube-recipes.md#crafted-items) for the fixed modifiers every one gets. The plan below assumes a [Caduceus](../bases/war-scepter.md) (qlvl 85). Its qlvl is high enough that the game treats any lower item level as 85, giving affix level 71 at least, so "any" below means every item level reaches it.

## Affixes to look for

Best first. Each row is the best tier this base can roll and the one below it; **Level** is the affix level it needs, **Item level** the crafted item's level that reaches it on a Caduceus, **Req** the required level the affix adds, **Freq** its weight against every other affix the base can roll (higher is likelier).

| Want | Side | Affix | Level | Item level | Req | Freq |
| --- | --- | --- | ---: | ---: | ---: | ---: |
| + Paladin skills | prefix | Priest's: +2 to Paladin Skill Levels | 50 | any | 42 | 2 |
|  | prefix | Monk's: +1 to Paladin Skill Levels | 30 | any | 22 | 4 |
| + Paladin Combat Skills | prefix | Hawk Branded: +2 to Combat Skills (Paladin Only) | 40 | any | 30 | 1 |
|  | prefix | Lion Branded: +1 to Combat Skills (Paladin Only) | 20 | any | 15 | 1 |
| Faster Cast Rate | suffix | of the Apprentice: +10% Faster Cast Rate | 5 | any | 3 | 6 |
| Strength | suffix | of the Titan: +(16-20) to Strength | 74 | 87 | 66 | 3 |
|  | suffix | of the Giant: +(10-15) to Strength | 55 | any | 47 | 3 |
| Mana | prefix | Great Wyrm's: +(61-90) to Mana | 37 | any | 29 | 2 |
|  | prefix | Wyrm's: +(41-60) to Mana | 30 | any | 22 | 2 |

## Item levels to aim for

| Item level | Random affixes | Opens up | Input item level at character level 80 / 90 / 99 | Required level if it rolls the best of these |
| ---: | --- | --- | ---: | ---: |
| 71 | 4 | + Paladin skills, + Paladin Combat Skills, Faster Cast Rate, Mana (every best tier up to 71) | 62 / 52 / 43 | about 64 |
| 87 | 4 | Strength | 94 / 84 / 75 | about 88 |

The crafted item's level is 50% of the character's level plus 50% of the input item's, so the input column is 2 × target − character level; "–" means that character level can't reach it. Above 87 nothing new on this list opens up.

- Prefixes and suffixes compete for slots: a crafted item, like a rare, has at most three of each.
- Higher item levels don't push the lower tiers out: they stay in the pool unless their table row has a maximum level.
- Each affix is picked by weight among everything the base can roll, so a wanted affix is never guaranteed.

> **Unverified:** the required level estimate uses the community rule (highest affix requirement + 10 + 3 per affix, for four affixes), the three-and-three limit applies to crafted items as it does to rares, and the item level rounds down. None of these are in the tables.

## Sources

- Tables: `cubemain.txt` (recipe, item level shares), `magicprefix.txt` and `magicsuffix.txt` (affixes, `rare` column), the base's qlvl. Affix level formula: [Item generation](../../mechanics/item-generation.md).
- Who uses it and why is this site's judgment, not game data.

<!-- NOTES: hand-written text below this line is kept when pages are regenerated -->
