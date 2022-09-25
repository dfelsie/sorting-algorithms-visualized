import React from "react";
import { QuickSortAlgorithmManager } from "../../types/AnimationManager";
import { QuickSortSwapStep } from "../../types/QuickSortAlgorithmStep";
import ButtonGroup from "../ButtonGroup/ButtonGroup";
import Array from "../Array/Array";
import dynamic from "next/dynamic";
type Props = {};

const arySize = 32;
const ary = [];
for (let i = 0; i < arySize; i++) {
  ary.push(Math.floor(Math.random() * 40));
}
//const ary = Array.from({ length: 40 }, () => Math.floor(Math.random() * 40));
const algManager = new QuickSortAlgorithmManager(ary, new QuickSortSwapStep());
function AppBody({}: Props) {
  return (
    <>
      <Array algManager={algManager} />
      <div
        style={{
          height: "80px",
        }}
      ></div>
      <ButtonGroup algManager={algManager} />
    </>
  );
}
export default dynamic(() => Promise.resolve(AppBody), {
  ssr: false,
});
