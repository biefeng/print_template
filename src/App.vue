<template>
  <div id="app">
    <ul id="editMenu" v-show="this.attachEle">
      <li v-show="this.contentType==='text'" @click="openDialog">编辑文本</li>
      <li v-show="this.contentType==='barCode'" @click="openDialog">编辑条形码</li>
      <li @click="deleteElement">删除元素</li>
    </ul>
    <el-button type="primary" @click="editTemplateDialogVisible =true">编辑模板区域</el-button>
    <el-dialog
      title="提示"
      :visible.sync="editTemplateDialogVisible"
      width="30%"
      center>
      <span style="display: block;margin-bottom: 10px"><p style="display: inline;margin-right: 20px">宽度</p><el-input
        style="width: 300px" v-model="printAreaWidth" placeholder="打印区域宽度"></el-input></span>
      <span style="display: block"><p style="display: inline;margin-right: 20px">高度</p><el-input style="width: 300px"
                                                                                                 v-model="printAreaHeight"
                                                                                                 placeholder="打印区域高度"></el-input></span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editTemplateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="closeEditTemplateDialog">确 定</el-button>
      </span>
    </el-dialog>
    <br/>
    <el-select v-model="contentType" clearable placeholder="文本">
      <el-option
        v-for="item in contentTypeSelect"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-button type="primary" @click="appendElement">添加元素</el-button>
    <el-button type="primary" @click="submitTemplate">生成模板</el-button>
    <div id="templateArea" style="position: absolute;left:800px;width: 450px;height: 220px;border: 1px solid red;">
      <!--<img id="dragImage" style="left: 100px;position: absolute" @dragstart="ondragstart" @drag="ondrag" @click="selectedElement"
           @dragend="ondragend" src="./assets/logo.png" alt=""/>-->

      <!--<div id="dragImage" style="left: 100px;position: absolute" @click="selectedElement" alt="">First</div>-->
    </div>

    <el-dialog
      title="编辑格式"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>

      <span style="display: block;margin-top: 10px;">
        <span class="label">键</span>
        <el-input v-model="valueName" style="width: 120px;margin-left: 10px" placeholder="请输入内容"></el-input>
        <span class="label">值</span>
        <el-input v-model="textExampleData" style="width: 120px;margin-left: 10px" placeholder="请输入内容"></el-input>
      </span>
      <span v-show="this.contentType==='text'" style="display: block">
        <span class="label">字宽：</span>
        <el-select style="width:120px;margin-left: 10px" v-model="fontWidth" placeholder="请选择">
          <el-option
            v-for="item in fontWidthSelect"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <span class="label">字高</span>
        <el-select v-model="fontHeight" style="width:120px;margin-left: 10px; " placeholder="请选择">
          <el-option
            v-for="item in fontHeightSelect"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </span>
      <span v-show="contentType==='text'" style="display: block;margin-top: 10px;">
        <span class="label">字体</span>
        <el-select style="width:120px;margin-left: 10px" v-model="fontType" placeholder="请选择">
          <el-option
            v-for="item in fontTypeSelect"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </span>
      <span v-show="this.contentType==='barCode'" style="display: block;margin-top: 10px;">
        <span class="label">线条宽度</span>
        <el-select v-model="barCodeWidth" style="width:120px;margin-left: 10px" placeholder="请选择">
          <el-option
            v-for="item in barCodeWidthSelect"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <span class="label">条码高度</span>
        <el-input v-model="barCodeHeight" style="width: 120px;margin-left: 10px" placeholder="请输入内容"></el-input>
      </span>
      <span v-show="this.contentType==='barCode'" style="display: block;margin-top: 10px;">
        <span class="label">条码类型</span>
        <el-select v-model="barCodeType" style="width:120px;margin-left: 10px" placeholder="请选择">
          <el-option
            v-for="item in barCodeTypeSelect"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <span class="label">内容位置</span>
        <el-input v-model="valueName" style="width: 120px;margin-left: 10px" placeholder="请输入内容"></el-input>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog('cancel')">取 消</el-button>
        <el-button type="primary" @click="closeDialog('apply')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import index from "./router";
  import JsBarCode from 'jsbarcode'

  export default {
    "components": {draggable},
    name: 'App',
    data() {
      return {
        centerDialogVisible: false,
        editTemplateDialogVisible: false,
        editBarCodeDialogVisible: false,
        contentTypeSelect: [{
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
        contentType: 'text',
        fontTypeSelect: [{
          value: 'text',
          label: 'FONT-1'
        }, {
          value: 'qrCode',
          label: 'FONT-2'
        }, {
          value: 'barCode',
          label: 'FONT-3'
        }, {
          value: 'img',
          label: 'FONT-4'
        }],
        fontType: 'FONT-1',
        'selectedEle': {},
        "addedEle": [],
        "attachEle": undefined,
        valueName: '',
        textExampleData: '',
        fontWidthSelect: [{
          value: '0',
          label: '0'
        }, {
          value: '1',
          label: '1'
        }, {
          value: '2',
          label: '2'
        }, {
          value: '3',
          label: '3'
        }, {
          value: '4',
          label: '4'
        }],
        fontWidth: "0",
        fontHeightSelect: [{
          value: '0',
          label: '0'
        }, {
          value: '1',
          label: '1'
        }, {
          value: '2',
          label: '2'
        }, {
          value: '3',
          label: '3'
        }, {
          value: '4',
          label: '4'
        }],
        fontHeight: "0",
        barCodeWidthSelect: [{
          value: '2',
          label: '2'
        }, {
          value: '3',
          label: '3'
        }, {
          value: '4',
          label: '4'
        }, {
          value: '5',
          label: '5'
        }, {
          value: '6',
          label: '6'
        }],
        barCodeWidth: 2,
        barCodeTypeSelect: [{
          value: 1,
          label: 'Code128'
        }, {
          value: 2,
          label: 'UPC(A)'
        }, {
          value: 3,
          label: 'EAN-13'
        }],
        barCodeType: 1,
        barCodeHeight: 100,
        printAreaWidth: 450,
        printAreaHeight: 600
      }
    },
    mounted() {
      let templateAreaDiv = document.getElementById("templateArea");
      console.log(templateAreaDiv)
      templateAreaDiv.style.width = this.printAreaWidth + 'px'
      templateAreaDiv.style.height = this.printAreaHeight + 'px'
    },
    created() {

    },
    methods: {
      ondragstart(e) {
        //记录起始位置
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
        let htmlCollection = document.getElementsByClassName("selectedEle");
        let preSelected = htmlCollection[0]
        let selected = e.currentTarget
        if (htmlCollection && htmlCollection.length > 0 && selected != preSelected) {
          let classList = preSelected.classList;
          preSelected.removeEventListener("dragstart", this.ondragstart, true)
          preSelected.removeEventListener("drag", this.ondrag, true)
          classList.remove("selectedEle")
        }
        selected.addEventListener("drag", this.ondrag, true)
        selected.addEventListener("dragstart", this.ondragstart, true)
        let tmp = selected.style
        this.contentType = selected.getAttribute("type")
        selected.className = "selectedEle"
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
            childElement = document.createElement("div");
            childElement.textContent = "文本"
            /*childElement.ondragstart=this.ondragstart
            childElement.ondrag=this.ondrag
            childElement.onclick=this.selectedElement*/
            childElement.addEventListener("click", this.selectedElement, true)
            childElement.setAttribute("type", "text")
            childElement.addEventListener("contextmenu", this.popMenu)
            childElement.style = "position: absolute;top:100px;cursor:default;font-weight:bolder;border:1px solid gray;text-align:center;vertical-align:center;font-size:13px;padding:0px 10px"
            break;
          case 'barCode':
            childElement = document.createElement("img");
            //childElement.textContent = "条形码"
            /*childElement.ondragstart=this.ondragstart
            childElement.ondrag=this.ondrag
            childElement.onclick=this.selectedElement*/
            childElement.classList.add("barCodeEle")
            childElement.classList.add("barCodeEle1")

            childElement.addEventListener("click", this.selectedElement, true)
            childElement.setAttribute("type", "barCode")
            childElement.addEventListener("contextmenu", this.popMenu)
            childElement.style = "position: absolute;top:100px;cursor:default"
            break;
        }
        templateAreaDiv.appendChild(childElement)
        if (this.contentType === 'barCode') {
          let selectedBarCode = document.getElementsByClassName("barCodeEle")[0];
          JsBarCode(selectedBarCode, "1234", {
            format: "pharmacode",
            lineColor: "#0aa",
            width: 4,
            height: 40,
            displayValue: true
          })
        }
      },
      deleteElement() {
        let templateAreaDiv = document.getElementById("templateArea")
        let htmlCollection = document.getElementsByClassName("selectedEle");
        if (htmlCollection.length == 0) {
          this.$message.warning("删除需要选定一个元素")
          return
        }
        let selected = htmlCollection[0]
        if (this.attachEle == selected) {
          this.attachEle = undefined
        }
        templateAreaDiv.removeChild(selected)
      },
      submitTemplate() {
        let templateAreaDiv = document.getElementById("templateArea");
        this.addedEle = []

        templateAreaDiv.childNodes.forEach((item, index) => {
          let contentType = item.getAttribute("type")
          let tmp = {}
          tmp.left = item.offsetLeft
          tmp.top = item.offsetTop
          tmp.type = contentType
          tmp.valueName = item.valueName

          switch (contentType) {
            case "text":
              tmp.fontType = item.fontType
              tmp.fontWidth = item.fontWidth
              tmp.fontHeight = item.fontHeight
              this.addedEle.push(tmp)
              break
          }
        })
        this.$http.post("http://localhost:7538/template/add", {
          "elements": this.addedEle,
          "printWidth": templateAreaDiv.clientWidth,
          "printHeight": templateAreaDiv.clientHeight,
          "templateName": "template1"
        }, {
          headers: {
            post: {
              'Content-Type': 'application/json'
            }
          }
        }).then(
          console.log("请求成功")
        )
        console.log(this.addedEle)
      },
      popMenu(e) {
        var event = e || window.event
        if (event.button == 2) {
          event.preventDefault();

          var _x = event.clientX,
            _y = event.clientY;

          let editMenuUl = document.getElementById("editMenu");
          this.attachEle = e.currentTarget
          //editMenuUl.style.display = "block";
          editMenuUl.style.position = "absolute"
          editMenuUl.style.left = _x + "px";
          editMenuUl.style.top = _y + "px";
          editMenuUl.style.listStyle = "none"
          editMenuUl.style.border = "1px solid black"
          document.addEventListener("click", this.closeMenu, false)
          this.selectedElement(event)
        }
      },
      closeMenu(e) {
        let editMenuUl = document.getElementById("editMenu");
        this.attachEle = undefined
        document.removeEventListener("click", this.closeMenu, false)
      },
      openDialog() {
        this.centerDialogVisible = true
        let selected = document.getElementsByClassName("selectedEle")[0];
        switch (this.contentType) {
          case 'text':
            this.valueName = selected.valueName
            this.textExampleData = selected.innerText
            this.fontHeight = selected.fontHeight
            this.fontWidth = selected.fontWidth
            break
        }
      },
      closeDialog(flag) {
        this.centerDialogVisible = false
        if (flag && flag === 'apply') {
          let selected = document.getElementsByClassName("selectedEle")[0];
          //selected.style.fontSize = "50px"
          if (this.contentType === 'text') {
            selected.valueName = this.valueName
            selected.fontType = this.fontType
            selected.fontWidth = this.fontWidth
            selected.fontHeight = this.fontHeight
            selected.innerText = this.textExampleData
            this.valueName = undefined
            this.fontType = undefined
            this.fontWidth = undefined
            this.fontHeight = undefined
            this.textExampleData = undefined
          } else if (this.contentType === 'barCode') {
            selected.barCodeType = this.barCodeType
            selected.barCodeHeight = this.barCodeHeight
            selected.barCodeWidth = this.barCodeWidth
            selected.valueName = this.valueName

          }
        }
      },
      closeEditTemplateDialog() {
        this.editTemplateDialogVisible = false
        let templateAreaDiv = document.getElementById("templateArea");
        templateAreaDiv.style.width = this.printAreaWidth + 'px'
        templateAreaDiv.style.height = this.printAreaHeight + 'px'
      },
      openEditBarCodeDialog() {
        this.editBarCodeDialogVisible = true
      },
      closeEditBarCodeDialog() {
        this.editBarCodeDialogVisible
      }
    }
  }
</script>

<style>

  body {
    z-index: -1;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    #text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    height: 800px;
  }

  .selectedEle {
    z-index: 99;
    background-color: #f1f1f1;
  }

  #editMenu {
    z-index: 100;
    cursor: default;
    width: 150px;
    background-color: white;
    -moz-box-shadow: 2px 2px 5px #333333;
    -webkit-box-shadow: 2px 2px 5px #333333;
    box-shadow: 2px 2px 5px #333333;
    padding-left: 0px;
  }

  #editMenu li {
    height: 30px;
    font-size: 20px;
    font-weight: 500;
    vertical-align: center;
    padding-left: 20px;
    line-height: 30px;
  }

  #editMenu li:hover {
    background-color: #e8e8e8;
  }

  span.label {
    display: inline-block;
    font-size: 20px;
    margin-left: 20px;
    width: 80px;
  }

</style>
