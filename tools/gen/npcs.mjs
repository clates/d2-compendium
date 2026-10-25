// Vendors: what each town NPC stocks (the vendor columns of armor, weapons and misc), their
// price factors (npc.txt) and gambling (gamble.txt).
import { table, int } from '../lib/data.mjs';
import { mdTable, list } from '../lib/md.mjs';
import * as I from '../lib/items.mjs';

const P = 'npcs/index.md';
const npc = new Map(table('npc').filter((r) => r.npc).map((r) => [r.npc, r]));
// Vendor column prefix, npc.txt row, act. Cain has stock columns but sells nothing.
const VENDORS = [
  ['Charsi', 'charsi', 1, 'Blacksmith: weapons and armor, repairs'], ['Gheed', 'gheed', 1, 'Gambling, weapons and armor'], ['Akara', 'akara', 1, 'Potions, scrolls, staves and wands'],
  ['Fara', 'fara', 2, 'Blacksmith: weapons and armor, repairs'], ['Elzix', 'elzix', 2, 'Gambling, weapons and armor'], ['Drognan', 'drognan', 2, 'Potions, scrolls, staves and wands'], ['Lysander', 'lysander', 2, 'Potions and keys'],
  ['Hratli', 'hratli', 3, 'Blacksmith: weapons and armor, repairs'], ['Asheara', 'asheara', 3, 'Mercenaries, weapons and armor'], ['Alkor', 'alkor', 3, 'Gambling, potions'], ['Ormus', 'ormus', 3, 'Potions, scrolls, staves and wands'],
  ['Halbu', 'halbu', 4, 'Weapons and armor, repairs'], ['Jamella', 'jamella', 4, 'Gambling, potions, staves and wands'],
  ['Larzuk', 'larzuk', 5, 'Blacksmith: weapons and armor, repairs'], ['Malah', 'malah', 5, 'Potions, scrolls, staves and wands'], ['Anya', 'drehya', 5, 'Gambling, weapons and armor'],
];
const bases = [...table('armor'), ...table('weapons'), ...table('misc')].filter((b) => b.code && I.knownCode(b.code));
const pct = (v) => `${Math.round((100 * int(v)) / 1024)}%`;

export function register(site) { site.register('page:npcs', P, 'Vendors'); }

export function render(site) {
  const item = (code) => (site.has(`base:${code}`) ? site.link(P, `base:${code}`, I.baseName(code)) : I.baseName(code));
  const priceRows = VENDORS.map(([name, id, act]) => {
    const r = npc.get(id);
    const quest = r?.['questflag A'] ? `${pct(r['questsellmult A'])} after quest ${r['questflag A']}` : '';
    return [name, String(act), pct(r?.['sell mult']), quest, pct(r?.['buy mult']), [r?.['max buy'], r?.['max buy (N)'], r?.['max buy (H)']].map((x) => int(x).toLocaleString('en-US')).join(' / ')];
  });
  const stock = VENDORS.map(([name, , act, what]) => {
    const rows = bases.filter((b) => int(b[`${name}Max`]) || int(b[`${name}MagicMax`])).map((b) => [
      item(b.code), int(b[`${name}Max`]) ? `${b[`${name}Min`] || 0}-${b[`${name}Max`]}` : '', int(b[`${name}MagicMax`]) ? `${b[`${name}MagicMin`] || 0}-${b[`${name}MagicMax`]}` : '',
    ]);
    return `## ${name}\n\nAct ${act}. ${what}.\n\n${rows.length ? mdTable(['Item', 'Plain', 'Magic'], rows, [, 'r', 'r']) : 'Sells nothing from the item tables.'}`;
  });
  const gamble = table('gamble').filter((g) => g.code);
  const body = `The town NPCs who trade. Each vendor's stock is a list of item bases, each with a range for how many plain and magic copies to stock each time the stock is rolled.

${VENDORS.map(([n]) => `[${n}](#${n.toLowerCase()})`).join(', ')}, [gambling](#gambling).

## Prices

Prices are factors on an item's base price (1024 in \`npc.txt\` is 100%):

${mdTable(['Vendor', 'Act', 'Buying from them', 'Quest discount', 'Selling to them', 'Most they pay for an item (Normal / Nightmare / Hell)'], priceRows, [, 'r', 'r', , 'r', 'r'])}

The quest number is the game's quest flag: 4 in Act 1, 9 is Radament's Lair in Act 2 (the 10% discount the Arreat Summit lists), 17 in Act 3, 35 in Act 5.

> **Unverified:** which quests flags 4, 17 and 35 are. Halbu and Jamella have no discount.

## Gambling

Gheed, Elzix, Alkor, Jamella and Anya gamble. They offer these ${gamble.length} bases, at the tier the character's level allows (see ${site.linkPath(P, 'mechanics/difficulty.md#gambling', 'Difficulty: gambling')} for the quality odds):

${gamble.map((g) => item(g.code)).join(', ')}

${stock.join('\n\n')}

## Sources

- Tables: \`npc.txt\`, the vendor columns (\`CharsiMin\`, \`CharsiMagicMax\`...) of \`armor.txt\`, \`weapons.txt\` and \`misc.txt\`, and \`gamble.txt\`.
- Who does what in town: the game; quest discount: [Arreat Summit, Quest Rewards](http://classic.battle.net/diablo2exp/quests/rewards.shtml).
`;
  site.page(P, 'Vendors', { type: 'reference' }, body);
}
