import React, { useState, useEffect, FunctionComponent } from "react";
import { BisBoostNodes, JOB, NodesCollection } from "./node-finder-types";
import {
  bisBoostNodes as dataBisBoostNodes,
  sampleNodes,
} from "../../data/node-data";

export const NodeFinder: FunctionComponent<{}> = ({}) => {
  const [nodesCollection, setNodesCollection] = useState(sampleNodes);
  const [job, setJob] = useState(JOB.DB as string);
  const [bisBoostNodes, setBISBoostNodes] = useState(dataBisBoostNodes[JOB.DB]);
  const [findResults, setFindResults] = useState(null as number[] | null);
  const formatTriNode = (nodeIDs: Array<number>): Array<string> => {
    let arr: Array<string> = [];

    for (let nodeID of nodeIDs) {
      nodesCollection[job][nodeID].forEach((skillID) => {
        arr.push(bisBoostNodes[skillID]);
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
    // component "on load"
    // load localstorage
    let strNodesCollection: string | null;
    if ((strNodesCollection = localStorage.getItem("nodesCollection"))) {
      setNodesCollection(JSON.parse(strNodesCollection));
    }
    let strBisBoostNodes: string | null;
    if ((strBisBoostNodes = localStorage.getItem("bisBoostNodes"))) {
      setBISBoostNodes(JSON.parse(strBisBoostNodes));
    }
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          console.log("find()");
          find();
        }}
      >
        find()
      </button>
      {findResults &&
        (findResults.length !== 0 ? (
          <div>
            <h1>Found compatible node:</h1>
            {JSON.stringify(formatTriNode(findResults))}
          </div>
        ) : (
          <h3>No result.</h3>
        ))}
    </div>
  );
};
