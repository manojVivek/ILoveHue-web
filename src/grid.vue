<template>
  <div>
    <div class="board" ref="currentGrid" v-if="grid.length > 1">
      <ul class="grid-row" v-for="(row, yIndex) in grid">
        <li class="grid-cell" v-for="(cell, xIndex) in row" :style="{ 'background-color': cell.color }" v-if="cell" v-model="grid[yIndex][xIndex]" v-bind:class="{ 'draggable-source': (!cell.fixed && !completedSuccess), fixed: (cell.fixed && started && !completedSuccess)}">

        </li>
      </ul>
    </div>
    <div class="dashboard">
      <div class="controls">
        <!-- <button v-on:click="init()">Start</button> -->
        <div class="reloadSingle control" v-on:click="init()"></div>
        <div class="control">Steps: {{steps}}</div>
        <div class="control">Completed:{{completedSuccess}}</div>
      </div>
    </div>
  </div>
</template>

<script src="./grid.js"></script>

<style src="./grid.css"></style>
