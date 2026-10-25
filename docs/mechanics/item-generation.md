---
title: "Item generation"
type: "mechanics"
---
# Item generation

How the game decides what an item is when it drops: its item level, its base, its quality, and its
affixes. The tables behind each step are linked; formulas that come from the game's code rather
than its tables are cited.

## 1. Item level

Every item has an item level (ilvl) from 1 to 99. It is fixed when the item is made and never
changes.

| Source | Item level |
|---|---|
| Monster drop | The monster's level ([Monster level](monster-level.md)) |
| Chest, barrel, other object | The area level |
| Crafted in the cube | A share of character level plus a share of the input's item level, set per recipe (most crafts: half of each). See [Cube recipes](../items/cube-recipes.md). |
| Gambling | Around the character's level (see below) |
| Vendor stock | From character level and act |

> **Unverified:** a gambled item's level is the character level minus 5 to plus 4
> ([Arreat Summit](http://classic.battle.net/diablo2exp/items/gamble.shtml)).

## 2. Base item

The monster's treasure class picks the base (a Shako, a Ring, a rune...). See
[Drops](../drops/index.md). Equipment entries (`armo60`, `weap60`...) hold the bases whose
quality level is in that band ([Equipment treasure classes](../drops/equipment.md)).

## 3. Quality

The game tries each quality in turn, from rarest down, and stops at the first that succeeds:
unique, set, rare, magic, then superior or normal (or low quality). Each try's chance depends on:

- the base's quality level against the item level (an item well below the drop's level is
  easier to upgrade),
- the quality factors in the treasure classes it came through ("Unique 983" on Baal's), and
- magic find.

Magic find counts in full for magic items but with diminishing returns for the rarer
qualities. Effective magic find is `MF × F / (MF + F)`, with F = 250 for unique, 500 for set and
600 for rare. At 300% magic find that is 136% for uniques, 187% for sets and 200% for rares.

> **Unverified:** these factors are as published by the Arreat Summit and the Phrozen Keep for
> 1.10 and later. D2R hasn't been shown to change them.

## 4. Which unique or set item

A unique roll picks among the uniques of that exact base whose **qlvl** is at most the item
level, weighted by their **rarity**. Each unique page has a "Same base" table with the
candidates. If none qualifies (an item level 50 Shako can't be Harlequin Crest, qlvl 69), the
item becomes a rare with three times the base durability instead.

Sets work the same way, with their own qlvl and rarity.

> **Unverified:** a failed set roll becomes a magic item with extra durability.

## 5. Affixes

Magic and rare items draw affixes from the [prefix and suffix tables](../items/affixes/index.md).
An affix can roll if the item's **affix level** (alvl) is at least the affix's level (and at
most its max level), and the item type matches. Each candidate is weighted by its frequency.

Affix level comes from item level and the base's qlvl:

```
ilvl = min(ilvl, 99)
if qlvl > ilvl: ilvl = qlvl
if the base has a "magic lvl" (wands, staves, orbs, circlets):
    alvl = ilvl + magic lvl
else if ilvl < 99 - qlvl/2:
    alvl = ilvl - qlvl/2
else:
    alvl = 2 × ilvl - 99
alvl = min(alvl, 99)
```

`qlvl/2` rounds down. So a high-qlvl base needs a higher item level to reach the best affixes,
and every base reaches alvl 99 at item level 99.

Source: [Arreat Summit, item level](http://classic.battle.net/diablo2exp/basics/itemlevel.shtml),
the `level` and `magic lvl` columns of the base item tables.

A magic item gets one prefix, one suffix, or both. A rare gets up to six affixes, at most three
of each kind (jewels: up to four, two of each). No item carries two affixes from the same group.

## 6. Sockets

The maximum number of sockets an item can have depends on its base and its item level: see the
**Max sockets** row on each [base page](../items/bases/index.md). The limits per item level are
in the item type table (`MaxSockets1` up to item level 25, `MaxSockets2` up to 40,
`MaxSockets3` above).

## Sources

- Tables: `itemtypes.txt` (`MaxSockets*`), `weapons.txt`/`armor.txt`/`misc.txt` (`level`,
  `magic lvl`), `uniqueitems.txt`/`setitems.txt` (`lvl`, `rarity`), `magicprefix.txt`/
  `magicsuffix.txt`, `treasureclassex.txt`, `cubemain.txt` (`plvl`, `ilvl`).
- [Arreat Summit](http://classic.battle.net/diablo2exp/) and the
  [Phrozen Keep](https://d2mods.info/) for the formulas that live in the game's code.
