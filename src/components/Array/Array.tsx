import React, { useEffect, useState } from "react";
import localStyles from "./Array.module.css";
import sharedStyles from "../../sharedStyles.module.css";
import ArrayCell from "../ArrayCell/ArrayCell";
import { QuickSortAlgorithmManager } from "../../types/AnimationManager";
type Props = {
  algManager: QuickSortAlgorithmManager;
};
export default function Array({ algManager }: Props) {
  return (
    <div className={localStyles.arrayDiv}>
      {algManager.aryVisualElements.map((val, i) => val)}
    </div>
  );
}
