---
title: "Caster Gloves"
type: "guide"
data_version: "3.3.94995"
generated: true
hash: "d4925ced38e2d761"
---
# Caster Gloves

**Who:** A martial-arts Assassin (Phoenix Strike). **Why:** Gloves can roll +Martial Arts skills, and the fixed mana per kill and regeneration suit a build that spends mana on every charge-up.

**Recipe:** a magic Leather Gloves (any tier) + Jewel + Ort Rune + Perfect Amethyst. See [Cube recipes](../cube-recipes.md#crafted-items) for the fixed modifiers every one gets. The plan below assumes a [Bramble Mitts](../bases/leather-gloves.md) (qlvl 57). Its qlvl is high enough that the game treats any lower item level as 57, giving affix level 29 at least, so "any" below means every item level reaches it.

## Affixes to look for

Best first. Each row is the best tier this base can roll and the one below it; **Level** is the affix level it needs, **Item level** the crafted item's level that reaches it on a Bramble Mitts, **Req** the required level the affix adds, **Freq** its weight against every other affix the base can roll (higher is likelier).

| Want | Side | Affix | Level | Item level | Req | Freq |
| --- | --- | --- | ---: | ---: | ---: | ---: |
| + Assassin Martial Arts | prefix | Sensei's: +2 to Martial Arts (Assassin Only) | 40 | 68 | 30 | 1 |
|  | prefix | Shogukusha's: +1 to Martial Arts (Assassin Only) | 20 | any | 15 | 1 |
| Increased Attack Speed | suffix | of Alacrity: +20% Increased Attack Speed | 43 | 71 | 35 | 4 |
|  | suffix | of Readiness: +10% Increased Attack Speed | 20 | any | 15 | 2 |
| Strength | suffix | of the Giant: +(10-15) to Strength | 59 | 79 | 51 | 3 |
|  | suffix | of the Ox: +(6-9) to Strength | 45 | 72 | 37 | 3 |
| Dexterity | suffix | of Precision: +(10-15) to Dexterity | 56 | 78 | 48 | 3 |
|  | suffix | of Accuracy: +(6-9) to Dexterity | 39 | 67 | 31 | 3 |
| Fire Resist | prefix | Garnet: Fire Resist +(21-30)% | 18 | any | 13 | 3 |
|  | prefix | Russet: Fire Resist +(11-20)% | 12 | any | 9 | 4 |
| Lightning Resist | prefix | Coral: Lightning Resist +(21-30)% | 18 | any | 13 | 3 |
|  | prefix | Ocher: Lightning Resist +(11-20)% | 12 | any | 9 | 4 |

## Item levels to aim for

| Item level | Random affixes | Opens up | Input item level at character level 80 / 90 / 99 | Required level if it rolls the best of these |
| ---: | --- | --- | ---: | ---: |
| 71 | 4 | + Assassin Martial Arts, Increased Attack Speed, Fire Resist, Lightning Resist (every best tier up to 71) | 62 / 52 / 43 | about 57 |
| 78 | 4 | Dexterity | 76 / 66 / 57 | about 70 |
| 79 | 4 | Strength | 78 / 68 / 59 | about 73 |

The crafted item's level is 50% of the character's level plus 50% of the input item's, so the input column is 2 × target − character level; "–" means that character level can't reach it. Above 79 nothing new on this list opens up.

- Prefixes and suffixes compete for slots: a crafted item, like a rare, has at most three of each.
- Higher item levels don't push the lower tiers out: they stay in the pool unless their table row has a maximum level.
- Each affix is picked by weight among everything the base can roll, so a wanted affix is never guaranteed.

> **Unverified:** the required level estimate uses the community rule (highest affix requirement + 10 + 3 per affix, for four affixes), the three-and-three limit applies to crafted items as it does to rares, and the item level rounds down. None of these are in the tables.

## Sources

- Tables: `cubemain.txt` (recipe, item level shares), `magicprefix.txt` and `magicsuffix.txt` (affixes, `rare` column), the base's qlvl. Affix level formula: [Item generation](../../mechanics/item-generation.md).
- Who uses it and why is this site's judgment, not game data.

<!-- NOTES: hand-written text below this line is kept when pages are regenerated -->
