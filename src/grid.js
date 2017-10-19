'use strict';

const chroma = require('chroma-js');
import {
  Swappable
} from '@shopify/draggable';
import Vue from 'vue/dist/vue.esm.js';
const gridFreezer = require('./grid-freezer.js');
const gradientGenerator = require('./gradient-generator');
const {new2DArray, randomizeArray} = require('./util.js');

function start() {
  this.solution = this.grid;
  this.solutionArray = [];
  this.solution.forEach(
    row => row.forEach(cell => this.solutionArray.push(cell.color))
  );
  this.solutionString = JSON.stringify(this.solutionArray);
  const fixedCells = gridFreezer.freeze(this.grid);
  const shuffledNonFrozenCells = randomizeArray(
    getNonFrozenCells(this.grid, fixedCells)
  );
  const shuffledGrid = fitNonFrozenCellsToGrid(
    fixedCells,
    shuffledNonFrozenCells
  );
  this.grid = shuffledGrid;
  this.started = true;
  this.initDraggable();
}

function fitNonFrozenCellsToGrid(fixedCells, cellsToFit) {
  const height = fixedCells.length;
  const width = fixedCells[0].length;
  let i = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (!fixedCells[y][x]) {
        fixedCells[y][x] = cellsToFit[i++];
      }
    }
  }
  return fixedCells;
}

function getNonFrozenCells(grid, fixedCells) {
  const height = grid.length;
  const width = grid[0].length;
  const nonFroozenCells = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (!fixedCells[y][x]) {
        const cell = grid[y][x];
        cell.fixed = false;
        nonFroozenCells.push(cell);
      }
    }
  }
  return nonFroozenCells;
}

function validateGrid() {
    const currentGridArray = [];
    const solutionArray = [];
    this.$refs.currentGrid.childNodes.forEach(ul => ul.childNodes.forEach(li => currentGridArray.push(chroma(li.style['background-color']).hex())));
    console.log(currentGridArray);
    var currentGridString = JSON.stringify(currentGridArray);
    if (!this.currentGridString === currentGridString) {
      this.steps++;
      this.currentGridString = currentGridString
    }
    if (this.solutionString === this.currentGridString) {
      this.completedSuccess = true;
    }
}

function init() {
  this.started = false;
  this.grid = gradientGenerator.initializeGrid(this.height, this.width);
  const self = this;
  this.steps = 0;
  setTimeout(function(){ self.start()}, 2000);
}

function initDraggable() {
  const swappable = new Swappable(document.querySelectorAll('ul'));
  const self = this;
  swappable.on('swappable:stop', () => {
    Vue.nextTick(() => {
      const currentGridArray = [];
      const solutionArray = [];
      self.$refs.currentGrid.childNodes.forEach(ul => ul.childNodes.forEach(li => currentGridArray.push(chroma(li.style['background-color']).hex())));
      var currentGridString = JSON.stringify(currentGridArray);
      console.log(currentGridString);
      console.log(self.solutionString);
      if (!(self.currentGridString === currentGridString)) {
        console.log(self.currentGridString === currentGridString);
        self.steps++;
        self.currentGridString = currentGridString;
      }
      if (self.solutionString === self.currentGridString) {
        self.completedSuccess = true;
      }
    });
  });
}

export default {
  data() {
    return {
      completedSuccess: false,
      message: "Message" + this.height + this.width,
      height: this.height,
      width: this.width,
      grid: [],
      started: false,
      steps: 0,
    };
  },
  methods: {
    init: init,
    start: start,
    initDraggable: initDraggable,
  },
  mounted: function () {
    console.log('Mounted');
    const self = this;
    setTimeout(() => self.init(), 2000);
  },
  props: ['height', 'width'],
}
