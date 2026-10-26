---
title: "Safety Boots"
type: "guide"
data_version: "3.3.94995"
generated: true
hash: "4349e795ce63cd2a"
---
# Safety Boots

**Who:** A Hardcore melee character. **Why:** Fixed damage reduction and fire resistance; run speed and more resistances complete them.

**Recipe:** a magic Greaves (any tier) + Jewel + Ort Rune + Perfect Emerald. See [Cube recipes](../cube-recipes.md#crafted-items) for the fixed modifiers every one gets. The plan below assumes a [Myrmidon Greaves](../bases/greaves.md) (qlvl 85). Its qlvl is high enough that the game treats any lower item level as 85, giving affix level 71 at least, so "any" below means every item level reaches it.

## Affixes to look for

Best first. Each row is the best tier this base can roll and the one below it; **Level** is the affix level it needs, **Item level** the crafted item's level that reaches it on a Myrmidon Greaves, **Req** the required level the affix adds, **Freq** its weight against every other affix the base can roll (higher is likelier).

| Want | Side | Affix | Level | Item level | Req | Freq |
| --- | --- | --- | ---: | ---: | ---: | ---: |
| Faster Run/Walk | suffix | of Speed: +30% Faster Run/Walk | 37 | any | 29 | 4 |
|  | suffix | of Haste: +20% Faster Run/Walk | 22 | any | 16 | 4 |
| Lightning Resist | prefix | Amber: Lightning Resist +(31-40)% | 25 | any | 18 | 3 |
|  | prefix | Coral: Lightning Resist +(21-30)% | 18 | any | 13 | 3 |
| Cold Resist | prefix | Sapphire: Cold Resist +(31-40)% | 25 | any | 18 | 3 |
|  | prefix | Cobalt: Cold Resist +(21-30)% | 18 | any | 13 | 3 |
| Dexterity | suffix | of Accuracy: +(6-9) to Dexterity | 46 | any | 38 | 3 |
|  | suffix | of Skill: +(4-5) to Dexterity | 34 | any | 26 | 3 |
| Enhanced Defense | prefix | Godly: +(101-200)% Enhanced Defense | 50 | any | 43 | 1 |
|  | prefix | Holy: +(81-100)% Enhanced Defense | 36 | any | 27 | 6 |

## Item levels to aim for

| Item level | Random affixes | Opens up | Input item level at character level 80 / 90 / 99 | Required level if it rolls the best of these |
| ---: | --- | --- | ---: | ---: |
| 71 | 4 | Faster Run/Walk, Lightning Resist, Cold Resist, Dexterity, Enhanced Defense (every best tier up to 71) | 62 / 52 / 43 | about 65 |

The crafted item's level is 50% of the character's level plus 50% of the input item's, so the input column is 2 × target − character level; "–" means that character level can't reach it. Above 71 nothing on this list gets better, so 71 is the target.

- Prefixes and suffixes compete for slots: a crafted item, like a rare, has at most three of each.
- Higher item levels don't push the lower tiers out: they stay in the pool unless their table row has a maximum level.
- Each affix is picked by weight among everything the base can roll, so a wanted affix is never guaranteed.

> **Unverified:** the required level estimate uses the community rule (highest affix requirement + 10 + 3 per affix, for four affixes), the three-and-three limit applies to crafted items as it does to rares, and the item level rounds down. None of these are in the tables.

## Sources

- Tables: `cubemain.txt` (recipe, item level shares), `magicprefix.txt` and `magicsuffix.txt` (affixes, `rare` column), the base's qlvl. Affix level formula: [Item generation](../../mechanics/item-generation.md).
- Who uses it and why is this site's judgment, not game data.

<!-- NOTES: hand-written text below this line is kept when pages are regenerated -->
