---
title: "Caster Ring"
type: "guide"
data_version: "3.3.94995"
generated: true
hash: "cbbff0184e99ae0b"
---
# Caster Ring

**Who:** Any caster. **Why:** Faster Cast Rate on a ring is rare. With resistances and Strength or Dexterity it saves points for Vitality.

**Recipe:** a magic ring + Jewel + Amn Rune + Perfect Amethyst. See [Cube recipes](../cube-recipes.md#crafted-items) for the fixed modifiers every one gets. The plan below assumes a Ring (qlvl 1).

## Affixes to look for

Best first. Each row is the best tier this base can roll and the one below it; **Level** is the affix level it needs, **Item level** the crafted item's level that reaches it on a Ring, **Req** the required level the affix adds, **Freq** its weight against every other affix the base can roll (higher is likelier).

| Want | Side | Affix | Level | Item level | Req | Freq |
| --- | --- | --- | ---: | ---: | ---: | ---: |
| Faster Cast Rate | suffix | of the Apprentice: +10% Faster Cast Rate | 5 | 5 | 3 | 6 |
| All Resistances | prefix | Rainbow: All Resistances +(8-11) | 56 | 56 | 48 | 2 |
|  | prefix | Shimmering: All Resistances +(3-7) | 45 | 45 | 37 | 3 |
| Strength | suffix | of the Titan: +(16-20) to Strength | 74 | 74 | 66 | 3 |
|  | suffix | of the Giant: +(10-15) to Strength | 55 | 55 | 47 | 3 |
| Dexterity | suffix | of Precision: +(10-15) to Dexterity | 56 | 56 | 48 | 3 |
|  | suffix | of Accuracy: +(6-9) to Dexterity | 39 | 39 | 31 | 3 |
| Life | suffix | of the Mammoth: +(31-40) to Life | 68 | 68 | 60 | 3 |
|  | suffix | of the Tiger: +(21-30) to Life | 51 | 51 | 43 | 3 |
| Mana | prefix | Great Wyrm's: +(61-90) to Mana | 37 | 37 | 29 | 2 |
|  | prefix | Wyrm's: +(41-60) to Mana | 30 | 30 | 22 | 2 |

## Item levels to aim for

| Item level | Random affixes | Opens up | Input item level at character level 80 / 90 / 99 | Required level if it rolls the best of these |
| ---: | --- | --- | ---: | ---: |
| 71 | 4 | Faster Cast Rate, All Resistances, Dexterity, Life, Mana (every best tier up to 71) | 62 / 52 / 43 | about 82 |
| 74 | 4 | Strength | 68 / 58 / 49 | about 88 |

The crafted item's level is 50% of the character's level plus 50% of the input item's, so the input column is 2 × target − character level; "–" means that character level can't reach it. Above 74 nothing new on this list opens up.

- Prefixes and suffixes compete for slots: a crafted item, like a rare, has at most three of each.
- Higher item levels don't push the lower tiers out: they stay in the pool unless their table row has a maximum level.
- Each affix is picked by weight among everything the base can roll, so a wanted affix is never guaranteed.

> **Unverified:** the required level estimate uses the community rule (highest affix requirement + 10 + 3 per affix, for four affixes), the three-and-three limit applies to crafted items as it does to rares, and the item level rounds down. None of these are in the tables.

## Sources

- Tables: `cubemain.txt` (recipe, item level shares), `magicprefix.txt` and `magicsuffix.txt` (affixes, `rare` column), the base's qlvl. Affix level formula: [Item generation](../../mechanics/item-generation.md).
- Who uses it and why is this site's judgment, not game data.

<!-- NOTES: hand-written text below this line is kept when pages are regenerated -->
