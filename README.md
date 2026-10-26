# D2 Codex

A reference for Diablo II: Resurrected (with Lord of Destruction and Reign of the Warlock) in
plain Markdown: items, skills, monsters, areas, drops and the mechanics behind them.

**Start at [docs/index.md](docs/index.md).**

Most of it is generated from the game's own data tables, so the numbers match the patch it was
built from (see `data_version` at the top of any page). The rest is hand-written: mechanics
pages that explain the numbers, and notes added to generated pages.

| Section | Pages |
|---|---|
| Unique items | 415 |
| Sets | 34 (135 pieces) |
| Runewords | 100 |
| Base item families | 176 |
| Skills | 240 across 8 classes |
| Areas | 137 |
| Monster families | 95 |
| Treasure classes | 1,358 plus the generated equipment classes |

## How it's built

```
tools/extract.py      pull the tables and strings from a local game install into raw/
tools/build.mjs       regenerate every generated page in docs/
tools/check.mjs       check links, and that nobody edited a generated page by hand
tools/gen/*.mjs       one generator per section (items, affixes, cube, world, monsters,
                      drops, classes, tables, terror, npcs, crafting)
tools/lib/            table reading, the page writer, and item tooltip text
```

Item text comes from [d2itemtoolkit](https://github.com/ResurrectedTrader/D2ItemToolkit), a
reimplementation of the game's tooltip engine, so modifier lines read exactly as they do in game.
Each item is rendered at its lowest and highest rolls, and the two are merged into ranges.

`raw/` isn't committed: the tables are Blizzard's. To rebuild after a patch:

```sh
git clone https://github.com/ladislav-zezula/CascLib && cmake -S CascLib -B CascLib/build \
  -DCASC_BUILD_SHARED_LIB=ON -DCMAKE_POLICY_VERSION_MINIMUM=3.5 && make -C CascLib/build
CASCLIB=CascLib/build/libcasc.so python3 tools/extract.py   # optional argument: game folder
npm install
npm run gen
npm run check
```

Then review the diff: it shows exactly what the patch changed.

## Writing

See [CONTRIBUTING.md](CONTRIBUTING.md). In short: hand-written text goes below the NOTES line on
a generated page, or on its own page under `docs/mechanics/` or elsewhere. Every claim that
doesn't come from the tables cites a source or is marked **Unverified**.

## Not covered yet

- The Chronicle, Uber Tristram and the Pandemonium event, Diablo Clone
- Breakpoints for the Warlock, and attack speed frames (the cast, hit recovery and block tables
  are the community's, not computed)
- Misc items (potions, keys, essences) as pages of their own
- Drop chance calculations through the treasure class chain, with magic find and players
- Where each super unique spawns
- Skill tooltips line by line (the skill pages show the table's numbers and the tooltip's
  synergy lines, not every description line)
- Item art

## License

The text in `docs/` is [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). The
code in `tools/` is MIT (see [LICENSE](LICENSE)). Diablo II and its data are Blizzard
Entertainment's; this project isn't affiliated with Blizzard.
