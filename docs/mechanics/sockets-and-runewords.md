---
title: "Sockets and runewords"
type: "mechanics"
---
# Sockets and runewords

## Getting sockets

An item can have sockets when it drops, get them from the Act 5 quest reward (Larzuk, after
Siege on Harrogath), or from a cube recipe. In every case the item can't go above its maximum,
which comes from the base and the item level: see the **Max sockets** row on each
[base page](../items/bases/index.md).

| Way | Result |
|---|---|
| Drop | Normal and superior items can drop with sockets, up to the maximum. |
| Larzuk (once per difficulty) | Normal or superior: the maximum for its item level. Magic: 1-2. Rare, set, unique: 1. |
| Cube: Tal + Thul + Perfect Topaz + body armor, Ral + Amn + Perfect Amethyst + weapon, and the others | A random number of sockets up to the maximum, on a normal item. |
| Cube: 3 gems + magic item | Sockets a magic item (the gem grade sets the limit). |

The socket recipes are listed under **Sockets** on the [cube recipes page](../items/cube-recipes.md).

> **Unverified:** Larzuk's results above are as the community documents them; magic items get a
> random 1 or 2, not the item's maximum.

## Filling sockets

Gems, runes and jewels go into sockets. A gem or rune gives a different bonus in a weapon, in
body armor or a helm, and in a shield: see [Runes](../items/runes.md) and [Gems](../items/gems.md).
Once in, they can only come out with the cube recipe Hel rune + Scroll of Town Portal + the item,
which destroys what was in the sockets.

## Runewords

A runeword is a set of runes put into an item in a fixed order. The item then gets the
runeword's name and its bonuses on top of the runes' own. The rules:

- The base must be a normal, superior or low-quality item: not magic, rare, set or unique.
- It must have exactly as many sockets as the runeword has runes, all empty.
- It must be one of the item types the runeword allows ("Fits" on each
  [runeword page](../items/runewords/index.md)).
- The runes go in in order. A wrong rune makes a plain socketed item.
- Ethereal bases work. Ethereal items can't be repaired, so pick one with indestructibility or
  self-repair, or accept the loss.

Each runeword page lists the full bonuses including the runes', and each base page lists the
runewords that fit it.

Some runewords were ladder-only when introduced. The ladder seasons are on the runeword pages
(the table's `firstLadderSeason` and `lastLadderSeason`).

> **Unverified:** a runeword marked "ladder seasons 3-14" was ladder-only from season 3 and
> became available outside ladder after season 14.

## Sources

- Tables: `runes.txt` (runewords: `itype`, `etype`, `Rune1`-`Rune6`, `T1Code`), `gems.txt`
  (socket bonuses), `itemtypes.txt` (socket limits), `cubemain.txt`.
- [Arreat Summit: sockets](http://classic.battle.net/diablo2exp/items/sockets.shtml).
