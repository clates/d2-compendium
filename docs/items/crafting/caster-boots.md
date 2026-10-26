---
title: "Caster Boots"
type: "guide"
data_version: "3.3.94995"
generated: true
hash: "63943b5589d55e9f"
---
# Caster Boots

**Who:** Any caster. **Why:** The fixed mana suits a caster. The prize is 30% run speed with two resistances and Dexterity for blocking.

**Recipe:** a magic Boots (any tier) + Jewel + Thul Rune + Perfect Amethyst. See [Cube recipes](../cube-recipes.md#crafted-items) for the fixed modifiers every one gets. The plan below assumes a [Wyrmhide Boots](../bases/boots.md) (qlvl 60). Its qlvl is high enough that the game treats any lower item level as 60, giving affix level 30 at least, so "any" below means every item level reaches it.

## Affixes to look for

Best first. Each row is the best tier this base can roll and the one below it; **Level** is the affix level it needs, **Item level** the crafted item's level that reaches it on a Wyrmhide Boots, **Req** the required level the affix adds, **Freq** its weight against every other affix the base can roll (higher is likelier).

| Want | Side | Affix | Level | Item level | Req | Freq |
| --- | --- | --- | ---: | ---: | ---: | ---: |
| Faster Run/Walk | suffix | of Speed: +30% Faster Run/Walk | 37 | 67 | 29 | 4 |
|  | suffix | of Haste: +20% Faster Run/Walk | 22 | any | 16 | 4 |
| Fire Resist | prefix | Ruby: Fire Resist +(31-40)% | 25 | any | 18 | 3 |
|  | prefix | Garnet: Fire Resist +(21-30)% | 18 | any | 13 | 3 |
| Lightning Resist | prefix | Amber: Lightning Resist +(31-40)% | 25 | any | 18 | 3 |
|  | prefix | Coral: Lightning Resist +(21-30)% | 18 | any | 13 | 3 |
| Cold Resist | prefix | Sapphire: Cold Resist +(31-40)% | 25 | any | 18 | 3 |
|  | prefix | Cobalt: Cold Resist +(21-30)% | 18 | any | 13 | 3 |
| Dexterity | suffix | of Accuracy: +(6-9) to Dexterity | 46 | 73 | 38 | 3 |
|  | suffix | of Skill: +(4-5) to Dexterity | 34 | 64 | 26 | 3 |
| Mana | prefix | Dragon's: +(31-40) to Mana | 52 | 76 | 39 | 2 |
|  | prefix | Serpent's: +(11-20) to Mana | 37 | 67 | 27 | 2 |

## Item levels to aim for

| Item level | Random affixes | Opens up | Input item level at character level 80 / 90 / 99 | Required level if it rolls the best of these |
| ---: | --- | --- | ---: | ---: |
| 71 | 4 | Faster Run/Walk, Fire Resist, Lightning Resist, Cold Resist (every best tier up to 71) | 62 / 52 / 43 | about 51 |
| 73 | 4 | Dexterity | 66 / 56 / 47 | about 60 |
| 76 | 4 | Mana | 72 / 62 / 53 | about 61 |

The crafted item's level is 50% of the character's level plus 50% of the input item's, so the input column is 2 × target − character level; "–" means that character level can't reach it. Above 76 nothing new on this list opens up.

- Prefixes and suffixes compete for slots: a crafted item, like a rare, has at most three of each.
- Higher item levels don't push the lower tiers out: they stay in the pool unless their table row has a maximum level.
- Each affix is picked by weight among everything the base can roll, so a wanted affix is never guaranteed.

> **Unverified:** the required level estimate uses the community rule (highest affix requirement + 10 + 3 per affix, for four affixes), the three-and-three limit applies to crafted items as it does to rares, and the item level rounds down. None of these are in the tables.

## Sources

- Tables: `cubemain.txt` (recipe, item level shares), `magicprefix.txt` and `magicsuffix.txt` (affixes, `rare` column), the base's qlvl. Affix level formula: [Item generation](../../mechanics/item-generation.md).
- Who uses it and why is this site's judgment, not game data.

<!-- NOTES: hand-written text below this line is kept when pages are regenerated -->
