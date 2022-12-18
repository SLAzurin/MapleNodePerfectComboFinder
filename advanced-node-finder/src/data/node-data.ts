import { BisBoostNodes, NodesCollection, JOB } from "../components/node-finder/node-finder-types";

// Check scardor's spreadsheet https://docs.google.com/spreadsheets/d/1io246lExk9ppw-od7ZtQfUcRBIyDo3ONtv3ufub76Xk/edit#gid=0
export const bisBoostNodes: BisBoostNodes =
{
    "Blade Master": [
        "Blade Ascension",
        "Blade Clone",
        "Blade Fury",
        "Sudden Raid",
        "Asura's Anger",
        "Phantom Blow"
    ],
    "Arch Mage (Fire, Poison)": [
        "Flame Sweep", // 0
        "Mist Eruption", // 1
        "Flame Haze", // 2
        "Meteor Shower", // 3
        "Meggido Flame", // 4
        "Ifrit", // 5
        "Ignite", // 6
        "Yeleport Mastery", // 7
        "inferno aura" // 8
    ]
}

export const sampleNodes: NodesCollection = {
    "Blade Master": [
        [1,3,5],
        [0,1,2],
        [5,4,1],
        [5,2,1],
        [4,5,1],
        [4,3,5],
        [1,0,4],
        [1,5,4],
        [1,3,2],
        [1,5,2]
    ],
    "Arch Mage (Fire, Poison)": [
        [0,4,2],
        [0,4,3],
        [2,4,1],
        []
    ]
}