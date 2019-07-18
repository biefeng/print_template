<template>
  <div id="container" style="position: relative;border: 2px solid darkgrey;width: 300px;height: 800px;margin: auto">
    <div class="moved" style="background-color: darkgrey;width: 300px;height: 100px;position: relative;margin-top: 20px"></div>
    <div class="moved" style="background-color: red;width: 300px;height: 100px;position: relative"></div>
    <div class="moved" style="background-color: yellow;width: 300px;height: 100px;position: relative"></div>
    <div class="moved" style="background-color: orange;width: 300px;height: 100px;position: relative"></div>
    <div class="moved" style="background-color: black;width: 300px;height: 100px;position: relative"></div>

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
        this.currentTarget.style.transform = "translate(" + (e.pageX - this.currentTarget.position.currentCursorPositionX + this.currentTarget.position.currentPositionX) + "px," + (e.pageY - this.currentTarget.position.currentCursorPositionY + this.currentTarget.position.currentPositionY) + "px)"
      },
      bindEvent(e) {
        this.currentTarget = e.currentTarget
        if (!this.currentTarget.position) {
          this.currentTarget.position = {
            currentPositionX: 0,
            currentPositionY: 0,
            currentCursorPositionX: 0,
            currentCursorPositionY: 0
          }
        }
        document.addEventListener("mousemove", this.moveElement)
        this.currentTarget.position.currentCursorPositionX = e.pageX
        this.currentTarget.position.currentCursorPositionY = e.pageY
      },
      removeEvent(e) {
        this.currentTarget.position.currentPositionX = e.pageX - this.currentTarget.position.currentCursorPositionX + this.currentTarget.position.currentPositionX
        this.currentTarget.position.currentPositionY = e.pageY - this.currentTarget.position.currentCursorPositionY + this.currentTarget.position.currentPositionY
        document.removeEventListener("mousemove", this.moveElement)
      }
    },
    mounted() {
      let moved = Array.prototype.slice.call(document.getElementsByClassName("moved"));

      moved.forEach(e => {
        e.addEventListener("mousedown", this.bindEvent)
        e.addEventListener("mouseup", this.removeEvent)
      })
    }
  }
</script>
<style scoped>

</style>
