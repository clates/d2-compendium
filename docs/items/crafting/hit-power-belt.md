---
title: "Hit Power Belt"
type: "guide"
data_version: "3.3.94995"
generated: true
hash: "895c7060ce3e2c78"
---
# Hit Power Belt

**Who:** A melee character short on Strength. **Why:** Belts are where Strength rolls highest (of Atlas). Damage Taken Goes to Mana helps characters who use mana on every attack.

**Recipe:** a magic Heavy Belt (any tier) + Jewel + Tal Rune + Perfect Sapphire. See [Cube recipes](../cube-recipes.md#crafted-items) for the fixed modifiers every one gets. The plan below assumes a [Troll Belt](../bases/heavy-belt.md) (qlvl 82). Its qlvl is high enough that the game treats any lower item level as 82, giving affix level 65 at least, so "any" below means every item level reaches it.

## Affixes to look for

Best first. Each row is the best tier this base can roll and the one below it; **Level** is the affix level it needs, **Item level** the crafted item's level that reaches it on a Troll Belt, **Req** the required level the affix adds, **Freq** its weight against every other affix the base can roll (higher is likelier).

| Want | Side | Affix | Level | Item level | Req | Freq |
| --- | --- | --- | ---: | ---: | ---: | ---: |
| Strength | suffix | of Atlas: +(21-30) to Strength | 71 | 85 | 63 | 3 |
|  | suffix | of the Titan: +(16-20) to Strength | 58 | any | 50 | 3 |
| Life | suffix | of the Colossus: +(41-60) to Life | 30 | any | 22 | 3 |
|  | suffix | of the Mammoth: +(31-40) to Life | 25 | any | 18 | 3 |
| Faster Hit Recovery | suffix | of Stability: +24% Faster Hit Recovery | 18 | any | 13 | 4 |
|  | suffix | of Equilibrium: +17% Faster Hit Recovery | 9 | any | 6 | 4 |
| Fire Resist | prefix | Garnet: Fire Resist +(21-30)% | 18 | any | 13 | 3 |
|  | prefix | Russet: Fire Resist +(11-20)% | 12 | any | 9 | 4 |
| Lightning Resist | prefix | Coral: Lightning Resist +(21-30)% | 18 | any | 13 | 3 |
|  | prefix | Ocher: Lightning Resist +(11-20)% | 12 | any | 9 | 4 |
| Cold Resist | prefix | Cobalt: Cold Resist +(21-30)% | 18 | any | 13 | 3 |
|  | prefix | Lapis: Cold Resist +(11-20)% | 12 | any | 9 | 4 |

## Item levels to aim for

| Item level | Random affixes | Opens up | Input item level at character level 80 / 90 / 99 | Required level if it rolls the best of these |
| ---: | --- | --- | ---: | ---: |
| 71 | 4 | Life, Faster Hit Recovery, Fire Resist, Lightning Resist, Cold Resist (every best tier up to 71) | 62 / 52 / 43 | about 44 |
| 85 | 4 | Strength | 90 / 80 / 71 | about 85 |

The crafted item's level is 50% of the character's level plus 50% of the input item's, so the input column is 2 × target − character level; "–" means that character level can't reach it. Above 85 nothing new on this list opens up.

- Prefixes and suffixes compete for slots: a crafted item, like a rare, has at most three of each.
- Higher item levels don't push the lower tiers out: they stay in the pool unless their table row has a maximum level.
- Each affix is picked by weight among everything the base can roll, so a wanted affix is never guaranteed.

> **Unverified:** the required level estimate uses the community rule (highest affix requirement + 10 + 3 per affix, for four affixes), the three-and-three limit applies to crafted items as it does to rares, and the item level rounds down. None of these are in the tables.

## Sources

- Tables: `cubemain.txt` (recipe, item level shares), `magicprefix.txt` and `magicsuffix.txt` (affixes, `rare` column), the base's qlvl. Affix level formula: [Item generation](../../mechanics/item-generation.md).
- Who uses it and why is this site's judgment, not game data.

<!-- NOTES: hand-written text below this line is kept when pages are regenerated -->
