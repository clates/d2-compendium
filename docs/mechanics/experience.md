---
title: "Experience"
type: "mechanics"
---
# Experience

The experience needed for each level is in the [experience table](../reference/experience.md).
Three things change how much a kill gives.

## 1. High character level

Above level 69, the character keeps only part of each kill's experience: the last column of the
[experience table](../reference/experience.md), out of 1024. At level 98 it's 6/1024, about 0.6%.
This is why the last few levels take so long.

## 2. Level difference

Experience is reduced when the monster's level and the character's level are far apart.

| Monster vs character | Experience |
|---|---|
| Within 5 levels | 100% |
| Monster 6 levels lower | 81% |
| 7 lower | 62% |
| 8 lower | 43% |
| 9 lower | 24% |
| 10 or more lower | 5% |
| Monster more than 5 levels higher | × character level / monster level |

> **Unverified:** these values are the Arreat Summit's; they come from the game's code, not its
> tables.

## 3. Party and players

More players make monsters give more experience. In a party, experience is shared among members
nearby, weighted by level.

## Dying

Dying in Nightmare or Hell loses part of the experience toward the next level (5% and 10%, the
`DeathExpPenalty` in [Difficulty levels](../reference/difficulty.md)). Picking up the corpse
gives some back.

> **Unverified:** the share recovered from the corpse; the community figure is 75% when
> resurrected in town.

## Sources

- Tables: `experience.txt`, `difficultylevels.txt`.
- [Arreat Summit: experience](http://classic.battle.net/diablo2exp/basics/experience.shtml).
