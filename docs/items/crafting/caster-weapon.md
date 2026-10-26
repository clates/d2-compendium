---
title: "Caster Weapon"
type: "guide"
data_version: "3.3.94995"
generated: true
hash: "b52705d732116a71"
---
# Caster Weapon

**Who:** A Poison or Bone Necromancer. **Why:** Rods include wands. A Lich Wand can roll +2 Necromancer skills, +2 Poison and Bone skills and 20% Faster Cast Rate together.

**Recipe:** a magic staves and rods + Jewel + Tir Rune + Perfect Amethyst. See [Cube recipes](../cube-recipes.md#crafted-items) for the fixed modifiers every one gets. The plan below assumes a [Lich Wand](../bases/bone-wand.md) (qlvl 75). Its qlvl is high enough that the game treats any lower item level as 75, giving affix level 51 at least, so "any" below means every item level reaches it.

## Affixes to look for

Best first. Each row is the best tier this base can roll and the one below it; **Level** is the affix level it needs, **Item level** the crafted item's level that reaches it on a Lich Wand, **Req** the required level the affix adds, **Freq** its weight against every other affix the base can roll (higher is likelier).

| Want | Side | Affix | Level | Item level | Req | Freq |
| --- | --- | --- | ---: | ---: | ---: | ---: |
| + Necromancer skills | prefix | Necromancer's: +2 to Necromancer Skill Levels | 50 | any | 42 | 2 |
|  | prefix | Summoner's: +1 to Necromancer Skill Levels | 30 | any | 22 | 4 |
| + Poison and Bone Skills | prefix | Noxious: +2 to Poison and Bone Skills (Necromancer Only) | 40 | any | 30 | 1 |
|  | prefix | Fungal: +1 to Poison and Bone Skills (Necromancer Only) | 20 | any | 15 | 1 |
| Faster Cast Rate | suffix | of the Magus: +20% Faster Cast Rate | 29 | any | 21 | 5 |
|  | suffix | of the Apprentice: +10% Faster Cast Rate | 5 | any | 3 | 6 |
| Mana | prefix | Great Wyrm's: +(61-90) to Mana | 37 | any | 29 | 2 |
|  | prefix | Wyrm's: +(41-60) to Mana | 30 | any | 22 | 2 |

## Item levels to aim for

| Item level | Random affixes | Opens up | Input item level at character level 80 / 90 / 99 | Required level if it rolls the best of these |
| ---: | --- | --- | ---: | ---: |
| 71 | 4 | + Necromancer skills, + Poison and Bone Skills, Faster Cast Rate, Mana (every best tier up to 71) | 62 / 52 / 43 | about 64 |

The crafted item's level is 50% of the character's level plus 50% of the input item's, so the input column is 2 × target − character level; "–" means that character level can't reach it. Above 71 nothing on this list gets better, so 71 is the target.

- Prefixes and suffixes compete for slots: a crafted item, like a rare, has at most three of each.
- Higher item levels don't push the lower tiers out: they stay in the pool unless their table row has a maximum level.
- Each affix is picked by weight among everything the base can roll, so a wanted affix is never guaranteed.

> **Unverified:** the required level estimate uses the community rule (highest affix requirement + 10 + 3 per affix, for four affixes), the three-and-three limit applies to crafted items as it does to rares, and the item level rounds down. None of these are in the tables.

## Sources

- Tables: `cubemain.txt` (recipe, item level shares), `magicprefix.txt` and `magicsuffix.txt` (affixes, `rare` column), the base's qlvl. Affix level formula: [Item generation](../../mechanics/item-generation.md).
- Who uses it and why is this site's judgment, not game data.

<!-- NOTES: hand-written text below this line is kept when pages are regenerated -->
