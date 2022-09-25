import ArrayCell from "../components/ArrayCell/ArrayCell";
import { AlgorithmStep, ArrayAlgorithmStep } from "./AlgorithmStep";
import {
  QuickSortAlgorithmStep,
  QuickSortSwapStep,
} from "./QuickSortAlgorithmStep";
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
  constructor(aryData, step?) {
    this.step = step;
    this.aryData = aryData;
  }
}
export class QuickSortAlgorithmManager {
  step?: QuickSortAlgorithmStep;
  aryData: any;
  aryVisualElements: JSX.Element[];
  constructor(aryData, step?) {
    this.step = step;
    this.aryData = aryData;
    const ary = [];
    for (let i = 0; i < aryData.length; i++) {
      const newCell = ArrayCell({ num: aryData[i], index: i });
      ary.push(newCell);
      this.aryVisualElements = ary;
    }
  }
}

/* const ary = Array.from({ length: 40 }, () => Math.floor(Math.random() * 40));
const algManager = new QuickSortAlgorithmManager(ary, new QuickSortSwapStep());
export default algManager;
 */
