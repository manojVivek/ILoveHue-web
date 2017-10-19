<template>
  <div class="loader" v-bind:class="{transparent: curtainTransparent, hidden: hidden}">
    <ul class="grid-row" v-for="(row, yIndex) in grid">
        <li class="grid-cell" v-for="(cell, xIndex) in row" :style="{ 'background-color': cell.color }" v-bind:class="{enter: cell.enter, exit: cell.exit}">
        </li>
      </ul>
  </div>
</template>

<script src="./loader.js"></script>

<style src="./loader.css"></style>
