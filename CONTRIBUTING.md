# Contributing

## Two kinds of page

**Generated pages** have `generated: true` in their front matter. Everything above the line

```
<!-- NOTES: hand-written text below this line is kept when pages are regenerated -->
```

is rewritten on every build. Don't edit it: change the generator in `tools/gen/` instead.
`npm run check` fails if the generated part of a page doesn't match its `hash`. Anything below
the line is yours and survives every rebuild. If a generator stops producing a page that has
notes, the build keeps the file and lists it so the notes can be moved.

**Hand-written pages** have no `generated` field. They live mostly in `docs/mechanics/`.

## Sources

Every claim needs one of:

- a table and column: `skills.txt: EDmgSymPerCalc`
- a link to a published source (Arreat Summit, Phrozen Keep, a forum post, a video)
- an in-game test, with the game version and what was done

Anything else goes in an Unverified box:

```markdown
> **Unverified:** what is claimed, and where it comes from.
```

Remove the box once it has been checked, and add the source. End each hand-written page with a
**Sources** section.

Don't copy text from other sites: link to them and write it in your own words. Game text
(item names, skill descriptions, tooltip lines) is fine to quote.

## Style

- Plain words and short sentences. Say what something does, then the numbers.
- Use the game's names: "Faster Cast Rate", not "FCR", except where the shorthand is the point.
- Numbers from the tables are exact; say "about" only for your own arithmetic.
- Link the first mention of anything that has a page.
- Tables for anything with more than three comparable values.

## Front matter

| Field | Meaning |
|---|---|
| `title` | Page title |
| `type` | `unique`, `set`, `runeword`, `base`, `skill`, `class`, `area`, `monster`, `reference`, `index`, `mechanics` |
| `data_version` | Game build the page was generated from |
| `generated`, `hash` | Set by the generator |

Item and skill pages carry extra fields (`req_level`, `qlvl`, `category`, `rotw_only`...) so
tools can query them.

## Adding a generator

A generator exports `register(site)` and `render(site)`. `register` reserves page paths with
`site.register(id, path, title)`, so that every generator can link to every other's pages with
`site.link(fromPath, id)`. `render` writes pages with `site.page(path, title, frontMatter, body)`.
Add it to `tools/build.mjs`. `node tools/build.mjs <name>` runs one generator.
