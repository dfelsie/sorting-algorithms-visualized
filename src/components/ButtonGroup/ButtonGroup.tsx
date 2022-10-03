import React, { useEffect, useState } from "react";
import localStyles from "./ButtonGroup.module.css";
import sharedStyles from "../../sharedStyles.module.css";
import cellStyles from "../ArrayCell/ArrayCell.module.css";
import { QuickSortAlgorithmManager } from "../../types/AnimationManager";
import quickSort from "../../utils/quicksort";
type Props = {
  algManager: QuickSortAlgorithmManager;
};
const arySize = 32;

const numCellsToMove = 31;

function calcMoveString(arySize: number, numCellsToMove: number): string {
  return `${(numCellsToMove / arySize) * 100}%`;
}

export default function ButtonGroup({ algManager }: Props) {
  const [currStep, setStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  return (
    <div className={localStyles.buttonGrpDiv}>
      <button
        onClick={async () => {
          console.log(algManager.sortSteps);
          if (algManager.sortSteps.length < 1) {
            return;
          }
          await algManager.sortSteps.pop()();
        }}
      >
        One Step
      </button>
      <button>Play</button>
      <button
        disabled={isAnimating}
        onClick={async () => {
          setIsAnimating(true);
          //await algManager.step.run(algManager, 0, 31);
          //await algManager.quickSortDriver(algManager.aryData);
          await algManager.quickSortDriver([...algManager.aryData]);
          //algManager.quickSortDriverStep([...algManager.aryData]);
          //console.log(algManager.sortSteps);
          setIsAnimating(false);
        }}
      >
        AniTest
      </button>
      <button
        onClick={() => {
          setStep(currStep + 1);
        }}
      >
        Anitest Step:{currStep}
      </button>
    </div>
  );
}
