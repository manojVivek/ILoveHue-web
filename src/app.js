import Vue from 'vue/dist/vue.esm.js'
import grid from './grid.vue';
import loader from './loader.vue'


window.onload = function () {
  new Vue({
    el: '#loader',
    template: '<loader></loader>',
    components: {loader},
  });

  setTimeout(function(){
    new Vue({
      el: '#app',
      template:'<grid :height="12" :width="12"></grid>',
      components: {grid},
    });
  }, 0);
}
