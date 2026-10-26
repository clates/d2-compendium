// Regenerate every generated page in docs/ from raw/.
//
// Each generator registers its pages first, so any generator can link to any other's pages, then
// renders. Hand-written text below a page's NOTES line survives; see tools/lib/md.mjs.
import { Site } from './lib/md.mjs';
import * as items from './gen/items.mjs';
import * as affixes from './gen/affixes.mjs';
import * as cube from './gen/cube.mjs';
import * as world from './gen/world.mjs';
import * as monsters from './gen/monsters.mjs';
import * as classes from './gen/classes.mjs';
import * as tables from './gen/tables.mjs';
import * as drops from './gen/drops.mjs';
import * as terror from './gen/terror.mjs';
import * as npcs from './gen/npcs.mjs';
import * as crafting from './gen/crafting.mjs';

const only = process.argv.slice(2);
const gens = { items, affixes, cube, world, monsters, drops, classes, tables, terror, npcs, crafting };
const run = Object.entries(gens).filter(([name]) => !only.length || only.includes(name));

const site = new Site();
for (const [, g] of Object.entries(gens)) g.register(site);
for (const [name, g] of run) {
  const t = Date.now();
  g.render(site);
  console.log(`${name}: ${((Date.now() - t) / 1000).toFixed(1)}s`);
}
if (only.length) site.partial = true;
site.flush();
