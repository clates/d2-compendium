// Areas and acts: area level per difficulty, waypoints, connections and the monsters that spawn.
import { table, int, str, rotwOnly } from '../lib/data.mjs';
import { mdTable, list } from '../lib/md.mjs';

const DIR = 'world';
const ACTS = ['Act I', 'Act II', 'Act III', 'Act IV', 'Act V'];

export const levels = table('levels').filter((r) => int(r.Id) > 0 && r.LevelName);
const byId = new Map(levels.map((r) => [int(r.Id), r]));
const rotwLevels = rotwOnly('levels', 'Name');
export const areaName = (r) => str(r.LevelName);
const monName = (id) => str(monstats.get(id)?.NameStr) || id;
const monstats = new Map(table('monstats').map((m) => [m.Id, m]));

/** Area level per difficulty. Expansion games read the MonLvlEx columns. */
export const areaLevels = (r) => [int(r.MonLvlEx), int(r['MonLvlEx(N)']), int(r['MonLvlEx(H)'])];

/** Monster ids spawning in an area: [normal, nightmare/hell, unique candidates]. */
export function spawns(r) {
  const col = (p) => [...new Set(Array.from({ length: 25 }, (_, i) => r[`${p}${i + 1}`]).filter(Boolean))];
  return { normal: col('mon'), nmh: col('nmon'), uniq: col('umon') };
}

export function register(site) {
  site.register('index:world', `${DIR}/index.md`, 'World');
  for (let a = 0; a < 5; a++) site.register(`act:${a}`, `${DIR}/act-${a + 1}/index.md`, ACTS[a]);
  for (const r of levels) site.register(`area:${r.Id}`, site.claim(`${DIR}/act-${int(r.Act) + 1}`, areaName(r)), areaName(r));
  site.register('page:area-levels', `${DIR}/area-levels.md`, 'Area levels');
}

export function render(site) {
  for (const r of levels) {
    const p = site.path(`area:${r.Id}`);
    const [n, nm, h] = areaLevels(r);
    const wp = r.Waypoint && r.Waypoint !== '255';
    const conn = [...new Set([0, 1, 2, 3, 4, 5, 6, 7].map((i) => int(r[`Vis${i}`])).filter((id) => id && byId.has(id)))];
    const s = spawns(r);
    const monList = (ids) => ids.map((id) => site.link(p, `mon:${id}`, monName(id))).join(', ');
    const same = s.normal.join() === s.nmh.join();
    const town = /Town/.test(r.Name);
    const facts = [
      ['Act', site.link(p, `act:${r.Act}`)],
      ['Area level', town ? '' : `${n} / ${nm} / ${h} (Normal / Nightmare / Hell)`],
      ['Waypoint', wp ? 'Yes' : 'No'],
      ['Outdoors', r['*IsInside'] === '1' ? 'No' : r['*IsInside'] === '0' ? 'Yes' : ''],
      ['Teleport', r.Teleport === '0' ? 'Not allowed' : ''],
      ['Unique and champion packs', r.MonUMax ? `${int(r.MonUMin)}-${int(r.MonUMax)} / ${int(r['MonUMin(N)'])}-${int(r['MonUMax(N)'])} / ${int(r['MonUMin(H)'])}-${int(r['MonUMax(H)'])}` : ''],
      ['Monster density', r.MonDen ? `${r.MonDen} / ${r['MonDen(N)']} / ${r['MonDen(H)']}` : ''],
      ['Reign of the Warlock only', rotwLevels.has(r.Name) ? 'Yes' : ''],
    ].filter(([, v]) => v);
    const body = `${mdTable(['', ''], facts)}
${conn.length ? `\n## Connects to\n\n${conn.map((id) => site.link(p, `area:${id}`)).join(', ')}\n` : ''}${s.normal.length || s.nmh.length ? `
## Monsters

${int(r.NumMon) ? `Each game picks up to ${r.NumMon} of these types for this area.\n\n` : ''}${same ? monList(s.normal) : `**Normal:** ${monList(s.normal)}\n\n**Nightmare and Hell:** ${monList(s.nmh)}`}
${s.uniq.length && s.uniq.join() !== s.normal.join() ? `\n**Unique and champion types:** ${monList(s.uniq)}\n` : ''}` : ''}
${town ? '' : `\nIn Nightmare and Hell, monsters here are the area level (champions +2, uniques +3). In Normal they use their own level. See ${site.linkPath(p, 'mechanics/monster-level.md', 'Monster level')}.\n`}`;
    site.page(p, areaName(r), { type: 'area', act: int(r.Act) + 1, area_level: town ? undefined : [n, nm, h], waypoint: wp }, body);
  }

  for (let a = 0; a < 5; a++) {
    const p = site.path(`act:${a}`);
    const rows = levels.filter((r) => int(r.Act) === a);
    site.page(p, ACTS[a], { type: 'index', act: a + 1 },
      mdTable(['Area', 'Normal', 'Nightmare', 'Hell', 'Waypoint'], rows.map((r) => {
        const [n, nm, h] = areaLevels(r);
        return [site.link(p, `area:${r.Id}`), String(n || ''), String(nm || ''), String(h || ''), r.Waypoint && r.Waypoint !== '255' ? 'yes' : ''];
      }), [, 'r', 'r', 'r']));
  }

  const p = `${DIR}/area-levels.md`;
  const sorted = [...levels].filter((r) => areaLevels(r)[2]).sort((x, y) => areaLevels(y)[2] - areaLevels(x)[2] || int(x.Id) - int(y.Id));
  site.page(p, 'Area levels', { type: 'reference' }, `Every area by its Hell area level, highest first. Monster level sets the item level of what they drop, so this is the table to read when choosing where to farm: an area level of 85 can drop every item in the game. See ${site.linkPath(p, 'mechanics/monster-level.md', 'Monster level')}.

${mdTable(['Area', 'Act', 'Normal', 'Nightmare', 'Hell'], sorted.map((r) => {
    const [n, nm, h] = areaLevels(r);
    return [site.link(p, `area:${r.Id}`), String(int(r.Act) + 1), String(n), String(nm), String(h)];
  }), [, 'r', 'r', 'r', 'r'])}
`);

  const w = `${DIR}/index.md`;
  site.page(w, 'World', { type: 'index' }, list([
    ...ACTS.map((t, a) => site.link(w, `act:${a}`)),
    site.linkPath(w, `${DIR}/area-levels.md`, 'Area levels (where to farm)'),
    site.linkPath(w, `${DIR}/waypoints.md`, 'Waypoints'),
  ]));

  const wps = levels.filter((r) => r.Waypoint && r.Waypoint !== '255').sort((x, y) => int(x.Waypoint) - int(y.Waypoint));
  const wpp = `${DIR}/waypoints.md`;
  site.page(wpp, 'Waypoints', { type: 'reference' }, `The ${wps.length} waypoints, in the order the waypoint menu lists them.

${ACTS.map((t, a) => `## ${t}\n\n` + list(wps.filter((r) => int(r.Act) === a).map((r) => site.link(wpp, `area:${r.Id}`)))).join('\n\n')}
`);
}
