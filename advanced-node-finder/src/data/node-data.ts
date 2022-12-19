import { BisBoostNodes, NodesCollection } from "../components/node-finder/node-finder-types";

// Check scardor's spreadsheet https://docs.google.com/spreadsheets/d/1io246lExk9ppw-od7ZtQfUcRBIyDo3ONtv3ufub76Xk/edit#gid=0
export const bisBoostNodes: BisBoostNodes =
{
    "Adele": [
        "Cleave",
        "Hunting Decree+Grave Proclamation",
        'Reign of Destruction+Plummet',
        'Aether Bloom+Blade Torrent',
        'Aether Forge+Noble Summons',
        'Magic Dispatch+Aetherial Arms',
    ],
    'Angelic Buster': [
        'Soul Seeker',
        'Trinity',
        'Celestial Roar',
        "Supernova",
        'Resonance',
        "Pink Pummel",
    ],
    'Aran': [
        "Beyond Blade",
        "Final Blow",
        'Final Attack',
        'Smash Swing',
        "Maha’s Domain",
        'Hunter’s Prey',
    ],
    "Arch Mage (Fire, Poison)": [
        "Flame Sweep", // 0
        "Mist Eruption", // 1
        "Flame Haze", // 2
        "Meteor Shower", // 3
        "Meggido Flame", // 4
        "Ifrit", // 5
        "Ignite", // 6
        "Teleport Mastery", // 7
        "Inferno Aura" // 8
    ],
    "Arch Mage (Ice, Lightning)": [
        "Beyond Blade",
        "Final Blow",
        "Final Attack",
        "Blizzard",
        "Elquines",
        "Frozen Orb"
    ],
    "Ark": [
        "Basic Charge Drive",
        "Ominous Nightmare",
        "Impending Death",
        "Abyssal Charge",
        'Gust Charge',
        'Creeping Terror',
        "Unstoppable Impulse",
        'Scarlet Charge',
    ],
    "Battle Mage": [
        "Finishing Blow",
        "Dark Shock",
        "Condemnation",
        "Dark Genesis",
        "Sweeping Staff",
        "Battle Burst (Recommended) OR Dark Chain"
    ],
    "Beast Tamer": [
        "Paw Swipe",
        "Lil’ Fort",
        "Fishy Slap",
        'Three-Point Pounce',
        "Paw Swipe+Leopard’s Roar",
        "Formation Attack+Baby Bombers",
        'Tornado Flight',
    ],
    "Bishop": [
        "Angel Ray",
        "Big Bang",
        'Bahamut',
        'Heal-Angelic Wrath',
        "Genesis-Triumph",
        "Heaven's Door - Fountain of Vengeance",
    ],
    "Blaster": [
        "Magnum Punch",
        "Double Blast",
        "Revolving Cannon",
        "Shotgun Punch",
        "Bunker Blaster Explosion",
        "Hammer Smash",
    ],
    // 'Blaze Wizard': [

    // ],
    // "Bowmaster": [

    // ],
    // "Buccaneer": [

    // ],
    // "Cadena": [

    // ],
    // "Cannoneer": [

    // ],
    // "Corsair": [

    // ],
    // "Dark Knight": [

    // ],
    // "Dawn Warrior": [

    // ],
    // "Demon Avenger": [

    // ],
    // "Demon Slayer": [

    // ],
    "Dual Blade": [
        "Phantom Blow",
        "Blade Fury",
        "Asura's Anger",
        "Sudden Raid",
        "Blade Clone",
        "Blade Ascension",
    ],
    // "Evan 1": [

    // ],
    // "Evan 2": [

    // ],
    // "Hayato": [

    // ],
    // "HoYoung": [

    // ],
    // "Illium": [

    // ],
    // "Jett": [

    // ],
    // Kain: [

    // ],
    // Kaiser: [

    // ],
    // Kanna: [

    // ],
    // Kinesis: [

    // ],
    // Lara: [

    // ],
    // Luminous: [

    // ],
    // Marksman: [

    // ],
    // Mechanic: [

    // ],
    // "Mercedes Early/Simple": [

    // ],
    // "Mercedes Late/Complex": [

    // ],
    // Mihile: [

    // ],
    // "Night Lord": [

    // ],
    // "Night Walker": [

    // ],
    // Paladin: [

    // ],
    // "Path Finder": [

    // ],
    // Phantom: [

    // ],
    // Shade: [

    // ],
    // Shadower: [

    // ],
    // "Thunder Breaker": [

    // ],
    // 'Wild Hunter': [

    // ],
    // 'Wind Archer': [

    // ],
    // Xenon: [

    // ],
    // Zero: [

    // ]
}

export const sampleNodes: NodesCollection = {
    "Dual Blade": [
        [1, 3, 5],
        [0, 1, 2],
        [5, 4, 1],
        [5, 2, 1],
        [4, 5, 1],
        [4, 3, 5],
        [1, 0, 4],
        [1, 5, 4],
        [1, 3, 2],
        [1, 5, 2],
        []
    ],
    "Arch Mage (Fire, Poison)": [
        [0, 4, 2],
        [0, 4, 3],
        [2, 4, 1],
        []
    ]
}