// Magic affixes: prefixes, suffixes and class automagic, grouped the way the game groups them.
import { table, int, str, rotwOnly } from '../lib/data.mjs';
import { mdTable } from '../lib/md.mjs';
import * as I from '../lib/items.mjs';

const DIR = 'items/affixes';
const typeLabel = (c) => I.typeByCode.get(c)?.ItemType ?? c;

const KINDS = [
  ['magicprefix', 'prefixes', 'Magic prefixes', 'A magic item gets at most one prefix and one suffix; a rare item up to three of each.'],
  ['magicsuffix', 'suffixes', 'Magic suffixes', 'A magic item gets at most one prefix and one suffix; a rare item up to three of each.'],
  ['automagic', 'automagic', 'Automagic (class item) affixes', 'Some bases always carry one of these on top of their other affixes: class-specific items get their skill line here (the "auto prefix" column of the base tables names the group).'],
];

export function register(site) {
  site.register('index:affixes', `${DIR}/index.md`, 'Magic affixes');
  for (const [, slugName, title] of KINDS) site.register(`affixes:${slugName}`, `${DIR}/${slugName}.md`, title);
}

export function render(site) {
  for (const [file, slugName, title, intro] of KINDS) {
    const p = `${DIR}/${slugName}.md`;
    const rows = table(file).filter((r) => r.Name && r.spawnable === '1' && int(r.frequency) > 0);
    const rotw = rotwOnly(file, 'Name');
    const groups = new Map();
    for (const r of rows) {
      const types = [1, 2, 3, 4, 5, 6, 7].map((i) => r[`itype${i}`]).filter(Boolean);
      const ex = [1, 2, 3, 4, 5].map((i) => r[`etype${i}`]).filter(Boolean);
      const props = [1, 2, 3].map((i) => ({ code: r[`mod${i}code`], param: r[`mod${i}param`], min: int(r[`mod${i}min`]), max: int(r[`mod${i}max`]) })).filter((x) => x.code);
      const carrier = types.map(I.sampleBase).find(Boolean);
      const text = carrier ? I.propLines(carrier, props).join(', ') : props.map((x) => `${x.code} ${x.min}-${x.max}`).join(', ');
      const g = r.group || `x${r._row}`;
      if (!groups.has(g)) groups.set(g, []);
      groups.get(g).push({
        name: str(r.Name) + (rotw.has(r.Name) ? ' †' : ''), text, lvl: int(r.level), max: r.maxlevel, req: r.levelreq || '0',
        types: types.map(typeLabel).join(', ') + (ex.length ? `; not ${ex.map(typeLabel).join(', ')}` : ''),
        freq: r.frequency, cls: r.classspecific ? `${r.class} (clvl ${r.classlevelreq})` : '', rare: r.rare === '1',
      });
    }
    // Order groups by their lowest affix level, and title each by its first line's wording.
    const ordered = [...groups.values()].map((g) => g.sort((a, b) => a.lvl - b.lvl)).sort((a, b) => a[0].lvl - b[0].lvl || a[0].text.localeCompare(b[0].text));
    const skeleton = (t) => t.replace(/\(\d+-\d+\)|\d+(\.\d+)?/g, '#');
    const title_ = (g) => {
      const names = [...new Set(g.map((a) => skeleton(a.text)).filter(Boolean))];
      return (names.length > 3 ? [...names.slice(0, 3), '...'] : names).join(' / ') || g[0].name;
    };
    const body = `${intro} Each group below is one affix group: an item can't carry two affixes from the same group. Affixes marked † exist only for Reign of the Warlock characters; "Rare: no" affixes only appear on magic items. Table rows with frequency 0 (Classic-era duplicates that never roll) are left out.

Columns: **Level** is the affix's level (it can roll when the item's affix level is at least this), **Max** the level above which it no longer rolls, **Req** the required level it adds, **Freq** its weight within the candidates. See ${site.linkPath(p, 'mechanics/item-generation.md', 'Item generation')} for how affix level comes from item level.

${ordered.map((g) => `## ${title_(g)}\n\n` + mdTable(['Name', 'Modifier', 'Level', 'Max', 'Req', 'Freq', 'Item types', ...(g.some((a) => a.cls) ? ['Class'] : []), ...(g.some((a) => !a.rare) ? ['Rare'] : [])],
    g.map((a) => [a.name, a.text, String(a.lvl), a.max, a.req, a.freq, a.types, ...(g.some((x) => x.cls) ? [a.cls] : []), ...(g.some((x) => !x.rare) ? [a.rare ? 'yes' : 'no'] : [])]), [, , 'r', 'r', 'r', 'r'])).join('\n\n')}
`;
    site.page(p, title, { type: 'reference' }, body);
  }
  const p = `${DIR}/index.md`;
  site.page(p, 'Magic affixes', { type: 'index' }, KINDS.map(([, s, t]) => `- ${site.link(p, `affixes:${s}`, t)}`).join('\n') +
    `\n\nRare items draw their names from separate name tables and take their modifiers from the same prefix and suffix lists (affixes marked "Rare: no" excepted). Crafted items get fixed modifiers from their ${site.linkPath(p, 'items/cube-recipes.md', 'cube recipe')} plus random affixes.\n`);
}
