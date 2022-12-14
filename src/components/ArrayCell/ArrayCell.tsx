import React, { useEffect, useState } from "react";
import localStyles from "./ArrayCell.module.css";
import sharedStyles from "../../sharedStyles.module.css";
import joinClasses from "../../utils/joinClasses";
type Props = {
  num: number;
  index: number;
};

export default function ArrayCell({ num, index }: Props) {
  /* I wanted to have the arrow move with the cell,
  but can't get the css to work, so the change (moving data-index to arraycelldiv)
  will destroy it. */
  return (
    <div className={localStyles.arrayCellDiv} key={`arrayCellNum${index}`}>
      <div
        id={`arrowNum${index}`}
        className={joinClasses(localStyles.arrowDiv, localStyles.hide)}
        data-arrowIndex={`${index}`}
      >
        <div className={localStyles.arrowLabel}>Yurr</div>
        <div className={localStyles.arrowIcon}>&#8595;</div>
        {/*         <AiOutlineArrowDown className={localStyles.cellArrow} />
         */}{" "}
      </div>
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
      <div className={localStyles.cellLabel}></div>
    </div>
  );
}
