interface NodesCollection {
  [key: string]: Array<Array<string>>;
}
interface BisBoostNodes {
  [key: string]: Array<string>;
}
const nodesCollection: NodesCollection = require("./nodes.json");
const bisBoostNodes: BisBoostNodes = require("./bis_boost_nodes.json");

// Params Here:
const job = "db";

const nodes = nodesCollection[job];

for (let i = 0; i < nodes.length; i++) {
  let initialNode: any = {};
  for (let bisSkillNames of bisBoostNodes[job]) {
    initialNode[bisSkillNames] = false;
  }

  nodes[i].forEach((skill) => {
    initialNode[skill] = true;
  });

  for (let j = 0; j < nodes.length; j++) {
    if (j == i) continue;
    let nodeMatchAttempt: any = { ...initialNode };
    let toContinue = false;
    for (let k = 0; k < nodes[j].length; k++) {
      let skill = nodes[j][k];
      if (nodeMatchAttempt[skill] == true) {
        toContinue = true;
        break;
      }
      nodeMatchAttempt[skill] = true;
    }
    if (toContinue) continue;
    console.log("Found perfect combo", i + 1, nodes[i], j + 1, nodes[j]);
  }
}
