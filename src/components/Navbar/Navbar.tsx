import React, { useEffect, useState } from "react";
import localStyles from "./Navbar.module.css";
import sharedStyles from "../../sharedStyles.module.css";
type Props = {};
export default function Navbar({}: Props) {
  return <nav className={localStyles.navDiv}> Navbar </nav>;
}
