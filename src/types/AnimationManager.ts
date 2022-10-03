import ArrayCell from "../components/ArrayCell/ArrayCell";
import { AlgorithmStep, ArrayAlgorithmStep } from "./AlgorithmStep";
import {
  QuickSortAlgorithmStep,
  QuickSortSwapStep,
} from "./QuickSortAlgorithmStep";
import cellStyles from "../components/ArrayCell/ArrayCell.module.css";

class AlgorithmManager {
  step: AlgorithmStep;
  data: any;
  constructor({ step, data }) {
    this.step = step;
    this.data = data;
  }
}
class ArrayAlgorithmManager {
  step?: AlgorithmStep;
  aryData: any;
  aryVisualElements: JSX.Element[];
  constructor(aryData, step?) {
    this.step = step;
    this.aryData = aryData;
  }
}
export class QuickSortAlgorithmManager {
  aryData: any[];
  aryVisualElements: JSX.Element[];
  sortSteps: any[];
  setLabel: (newLabel: string) => void;
  partitionNum: number;

  constructor(aryData, setLabel) {
    this.aryData = aryData;
    this.setLabel = setLabel;
    this.sortSteps = [];
    const ary = [];
    for (let i = 0; i < aryData.length; i++) {
      const newCell = ArrayCell({ num: aryData[i], index: i });
      ary.push(newCell);
      this.aryVisualElements = ary;
    }
  }
  async doPartitionStep(
    items: number[],
    visAry: any[],
    left: number,
    right: number
  ) {
    let pivot = items[Math.floor((right + left) / 2)], //middle element
      i = left, //left pointer
      j = right; //right pointer
    while (i <= j) {
      while (items[i] < pivot) {
        i++;
      }
      while (items[j] > pivot) {
        j--;
      }
      if (i <= j) {
        this.sortSteps.push(() => this.doSwapStep(items, visAry, left, right));

        //await this.swap(items, visAry, i, j); //swapping two elements
        i++;
        j--;
      }
    }
    this.partitionNum = i;
    return i;
  }
  async quickSortDriverStep(
    items: number[],
    left = 0,
    right = items.length - 1
  ) {
    const hiddenAry = [...items];
    /*     this.sortSteps.push(() =>
      this.doQuickSortStep(items, hiddenAry, left, right)
    ); */

    return await this.quickSort(items, hiddenAry, left, right);
  }
  async doSwapStep(
    items: number[],
    visAry: any[],
    leftIndex: number,
    rightIndex: number
  ) {
    await this.swapCells(leftIndex, rightIndex);
    const temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
  }

  async doQuickSortStep(
    items: number[],
    visAry: any[],
    left = 0,
    right = items.length - 1
  ) {
    let index;
    //Solve weird swaps
    if (items.length > 1) {
      //TODO: Figure this out
      //index = await this.partition(items, visAry, left, right); //index returned from partition
      this.sortSteps.push(() =>
        this.doPartitionStep(items, visAry, left, right)
      );
      index = this.partitionNum;

      if (left < index - 1) {
        //more elements on the left side of the pivot
        //await this.quickSort(items, visAry, left, index - 1);
        this.sortSteps.push(() =>
          this.doQuickSortStep(items, visAry, left, index - 1)
        );
      }
      if (index < right) {
        //more elements on the right side of the pivot
        //await this.quickSort(items, visAry, index, right);
        this.sortSteps.push(() =>
          this.doQuickSortStep(items, visAry, index, right)
        );
      }
    }
    return items;
  }
  async swap(
    items: number[],
    visAry: any[],
    leftIndex: number,
    rightIndex: number
  ) {
    await this.swapCells(leftIndex, rightIndex);
    const temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
  }
  async partition(items: number[], visAry: any[], left: number, right: number) {
    let pivot = items[Math.floor((right + left) / 2)], //middle element
      i = left, //left pointer
      j = right; //right pointer
    while (i <= j) {
      while (items[i] < pivot) {
        i++;
      }
      while (items[j] > pivot) {
        j--;
      }
      if (i <= j) {
        if (i !== j) {
          await this.swap(items, visAry, i, j); //swapping two elements
        }
        i++;
        j--;
      }
    }
    return i;
  }
  //TODO: This should be public, the rest private
  async quickSortDriver(items: number[], left = 0, right = items.length - 1) {
    const hiddenAry = [...items];
    return await this.quickSort(items, hiddenAry, left, right);
  }

  async quickSort(
    items: number[],
    visAry: any[],
    left = 0,
    right = items.length - 1
  ) {
    let index;
    //Solve weird swaps
    if (items.length > 1) {
      index = await this.partition(items, visAry, left, right); //index returned from partition
      if (left < index - 1) {
        //more elements on the left side of the pivot
        await this.quickSort(items, visAry, left, index - 1);
      }
      if (index < right) {
        //more elements on the right side of the pivot
        await this.quickSort(items, visAry, index, right);
      }
    }
    return items;
  }

  setCellStyle(
    cell: HTMLElement,
    locNum: number,
    moveDist: number,
    indexLoc: number,
    destLoc: number,
    showLog?: boolean
  ): void {
    //cell.style.setProperty("--xStart", `${locNum}%`);
    //Remove percent, get num from currLoc
    if (showLog) console.log(locNum, moveDist * 100, destLoc);
    //const currMovedDistNum= currMovedDist === "" ? 0:

    //cell.style.setProperty("--xHalf", `${locNum + moveDist * 50}%`);
    //cell.style.setProperty("--xEnd", `${locNum + moveDist * 100}%`);
    //cell.style.setProperty("--xEnd", `${moveDist * 100 - locNum}%`);
    cell.style.setProperty("--xEnd", `${moveDist * 100}%`);
    cell.style.setProperty("--yStart", "0");
    cell.style.setProperty("--yHalf", "120%");
    cell.style.setProperty("--yEnd", "0");
    cell.setAttribute("data-index", `${destLoc}`);
  }

  async swapCells(startLoc: number, endLoc: number): Promise<any> {
    this.setLabel(`Swapping ${startLoc} and ${endLoc}`);
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
    /* for (let i = 0; i < this.aryData.length; i++) {
      if (
        (document.querySelector(
          "[data-index=" + `${` '${i}'`}` + "]"
        ) as HTMLElement) === null
      ) {
        console.log(i, " IsNull");
      }
    } */
    let iCellEnd = new Promise(function (resolve) {
      iCell.addEventListener("animationend", (event) => {
        iCell.style.setProperty("--xStart", `${moveDist * 100}%`);
        resolve("i");
      });
    });
    let jCellEnd = new Promise(function (resolve) {
      //console.log("[data-index=" + queryPartI);
      jCell.addEventListener("animationend", (event) => {
        jCell.style.setProperty("--xStart", `${moveDistJ * 100}%`);
        resolve(11);
      });
    });

    //check where error with arrays occurs

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
    const currLocNumJ =
      currLocJ === "" ? 0 : parseInt(currLocJ.replace("%", ""));
    /*    iCell.style.setProperty("--xStart", `${currLocNum}%`);
    iCell.style.setProperty("--xHalf", `${currLocNum + moveDist * 50}%`);
    iCell.style.setProperty("--xEnd", `${currLocNum + moveDist * 100}%`);
    iCell.style.setProperty("--yStart", "0");
    iCell.style.setProperty("--yHalf", "120%");
    iCell.style.setProperty("--yEnd", "0");
    iCell.dataset.index = `${endLoc}`;
        jCell.style.setProperty("--xStart", `${currLocNumJ}%`);
    jCell.style.setProperty("--xHalf", `${currLocNumJ + moveDistJ * 50}%`);
    jCell.style.setProperty("--xEnd", `${currLocNumJ + moveDistJ * 100}%`);
    jCell.style.setProperty("--yStart", "0");
    jCell.style.setProperty("--yHalf", "120%");
    jCell.style.setProperty("--yEnd", "0");
    jCell.dataset.index = `${startLoc}`; */
    this.setCellStyle(iCell, currLocNum, moveDist, startLoc, endLoc);
    this.setCellStyle(jCell, currLocNumJ, moveDistJ, endLoc, startLoc, true);
    iCell.classList.toggle(cellStyles.cellBounceUp);
    jCell.classList.toggle(cellStyles.cellBounceDown);
    await bla;

    return;
  }
}

/* const ary = Array.from({ length: 40 }, () => Math.floor(Math.random() * 40));
const algManager = new QuickSortAlgorithmManager(ary, new QuickSortSwapStep());
export default algManager;
 */
