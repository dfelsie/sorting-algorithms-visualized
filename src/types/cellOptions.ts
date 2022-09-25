export class CellOptions {
  borderOpts?: BorderOptions;
  constructor(parameters) {}
}

class BorderOptions {
  topBorderColor?: string;
  bottomBorderColor?: string;
  leftBorderColor?: string;
  rightBorderColor?: string;
  constructor(
    topBorderColor,
    bottomBorderColor,
    leftBorderColor,
    rightBorderColor
  ) {
    topBorderColor = topBorderColor;
    bottomBorderColor = bottomBorderColor;
    rightBorderColor = rightBorderColor;
    leftBorderColor = leftBorderColor;
  }
}
