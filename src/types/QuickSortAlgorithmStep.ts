import { QuickSortAlgorithmManager } from "./AnimationManager";
import { ArrayAlgorithmStep } from "./AlgorithmStep";
import cellStyles from "../components/ArrayCell/ArrayCell.module.css";
import { resolve } from "path";

export class QuickSortAlgorithmStep {
  async run(
    algManager: QuickSortAlgorithmManager,
    i: number,
    j: number
  ): Promise<any> {
    //throw new Error("Method not implemented.");
  }
  constructor() {
    //super();
  }
}

/**
 * given an element's current loc,
 * calculate where it needs to go
 * for styles.
 *
 */
async function swapCells(startLoc: number, endLoc: number): Promise<any> {
  const queryPart = `${` '${startLoc}'`}` + "]";
  const queryPartI = `${` '${endLoc}'`}` + "]";
  const iCell = document.querySelector(
    "[data-index=" + queryPart
  ) as HTMLElement;
  const jCell = document.querySelector(
    "[data-index=" + queryPartI
  ) as HTMLElement;
  /* const iCell = document.querySelector(
    '[data-index=${`${startLoc}`}]'
  ) as HTMLElement; */
  const moveDist = endLoc - startLoc;
  const moveDistJ = startLoc - endLoc;
  let iCellEnd = new Promise(function (resolve) {
    iCell.addEventListener("animationend", (event) => {
      console.log("I Ended!");
      resolve("i");
    });
  });
  let jCellEnd = new Promise(function (resolve) {
    jCell.addEventListener("animationend", (event) => {
      console.log("J Ended Too!");
      resolve(11);
    });
  });
  //check where error with arrays occurs
  let timer = new Promise(function (resolve) {
    setTimeout(() => {
      resolve(true);
    }, 6500);
  });

  /* 
Two options:
1: Change the array after the animation ends, and then toggle the classlist, so that the cells revert
just as they shift back. Need to unset all the css properties.
2: Don't toggle the classlist, just keep updating the values.
I think I'll go for number two. But I'll have to figure out how to get animation to repeat.
Thinking of creating another css class to save the position, applying it on animation end, then untoggling
the animation class. That means I'll have to untoggle the placeholder class at the start of the swap.
Or do I use !important instead?  */

  let bla = Promise.all([iCellEnd, jCellEnd]).then(() => {
    console.log("We're both done!");
    iCell.classList.add(cellStyles.placeholder);
    jCell.classList.add(cellStyles.placeholder);
    iCell.classList.toggle(cellStyles.cellBounceUp);
    jCell.classList.toggle(cellStyles.cellBounceDown);
    /*     iCell.replaceWith(iCell.cloneNode(true));
    jCell.replaceWith(jCell.cloneNode(true)); */

    //both are ready
  });

  //const currLoc = window.getComputedStyle(iCell,"--xEnd");

  const currLoc = iCell.style.getPropertyValue("--xEnd");
  const currLocJ = jCell.style.getPropertyValue("--xEnd");
  //If uninitialized, currLoc is empty string, hence ternary
  const currLocNum = currLoc === "" ? 0 : parseInt(currLoc.replace("%", ""));
  const currLocNumJ = currLocJ === "" ? 0 : parseInt(currLocJ.replace("%", ""));
  iCell.style.setProperty("--xStart", `${currLocNum}%`);
  //Remove percent, get num from currLoc
  iCell.style.setProperty("--xHalf", `${currLocNum + moveDist * 50}%`);
  iCell.style.setProperty("--xEnd", `${currLocNum + moveDist * 100}%`);
  iCell.style.setProperty("--yStart", "0");
  iCell.style.setProperty("--yHalf", "120%");
  iCell.style.setProperty("--yEnd", "0");
  iCell.dataset.index = `${endLoc}`;
  jCell.style.setProperty("--xStart", `${currLocNumJ}%`);
  //Remove percent, get num from currLoc
  jCell.style.setProperty("--xHalf", `${currLocNumJ + moveDistJ * 50}%`);
  jCell.style.setProperty("--xEnd", `${currLocNumJ + moveDistJ * 100}%`);
  jCell.style.setProperty("--yStart", "0");
  jCell.style.setProperty("--yHalf", "120%");
  jCell.style.setProperty("--yEnd", "0");
  jCell.dataset.index = `${startLoc}`;
  iCell.classList.toggle(cellStyles.cellBounceUp);
  jCell.classList.toggle(cellStyles.cellBounceDown);
  await bla;
  console.log("Bla Done!");

  return;
}

export class QuickSortSwapStep extends QuickSortAlgorithmStep {
  async run(
    algManager: QuickSortAlgorithmManager,
    i: number,
    j: number
  ): Promise<any> {
    await swapCells(i, j);
    await swapCells(i, 16);
    const temp = algManager.aryData[i];
    algManager.aryData[i] = algManager.aryData[j];
    algManager.aryData[j] = temp;
    console.log("Step Done!");
    /*     const tempVis = algManager.aryVisualElements[i];
    algManager.aryVisualElements[i] = algManager.aryVisualElements[j];
    algManager.aryVisualElements[j] = tempVis; */
    return;
    //findNewCellLoc(31, 0);
    /*     const cellToMove = document.getElementById(`arrayCellNum${0}`);
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
          otherCellToMove.dataset.index = firstIndex;
 */
  }
  constructor() {
    super();
  }
}
export class QuickSortPartitionStep extends QuickSortAlgorithmStep {
  async run(
    algManager: QuickSortAlgorithmManager,
    i: number,
    j: number
  ): Promise<any> {
    //throw new Error("Method not implemented.");
  }
  constructor() {
    super();
  }
}
export class QuickSortFirstStep extends QuickSortAlgorithmStep {
  async run(
    algManager: QuickSortAlgorithmManager,
    i: number,
    j: number
  ): Promise<any> {
    //throw new Error("Method not implemented.");
  }
  constructor() {
    super();
  }
}
