<template>
  <div id="app">
    <h3>模板生成</h3>

    <el-select v-model="contentType" clearable placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-button type="primary" @click="appendElement">添加元素</el-button>
    <el-button type="primary" @click="submitTemplate">生成模板</el-button>
    <div id="templateArea" style="position: absolute;left:800px;width: 450px;height: 600px;border: 1px solid red;">
      <!--<img id="dragImage" style="left: 100px;position: absolute" @dragstart="ondragstart" @drag="ondrag" @click="selectedElement"
           @dragend="ondragend" src="./assets/logo.png" alt=""/>-->

      <!--<div id="dragImage" style="left: 100px;position: absolute" @click="selectedElement" alt="">First</div>-->
    </div>

  </div>
</template>

<script>
  import draggable from 'vuedraggable'

  export default {
    "components": {draggable},
    name: 'App',
    data() {
      return {
        options: [{
          value: 'text',
          label: '文本'
        }, {
          value: 'qrCode',
          label: '二维码'
        }, {
          value: 'barCode',
          label: '条形码'
        }, {
          value: 'img',
          label: '图片'
        }],
        contentType: '',
        'selectedEle': {}
      }
    },
    mounted() {

    },
    created() {

    },
    methods: {
      ondragstart(e) {
        console.log("dragStart")
        //记录刚一拖动时，鼠标在飞机上的偏移量
        this.selectedEle.offsetX = e.offsetX;
        this.selectedEle.offsetY = e.offsetY;
      },
      ondrag(e) {
        let templateAreaDiv = document.getElementById("templateArea");
        var x = e.pageX;
        var y = e.pageY;
        //drag事件最后一刻，无法读取鼠标的坐标，pageX和pageY都变为0
        if (x == 0 && y == 0) {
          return; //不处理拖动最后一刻X和Y都为0的情形
        }
        const leftBoundary = templateAreaDiv.offsetLeft
        const topBoundary = templateAreaDiv.offsetTop
        x = x - this.selectedEle.offsetX - leftBoundary;
        if (x < 0)
          x = 0
        y = y - this.selectedEle.offsetY - topBoundary;
        if (y < 0)
          y = 0
        let dragImageDiv = e.currentTarget;
        if (y > templateAreaDiv.offsetHeight - dragImageDiv.offsetHeight) {
          y = templateAreaDiv.offsetHeight - dragImageDiv.offsetHeight
        }
        if (x > templateAreaDiv.offsetWidth - dragImageDiv.offsetWidth) {
          x = templateAreaDiv.offsetWidth - dragImageDiv.offsetWidth
        }
        dragImageDiv.style.left = x + 'px';
        dragImageDiv.style.top = y + 'px';
      },
      ondragend() {

      },
      selectedElement(e) {
        let htmlCollection = document.getElementsByClassName("selected");
        let preSelected = htmlCollection[0]
        let selected = e.currentTarget
        if (htmlCollection && htmlCollection.length > 0 && selected != preSelected) {
          let classList = preSelected.classList;
          preSelected.removeEventListener("dragstart", this.ondragstart, true)
          preSelected.removeEventListener("drag", this.ondrag, true)
          classList.remove("selected")
        }
        selected.addEventListener("drag", this.ondrag, true)
        selected.addEventListener("dragstart", this.ondragstart, true)
        console.log(e)

        let tmp = selected.style
        //selected.style=tmp.cssText+";border:1px solid red"
        //tmp.zIndex=99
        //tmp.border="1px solid red"
        selected.className = "selected"
      },
      appendElement() {
        if (!this.contentType || this.contentType === '') {
          this.$message.warning("请选择一种类型")
          return
        }
        let templateAreaDiv = document.getElementById("templateArea")
        let childElement
        switch (this.contentType) {
          case "text":
            childElement = document.createElement("div", {type: "", ondragstart: this.ondragstart});
            childElement.textContent = "你好"
            /*childElement.ondragstart=this.ondragstart
            childElement.ondrag=this.ondrag
            childElement.onclick=this.selectedElement*/
            childElement.addEventListener("click", this.selectedElement, true)
            childElement.style = "position: absolute;top:100px;cursor:default"
            break;
        }
        templateAreaDiv.appendChild(childElement)
      },
      submitTemplate() {

      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    #text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .selected {
    border: 1px solid red;
    z-index: 99;
  }
</style>
