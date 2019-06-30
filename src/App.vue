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
    <el-button type="primary" @click="appendElement">主要按钮</el-button>
    <div id="templateArea" style="position: absolute;left:800px;width: 450px;height: 600px;border: 1px solid red;">
      <img id="dragImage" style="left: 100px;position: absolute" @dragstart="ondragstart" @drag="ondrag"
           @dragend="ondragend" src="./assets/logo.png" alt=""/>
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
        'dragImage': {}
      }
    },
    mounted() {

    },
    created() {

    },
    methods: {
      ondragstart(e) {
        alert(1)
        //记录刚一拖动时，鼠标在飞机上的偏移量
        this.dragImage.offsetX = e.offsetX;
        this.dragImage.offsetY = e.offsetY;
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
        x = x - this.dragImage.offsetX - leftBoundary;
        if (x < 0)
          x = 0
        y = y - this.dragImage.offsetY - topBoundary;
        if (y < 0)
          y = 0
        let dragImageDiv = document.getElementById("dragImage");
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
      appendElement() {
        if (!this.contentType || this.contentType === '') {
          this.$message.warning("请选择一种类型")
          return
        }
        let templateAreaDiv = document.getElementById("templateArea")
        let childElement
        switch (this.contentType) {
          case "text":
            childElement = document.createElement("p", {type: "",ondragstart:this.ondragstart});
            childElement.textContent="你好"
            childElement.ondragstart=this.ondragstart
            break;
        }
        templateAreaDiv.appendChild(childElement)
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
</style>
