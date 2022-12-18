import { useState, useEffect, FunctionComponent } from "react";
import { JOB } from "./node-finder-types";
import {
  bisBoostNodes as dataBisBoostNodes,
  sampleNodes,
} from "../../data/node-data";

export const NodeFinder: FunctionComponent = () => {
  const [nodesCollection, setNodesCollection] = useState(sampleNodes);
  const [job, setJob] = useState(JOB.FP as string);
  const [bisBoostNodes, setBISBoostNodes] = useState(dataBisBoostNodes[job]);
  const [findResults, setFindResults] = useState(null as number[] | null);
  const formatTriNode = (
    nodeIDs: Array<number>
  ): { [key: number]: Array<string> } => {
    let arr: { [key: number]: Array<string> } = {};

    for (let nodeID of nodeIDs) {
      nodesCollection[job][nodeID].forEach((skillID) => {
        if (typeof arr[nodeID + 1] === "undefined") arr[nodeID + 1] = [];
        arr[nodeID + 1].push(bisBoostNodes[skillID]);
      });
    }
    return arr;
  };
  const find = () => {
    let initialNode: { [key: string]: boolean } = {};
    for (let bisSkillNames of bisBoostNodes) {
      initialNode[bisSkillNames] = false;
    }
    const itrMaxCount =
      Object.keys(initialNode).length / 3 +
      (Object.keys(initialNode).length % 3 !== 0 ? 1 : 0);
    let itrState: number[] | boolean = []; // K: 0,1,2 for 3 tri nodes / 0,1 for 2 tri nodes / 1 for 1 tri node. V: node# from nodes jsonc file
    for (let i = 0; i < itrMaxCount; i++) {
      itrState[i] = i;
    }
    const isPerfectCombo = (combination: number[]): boolean => {
      // combination is itrState from outside this function
      let checkNode = { ...initialNode };
      for (const nodeID of combination) {
        nodesCollection[job][nodeID].forEach((skillNum) => {
          checkNode[bisBoostNodes[skillNum]] = true;
        });
      }
      for (const b of Object.values(checkNode)) {
        if (b === false) return false;
      }
      return true;
    };

    const incrementItrState = (
      itrState: number[] | boolean
    ): number[] | boolean => {
      if (typeof itrState === "boolean" || itrState.length === 0) return false;
      let newState: number[] | boolean = itrState;
      let lastCurrentNodeID = itrState[itrState.length - 1];
      lastCurrentNodeID++;
      let begState = JSON.parse(JSON.stringify(newState));
      begState.splice(newState.length - 1, 1);
      while (begState.includes(lastCurrentNodeID)) lastCurrentNodeID++;

      if (lastCurrentNodeID >= nodesCollection[job].length) {
        // itrate inner
        newState.splice(newState.length - 1, 1);
        newState = incrementItrState(newState);
        if (newState === false) {
          // console.log("iterate inner no more return", newState)
          return newState;
        }
        let i = 0;
        while ((newState as number[]).includes(i)) i++;
        if (i >= nodesCollection[job].length) return false;
        (newState as number[]).push(i);
        return newState;
      } else {
        newState.splice(newState.length - 1, 1, lastCurrentNodeID);
        return newState;
      }
    };

    while ((itrState = incrementItrState(itrState))) {
      if (isPerfectCombo(itrState as number[])) {
        // bool value is always false, and is out of loop. So otherwise its number[]
        setFindResults(itrState as number[]);
        return;
      }
    }
    setFindResults([]);
  };
  useEffect(() => {
    setBISBoostNodes(dataBisBoostNodes[job]);
  }, [job]);
  useEffect(() => {
    // component "on load"
    // load localstorage
    let strNodesCollection: string | null;
    if ((strNodesCollection = localStorage.getItem("nodesCollection"))) {
      setNodesCollection(JSON.parse(strNodesCollection));
    }
  }, []);

  return (
    <div>
      {/* JOB SELECTION */}
      <h2>Select your job:</h2>
      <select
        title="job_select"
        onChange={(e) => {
          setFindResults(null);

          if (typeof nodesCollection[e.target.value] === "undefined") {
            let newNodesCollection = { ...nodesCollection };
            newNodesCollection[job] = [];
            setNodesCollection(newNodesCollection);
          }

          setJob(e.target.value);
        }}
        value={job}
      >
        {(Object.keys(JOB) as (keyof typeof JOB)[]).map((v, i) => (
          <option key={i} value={JOB[v]}>
            {JOB[v]}
          </option>
        ))}
      </select>
      <br />

      {/* NODES COLLECTION SELECTION */}

      <h3>Select your nodes:</h3>
      <table>
        <tbody>
          {
            /* map each node */ nodesCollection[job].map((node, nodeID) => (
              <tr key={nodeID}>
                <td>{nodeID + 1}:</td>
                {
                  /* map each skill from node */ node.map(
                    (skillID, skillIndex, currentNode) => (
                      <td key={nodeID + "_" + skillIndex}>
                        <select
                          title={"select_" + nodeID + "_" + skillIndex}
                          value={skillID}
                          onChange={(e) => {
                            console.log(nodeID, skillIndex, e.target.value);
                          }}
                        >
                          {
                            /* map each name from skill */ bisBoostNodes.map(
                              (bisSkillName, bisSkillID) => {
                                if (
                                  currentNode.includes(bisSkillID) &&
                                  skillID !== bisSkillID
                                )
                                  return null;
                                return (
                                  <option
                                    key={
                                      nodeID +
                                      "_" +
                                      skillIndex +
                                      "_" +
                                      bisSkillID
                                    }
                                    value={bisSkillID}
                                  >
                                    {bisSkillName}
                                  </option>
                                );
                              }
                            )
                          }
                        </select>
                      </td>
                    )
                  )
                }
                {node.length < 3 &&
                  [0, 1, 2].map((v) => {
                    if (!(v >= node.length)) return null;
                    return (
                      <td key={"select_" + nodeID + "_new" + v}>
                        <select
                          title={"select_" + nodeID + "_new" + v}
                          defaultValue="-1"
                        >
                          <option key={nodeID + "_" + v + "_none"} value={-1}>
                            {" "}
                          </option>
                          {
                            /* map each name from skill */ bisBoostNodes.map(
                              (bisSkillName, bisSkillID) => {
                                if (node.includes(bisSkillID)) return null;
                                return (
                                  <option
                                    key={nodeID + "_" + v + "_" + bisSkillID}
                                    value={bisSkillID}
                                  >
                                    {bisSkillName}
                                  </option>
                                );
                              }
                            )
                          }
                        </select>
                      </td>
                    );
                  })}
                <td>
                  <button type="button">Remove #{nodeID + 1}</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <br />

      <button
        type="button"
        onClick={() => {
          console.log("click add node");
        }}
      >
        Add node
      </button>
      <button
        type="button"
        onClick={() => {
          console.log("click remove all nodes");
        }}
      >
        Remove all nodes
      </button>

      <br />
      <br />

      {/* FIND BUTTON AND RESULTS SELECTION */}
      <button
        type="button"
        onClick={() => {
          find();
        }}
      >
        find()
      </button>

      {findResults &&
        (findResults.length !== 0 ? (
          <div>
            <h3>Found compatible node:</h3>
            <pre>
              {JSON.stringify(formatTriNode(findResults), undefined, 4)}
            </pre>
          </div>
        ) : (
          <h3>No result.</h3>
        ))}
    </div>
  );
};
