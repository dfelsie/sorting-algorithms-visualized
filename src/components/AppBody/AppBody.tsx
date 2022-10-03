import React, { useState } from "react";
import { QuickSortAlgorithmManager } from "../../types/AnimationManager";
import { QuickSortSwapStep } from "../../types/QuickSortAlgorithmStep";
import ButtonGroup from "../ButtonGroup/ButtonGroup";
import ArrayComponent from "../Array/Array";
import dynamic from "next/dynamic";
import localStyles from "./AppBody.module.css";
import { halfSampleAry, ranAry } from "../../consts";
type Props = {};

const arySize = 32;
const ary = [];
for (let i = 0; i < arySize; i++) {
  ary.push(Math.floor(Math.random() * 40));
}
//const ary = Array.from({ length: 40 }, () => Math.floor(Math.random() * 40));
const textAry: any[] = Array.from({ length: arySize }, () => "");
function AppBody({}: Props) {
  const [Label, setLabel] = useState("");
  const algManager = new QuickSortAlgorithmManager(ranAry, setLabel);
  //const algManager = new QuickSortAlgorithmManager(halfSampleAry, setLabel);

  return (
    <>
      <div
        style={{
          height: "50px",
        }}
      ></div>
      <div className={localStyles.bodyLabel}>{Label}</div>
      <ArrayComponent algManager={algManager} />
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
