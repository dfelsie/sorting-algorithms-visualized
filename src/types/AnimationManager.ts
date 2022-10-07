import {
  ARRAY_CELL_HEIGHT,
  HALF_ARRAY_CELL_HEIGHT,
  TWICE_ARRAY_CELL_HEIGHT,
} from "./../consts";
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
  play: boolean;

  constructor(aryData, setLabel) {
    this.play = true;
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

  async pause() {
    if (this.play) return;
    return await new Promise((resolve) =>
      document.getElementById("stepButton").addEventListener("click", resolve)
    );
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
    this.setLabel(`Swapping ${leftIndex} and ${rightIndex}`);

    await this.pause();
    await this.swapCells(leftIndex, rightIndex);
    const temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
  }
  async partition(items: number[], visAry: any[], left: number, right: number) {
    let pivot = items[Math.floor((right + left) / 2)]; //middle element
    let i = left; //left pointer
    let j = right; //right pointer
    this.setLabel(`Pivoting around ${i}`);
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

    await this.quickSort(items, hiddenAry, left, right);
    this.setLabel(`Sorted array from ${left} to ${right}`);
    return;
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
      this.setLabel(`Partitioning from ${left} to ${right}`);

      await this.pause();
      index = await this.partition(items, visAry, left, right); //index returned from partition
      if (left < index - 1) {
        //more elements on the left side of the pivot
        this.setLabel(`Going to do quicksort from ${left} to ${index - 1}`);
        await this.pause();
        await this.quickSort(items, visAry, left, index - 1);
        console.log("Promise done");

        //this.lock=new Promise();
      }
      if (index < right) {
        //more elements on the right side of the pivot

        this.setLabel(`Going to do quicksort from ${index} to ${right}`);
        await this.pause();
        await this.quickSort(items, visAry, index, right);
      }
    }
    return items;
  }

  async setCellStyle(
    cell: HTMLElement,
    locNum: number,
    moveDist: number,
    indexLoc: number,
    destLoc: number,
    bounceDown?: boolean
  ): Promise<void> {
    if (cell.classList.contains(cellStyles.placeholder))
      console.log(
        cell.dataset.index,
        " currLoc",
        moveDist,
        " new Move ",
        locNum
      );
    if (cell.classList.contains(cellStyles.placeholder)) {
      //Removing this promise prevents the animation triggering:
      //Further, the animation doesn't happen until the promise resolves
      //WHY?
      await new Promise((resolve) => setTimeout(resolve, 0.0001));

      cell.style.setProperty("--xStart", `${locNum}%`);
      cell.classList.remove(cellStyles.placeholder);
      cell.style.setProperty("--xEnd", `${moveDist * 100 + locNum}%`);
      cell.classList.add(
        bounceDown ? cellStyles.cellBounceDown : cellStyles.cellBounceUp
      );
      console.log("Just moved");
      cell.style.setProperty("--xPlaceholder", `${moveDist * 100 + locNum}%`);
    }
    //if not
    else {
      cell.style.setProperty("--xEnd", `${moveDist * 100}%`);
      cell.style.setProperty("--xPlaceholder", `${moveDist * 100}%`);
      cell.classList.add(
        bounceDown ? cellStyles.cellBounceDown : cellStyles.cellBounceUp
      );
    }
    cell.style.setProperty("--yStart", "0");
    cell.style.setProperty("--yHalf", TWICE_ARRAY_CELL_HEIGHT);
    cell.style.setProperty("--yEnd", "0");
    cell.setAttribute("data-index", `${destLoc}`);
  }

  async swapCells(startLoc: number, endLoc: number): Promise<any> {
    //this.setLabel(`Swapping ${startLoc} and ${endLoc}`);
    const queryPart = `${` '${startLoc}'`}` + "]";
    const queryPartI = `${` '${endLoc}'`}` + "]";
    const iCell = document.querySelector(
      "[data-index=" + queryPart
    ) as HTMLElement;
    const jCell = document.querySelector(
      "[data-index=" + queryPartI
    ) as HTMLElement;
    const iArrow = document.querySelector(
      "[data-arrowIndex=" + queryPart
    ) as HTMLElement;
    const jArrow = document.querySelector(
      "[data-arrowIndex=" + queryPart
    ) as HTMLElement;

    //Can show/hide arrows by removing/adding hide class
    //But looks bad
    //Consider changing cell color instead?

    const moveDist = endLoc - startLoc;
    const moveDistJ = startLoc - endLoc;
    let iCellEnd = new Promise(function (resolve) {
      iCell.addEventListener("animationend", (event) => {
        resolve("i");
      });
    });
    let jCellEnd = new Promise(function (resolve) {
      jCell.addEventListener("animationend", (event) => {
        resolve(11);
      });
    });
    let bla = Promise.all([iCellEnd, jCellEnd]).then(() => {
      iCell.classList.add(cellStyles.placeholder);
      jCell.classList.add(cellStyles.placeholder);

      //We could do some checking and remove the one that exists,
      //But why bother? Remove only removes existing classes.
      iCell.classList.remove(cellStyles.cellBounceUp);
      iCell.classList.remove(cellStyles.cellBounceDown);
      jCell.classList.remove(cellStyles.cellBounceUp);
      jCell.classList.remove(cellStyles.cellBounceDown);
    });
    const currLoc = iCell.style.getPropertyValue("--xEnd");
    const currLocJ = jCell.style.getPropertyValue("--xEnd");
    //If uninitialized, currLoc is empty string, hence ternary
    const currLocNum = currLoc === "" ? 0 : parseInt(currLoc.replace("%", ""));
    const currLocNumJ =
      currLocJ === "" ? 0 : parseInt(currLocJ.replace("%", ""));
    this.setCellStyle(iCell, currLocNum, moveDist, startLoc, endLoc);
    this.setCellStyle(jCell, currLocNumJ, moveDistJ, endLoc, startLoc, true);
    await bla;

    return;
  }
}
