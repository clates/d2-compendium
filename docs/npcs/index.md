---
title: "Vendors"
type: "reference"
data_version: "3.3.94995"
generated: true
hash: "0a63ab7530216ea1"
---
# Vendors

The town NPCs who trade. Each vendor's stock is a list of item bases, each with a range for how many plain and magic copies to stock each time the stock is rolled.

[Charsi](#charsi), [Gheed](#gheed), [Akara](#akara), [Fara](#fara), [Elzix](#elzix), [Drognan](#drognan), [Lysander](#lysander), [Hratli](#hratli), [Asheara](#asheara), [Alkor](#alkor), [Ormus](#ormus), [Halbu](#halbu), [Jamella](#jamella), [Larzuk](#larzuk), [Malah](#malah), [Anya](#anya), [gambling](#gambling).

## Prices

Prices are factors on an item's base price (1024 in `npc.txt` is 100%):

| Vendor | Act | Buying from them | Quest discount | Selling to them | Most they pay for an item (Normal / Nightmare / Hell) |
| --- | ---: | ---: | --- | ---: | ---: |
| Charsi | 1 | 94% | 90% after quest 4 | 50% | 5,000 / 30,000 / 35,000 |
| Gheed | 1 | 106% | 90% after quest 4 | 50% | 5,000 / 30,000 / 35,000 |
| Akara | 1 | 100% | 90% after quest 4 | 50% | 5,000 / 30,000 / 35,000 |
| Fara | 2 | 100% | 90% after quest 9 | 50% | 10,000 / 30,000 / 35,000 |
| Elzix | 2 | 100% | 90% after quest 9 | 50% | 10,000 / 30,000 / 35,000 |
| Drognan | 2 | 100% | 90% after quest 9 | 50% | 10,000 / 30,000 / 35,000 |
| Lysander | 2 | 100% | 90% after quest 9 | 50% | 10,000 / 30,000 / 35,000 |
| Hratli | 3 | 100% | 90% after quest 17 | 50% | 15,000 / 30,000 / 35,000 |
| Asheara | 3 | 100% | 90% after quest 17 | 50% | 15,000 / 30,000 / 35,000 |
| Alkor | 3 | 100% | 90% after quest 17 | 50% | 15,000 / 30,000 / 35,000 |
| Ormus | 3 | 100% | 90% after quest 17 | 50% | 15,000 / 30,000 / 35,000 |
| Halbu | 4 | 100% |  | 50% | 20,000 / 30,000 / 35,000 |
| Jamella | 4 | 100% |  | 50% | 20,000 / 30,000 / 35,000 |
| Larzuk | 5 | 200% | 50% after quest 35 | 50% | 25,000 / 30,000 / 35,000 |
| Malah | 5 | 200% | 50% after quest 35 | 50% | 25,000 / 30,000 / 35,000 |
| Anya | 5 | 200% | 50% after quest 35 | 50% | 25,000 / 30,000 / 35,000 |

The quest number is the game's quest flag: 4 in Act 1, 9 is Radament's Lair in Act 2 (the 10% discount the Arreat Summit lists), 17 in Act 3, 35 in Act 5.

> **Unverified:** which quests flags 4, 17 and 35 are. Halbu and Jamella have no discount.

## Gambling

Gheed, Elzix, Alkor, Jamella and Anya gamble. They offer these 121 bases, at the tier the character's level allows (see [Difficulty: gambling](../mechanics/difficulty.md#gambling) for the quality odds):

Amulet, Ring, [Hand Axe](../items/bases/hand-axe.md), [Axe](../items/bases/axe.md), [Double Axe](../items/bases/double-axe.md), [Military Pick](../items/bases/military-pick.md), [War Axe](../items/bases/war-axe.md), [Large Axe](../items/bases/large-axe.md), [Broad Axe](../items/bases/broad-axe.md), [Battle Axe](../items/bases/battle-axe.md), [Great Axe](../items/bases/great-axe.md), [Giant Axe](../items/bases/giant-axe.md), [Club](../items/bases/club.md), [Spiked Club](../items/bases/spiked-club.md), [Mace](../items/bases/mace.md), [Morning Star](../items/bases/morning-star.md), [Flail](../items/bases/flail.md), [War Hammer](../items/bases/war-hammer.md), [Maul](../items/bases/maul.md), [Great Maul](../items/bases/great-maul.md), [Short Sword](../items/bases/short-sword.md), [Scimitar](../items/bases/scimitar.md), [Sabre](../items/bases/sabre.md), [Falchion](../items/bases/falchion.md), [Crystal Sword](../items/bases/crystal-sword.md), [Broad Sword](../items/bases/broad-sword.md), [Long Sword](../items/bases/long-sword.md), [War Sword](../items/bases/war-sword.md), [Two-Handed Sword](../items/bases/two-handed-sword.md), [Claymore](../items/bases/claymore.md), [Giant Sword](../items/bases/giant-sword.md), [Bastard Sword](../items/bases/bastard-sword.md), [Flamberge](../items/bases/flamberge.md), [Great Sword](../items/bases/great-sword.md), [Spear](../items/bases/spear.md), [Trident](../items/bases/trident.md), [Brandistock](../items/bases/brandistock.md), [Spetum](../items/bases/spetum.md), [Pike](../items/bases/pike.md), [Bardiche](../items/bases/bardiche.md), [Voulge](../items/bases/voulge.md), [Scythe](../items/bases/scythe.md), [Poleaxe](../items/bases/poleaxe.md), [Halberd](../items/bases/halberd.md), [War Scythe](../items/bases/war-scythe.md), [Short Bow](../items/bases/short-bow.md), [Hunter's Bow](../items/bases/hunters-bow.md), [Long Bow](../items/bases/long-bow.md), [Composite Bow](../items/bases/composite-bow.md), [Short Battle Bow](../items/bases/short-battle-bow.md), [Long Battle Bow](../items/bases/long-battle-bow.md), [Short War Bow](../items/bases/short-war-bow.md), [Long War Bow](../items/bases/long-war-bow.md), [Light Crossbow](../items/bases/light-crossbow.md), [Crossbow](../items/bases/crossbow.md), [Heavy Crossbow](../items/bases/heavy-crossbow.md), [Repeating Crossbow](../items/bases/repeating-crossbow.md), [Cap](../items/bases/cap.md), [Skull Cap](../items/bases/skull-cap.md), [Helm](../items/bases/helm.md), [Full Helm](../items/bases/full-helm.md), [Great Helm](../items/bases/great-helm.md), [Crown](../items/bases/crown.md), [Mask](../items/bases/mask.md), [Quilted Armor](../items/bases/quilted-armor.md), [Leather Armor](../items/bases/leather-armor.md), [Hard Leather Armor](../items/bases/hard-leather-armor.md), [Studded Leather](../items/bases/studded-leather.md), [Ring Mail](../items/bases/ring-mail.md), [Scale Mail](../items/bases/scale-mail.md), [Chain Mail](../items/bases/chain-mail.md), [Breast Plate](../items/bases/breast-plate.md), [Splint Mail](../items/bases/splint-mail.md), [Plate Mail](../items/bases/plate-mail.md), [Field Plate](../items/bases/field-plate.md), [Gothic Plate](../items/bases/gothic-plate.md), [Full Plate Mail](../items/bases/full-plate-mail.md), [Ancient Armor](../items/bases/ancient-armor.md), [Light Plate](../items/bases/light-plate.md), [Buckler](../items/bases/buckler.md), [Small Shield](../items/bases/small-shield.md), [Large Shield](../items/bases/large-shield.md), [Kite Shield](../items/bases/kite-shield.md), [Tower Shield](../items/bases/tower-shield.md), [Gothic Shield](../items/bases/gothic-shield.md), [Leather Gloves](../items/bases/leather-gloves.md), [Heavy Gloves](../items/bases/heavy-gloves.md), [Chain Gloves](../items/bases/chain-gloves.md), [Light Gauntlets](../items/bases/light-gauntlets.md), [Gauntlets](../items/bases/gauntlets.md), [Boots](../items/bases/boots.md), [Heavy Boots](../items/bases/heavy-boots.md), [Chain Boots](../items/bases/chain-boots.md), [Light Plated Boots](../items/bases/light-plated-boots.md), [Greaves](../items/bases/greaves.md), [Sash](../items/bases/sash.md), [Light Belt](../items/bases/light-belt.md), [Belt](../items/bases/belt.md), [Heavy Belt](../items/bases/heavy-belt.md), [Plated Belt](../items/bases/plated-belt.md), [Bone Helm](../items/bases/bone-helm.md), [Bone Shield](../items/bases/bone-shield.md), [Spiked Shield](../items/bases/spiked-shield.md), [Throwing Knife](../items/bases/throwing-knife.md), [Throwing Axe](../items/bases/throwing-axe.md), [Balanced Knife](../items/bases/balanced-knife.md), [Balanced Axe](../items/bases/balanced-axe.md), [Javelin](../items/bases/javelin.md), [Pilum](../items/bases/pilum.md), [Short Spear](../items/bases/short-spear.md), [Glaive](../items/bases/glaive.md), [Throwing Spear](../items/bases/throwing-spear.md), [Katar](../items/bases/katar.md), [Wrist Blade](../items/bases/wrist-blade.md), [Hatchet Hands](../items/bases/hatchet-hands.md), [Cestus](../items/bases/cestus.md), [Claws](../items/bases/claws.md), [Blade Talons](../items/bases/blade-talons.md), [Scissors Katar](../items/bases/scissors-katar.md), [Circlet](../items/bases/circlet.md), [Coronet](../items/bases/coronet.md)

## Charsi

Act 1. Blacksmith: weapons and armor, repairs.

| Item | Plain | Magic |
| --- | ---: | ---: |
| [Cap](../items/bases/cap.md) | 1-1 | 1-1 |
| [Skull Cap](../items/bases/skull-cap.md) | 1-1 | 1-1 |
| [Quilted Armor](../items/bases/quilted-armor.md) | 1-1 | 1-1 |
| [Leather Armor](../items/bases/leather-armor.md) | 1-1 | 1-1 |
| [Hard Leather Armor](../items/bases/hard-leather-armor.md) | 1-1 | 1-1 |
| [Studded Leather](../items/bases/studded-leather.md) | 1-1 | 1-1 |
| [Ring Mail](../items/bases/ring-mail.md) | 0-1 | 0-1 |
| [Buckler](../items/bases/buckler.md) | 1-1 | 1-1 |
| [Small Shield](../items/bases/small-shield.md) | 1-1 | 1-1 |
| [Large Shield](../items/bases/large-shield.md) | 0-1 | 0-1 |
| [Leather Gloves](../items/bases/leather-gloves.md) | 1-1 | 1-1 |
| [Heavy Gloves](../items/bases/heavy-gloves.md) | 0-1 | 0-1 |
| [Chain Gloves](../items/bases/chain-gloves.md) | 0-1 |  |
| [Boots](../items/bases/boots.md) | 1-1 | 1-1 |
| [Heavy Boots](../items/bases/heavy-boots.md) | 0-1 | 0-1 |
| [Chain Boots](../items/bases/chain-boots.md) | 0-1 |  |
| [Sash](../items/bases/sash.md) | 1-1 | 1-1 |
| [Light Belt](../items/bases/light-belt.md) | 0-1 | 0-1 |
| [Belt](../items/bases/belt.md) | 0-1 |  |
| [Hand Axe](../items/bases/hand-axe.md) | 0-1 | 0-1 |
| [Axe](../items/bases/axe.md) | 1-1 | 1-1 |
| [Large Axe](../items/bases/large-axe.md) | 1-1 | 1-1 |
| [Spiked Club](../items/bases/spiked-club.md) | 0-1 | 0-1 |
| [Mace](../items/bases/mace.md) | 0-1 | 0-1 |
| [Short Sword](../items/bases/short-sword.md) | 1-1 | 0-1 |
| [Scimitar](../items/bases/scimitar.md) | 1-1 | 1-1 |
| [Sabre](../items/bases/sabre.md) | 1-1 | 1-1 |
| [Two-Handed Sword](../items/bases/two-handed-sword.md) | 1-1 | 1-1 |
| [Throwing Knife](../items/bases/throwing-knife.md) | 1-2 |  |
| [Throwing Axe](../items/bases/throwing-axe.md) | 1-1 |  |
| [Javelin](../items/bases/javelin.md) | 2-3 |  |
| [Spear](../items/bases/spear.md) | 1-1 | 1-1 |
| [Bardiche](../items/bases/bardiche.md) | 1-1 | 1-1 |
| [Short Bow](../items/bases/short-bow.md) | 1-1 | 1-1 |
| [Hunter's Bow](../items/bases/hunters-bow.md) | 1-1 | 1-1 |
| [Light Crossbow](../items/bases/light-crossbow.md) | 0-1 | 0-1 |
| [Katar](../items/bases/katar.md) | 1-2 | 0-1 |
| [Wrist Blade](../items/bases/wrist-blade.md) | 1-1 | 0-1 |
| Arrows | 3-5 |  |
| Bolts | 2-4 |  |

## Gheed

Act 1. Gambling, weapons and armor.

| Item | Plain | Magic |
| --- | ---: | ---: |
| [Cap](../items/bases/cap.md) | 0-1 | 0-1 |
| [Skull Cap](../items/bases/skull-cap.md) | 0-1 | 0-1 |
| [Helm](../items/bases/helm.md) | 0-1 | 0-1 |
| [Quilted Armor](../items/bases/quilted-armor.md) | 0-1 | 0-1 |
| [Leather Armor](../items/bases/leather-armor.md) | 0-1 | 0-1 |
| [Hard Leather Armor](../items/bases/hard-leather-armor.md) | 0-1 | 0-1 |
| [Studded Leather](../items/bases/studded-leather.md) | 0-1 | 0-1 |
| [Buckler](../items/bases/buckler.md) | 0-1 | 0-1 |
| [Small Shield](../items/bases/small-shield.md) | 0-1 | 0-1 |
| [Large Shield](../items/bases/large-shield.md) | 0-1 | 0-1 |
| [Leather Gloves](../items/bases/leather-gloves.md) | 1-1 | 0-1 |
| [Heavy Gloves](../items/bases/heavy-gloves.md) | 0-1 | 0-1 |
| [Boots](../items/bases/boots.md) | 1-1 | 0-1 |
| [Heavy Boots](../items/bases/heavy-boots.md) | 0-1 | 0-1 |
| [Sash](../items/bases/sash.md) | 1-1 | 0-1 |
| [Light Belt](../items/bases/light-belt.md) | 0-1 | 0-1 |
| [Hand Axe](../items/bases/hand-axe.md) | 1-1 |  |
| [Axe](../items/bases/axe.md) | 1-1 | 1-1 |
| [Double Axe](../items/bases/double-axe.md) |  | 1-1 |
| [Large Axe](../items/bases/large-axe.md) | 1-1 | 1-1 |
| [Broad Axe](../items/bases/broad-axe.md) | 1-1 | 1-1 |
| [Club](../items/bases/club.md) | 1-1 | 1-1 |
| [Spiked Club](../items/bases/spiked-club.md) | 1-1 | 1-1 |
| [Mace](../items/bases/mace.md) | 1-1 | 1-1 |
| [Short Sword](../items/bases/short-sword.md) | 1-1 | 1-1 |
| [Scimitar](../items/bases/scimitar.md) | 1-1 | 1-1 |
| [Throwing Knife](../items/bases/throwing-knife.md) | 1-2 |  |
| [Throwing Axe](../items/bases/throwing-axe.md) | 1-2 |  |
| [Javelin](../items/bases/javelin.md) | 1-2 |  |
| [Pilum](../items/bases/pilum.md) | 1-1 |  |
| [Short Spear](../items/bases/short-spear.md) |  | 1-2 |
| [Spear](../items/bases/spear.md) | 1-1 | 1-1 |
| [Trident](../items/bases/trident.md) | 1-1 | 1-1 |
| [Bardiche](../items/bases/bardiche.md) | 1-1 | 1-1 |
| [Hunter's Bow](../items/bases/hunters-bow.md) | 0-1 | 1-1 |
| [Long Bow](../items/bases/long-bow.md) | 1-1 | 1-1 |
| [Katar](../items/bases/katar.md) | 1-1 |  |
| [Wrist Blade](../items/bases/wrist-blade.md) |  | 1-1 |
| Arrows | 1-3 |  |
| Bolts | 2-4 |  |
| Key | 5-9 | 5-9 |

## Akara

Act 1. Potions, scrolls, staves and wands.

| Item | Plain | Magic |
| --- | ---: | ---: |
| [Wand](../items/bases/wand.md) | 4-6 | 7-9 |
| [Yew Wand](../items/bases/yew-wand.md) | 1-2 | 1-1 |
| [Scepter](../items/bases/scepter.md) | 2-4 | 2-4 |
| [Dagger](../items/bases/dagger.md) | 3-5 | 3-5 |
| [Dirk](../items/bases/dirk.md) | 2-3 | 1-2 |
| [Short Staff](../items/bases/short-staff.md) | 5-9 | 5-9 |
| [Long Staff](../items/bases/long-staff.md) | 2-3 | 1-2 |
| Stamina Potion | 2-4 |  |
| Antidote Potion | 2-4 |  |
| Thawing Potion | 1-2 |  |
| Tome of Town Portal | 0-2 |  |
| Tome of Identify | 0-2 |  |
| Scroll of Town Portal | 11-17 |  |
| Scroll of Identify | 11-17 |  |
| Key | 1-2 | 1-2 |
| Minor Healing Potion | 1-1 |  |
| Minor Mana Potion | 1-1 |  |

## Fara

Act 2. Blacksmith: weapons and armor, repairs.

| Item | Plain | Magic |
| --- | ---: | ---: |
| [Helm](../items/bases/helm.md) | 1-2 | 1-1 |
| [Full Helm](../items/bases/full-helm.md) | 1-1 | 0-1 |
| [Ring Mail](../items/bases/ring-mail.md) | 1-1 | 0-1 |
| [Scale Mail](../items/bases/scale-mail.md) | 1-1 | 0-1 |
| [Chain Mail](../items/bases/chain-mail.md) | 1-1 | 0-1 |
| [Breast Plate](../items/bases/breast-plate.md) | 0-1 | 0-1 |
| [Splint Mail](../items/bases/splint-mail.md) | 0-1 |  |
| [Large Shield](../items/bases/large-shield.md) | 1-1 | 1-1 |
| [Kite Shield](../items/bases/kite-shield.md) | 1-1 | 0-1 |
| [Tower Shield](../items/bases/tower-shield.md) | 0-1 |  |
| [Heavy Gloves](../items/bases/heavy-gloves.md) | 0-1 | 0-1 |
| [Chain Gloves](../items/bases/chain-gloves.md) | 1-2 | 1-1 |
| [Light Gauntlets](../items/bases/light-gauntlets.md) | 0-1 | 0-1 |
| [Heavy Boots](../items/bases/heavy-boots.md) | 0-1 | 0-1 |
| [Chain Boots](../items/bases/chain-boots.md) | 1-2 | 1-1 |
| [Light Plated Boots](../items/bases/light-plated-boots.md) | 0-1 | 0-1 |
| [Light Belt](../items/bases/light-belt.md) | 0-1 | 0-1 |
| [Belt](../items/bases/belt.md) | 1-2 | 1-1 |
| [Heavy Belt](../items/bases/heavy-belt.md) | 0-1 | 0-1 |
| [Double Axe](../items/bases/double-axe.md) | 1-1 | 0-1 |
| [Military Pick](../items/bases/military-pick.md) | 0-1 | 0-1 |
| [Broad Axe](../items/bases/broad-axe.md) | 1-1 | 1-1 |
| [Battle Axe](../items/bases/battle-axe.md) | 1-1 | 1-1 |
| [Mace](../items/bases/mace.md) | 0-1 | 0-1 |
| [Morning Star](../items/bases/morning-star.md) | 1-1 | 1-1 |
| [Flail](../items/bases/flail.md) | 1-1 | 1-1 |
| [Scimitar](../items/bases/scimitar.md) | 0-1 | 0-1 |
| [Sabre](../items/bases/sabre.md) | 0-1 | 0-1 |
| [Falchion](../items/bases/falchion.md) | 1-1 | 0-1 |
| [Broad Sword](../items/bases/broad-sword.md) | 1-1 | 1-2 |
| [Long Sword](../items/bases/long-sword.md) |  | 1-2 |
| [Claymore](../items/bases/claymore.md) | 1-1 | 1-2 |
| [Giant Sword](../items/bases/giant-sword.md) | 0-1 | 1-2 |
| [Throwing Axe](../items/bases/throwing-axe.md) | 1-1 |  |
| [Balanced Knife](../items/bases/balanced-knife.md) | 1-1 | 1-1 |
| [Balanced Axe](../items/bases/balanced-axe.md) | 1-1 | 1-1 |
| [Pilum](../items/bases/pilum.md) | 1-1 |  |
| [Short Spear](../items/bases/short-spear.md) | 1-1 | 1-1 |
| [Glaive](../items/bases/glaive.md) |  | 2-2 |
| [Trident](../items/bases/trident.md) | 1-1 |  |
| [Brandistock](../items/bases/brandistock.md) | 1-1 | 1-1 |
| [Spetum](../items/bases/spetum.md) | 1-1 | 1-1 |
| [Pike](../items/bases/pike.md) |  | 1-1 |
| [Voulge](../items/bases/voulge.md) | 0-1 | 0-1 |
| [Scythe](../items/bases/scythe.md) | 0-1 | 0-1 |
| [Long Bow](../items/bases/long-bow.md) |  | 1-1 |
| [Composite Bow](../items/bases/composite-bow.md) | 1-1 | 1-2 |
| [Short Battle Bow](../items/bases/short-battle-bow.md) | 1-1 | 1-2 |
| [Crossbow](../items/bases/crossbow.md) | 1-1 | 1-1 |
| [Hatchet Hands](../items/bases/hatchet-hands.md) | 1-1 | 1-1 |
| [Cestus](../items/bases/cestus.md) | 1-1 | 1-1 |
| Arrows | 3-4 | 3-4 |
| Bolts | 3-4 | 3-4 |

## Elzix

Act 2. Gambling, weapons and armor.

| Item | Plain | Magic |
| --- | ---: | ---: |
| [Cap](../items/bases/cap.md) | 1-1 | 0-1 |
| [Skull Cap](../items/bases/skull-cap.md) | 1-2 | 1-1 |
| [Leather Armor](../items/bases/leather-armor.md) | 1-1 | 1-1 |
| [Hard Leather Armor](../items/bases/hard-leather-armor.md) | 1-1 | 1-1 |
| [Studded Leather](../items/bases/studded-leather.md) | 1-1 | 1-1 |
| [Ring Mail](../items/bases/ring-mail.md) | 0-1 | 0-1 |
| [Buckler](../items/bases/buckler.md) | 1-1 | 0-1 |
| [Small Shield](../items/bases/small-shield.md) | 1-2 | 1-1 |
| [Leather Gloves](../items/bases/leather-gloves.md) | 1-1 | 0-1 |
| [Heavy Gloves](../items/bases/heavy-gloves.md) | 1-1 | 1-1 |
| [Boots](../items/bases/boots.md) | 1-1 | 0-1 |
| [Heavy Boots](../items/bases/heavy-boots.md) | 1-1 | 1-1 |
| [Sash](../items/bases/sash.md) | 1-1 | 0-1 |
| [Light Belt](../items/bases/light-belt.md) | 1-1 | 1-1 |
| [Hand Axe](../items/bases/hand-axe.md) | 1-1 | 0-1 |
| [Axe](../items/bases/axe.md) | 1-1 | 1-1 |
| [Large Axe](../items/bases/large-axe.md) | 1-1 | 0-1 |
| [Broad Axe](../items/bases/broad-axe.md) | 1-1 | 1-1 |
| [Spiked Club](../items/bases/spiked-club.md) | 1-1 | 0-1 |
| [Mace](../items/bases/mace.md) | 1-2 | 1-1 |
| [Short Sword](../items/bases/short-sword.md) | 1-1 | 0-1 |
| [Scimitar](../items/bases/scimitar.md) | 1-1 | 0-1 |
| [Sabre](../items/bases/sabre.md) | 1-1 | 1-1 |
| [Falchion](../items/bases/falchion.md) | 1-1 | 0-1 |
| [Two-Handed Sword](../items/bases/two-handed-sword.md) | 1-1 | 0-1 |
| [Throwing Knife](../items/bases/throwing-knife.md) | 2-2 |  |
| [Throwing Axe](../items/bases/throwing-axe.md) | 2-2 |  |
| [Javelin](../items/bases/javelin.md) | 1-2 |  |
| [Pilum](../items/bases/pilum.md) | 1-2 |  |
| [Spear](../items/bases/spear.md) | 1-1 | 0-1 |
| [Trident](../items/bases/trident.md) | 1-1 | 1-1 |
| [Bardiche](../items/bases/bardiche.md) | 1-1 | 0-1 |
| [Hunter's Bow](../items/bases/hunters-bow.md) | 1-1 | 0-1 |
| [Long Bow](../items/bases/long-bow.md) | 1-1 | 0-1 |
| [Composite Bow](../items/bases/composite-bow.md) | 0-1 |  |
| [Light Crossbow](../items/bases/light-crossbow.md) | 1-1 | 1-1 |
| [Hatchet Hands](../items/bases/hatchet-hands.md) | 1-1 |  |
| [Cestus](../items/bases/cestus.md) | 1-1 | 0-1 |
| Arrows | 2-3 |  |
| Bolts | 2-3 |  |

## Drognan

Act 2. Potions, scrolls, staves and wands.

| Item | Plain | Magic |
| --- | ---: | ---: |
| [Bone Helm](../items/bases/bone-helm.md) | 1-2 | 1-3 |
| [Bone Shield](../items/bases/bone-shield.md) | 1-2 | 1-3 |
| [Spiked Shield](../items/bases/spiked-shield.md) | 1-2 | 1-3 |
| [Wand](../items/bases/wand.md) |  | 1-2 |
| [Yew Wand](../items/bases/yew-wand.md) | 3-5 | 5-9 |
| [Bone Wand](../items/bases/bone-wand.md) | 1-3 | 1-3 |
| [Scepter](../items/bases/scepter.md) | 2-3 | 3-5 |
| [Grand Scepter](../items/bases/grand-scepter.md) | 1-3 | 1-3 |
| [Crystal Sword](../items/bases/crystal-sword.md) |  | 0-1 |
| [Dagger](../items/bases/dagger.md) | 3-5 | 3-5 |
| [Dirk](../items/bases/dirk.md) | 4-5 | 4-5 |
| [Scythe](../items/bases/scythe.md) |  | 0-1 |
| [Long Staff](../items/bases/long-staff.md) | 1-2 | 0-2 |
| [Gnarled Staff](../items/bases/gnarled-staff.md) | 3-5 | 5-9 |
| [Battle Staff](../items/bases/battle-staff.md) | 1-3 | 1-3 |
| Tome of Town Portal | 2-4 | 2-4 |
| Tome of Identify | 2-4 | 2-4 |
| Scroll of Town Portal | 11-17 | 11-17 |
| Scroll of Identify | 11-17 | 11-17 |
| Minor Healing Potion | 1-1 |  |
| Light Healing Potion | 1-1 |  |
| Minor Mana Potion | 1-1 |  |
| Light Mana Potion | 1-1 |  |

## Lysander

Act 2. Potions and keys.

| Item | Plain | Magic |
| --- | ---: | ---: |
| Stamina Potion | 3-5 | 3-5 |
| Antidote Potion | 9-15 | 9-15 |
| Thawing Potion | 3-5 | 3-5 |
| Key | 6-9 | 6-9 |
| Minor Healing Potion | 1-1 |  |
| Light Healing Potion | 1-1 |  |
| Minor Mana Potion | 1-1 |  |
| Light Mana Potion | 1-1 |  |

## Hratli

Act 3. Blacksmith: weapons and armor, repairs.

| Item | Plain | Magic |
| --- | ---: | ---: |
| [Great Helm](../items/bases/great-helm.md) | 2-2 | 1-1 |
| [Crown](../items/bases/crown.md) | 1-1 | 0-1 |
| [Chain Mail](../items/bases/chain-mail.md) | 0-1 | 0-1 |
| [Breast Plate](../items/bases/breast-plate.md) | 1-1 | 0-1 |
| [Splint Mail](../items/bases/splint-mail.md) | 1-1 | 1-1 |
| [Plate Mail](../items/bases/plate-mail.md) | 1-1 | 0-1 |
| [Field Plate](../items/bases/field-plate.md) | 0-1 |  |
| [Kite Shield](../items/bases/kite-shield.md) | 1-1 | 1-1 |
| [Tower Shield](../items/bases/tower-shield.md) | 1-2 | 1-1 |
| [Gothic Shield](../items/bases/gothic-shield.md) | 0-1 |  |
| [Military Pick](../items/bases/military-pick.md) | 1-1 | 0-1 |
| [War Axe](../items/bases/war-axe.md) | 1-1 | 1-1 |
| [Battle Axe](../items/bases/battle-axe.md) | 1-1 | 0-1 |
| [Great Axe](../items/bases/great-axe.md) | 1-1 | 1-1 |
| [Giant Axe](../items/bases/giant-axe.md) | 0-1 |  |
| [Flail](../items/bases/flail.md) | 1-1 | 1-1 |
| [War Hammer](../items/bases/war-hammer.md) | 1-1 | 0-1 |
| [Maul](../items/bases/maul.md) | 1-1 | 1-1 |
| [Broad Sword](../items/bases/broad-sword.md) |  | 1-1 |
| [Long Sword](../items/bases/long-sword.md) | 1-1 | 1-2 |
| [War Sword](../items/bases/war-sword.md) | 1-1 | 1-1 |
| [Giant Sword](../items/bases/giant-sword.md) | 1-1 | 1-1 |
| [Bastard Sword](../items/bases/bastard-sword.md) | 1-1 | 1-1 |
| [Flamberge](../items/bases/flamberge.md) | 0-1 | 1-1 |
| [Scythe](../items/bases/scythe.md) |  | 1-1 |
| [Poleaxe](../items/bases/poleaxe.md) | 1-1 | 1-1 |
| [Halberd](../items/bases/halberd.md) | 1-1 | 1-1 |
| [Hatchet Hands](../items/bases/hatchet-hands.md) | 0-1 | 1-1 |
| [Claws](../items/bases/claws.md) | 1-1 | 1-1 |
| [Blade Talons](../items/bases/blade-talons.md) | 1-1 |  |
| Arrows | 3-4 | 3-4 |
| Bolts | 3-4 | 3-4 |
| Key | 2-3 | 2-3 |

## Asheara

Act 3. Mercenaries, weapons and armor.

| Item | Plain | Magic |
| --- | ---: | ---: |
| [Helm](../items/bases/helm.md) |  | 0-1 |
| [Full Helm](../items/bases/full-helm.md) | 1-1 | 0-1 |
| [Great Helm](../items/bases/great-helm.md) | 1-1 | 1-1 |
| [Scale Mail](../items/bases/scale-mail.md) |  | 0-1 |
| [Chain Mail](../items/bases/chain-mail.md) | 1-1 | 1-1 |
| [Breast Plate](../items/bases/breast-plate.md) | 1-1 | 1-1 |
| [Splint Mail](../items/bases/splint-mail.md) | 1-1 | 0-1 |
| [Small Shield](../items/bases/small-shield.md) |  | 0-1 |
| [Large Shield](../items/bases/large-shield.md) | 1-1 | 1-1 |
| [Kite Shield](../items/bases/kite-shield.md) | 1-1 | 0-1 |
| [Chain Gloves](../items/bases/chain-gloves.md) | 1-1 | 0-1 |
| [Light Gauntlets](../items/bases/light-gauntlets.md) | 1-2 | 1-1 |
| [Gauntlets](../items/bases/gauntlets.md) | 1-1 | 0-1 |
| [Chain Boots](../items/bases/chain-boots.md) | 1-1 | 0-1 |
| [Light Plated Boots](../items/bases/light-plated-boots.md) | 1-2 | 1-1 |
| [Greaves](../items/bases/greaves.md) | 1-1 | 0-1 |
| [Belt](../items/bases/belt.md) | 1-1 | 0-1 |
| [Heavy Belt](../items/bases/heavy-belt.md) | 1-2 | 1-1 |
| [Plated Belt](../items/bases/plated-belt.md) | 1-1 | 0-1 |
| [Broad Sword](../items/bases/broad-sword.md) | 1-1 | 1-1 |
| [Claymore](../items/bases/claymore.md) | 1-1 | 1-1 |
| [Balanced Knife](../items/bases/balanced-knife.md) | 1-2 |  |
| [Balanced Axe](../items/bases/balanced-axe.md) | 1-2 |  |
| [Javelin](../items/bases/javelin.md) | 1-1 |  |
| [Pilum](../items/bases/pilum.md) | 1-1 |  |
| [Short Spear](../items/bases/short-spear.md) | 1-1 |  |
| [Glaive](../items/bases/glaive.md) | 1-1 |  |
| [Brandistock](../items/bases/brandistock.md) | 1-1 | 0-1 |
| [Spetum](../items/bases/spetum.md) | 1-1 | 1-1 |
| [Pike](../items/bases/pike.md) | 0-1 |  |
| [Scythe](../items/bases/scythe.md) | 1-1 | 1-1 |
| [Composite Bow](../items/bases/composite-bow.md) | 0-1 |  |
| [Short Battle Bow](../items/bases/short-battle-bow.md) | 1-1 | 0-1 |
| [Long Battle Bow](../items/bases/long-battle-bow.md) | 1-1 | 0-1 |
| [Short War Bow](../items/bases/short-war-bow.md) | 0-1 | 0-1 |
| [Crossbow](../items/bases/crossbow.md) | 1-1 | 0-1 |
| [Heavy Crossbow](../items/bases/heavy-crossbow.md) | 0-1 | 0-1 |
| [Claws](../items/bases/claws.md) | 0-1 | 1-1 |
| [Blade Talons](../items/bases/blade-talons.md) | 1-1 | 0-1 |
| Arrows | 2-3 |  |
| Bolts | 2-3 |  |

## Alkor

Act 3. Gambling, potions.

| Item | Plain | Magic |
| --- | ---: | ---: |
| Stamina Potion | 3-5 |  |
| Antidote Potion | 8-11 |  |
| Thawing Potion | 6-9 |  |

## Ormus

Act 3. Potions, scrolls, staves and wands.

| Item | Plain | Magic |
| --- | ---: | ---: |
| [Mask](../items/bases/mask.md) | 0-1 | 0-1 |
| [Gothic Plate](../items/bases/gothic-plate.md) |  | 0-1 |
| [Bone Helm](../items/bases/bone-helm.md) |  | 0-1 |
| [Bone Shield](../items/bases/bone-shield.md) |  | 0-1 |
| [Giant Axe](../items/bases/giant-axe.md) |  | 0-1 |
| [Yew Wand](../items/bases/yew-wand.md) | 2-3 | 2-3 |
| [Bone Wand](../items/bases/bone-wand.md) | 3-5 | 5-7 |
| [Grim Wand](../items/bases/grim-wand.md) | 1-2 | 0-1 |
| [Scepter](../items/bases/scepter.md) | 0-1 | 0-1 |
| [Grand Scepter](../items/bases/grand-scepter.md) | 3-5 | 3-5 |
| [War Scepter](../items/bases/war-scepter.md) | 1-3 | 1-3 |
| [Crystal Sword](../items/bases/crystal-sword.md) |  | 0-1 |
| [Kris](../items/bases/kris.md) | 3-5 | 3-5 |
| [Blade](../items/bases/blade.md) | 3-3 | 3-3 |
| [Scythe](../items/bases/scythe.md) |  | 0-1 |
| [Long Staff](../items/bases/long-staff.md) | 1-1 | 0-1 |
| [Gnarled Staff](../items/bases/gnarled-staff.md) | 2-3 | 2-5 |
| [Battle Staff](../items/bases/battle-staff.md) | 2-3 | 2-5 |
| [War Staff](../items/bases/war-staff.md) | 1-1 | 0-1 |
| Tome of Town Portal | 2-4 | 2-4 |
| Tome of Identify | 2-4 | 2-4 |
| Scroll of Town Portal | 11-17 | 11-17 |
| Scroll of Identify | 11-17 | 11-17 |
| Minor Healing Potion | 1-1 |  |
| Light Healing Potion | 1-1 |  |
| Healing Potion | 1-1 |  |
| Minor Mana Potion | 1-1 |  |
| Light Mana Potion | 1-1 |  |
| Mana Potion | 1-1 |  |

## Halbu

Act 4. Weapons and armor, repairs.

| Item | Plain | Magic |
| --- | ---: | ---: |
| [Great Helm](../items/bases/great-helm.md) | 1-1 | 1-1 |
| [Crown](../items/bases/crown.md) | 1-1 | 1-1 |
| [Plate Mail](../items/bases/plate-mail.md) |  | 1-1 |
| [Field Plate](../items/bases/field-plate.md) | 1-1 | 1-1 |
| [Gothic Plate](../items/bases/gothic-plate.md) | 1-1 | 1-1 |
| [Full Plate Mail](../items/bases/full-plate-mail.md) |  | 1-1 |
| [Ancient Armor](../items/bases/ancient-armor.md) |  | 1-1 |
| [Light Plate](../items/bases/light-plate.md) |  | 1-1 |
| [Tower Shield](../items/bases/tower-shield.md) | 1-1 | 1-1 |
| [Gothic Shield](../items/bases/gothic-shield.md) | 1-1 | 1-1 |
| [Light Gauntlets](../items/bases/light-gauntlets.md) |  | 1-1 |
| [Gauntlets](../items/bases/gauntlets.md) | 1-1 | 0-1 |
| [Light Plated Boots](../items/bases/light-plated-boots.md) |  | 1-1 |
| [Greaves](../items/bases/greaves.md) | 1-1 | 1-1 |
| [Heavy Belt](../items/bases/heavy-belt.md) |  | 1-1 |
| [Plated Belt](../items/bases/plated-belt.md) | 1-1 | 1-1 |
| [Military Pick](../items/bases/military-pick.md) |  | 1-1 |
| [War Axe](../items/bases/war-axe.md) | 1-1 | 1-3 |
| [Giant Axe](../items/bases/giant-axe.md) | 1-1 | 2-2 |
| [Flail](../items/bases/flail.md) |  | 1-1 |
| [War Hammer](../items/bases/war-hammer.md) | 1-1 | 1-1 |
| [Maul](../items/bases/maul.md) | 1-1 | 1-1 |
| [Great Maul](../items/bases/great-maul.md) | 1-1 | 1-1 |
| [Long Sword](../items/bases/long-sword.md) | 1-1 | 1-2 |
| [War Sword](../items/bases/war-sword.md) | 1-2 | 1-3 |
| [Bastard Sword](../items/bases/bastard-sword.md) | 0-1 | 1-1 |
| [Flamberge](../items/bases/flamberge.md) | 1-1 | 1-2 |
| [Great Sword](../items/bases/great-sword.md) | 1-1 | 1-3 |
| [Balanced Knife](../items/bases/balanced-knife.md) | 1-2 | 1-2 |
| [Balanced Axe](../items/bases/balanced-axe.md) | 1-2 | 1-2 |
| [Pilum](../items/bases/pilum.md) | 1-1 | 1-2 |
| [Throwing Spear](../items/bases/throwing-spear.md) | 1-1 | 1-2 |
| [Spetum](../items/bases/spetum.md) | 0-1 | 1-2 |
| [Pike](../items/bases/pike.md) | 1-1 | 1-2 |
| [Poleaxe](../items/bases/poleaxe.md) | 0-1 | 1-1 |
| [Halberd](../items/bases/halberd.md) | 1-1 | 1-1 |
| [War Scythe](../items/bases/war-scythe.md) |  | 1-2 |
| [Scissors Katar](../items/bases/scissors-katar.md) | 1-1 | 0-1 |
| Arrows | 3-4 |  |
| Bolts | 3-4 |  |

## Jamella

Act 4. Gambling, potions, staves and wands.

| Item | Plain | Magic |
| --- | ---: | ---: |
| [Crown](../items/bases/crown.md) |  | 0-1 |
| [Mask](../items/bases/mask.md) |  | 0-1 |
| [Chain Mail](../items/bases/chain-mail.md) |  | 0-1 |
| [Breast Plate](../items/bases/breast-plate.md) | 1-1 | 0-1 |
| [Splint Mail](../items/bases/splint-mail.md) | 1-1 | 0-1 |
| [Plate Mail](../items/bases/plate-mail.md) | 1-1 | 1-1 |
| [Light Plate](../items/bases/light-plate.md) | 0-1 |  |
| [Large Shield](../items/bases/large-shield.md) | 1-1 |  |
| [Kite Shield](../items/bases/kite-shield.md) | 1-1 | 1-1 |
| [Tower Shield](../items/bases/tower-shield.md) | 1-1 |  |
| [Light Gauntlets](../items/bases/light-gauntlets.md) | 1-1 | 0-1 |
| [Gauntlets](../items/bases/gauntlets.md) | 1-1 |  |
| [Light Plated Boots](../items/bases/light-plated-boots.md) | 1-1 | 0-1 |
| [Greaves](../items/bases/greaves.md) | 1-1 |  |
| [Heavy Belt](../items/bases/heavy-belt.md) | 1-1 | 0-1 |
| [Plated Belt](../items/bases/plated-belt.md) | 1-1 |  |
| [Yew Wand](../items/bases/yew-wand.md) |  | 0-1 |
| [Bone Wand](../items/bases/bone-wand.md) | 3-4 | 2-3 |
| [Grim Wand](../items/bases/grim-wand.md) | 1-3 | 1-2 |
| [Grand Scepter](../items/bases/grand-scepter.md) | 1-2 | 1-1 |
| [War Scepter](../items/bases/war-scepter.md) | 1-2 | 1-2 |
| [Crystal Sword](../items/bases/crystal-sword.md) |  | 1-1 |
| [Kris](../items/bases/kris.md) |  | 3-5 |
| [Blade](../items/bases/blade.md) | 5-5 | 5-5 |
| [Javelin](../items/bases/javelin.md) | 1-1 |  |
| [Pilum](../items/bases/pilum.md) | 1-1 |  |
| [Short Spear](../items/bases/short-spear.md) | 1-1 |  |
| [Glaive](../items/bases/glaive.md) | 1-1 |  |
| [Throwing Spear](../items/bases/throwing-spear.md) | 1-1 |  |
| [Battle Staff](../items/bases/battle-staff.md) | 2-3 | 1-3 |
| [War Staff](../items/bases/war-staff.md) | 1-2 | 1-2 |
| [Short War Bow](../items/bases/short-war-bow.md) | 1-1 | 1-1 |
| [Long War Bow](../items/bases/long-war-bow.md) | 1-1 | 1-1 |
| [Heavy Crossbow](../items/bases/heavy-crossbow.md) | 1-1 | 1-1 |
| [Repeating Crossbow](../items/bases/repeating-crossbow.md) |  | 1-1 |
| [Blade Talons](../items/bases/blade-talons.md) | 0-1 |  |
| [Scissors Katar](../items/bases/scissors-katar.md) | 1-1 | 1-1 |
| Stamina Potion | 2-3 |  |
| Antidote Potion | 3-5 |  |
| Thawing Potion | 2-4 |  |
| Tome of Town Portal | 1-2 |  |
| Tome of Identify | 1-2 |  |
| Scroll of Town Portal | 5-7 |  |
| Scroll of Identify | 5-7 |  |
| Key | 1-2 | 1-2 |
| Minor Healing Potion | 1-1 |  |
| Light Healing Potion | 1-1 |  |
| Healing Potion | 1-1 |  |
| Greater Healing Potion | 1-1 |  |
| Minor Mana Potion | 1-1 |  |
| Light Mana Potion | 1-1 |  |
| Mana Potion | 1-1 |  |
| Greater Mana Potion | 1-1 |  |

## Larzuk

Act 5. Blacksmith: weapons and armor, repairs.

| Item | Plain | Magic |
| --- | ---: | ---: |
| [Great Helm](../items/bases/great-helm.md) | 0-1 | 1-1 |
| [Crown](../items/bases/crown.md) | 0-1 | 1-1 |
| [Splint Mail](../items/bases/splint-mail.md) |  | 1-1 |
| [Plate Mail](../items/bases/plate-mail.md) |  | 1-1 |
| [Field Plate](../items/bases/field-plate.md) |  | 1-2 |
| [Gothic Plate](../items/bases/gothic-plate.md) | 1-1 | 1-2 |
| [Full Plate Mail](../items/bases/full-plate-mail.md) | 1-1 | 1-2 |
| [Ancient Armor](../items/bases/ancient-armor.md) | 1-1 | 1-2 |
| [Light Plate](../items/bases/light-plate.md) |  | 1-2 |
| [Tower Shield](../items/bases/tower-shield.md) | 1-1 | 1-2 |
| [Gothic Shield](../items/bases/gothic-shield.md) |  | 1-2 |
| [Light Gauntlets](../items/bases/light-gauntlets.md) |  | 1-1 |
| [Gauntlets](../items/bases/gauntlets.md) | 1-1 | 1-1 |
| [Light Plated Boots](../items/bases/light-plated-boots.md) |  | 1-1 |
| [Greaves](../items/bases/greaves.md) | 1-1 | 1-1 |
| [Plated Belt](../items/bases/plated-belt.md) | 1-1 | 1-2 |
| [War Axe](../items/bases/war-axe.md) | 1-1 | 1-1 |
| [Giant Axe](../items/bases/giant-axe.md) | 1-1 | 1-1 |
| [Great Maul](../items/bases/great-maul.md) |  | 1-1 |
| [Crystal Sword](../items/bases/crystal-sword.md) |  | 1-1 |
| [War Sword](../items/bases/war-sword.md) | 1-1 | 1-3 |
| [Bastard Sword](../items/bases/bastard-sword.md) | 0-1 | 1-1 |
| [Flamberge](../items/bases/flamberge.md) | 0-1 | 1-2 |
| [Great Sword](../items/bases/great-sword.md) | 0-1 | 1-2 |
| [Pike](../items/bases/pike.md) | 1-1 | 1-2 |
| [Halberd](../items/bases/halberd.md) | 1-1 | 1-1 |
| [War Scythe](../items/bases/war-scythe.md) |  | 1-1 |
| [Short War Bow](../items/bases/short-war-bow.md) | 1-1 | 1-2 |
| [Long War Bow](../items/bases/long-war-bow.md) | 1-1 | 1-2 |
| [Heavy Crossbow](../items/bases/heavy-crossbow.md) | 0-1 | 1-1 |
| [Repeating Crossbow](../items/bases/repeating-crossbow.md) | 0-1 | 1-2 |
| [Scissors Katar](../items/bases/scissors-katar.md) | 1-1 | 1-1 |
| Arrows | 3-4 |  |
| Bolts | 3-4 |  |

## Malah

Act 5. Potions, scrolls, staves and wands.

| Item | Plain | Magic |
| --- | ---: | ---: |
| [Bone Wand](../items/bases/bone-wand.md) | 3-4 | 2-3 |
| [Grim Wand](../items/bases/grim-wand.md) | 1-3 | 1-2 |
| [Grand Scepter](../items/bases/grand-scepter.md) | 2-3 | 1-2 |
| [War Scepter](../items/bases/war-scepter.md) | 1-2 | 1-1 |
| [War Sword](../items/bases/war-sword.md) |  | 1-2 |
| [Kris](../items/bases/kris.md) |  | 3-5 |
| [Blade](../items/bases/blade.md) | 5-5 | 5-5 |
| [Throwing Knife](../items/bases/throwing-knife.md) |  | 1-1 |
| [Throwing Axe](../items/bases/throwing-axe.md) |  | 1-1 |
| [Balanced Knife](../items/bases/balanced-knife.md) |  | 1-1 |
| [Balanced Axe](../items/bases/balanced-axe.md) | 1-1 | 1-1 |
| [Javelin](../items/bases/javelin.md) | 1-1 | 1-1 |
| [Pilum](../items/bases/pilum.md) | 1-1 | 1-1 |
| [Short Spear](../items/bases/short-spear.md) | 1-1 | 1-1 |
| [Glaive](../items/bases/glaive.md) | 1-1 | 1-1 |
| [Throwing Spear](../items/bases/throwing-spear.md) | 1-1 | 1-1 |
| [Battle Staff](../items/bases/battle-staff.md) | 2-3 | 1-4 |
| [War Staff](../items/bases/war-staff.md) | 1-3 | 1-4 |
| Stamina Potion | 2-3 |  |
| Antidote Potion | 3-5 |  |
| Thawing Potion | 2-4 |  |
| Tome of Town Portal | 1-2 |  |
| Tome of Identify | 1-2 |  |
| Scroll of Town Portal | 5-7 |  |
| Scroll of Identify | 5-7 |  |
| Key | 1-1 |  |
| Minor Healing Potion | 1-1 |  |
| Light Healing Potion | 1-1 |  |
| Healing Potion | 1-1 |  |
| Greater Healing Potion | 1-1 |  |
| Minor Mana Potion | 1-1 |  |
| Light Mana Potion | 1-1 |  |
| Mana Potion | 1-1 |  |
| Greater Mana Potion | 1-1 |  |

## Anya

Act 5. Gambling, weapons and armor.

| Item | Plain | Magic |
| --- | ---: | ---: |
| [Ancient Armor](../items/bases/ancient-armor.md) | 0-1 | 1-2 |
| [Light Plate](../items/bases/light-plate.md) | 0-1 | 1-1 |
| [Gothic Shield](../items/bases/gothic-shield.md) |  | 1-1 |
| [Light Gauntlets](../items/bases/light-gauntlets.md) | 1-1 |  |
| [Gauntlets](../items/bases/gauntlets.md) | 1-1 | 1-1 |
| [Light Plated Boots](../items/bases/light-plated-boots.md) | 1-1 |  |
| [Greaves](../items/bases/greaves.md) | 1-1 | 1-1 |
| [Heavy Belt](../items/bases/heavy-belt.md) | 1-1 |  |
| [Plated Belt](../items/bases/plated-belt.md) | 1-1 |  |
| [Bone Helm](../items/bases/bone-helm.md) | 0-1 | 0-1 |
| [Bone Shield](../items/bases/bone-shield.md) | 0-1 | 0-1 |
| [Spiked Shield](../items/bases/spiked-shield.md) | 0-1 | 0-1 |
| [Javelin](../items/bases/javelin.md) |  | 1-1 |
| [Pilum](../items/bases/pilum.md) |  | 1-1 |
| [Short Spear](../items/bases/short-spear.md) |  | 1-1 |
| [Glaive](../items/bases/glaive.md) |  | 1-1 |
| [Throwing Spear](../items/bases/throwing-spear.md) |  | 1-1 |
| [Blade Talons](../items/bases/blade-talons.md) | 1-1 | 1-1 |
| [Scissors Katar](../items/bases/scissors-katar.md) |  | 1-1 |
| Arrows | 3-4 |  |
| Bolts | 3-4 |  |

## Sources

- Tables: `npc.txt`, the vendor columns (`CharsiMin`, `CharsiMagicMax`...) of `armor.txt`, `weapons.txt` and `misc.txt`, and `gamble.txt`.
- Who does what in town: the game; quest discount: [Arreat Summit, Quest Rewards](http://classic.battle.net/diablo2exp/quests/rewards.shtml).

<!-- NOTES: hand-written text below this line is kept when pages are regenerated -->
