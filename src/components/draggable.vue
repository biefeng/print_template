<template>
  <div id="deaggable_frame" style="height: 600px;background-color: lavender;width: 300px;margin: auto">
    <div v-for="index in [1,2,3,4,5,6]" class="draggable_ele">{{index}}</div>
  </div>


</template>

<script>


  export default {

    name: "draggable",
    data() {
      return {
        loaded: false
      }
    },
    head() {

    },
    created() {

      /*let script_ele = document.createElement('script');
      script_ele.setAttribute("src", "static/plain-draggable.min.js")
      //script_ele.setAttribute("type","javascript")
      let loaded = this.loaded
      script_ele.onload = function (e) {
        console.log("loaded")
        loaded = true
      }
      document.body.appendChild(script_ele)*/
    },
    mounted() {
      let elements = document.getElementsByClassName("draggable_ele")
      console.log(elements)
      this.sorted()
      /*for (let i = 0; elements.length; i++) {
        new PlainDraggable(elements[i])
      }*/
    },
    methods: {

      sorted() {
        'use strict';

        var elmItems = Array.prototype.slice.call(document.getElementsByClassName('draggable_ele')),
          rect = elmItems[0].getBoundingClientRect(),
          itemHeight = rect.height,
          itemsTop = elmItems.map(function (v, i) {
            return Math.round(rect.top + window.pageYOffset + itemHeight * i);
          }),
          items = [];

        function sort(targetItem, top) {
          var curIndex = items.indexOf(targetItem),
            newIndex = itemsTop.indexOf(Math.round(top));
          if (newIndex !== -1 && newIndex !== curIndex) {
            items.splice(newIndex, 0, items.splice(curIndex, 1)[0]);
            items.forEach(function (item, i) {
              if (item !== targetItem) {
                item.top = itemsTop[i];
              }
            });
          }
        }

        items = elmItems.map(function (elmItem) {
          return new PlainDraggable(elmItem, {
            snap: {
              y: {step: itemHeight},
              side: 'start'
            },
            onDrag: function (moveTo) {
              if (!moveTo.snapped) {
                return false;
              }
              sort(this, moveTo.top);
              return true;
            }
          });
        });

      }
    }
  }
</script>

<style scoped>
  .draggable_ele {
    width: 300px;
    height: 90px;
    line-height: 90px;
    text-align: center;
    background-color: aqua;
    border-bottom: 1px solid red;
    transition-duration:0.2s;
    position: relative !important;
  }
</style>
