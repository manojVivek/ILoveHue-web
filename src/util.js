'use strict';

export function new2DArray(height, width) {
  return Array(height).fill(null).map(x => Array(width).fill(null));
}

export function randomizeArray(array) {
  return array.slice(0).sort(() => 0.5 - Math.random());
}
