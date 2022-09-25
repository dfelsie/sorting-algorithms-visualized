import React, { useEffect, useState } from "react";
import localStyles from "./ButtonGroup.module.css";
import sharedStyles from "../../sharedStyles.module.css";
import cellStyles from "../ArrayCell/ArrayCell.module.css";
import { QuickSortAlgorithmManager } from "../../types/AnimationManager";
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
      <button>One Step</button>
      <button>Play</button>
      <button
        disabled={isAnimating}
        onClick={async () => {
          setIsAnimating(true);
          await algManager.step.run(algManager, 0, 31);
          setIsAnimating(false);
          //algManager.step.run(algManager.aryData, 0, 31);
          /*           const cellToMove = document.getElementById(`arrayCellNum${0}`);
          cellToMove.style.setProperty("--xStart", "0");
          cellToMove.style.setProperty("--yStart", "0");
          cellToMove.style.setProperty(
            "--xHalf",
            `${(numCellsToMove * 100) / 2}%`
          );
          cellToMove.style.setProperty("--yHalf", "120%");
          cellToMove.style.setProperty("--xEnd", `${numCellsToMove * 100}%`);
          cellToMove.style.setProperty("--yEnd", "0");

          const otherCellToMove = document.getElementById(
            `arrayCellNum${arySize - 1}`
          );
          otherCellToMove.style.setProperty("--xStart", "0");
          otherCellToMove.style.setProperty("--yStart", "0");
          otherCellToMove.style.setProperty(
            "--xHalf",
            `${(-numCellsToMove * 100) / 2}%`
          );
          otherCellToMove.style.setProperty("--yHalf", "120%");
          otherCellToMove.style.setProperty(
            "--xEnd",
            `${-numCellsToMove * 100}%`
          );
          otherCellToMove.style.setProperty("--yEnd", "0");
          cellToMove.classList.toggle(cellStyles.cellBounceUp);
          otherCellToMove.classList.toggle(cellStyles.cellBounceDown);
          const firstIndex = cellToMove.dataset.index;
          const secondIndex = otherCellToMove.dataset.index;
          cellToMove.dataset.index = secondIndex;
          otherCellToMove.dataset.index = firstIndex; */

          /*           cellToMove.style.setProperty("--xStart", "0");
          cellToMove.style.setProperty("--yStart", "0");
          cellToMove.style.setProperty("--xHalf", "50vw");
          cellToMove.style.setProperty("--yHalf", "10vh");
          cellToMove.style.setProperty("--xEnd", "100vw");
          cellToMove.style.setProperty("--yEnd", "20vh"); */
          /* if(cellToMove.classList.contains("arrayCellBounce")){
            cellToMove.classList.
        } */
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
