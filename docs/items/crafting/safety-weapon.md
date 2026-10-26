---
title: "Safety Weapon"
type: "guide"
data_version: "3.3.94995"
generated: true
hash: "9f07815ec695bcfe"
---
# Safety Weapon

**Who:** An Act 2 mercenary. **Why:** Act 2 mercenaries use spears. A Ghost Spear with Enhanced Damage, attack speed and leech keeps them alive and killing, and the fixed damage reduction helps too.

**Recipe:** a magic spear + Jewel + Sol Rune + Perfect Emerald. See [Cube recipes](../cube-recipes.md#crafted-items) for the fixed modifiers every one gets. The plan below assumes a [Ghost Spear](../bases/spetum.md) (qlvl 83). Its qlvl is high enough that the game treats any lower item level as 83, giving affix level 67 at least, so "any" below means every item level reaches it.

## Affixes to look for

Best first. Each row is the best tier this base can roll and the one below it; **Level** is the affix level it needs, **Item level** the crafted item's level that reaches it on a Ghost Spear, **Req** the required level the affix adds, **Freq** its weight against every other affix the base can roll (higher is likelier).

| Want | Side | Affix | Level | Item level | Req | Freq |
| --- | --- | --- | ---: | ---: | ---: | ---: |
| Enhanced Damage | prefix | Cruel: +(201-300)% Enhanced Damage | 56 | any | 48 | 1 |
|  | prefix | Ferocious: +(101-200)% Enhanced Damage | 41 | any | 33 | 6 |
| Increased Attack Speed | suffix | of Quickness: +40% Increased Attack Speed | 46 | any | 38 | 5 |
|  | suffix | of Swiftness: +30% Increased Attack Speed | 34 | any | 26 | 6 |
| Life Leech | suffix | of the Lamprey: (8-9)% Life stolen per hit | 55 | any | 43 | 7 |
|  | suffix | of the Locust: (6-7)% Life stolen per hit | 20 | any | 15 | 7 |
| Maximum Damage | suffix | of Slaughter: +(15-20) to Maximum Damage | 25 | any | 18 | 5 |
|  | suffix | of Carnage: +(11-14) to Maximum Damage | 19 | any | 14 | 6 |
| Strength | suffix | of the Giant: +(10-15) to Strength | 59 | any | 51 | 3 |
|  | suffix | of the Ox: +(6-9) to Strength | 45 | any | 37 | 3 |

## Item levels to aim for

| Item level | Random affixes | Opens up | Input item level at character level 80 / 90 / 99 | Required level if it rolls the best of these |
| ---: | --- | --- | ---: | ---: |
| 71 | 4 | Enhanced Damage, Increased Attack Speed, Life Leech, Maximum Damage, Strength (every best tier up to 71) | 62 / 52 / 43 | about 73 |

The crafted item's level is 50% of the character's level plus 50% of the input item's, so the input column is 2 × target − character level; "–" means that character level can't reach it. Above 71 nothing on this list gets better, so 71 is the target.

- Prefixes and suffixes compete for slots: a crafted item, like a rare, has at most three of each.
- Higher item levels don't push the lower tiers out: they stay in the pool unless their table row has a maximum level.
- Each affix is picked by weight among everything the base can roll, so a wanted affix is never guaranteed.

> **Unverified:** the required level estimate uses the community rule (highest affix requirement + 10 + 3 per affix, for four affixes), the three-and-three limit applies to crafted items as it does to rares, and the item level rounds down. None of these are in the tables.

## Sources

- Tables: `cubemain.txt` (recipe, item level shares), `magicprefix.txt` and `magicsuffix.txt` (affixes, `rare` column), the base's qlvl. Affix level formula: [Item generation](../../mechanics/item-generation.md).
- Who uses it and why is this site's judgment, not game data.

<!-- NOTES: hand-written text below this line is kept when pages are regenerated -->
