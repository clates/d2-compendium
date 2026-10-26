---
title: "Blood Weapon"
type: "guide"
data_version: "3.3.94995"
generated: true
hash: "f1fdb54304cea106"
---
# Blood Weapon

**Who:** A Whirlwind Barbarian. **Why:** A Berserker Axe can roll +Barbarian skills, Enhanced Damage and attack speed. The fixed Enhanced Damage and leech add to them.

**Recipe:** a magic Axe (any tier) + Jewel + Ort Rune + Perfect Ruby. See [Cube recipes](../cube-recipes.md#crafted-items) for the fixed modifiers every one gets. The plan below assumes a [Berserker Axe](../bases/war-axe.md) (qlvl 85). Its qlvl is high enough that the game treats any lower item level as 85, giving affix level 71 at least, so "any" below means every item level reaches it.

## Affixes to look for

Best first. Each row is the best tier this base can roll and the one below it; **Level** is the affix level it needs, **Item level** the crafted item's level that reaches it on a Berserker Axe, **Req** the required level the affix adds, **Freq** its weight against every other affix the base can roll (higher is likelier).

| Want | Side | Affix | Level | Item level | Req | Freq |
| --- | --- | --- | ---: | ---: | ---: | ---: |
| + Barbarian skills | prefix | Berserker's: +2 to Barbarian Skill Levels | 50 | any | 42 | 1 |
|  | prefix | Slayer's: +1 to Barbarian Skill Levels | 30 | any | 22 | 4 |
| + Barbarian Masteries | prefix | Raging: +2 to Masteries (Barbarian Only) | 40 | any | 30 | 1 |
|  | prefix | Fanatic: +1 to Masteries (Barbarian Only) | 20 | any | 15 | 1 |
| Enhanced Damage | prefix | Cruel: +(201-300)% Enhanced Damage | 56 | any | 48 | 1 |
|  | prefix | Ferocious: +(101-200)% Enhanced Damage | 41 | any | 33 | 6 |
| Increased Attack Speed | suffix | of Quickness: +40% Increased Attack Speed | 46 | any | 38 | 5 |
|  | suffix | of Swiftness: +30% Increased Attack Speed | 34 | any | 26 | 6 |
| Maximum Damage | suffix | of Slaughter: +(15-20) to Maximum Damage | 25 | any | 18 | 5 |
|  | suffix | of Carnage: +(11-14) to Maximum Damage | 19 | any | 14 | 6 |

## Item levels to aim for

| Item level | Random affixes | Opens up | Input item level at character level 80 / 90 / 99 | Required level if it rolls the best of these |
| ---: | --- | --- | ---: | ---: |
| 71 | 4 | + Barbarian skills, + Barbarian Masteries, Enhanced Damage, Increased Attack Speed, Maximum Damage (every best tier up to 71) | 62 / 52 / 43 | about 70 |

The crafted item's level is 50% of the character's level plus 50% of the input item's, so the input column is 2 × target − character level; "–" means that character level can't reach it. Above 71 nothing on this list gets better, so 71 is the target.

- Prefixes and suffixes compete for slots: a crafted item, like a rare, has at most three of each.
- Higher item levels don't push the lower tiers out: they stay in the pool unless their table row has a maximum level.
- Each affix is picked by weight among everything the base can roll, so a wanted affix is never guaranteed.

> **Unverified:** the required level estimate uses the community rule (highest affix requirement + 10 + 3 per affix, for four affixes), the three-and-three limit applies to crafted items as it does to rares, and the item level rounds down. None of these are in the tables.

## Sources

- Tables: `cubemain.txt` (recipe, item level shares), `magicprefix.txt` and `magicsuffix.txt` (affixes, `rare` column), the base's qlvl. Affix level formula: [Item generation](../../mechanics/item-generation.md).
- Who uses it and why is this site's judgment, not game data.

<!-- NOTES: hand-written text below this line is kept when pages are regenerated -->
