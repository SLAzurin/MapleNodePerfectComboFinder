const nodes: Array<Array<string>> = require("./nodes.json"); // Updated as of July 2nd 2022

for (let i = 0; i < nodes.length; i++) {
  let initialNode: any = {
    "blade ascension": false,
    "blade clone": false,
    "blade fury": false,
    "sudden raid": false,
    asura: false,
    phantom: false,
  };

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
