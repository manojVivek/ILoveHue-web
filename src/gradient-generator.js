'use strict';

const chroma = require('chroma-js');
const {new2DArray, randomizeArray} = require('./util.js');

const colors = ['pink','purple', 'red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'brown', /*'white',*/ 'gray'];

function generateGradient(from, to, steps) {
  return  chroma.scale([from, to]).mode('lab').colors(steps);
}

function initializeGrid(height, width) {
  const selectedColors = randomizeArray(colors).slice(0,4);
  const topRow = generateGradient(selectedColors[0], selectedColors[1], width);
  const bottomRow = generateGradient(selectedColors[2], selectedColors[3], width);
  const gridColors = new2DArray(height, width);
  for (let i = 0; i < width; i++) {
    const column = generateGradient(topRow[i], bottomRow[i], height);
    for (let j = 0; j < height; j++) {
      gridColors[j][i] = {color: column[j], fixed: true};
    }
  }
  return gridColors;
}

module.exports = {
  initializeGrid,
}
