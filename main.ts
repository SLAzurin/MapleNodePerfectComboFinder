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
const job = process.env.JOB || "";

if (job === "") process.exit(1);

// Functions
const formatTriNode = (triNode: Array<number>): Array<string> => {
  let arr: Array<string> = [];
  for (let skillNum of triNode) {
    arr.push(bisBoostNodes[job][skillNum]);
  }
  return arr;
};

// Logic

const nodes = nodesCollection[job];

for (let i = 0; i < nodes.length; i++) {
  let initialNode: any = {};
  for (let bisSkillNames of bisBoostNodes[job]) {
    initialNode[bisSkillNames] = false;
  }

  nodes[i].forEach((skill) => {
    initialNode[bisBoostNodes[job][skill]] = true;
  });

  for (let j = 0; j < nodes.length; j++) {
    if (j == i) continue;
    let nodeMatchAttempt: any = { ...initialNode };
    let toContinue = false;
    for (let k = 0; k < nodes[j].length; k++) {
      let skill = bisBoostNodes[job][nodes[j][k]];
      if (nodeMatchAttempt[skill] == true) {
        toContinue = true;
        break;
      }
      nodeMatchAttempt[skill] = true;
    }
    if (toContinue) continue;
    console.log(
      "Found perfect combo",
      i + 1,
      formatTriNode(nodes[i]),
      j + 1,
      formatTriNode(nodes[j])
    );
  }
}
