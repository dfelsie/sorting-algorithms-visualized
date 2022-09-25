import React, { useEffect, useState } from "react";
import localStyles from "./ArrayCell.module.css";
import sharedStyles from "../../sharedStyles.module.css";
import joinClasses from "../../utils/joinClasses";
type Props = {
  num: number;
  index: number;
};

export default function ArrayCell({ num, index }: Props) {
  return (
    <div className={localStyles.arrayCellDiv} key={`arrayCellNum${index}`}>
      <div
        id={`arrayCellNum${num}`}
        data-index={`${index}`}
        className={joinClasses(
          localStyles.arrayCell
          // num === 0 ? localStyles.cellBounce : ""
        )}
      >
        {" "}
        {num}{" "}
      </div>
    </div>
  );
}
