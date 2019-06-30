<template>
  <div id="app">
    <el-select v-model="contentType" clearable placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <h3>模板生成</h3>

    <img id="dragImage" @dragstart="ondragstart" @drag="ondrag" @dragend="ondragend" src="./assets/logo.png" alt=""/>
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
          value: '文本',
          label: '文本'
        }, {
          value: '二维码',
          label: '二维码'
        }, {
          value: '条形码',
          label: '条形码'
        }, {
          value: '图片',
          label: '图片'
        }],
        contentType: '',
        'dragImage':{}
      }
    },
    mounted() {

    },
    created() {

    },
    methods: {
      ondragstart(e) {
        console.log('事件源p3开始拖动');
        //记录刚一拖动时，鼠标在飞机上的偏移量
        this.dragImage.offsetX = e.offsetX;
        this.dragImage.offsetY = e.offsetY;
      },
      ondrag(e){
        console.log('事件源p3拖动中');
        var x= e.pageX;
        var y= e.pageY;
        console.log(x+'-'+y);
        //drag事件最后一刻，无法读取鼠标的坐标，pageX和pageY都变为0
        if(x==0 && y==0){
          return; //不处理拖动最后一刻X和Y都为0的情形
        }
        x-=this.dragImage.offsetX;
        y-=this.dragImage.offsetY;

        document.getElementById("dragImage").style.left=x+'px';
        document.getElementById("dragImage").style.top=y+'px';
      },
      ondragend(){
        console.log('源对象p3拖动结束');
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
