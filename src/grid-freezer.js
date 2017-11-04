'use strict';
const {new2DArray, randomizeArray} = require('./util.js');

const freezeStrategies = [
  boundariesOnly,
  cornerOnly,
  evenCells,
  evenOddAlternative,
  leftAndRight,
  topAndBottom,
];

function cornerOnly(y, x, height, width) {
  ////////////////////
  //*              *//
  //                //
  //                //
  //                //
  //                //
  //                //
  //*              *//
  ////////////////////
  return (x === 0 && y === 0) ||
    (x === 0 && y === (height - 1)) ||
    (x === (width - 1) && y === 0) ||
    (x === (width - 1) && y === (height - 1));
}

function boundariesOnly(y, x, height, width) {
  ////////////////////
  //****************//
  //*              *//
  //*              *//
  //*              *//
  //*              *//
  //*              *//
  //****************//
  ////////////////////
  return x === 0 || y === 0 || x === (width - 1) || y === (height - 1);
}

function topAndBottom(y, x, height, width) {
  ////////////////////
  //****************//
  //                //
  //                //
  //                //
  //                //
  //                //
  //****************//
  ////////////////////
  return y === 0 || y === (height -1);
}

function leftAndRight(y, x, height, width) {
  ////////////////////
  //*              *//
  //*              *//
  //*              *//
  //*              *//
  //*              *//
  //*              *//
  //*              *//
  ////////////////////
  return x === 0 || x === (width - 1);
}

function evenCells(y, x, height, width) {
  ///////////////////
  //* * * * * * * *//
  //               //
  //* * * * * * * *//
  //               //
  //* * * * * * * *//
  //               //
  //* * * * * * * *//
  ///////////////////
  return (x % 2) == 0 && (y % 2) == 0;
}

function evenOddAlternative(y, x, height, width) {
  ///////////////////
  //* * * * * * * *//
  // * * * * * * * //
  //* * * * * * * *//
  // * * * * * * * //
  //* * * * * * * *//
  // * * * * * * * //
  //* * * * * * * *//
  ///////////////////
  return (x % 2) == (y % 2);
}

function freeze(grid) {
  const height = grid.length;
  const width = grid[0].length;
  const strategy = randomizeArray(freezeStrategies)[0];
  const frozen = new2DArray(height, width);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (strategy(y, x, height, width)) {
        frozen[y][x] = grid[y][x];
      }
    }
  }
  return frozen;
}

module.exports = {
  freeze,
};
