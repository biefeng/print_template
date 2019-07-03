<template>
  <div id="app">
    <ul id="editEleMenu" class="menu" v-show="this.attachEle">
      <li v-show="this.contentType==='text'" @mousedown="openDialog">编辑文本</li>
      <li v-show="this.contentType==='barCode'" @mousedown="openDialog">编辑条形码</li>
      <li @mousedown="deleteElement">删除元素</li>
    </ul>
    <ul id="editTemMenu" class="menu" v-show="this.editTemMenuVisible">
      <li @mousedown="editTemplateDialogVisible =true">编辑模板区域</li>
      <li @mouseover="openContentTypeSelect">添加元素</li>
    </ul>
    <div id="contentTypeSelect" onmouseout="this.closeContentTypeSelect(event,this)" style="width: 150px;z-index: 101" v-show="this.contentTypeSelectVisible==true">
      <ul class="menu">
        <li @mousedown="appendElement('text')">文本</li>
        <li @mousedown="appendElement('barCode')">条形码</li>
        <li>二维码</li>
        <li>图片</li>
      </ul>
    </div>
    <!--<el-button type="primary" @click="editTemplateDialogVisible =true">编辑模板区域</el-button>-->
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

    <el-dialog title="编辑格式" :visible.sync="centerDialogVisible" width="30%" center>
      <span style="display: block;margin-top: 10px;">
        <span class="label">水平定位</span>
        <el-input v-model="horizenPosition" style="width: 120px;margin-left: 10px" placeholder="请输入内容"></el-input>
        <span class="label">垂直定位</span>
        <el-input v-model="verticalPosition" style="width: 120px;margin-left: 10px" placeholder="请输入内容"></el-input>
      </span>
      <span style="display: block;margin-top: 10px;">
        <span class="label">键</span>
        <el-input v-model="valueName" style="width: 120px;margin-left: 10px" placeholder="请输入内容"></el-input>
        <span class="label">值</span>
        <el-input v-model="exampleData" style="width: 120px;margin-left: 10px" placeholder="请输入内容"></el-input>
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
        <span class="label">显示数据</span>
        <el-select v-model="displayBarCodeValue" style="width:120px;margin-left: 10px" placeholder="请选择">
          <el-option
            v-for="item in displayBarCodeValueSelect"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </span>
      <span v-show="this.contentType==='barCode' && this.displayBarCodeValue==true"
            style="display: block;margin-top: 10px;">
        <span class="label">数据位置</span>
        <el-select v-model="barCodeValuePosition" style="width:120px;margin-left: 10px" placeholder="请选择">
          <el-option
            v-for="item in barCodeValuePositionSelect"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
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

  const FONT_WIDTH = 0
  const FONT_HEIGHT = 0
  const FONT_TYPE = "A"
  const BARCODE_WIDTH = 2
  const BARCODE_HEIGHT = 100
  const BARCODE_DISPLAY_VALUE = false
  const BARCODE_TYPE = 'CODE128'
  const BARCODE_POS = 'bottom'

  export default {
    "components": {draggable},
    name: 'App',
    data() {
      return {
        centerDialogVisible: false,
        editTemplateDialogVisible: false,
        editBarCodeDialogVisible: false,
        editTemMenuVisible: false,
        contentTypeSelectVisible: false,
        horizenPosition: 0,
        verticalPosition: 0,
        contentTypeSelect: [{
          value: 'text',
          label: '文本'
        }, {
          value: 'barCode',
          label: '条形码'
        }, {
          value: 'qrCode',
          label: '二维码'
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
        exampleData: '',
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
        fontWidth: FONT_WIDTH,
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
        fontHeight: FONT_HEIGHT,
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
        barCodeWidth: BARCODE_WIDTH,
        barCodeTypeSelect: [{
          value: 'CODE128',
          label: 'CODE128'
        }, {
          value: 'UPC',
          label: 'UPC'
        }, {
          value: 'EAN13',
          label: 'EAN13'
        }, {
          value: 'EAN8',
          label: 'EAN8'
        }, {
          value: 'CODE39',
          label: 'CODE39'
        }],
        barCodeType: BARCODE_TYPE,
        textMargin: 1,
        barCodeHeight: BARCODE_HEIGHT,
        displayBarCodeValueSelect: [{
          value: false,
          label: '否'
        }, {
          value: true,
          label: '是'
        }],
        displayBarCodeValue: BARCODE_DISPLAY_VALUE,
        barCodeValuePositionSelect: [
          {
            value: 'top',
            label: '上'
          }, {
            value: 'bottom',
            label: '下'
          }
        ],
        barCodeValuePosition: BARCODE_POS,
        printAreaWidth: 450,
        printAreaHeight: 600
      }
    },
    mounted() {
      let templateAreaDiv = document.getElementById("templateArea");
      console.log(templateAreaDiv)
      templateAreaDiv.style.width = this.printAreaWidth + 'px'
      templateAreaDiv.style.height = this.printAreaHeight + 'px'
      templateAreaDiv.addEventListener("contextmenu", this.popTemplateMenu)
      let contentTyleSelect = document.getElementById("contentTypeSelect");
      // contentTyleSelect.addEventListener("mouseout",, {capture: false})
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
      appendElement(contentType) {
        if (!contentType || contentType === '') {
          this.$message.warning("请选择一种类型")
          return
        }
        let templateAreaDiv = document.getElementById("templateArea")
        let selectedEle = document.getElementsByClassName("selectedEle")[0];

        let childElement
        switch (contentType) {
          case "text":
            childElement = document.createElement("div");
            childElement.textContent = "Hello"
            childElement.addEventListener("click", this.selectedElement, true)
            childElement.fontWidth = FONT_WIDTH
            childElement.fontHeight = this.FONT_HEIGHT
            childElement.fontType = this.FONT_TYPE
            childElement.setAttribute("type", "text")
            childElement.addEventListener("contextmenu", this.popMenu)
            childElement.style = "position: absolute;top:100px;cursor:default;font-weight:bolder;border:1px solid gray;text-align:center;vertical-align:center;font-size:13px;padding:0px 10px"
            break;
          case 'barCode':
            childElement = document.createElement("img");
            childElement.classList.add("barCodeEle")
            childElement.addEventListener("click", this.selectedElement, true)
            childElement.setAttribute("type", "barCode")
            childElement.addEventListener("contextmenu", this.popMenu)
            childElement.style = "position: absolute;top:100px;cursor:default"
            childElement.barCodeType = BARCODE_TYPE
            childElement.barCodeValuePosition = BARCODE_POS
            childElement.displayBarCodeValue = BARCODE_DISPLAY_VALUE
            childElement.barCodeWidth = BARCODE_WIDTH
            childElement.barCodeHeight = BARCODE_HEIGHT
            JsBarCode(childElement, "Hello!", {
              format: this.barCodeType,
              lineColor: "#0aa",
              width: 2,
              height: this.barCodeHeight,
              displayValue: true
            })
            break;
        }
        if (selectedEle) {
          selectedEle.classList.remove("selectedEle")
        }
        childElement.classList.add("selectedEle");
        templateAreaDiv.appendChild(childElement)
        console.log(templateAreaDiv)
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
              break
            case 'barCode':
              tmp.displayBarCodeValue = item.displayBarCodeValue
              tmp.barCodeHeight = item.barCodeHeight
              tmp.barCodeWidth = item.barCodeWidth
              tmp.barCodeValuePosition = item.barCodeValuePosition
              tmp.barCodeType = item.barCodeType
              break

          }
          this.addedEle.push(tmp)
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
      popMenu(e, flag) {
        var event = e || window.event
        if (event.button == 2) {
          event.preventDefault();
          e.stopPropagation()
          var _x = event.clientX,
            _y = event.clientY;
          let editMenuUl
          if (flag === 'template') {
            this.editTemMenuVisible = true
            editMenuUl = document.getElementById("editTemMenu");
          } else {
            editMenuUl = document.getElementById("editEleMenu");
            this.attachEle = e.currentTarget
            this.selectedElement(event)
          }
          editMenuUl.style.position = "absolute"
          editMenuUl.style.left = _x + "px";
          editMenuUl.style.top = _y + "px";
          editMenuUl.style.listStyle = "none"
          editMenuUl.style.border = "1px solid black"
          document.addEventListener("mousedown", this.closeMenu, false)
        }
      },
      popTemplateMenu(e) {
        this.popMenu(e, "template")
      },
      closeMenu(e) {
        let editMenuUl = document.getElementById("editEleMenu");
        this.editTemMenuVisible = false
        this.attachEle = undefined
        document.removeEventListener("mousedown", this.closeMenu, false)
      },
      openDialog() {
        this.centerDialogVisible = true
        let selected = document.getElementsByClassName("selectedEle")[0];
        switch (this.contentType) {
          case 'text':
            this.valueName = selected.valueName
            this.exampleData = selected.innerText
            this.fontHeight = selected.fontHeight
            this.fontWidth = selected.fontWidth
            break
        }
      },
      closeDialog(flag) {
        this.centerDialogVisible = false
        if (flag && flag === 'apply') {
          let selected = document.getElementsByClassName("selectedEle")[0];
          selected.style.left = this.horizenPosition
          selected.style.top = this.verticalPosition
          //selected.style.fontSize = "50px"
          if (this.contentType === 'text') {
            selected.valueName = this.valueName
            selected.fontType = this.fontType
            selected.fontWidth = this.fontWidth
            selected.fontHeight = this.fontHeight
            selected.innerText = this.exampleData
            this.valueName = undefined
            this.fontType = undefined
            this.fontWidth = undefined
            this.fontHeight = undefined
            this.exampleData = undefined
          } else if (this.contentType === 'barCode') {
            selected.barCodeType = this.barCodeType
            selected.barCodeHeight = parseInt(this.barCodeHeight)
            selected.barCodeWidth = this.barCodeWidth
            selected.valueName = this.valueName
            selected.exampleData = this.exampleData
            selected.barCodeValuePosition = this.barCodeValuePosition
            selected.displayBarCodeValue = this.displayBarCodeValue
            try {
              JsBarCode(selected, this.exampleData, {
                format: this.barCodeType,
                displayValue: this.displayBarCodeValue,
                height: this.barCodeHeight,
                width: this.barCodeWidth,
                textPosition: this.barCodeValuePosition
              })
            } catch (e) {
              this.$message.warning(e)
            }
          }
        }
      },
      closeEditTemplateDialog() {
        this.editTemplateDialogVisible = false
        let templateAreaDiv = document.getElementById("templateArea");
        templateAreaDiv.style.width = this.printAreaWidth + 'px'
        templateAreaDiv.style.height = this.printAreaHeight + 'px'
      },
      openContentTypeSelect(e) {

        let contentTypeSelect = document.getElementById("contentTypeSelect");
        let currentTarget = e.currentTarget;
        let parent = currentTarget.offsetParent;
        let index = 0
        parent.childNodes.forEach(e => {
          if (e.tagName === 'LI')
            index++
          if (e == currentTarget) {
            return
          }
        })
        contentTypeSelect.style.position = 'absolute'
        contentTypeSelect.style.left = parent.offsetLeft + parent.offsetWidth + 'px'
        contentTypeSelect.style.top = parent.offsetTop + currentTarget.offsetHeight * (index - 1) + 'px'
        this.contentTypeSelectVisible = true
        console.log(e)
      },
      closeContentTypeSelect(e, obj) {
        if (e.type != "mouseover" && e.type != "mouseout") {
          return false;
        }
        var relag = relag ? e.relatedTarget : (e.type == "mouseout") ? e.toElement : e.formElement;
        if (relag && relag == obj) {
          if (e.type == "mouseout") {
            this.$message("111")
          }
        }
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

  ul.menu {
    z-index: 100;
    cursor: default;
    width: 150px;
    background-color: white;
    -moz-box-shadow: 2px 2px 5px #333333;
    -webkit-box-shadow: 2px 2px 5px #333333;
    box-shadow: 2px 2px 5px #333333;
    padding-left: 0px;
    list-style: none;
    margin: 0px;
  }

  ul.menu li {
    height: 30px;
    font-size: 20px;
    font-weight: 500;
    vertical-align: center;
    padding-left: 20px;
    line-height: 30px;
  }

  ul.menu li:hover {
    background-color: #e8e8e8;
  }

  span.label {
    display: inline-block;
    font-size: 20px;
    margin-left: 20px;
    width: 80px;
  }

</style>
