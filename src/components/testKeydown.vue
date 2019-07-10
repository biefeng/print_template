<template>
  <div id="container" style="position: absolute">
    <div id="moved" style="background-color: darkgrey;width: 100px;height: 100px"></div>

  </div>
</template>

<script>
  export default {
    name: "testKeydown",
    data() {
      return {
        position: {
          currentPositionX: 0,
          currentPositionY: 0,
          currentCursorPositionX: 0,
          currentCursorPositionY: 0
        }
      }
    },
    methods: {
      moveElement(e) {
        let moved = document.getElementById("moved");
        moved.style.transform = "translate(" + (e.pageX - this.position.currentCursorPositionX + this.position.currentPositionX) + "px," + (e.pageY - this.position.currentCursorPositionY + this.position.currentPositionY) + "px)"
        console.log(e)
      },
      bindEvent(e) {
        document.addEventListener("mousemove", this.moveElement)
        this.position.currentCursorPositionX = e.pageX
        this.position.currentCursorPositionY = e.pageY
      },
      removeEvent(e) {
        this.position.currentPositionX=e.pageX- this.position.currentCursorPositionX+ this.position.currentPositionX
        this.position.currentPositionY=e.pageY- this.position.currentCursorPositionY+ this.position.currentPositionY
        document.removeEventListener("mousemove", this.moveElement)
      }
    },
    mounted() {
      let moved = document.getElementById("moved");
      moved.addEventListener("mousedown", this.bindEvent)
      moved.addEventListener("mouseup", this.removeEvent)
    }
  }
</script>
<style scoped>

</style>
