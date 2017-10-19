'use strict';

const gradientGenerator = require('./gradient-generator');

const currentGrid = gradientGenerator.initializeGrid(15, 32);
let curtainIndex = 1;
function curtainUp() {
  //console.log('up');
  this.grid = currentGrid.slice(0, curtainIndex).map(row => row.map(cell => {cell.enter = true; return cell;}));
  //console.log(this.grid);
  if (curtainIndex < currentGrid.length) {
    curtainIndex++;
    const _this = this;
    setTimeout(function(){_this.curtainUp();}, 30);
  } else {
    const _this = this;
    setTimeout(function(){_this.curtainTransparent = true; _this.curtainDown();}, 500);
  }
}

function curtainDown() {
  //console.log('down');
  //const transparentArray = Array(currentGrid.length - curtainIndex)
  //  .fill(0).map(x => Array(currentGrid[0].length).fill({color: 'rgba(255, 255, 255, 0)'}));
  const transparentArray = currentGrid.slice(0, currentGrid.length - curtainIndex).map(row => row.map(cell => {cell.exit = true; cell.enter = false; return cell}));
  //console.log(transparentArray.length);
  const remainingArray = currentGrid.slice(currentGrid.length - curtainIndex, currentGrid.length);
  //console.log(remainingArray);
  this.grid = transparentArray.concat(remainingArray);
  //console.log(this.grid.length);
  if (curtainIndex > 0) {
    curtainIndex--;
    const _this = this;
    setTimeout(function(){_this.curtainDown();}, 30);
  } else {
    this.hidden = true;
  }
}

export default {
  data () {
    return {
      curtainTransparent: false,
      grid: [],
      hidden: false,
      started: false,
      steps: 0,
    };
  },
  methods: {
    curtainUp,
    curtainDown
  },
  mounted () {
    this.curtainUp();
  },
}
