<template>
  <div>
    <div id="container" style="position: relative;border: 2px solid darkgrey;width: 600px;height: 800px;margin: auto">
      <div class="moved" style="background-color: darkgrey;width: 30px;height: 20px;"></div>
      <div class="moved" style="background-color: red;width: 30px;height: 20px;"></div>
      <div class="moved" style="background-color: yellow;width: 30px;height: 20px;"></div>
      <div class="moved" style="background-color: orange;width: 30px;height: 20px;"></div>
      <div class="moved" style="background-color: black;width: 30px;height: 20px;"></div>
    </div>
  </div>


</template>

<script>

  import draggableUtil from "../util/draggableUtil"

  export default {
    name: "testKeydown",
    data() {
      return {
        draggable_container: {},
        onMove: undefined,
        onDragStart: undefined,
        onDragEnd: undefined,
        position: {
          currentPositionX: 0,
          currentPositionY: 0,
          currentCursorPositionX: 0,
          currentCursorPositionY: 0
        }
      }
    },
    methods: {
      /*moveElement(e) {
        let varX = (e.pageX - this.currentTarget.position.currentCursorPositionX + this.currentTarget.position.currentPositionX);
        let parentRect = this.currentTarget.parentNode.getBoundingClientRect();
        let rect = this.currentTarget.getBoundingClientRect();
        let borderTopWidth = this.currentTarget.parentNode.style.borderTopWidth;
        if (borderTopWidth && borderTopWidth.length >= 3) {
          borderTopWidth = parseInt(borderTopWidth.substr(0, borderTopWidth.indexOf("px")))
        }

        let borderRightWidth = this.currentTarget.parentNode.style.borderRightWidth;
        if (borderRightWidth && borderRightWidth.length >= 3) {
          borderRightWidth = parseInt(borderRightWidth.substr(0, borderRightWidth.indexOf("px")))
        }

        let borderBottomWidth = this.currentTarget.parentNode.style.borderBottomWidth;
        if (borderBottomWidth && borderBottomWidth.length >= 3) {
          borderBottomWidth = parseInt(borderBottomWidth.substr(0, borderBottomWidth.indexOf("px")))
        }

        let borderLeftWidth = this.currentTarget.parentNode.style.borderLeftWidth;
        if (borderLeftWidth && borderLeftWidth.length >= 3) {
          borderLeftWidth = parseInt(borderLeftWidth.substr(0, borderLeftWidth.indexOf("px")))
        }


        let rightBound = parentRect.width - rect.width - borderLeftWidth - borderRightWidth
        if (varX < 0)
          varX = 0
        if (varX > rightBound) {
          varX = rightBound
        }

        let varY = (e.pageY - this.currentTarget.position.currentCursorPositionY + this.currentTarget.position.currentPositionY);
        let bottomBound = parentRect.height - rect.height - borderTopWidth - borderBottomWidth
        if (varY < 0)
          varY = 0
        if (varY > bottomBound) {
          varY = bottomBound
        }
        this.currentTarget.style.left = varX + "px"
        this.currentTarget.style.top = varY + "px"
        if (this.onMove && this.onMove instanceof Function) {
          this.onMove(e, {left: varX, top: varY})
        }
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
        if (this.onDragStart && this.onDragStart instanceof Function) {
          this.onDragStart(e)
        }
      },
      removeEvent(e) {
        this.currentTarget.position.currentPositionX = e.pageX - this.currentTarget.position.currentCursorPositionX + this.currentTarget.position.currentPositionX
        this.currentTarget.position.currentPositionY = e.pageY - this.currentTarget.position.currentCursorPositionY + this.currentTarget.position.currentPositionY
        document.removeEventListener("mousemove", this.moveElement)
        if (this.onDragEnd && this.onDragEnd instanceof Function) {
          this.onDragEnd(e)
        }
      },
      applyDraggable(container) {
        if (container && container.children) {
          for (let i = 0; i < container.children.length; i++) {
            let e = container.children[i]
            e.style.position = "absolute"
            e.addEventListener("mousedown", this.bindEvent)
          }
          document.addEventListener("mouseup", this.removeEvent)
        }
      }*/
    },
    mounted() {
      //let moved = Array.prototype.slice.call(document.getElementsByClassName("moved"));
      // this.applyDraggable(document.querySelector("#container"))
      console.log(draggableUtil)
      draggableUtil({
        container: document.querySelectorAll(".moved"),
        onMove: (e, p) => {
          console.log(e)
          console.log(p)
        }
      })
    }
  }
</script>
<style scoped>

</style>
