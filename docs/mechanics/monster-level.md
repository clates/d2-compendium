---
title: "Monster level"
type: "mechanics"
---
# Monster level

A monster's level sets its life, damage, defense and experience, and the item level of what it
drops. So it decides what can drop: an item can only be a unique if the item level reaches the
unique's qlvl ([Item generation](item-generation.md)).

## Which level a monster is

| Difficulty | Normal monsters | Champions | Uniques and minions | Act bosses |
|---|---|---|---|---|
| Normal | Its own level (monster table) | +2 | +3 | Fixed per difficulty |
| Nightmare, Hell | The area level | +2 | +3 | Fixed per difficulty |

Area levels per difficulty are on each area page and in [Area levels](../world/area-levels.md).
Act bosses' levels are on their monster pages (Baal: 60 / 75 / 99).

> **Unverified:** super uniques (Pindleskin, the Countess...) follow the unique rule (+3 on the
> area level in Nightmare and Hell). Terror zones raise monster levels relative to the character;
> their rules aren't in these tables and aren't covered yet.

## Life, damage, defense, experience

The monster table gives each monster's life, defense, damage and experience as percentages, and a
second table (MonLvl) gives the base value at every monster level. The stat is

```
stat = MonLvl[monster level][column] × monster's percentage / 100
```

using the expansion columns (`L-HP`, `L-AC`, `L-XP`, `L-DM`, with `(N)` and `(H)` versions for
Nightmare and Hell). For example, Hell Baal is level 99: L-HP(H) at 99 is 7,792 and Baal's
MinHP(H) is 6,336%, so 493,701 life with one player.

The monster pages compute life and experience this way, for one player.

> **Unverified:** this is the expansion formula as the Phrozen Keep documents the MonLvl table.
> The life numbers on the monster pages haven't been checked against the game one by one.

## More players

More players in the game (or a higher `/players` setting offline) give monsters more life and
more experience, and make "nothing" less likely in their drops (see [Drops](../drops/index.md)).
Each extra player adds half of the one-player life.

## Sources

- Tables: `monstats.txt` (`Level`, `minHP`, `maxHP`, `AC`, `Exp` and their `(N)`/`(H)`
  versions), `monlvl.txt`, `levels.txt` (`MonLvlEx`).
- [Phrozen Keep file guides](https://d2mods.info/forum/kb/index?c=4) for monstats and MonLvl.
