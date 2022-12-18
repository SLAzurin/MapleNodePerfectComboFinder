import { jsonc } from "jsonc";

interface NodesCollection {
    [key: string]: Array<Array<number>>;
}
interface BisBoostNodes {
    [key: string]: Array<string>;
}

const nodesCollection: NodesCollection = jsonc.readSync("./nodes.jsonc");
const bisBoostNodes: BisBoostNodes = jsonc.readSync("./bis_boost_nodes.jsonc");

// Params Here:
const job = process.env.JOB || ""

if (job === "") process.exit(1)

// Functions
const formatTriNode = (triNode: Array<number>): Array<string> => {
    let arr: Array<string> = [];
    for (let skillNum of triNode) {
        arr.push(bisBoostNodes[job][skillNum])
    }
    return arr;
};

// Logic

const nodes = nodesCollection[job]

const main = () => {
    let initialNode: { [key: string]: boolean } = {};
    for (let bisSkillNames of bisBoostNodes[job]) {
        initialNode[bisSkillNames] = false;
    }
    const itrMaxCount = (Object.keys(initialNode).length / 3) + (Object.keys(initialNode).length % 3 !== 0 ? 1 : 0)
    let itrState: number[] | boolean = [] // K: 0,1,2 for 3 tri nodes / 0,1 for 2 tri nodes / 1 for 1 tri node. V: node# from nodes jsonc file
    for (let i = 0; i < itrMaxCount; i++) {
        itrState[i] = i;
    }
    const isPerfectCombo = (combination: number[]): boolean => { // combination is itrState from outside this function
        let checkNode = { ...initialNode }
        for (const nodeID of combination) {
            nodes[nodeID].forEach(skillNum => {
                checkNode[bisBoostNodes[job][skillNum]] = true;
            })
        }
        for (const b of Object.values(checkNode)) {
            if (b === false) return false
        }
        return true
    }

    const incrementItrState = (itrState: number[] | boolean): (number[] | boolean) => {
        if (typeof itrState === 'boolean' || itrState.length === 0) return false;
        let newState: number[] | boolean = itrState;
        let lastCurrentNodeID = itrState[itrState.length - 1]
        lastCurrentNodeID++
        let begState = JSON.parse(JSON.stringify(newState))
        begState.splice(newState.length - 1, 1)
        while (begState.includes(lastCurrentNodeID)) lastCurrentNodeID++;

        if (lastCurrentNodeID >= nodes.length) {
            // itrate inner
            newState.splice(newState.length - 1, 1)
            newState = incrementItrState(newState);
            if (newState === false) {
                // console.log("iterate inner no more return", newState)
                return newState;
            }
            let i = 0;
            while ((newState as number[]).includes(i)) i++;
            if (i >= nodes.length) return false;
            (newState as number[]).push(i)
            return newState;
        } else {
            newState.splice(newState.length - 1, 1, lastCurrentNodeID)
            return newState;
        }
    }

    while (itrState = incrementItrState(itrState)) {
        if (isPerfectCombo(itrState as number[])) { // bool value is always false, and is out of loop. So otherwise its number[]
            console.log(
                "Found perfect combo"
            );
            for (let i = 0; i < itrMaxCount; i++) {
                console.log((itrState as number[])[i] + 1, formatTriNode(nodes[(itrState as number[])[i]]))
            }
            break;
        }
    }
}

main()