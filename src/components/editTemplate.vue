<template>
  <div id="printerTemplate">
    <ul id="editEleMenu" class="menu" v-show="this.attachEle">
      <li v-show="this.contentType==='text'" @mousedown="openDialog">编辑文本</li>
      <li v-show="this.contentType==='barCode'" @mousedown="openDialog">编辑条形码</li>
      <li @mousedown="deleteElement">删除元素</li>
    </ul>
    <ul id="editTemMenu" class="menu" v-show="this.editTemMenuVisible">
      <li @mousedown="editTemplateDialogVisible =true">编辑模板区域</li>
      <li @mousedown="function(e) {
      e.stopPropagation()
      }" @mouseenter="openContentTypeSelect" @mouseleave="closeContentTypeSelect">添加元素
      </li>
      <li @mousedown="clearTemplateArea">清除元素</li>
    </ul>

    <ul id="contentTypeSelect" class="menu" v-show="this.contentTypeSelectVisible">
      <li @mousedown="appendElement('text')">文本</li>
      <li @mousedown="appendElement('barCode')">条形码</li>
      <li @mousedown="appendElement('barCode')">条形码</li>
      <li @mousedown="appendElement('barCode')">条形码</li>
    </ul>
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
    <el-button style="position: relative;margin: 5px 0px 10px 685px;display:inline-block;" type="primary"
               @click="submitTemplate">保存模板
    </el-button>
    <el-button style="position: relative;display:inline-block;" type="primary" @click="submitTemplate">返回</el-button>
    <div id="templateArea"
         style="position: relative;margin: 10px auto;width: 450px;height: 220px;border: 3px solid #a3a3a3;background-color: rgba(218,250,238,0.14)">
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
  import JsBarCode from 'jsbarcode'

  const FONT_WIDTH = 0
  const FONT_HEIGHT = 0
  const FONT_TYPE = "A"
  const BARCODE_WIDTH = 2
  const BARCODE_HEIGHT = 100
  const BARCODE_DISPLAY_VALUE = false
  const BARCODE_TYPE = 'CODE128'
  const BARCODE_POS = 'bottom'
  const DEFAULT_HORIZEN_POS = 100
  const DEFAULT_VERTICAL_POS = 100


  export default {
    "components": {draggable},
    name: 'printerTemplate',
    data() {
      return {
        centerDialogVisible: false,
        editTemplateDialogVisible: false,
        editBarCodeDialogVisible: false,
        editTemMenuVisible: false,
        contentTypeSelectVisible: false,
        horizenPosition: 0,
        verticalPosition: 0,
        template: {},
        templateName: '',
        printerType: 0,
        printMode: 0,
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
      templateAreaDiv.style.width = this.printAreaWidth + 'px'
      templateAreaDiv.style.height = this.printAreaHeight + 'px'
      templateAreaDiv.addEventListener("contextmenu", this.popTemplateMenu)
      let contentTyleSelect = document.getElementById("contentTypeSelect");
      //设置false，禁止子元素进行捕获
      contentTyleSelect.addEventListener("mouseleave", this.closeContentTypeSelect, {capture: false})

      //接收参数
      this.printMode = this.$route.params.printMode
      this.printerType = this.$route.params.printerType
      this.loadTemplates(this.$route.params.row)
    },
    updated() {
    },
    created() {
      document.addEventListener('keydown', this.moveByDirectKey)
    },
    methods: {
      /*加载模板，即预览功能*/
      loadTemplates(template) {
        if (template) {
          let templates = this.templates
          let templateAreaDiv = document.getElementById("templateArea")

          let html = template.html;
          templateAreaDiv.style.width = template.printWidth + "px"
          templateAreaDiv.style.height = template.printHeight + "px"
          templateAreaDiv.innerHTML = html
          let collection = document.getElementsByClassName("templateElement");
          for (let i = 0; i < collection.length; i++) {
            this.loadData(collection[i], template.elements[i])
            collection[i].addEventListener("mousedown", this.selectedElement, true)
            collection[i].addEventListener("contextmenu", this.popMenu)
          }
        }
      },
      ondragstart(e) {
        //记录起始位置
        this.selectedEle.offsetX = e.offsetX;
        this.selectedEle.offsetY = e.offsetY;
      },
      ondrag(e) {
        let templateAreaDiv = document.getElementById("templateArea");
        var x = e.pageX;
        var y = e.pageY;
        if (x == 0 && y == 0) {
          return;
        }
        const leftBoundary = templateAreaDiv.offsetLeft
        const topBoundary = templateAreaDiv.offsetTop
        let dragDiv = e.currentTarget;
        let clientRect = dragDiv.getBoundingClientRect();
        x = x - this.selectedEle.offsetX - leftBoundary - (dragDiv.offsetWidth - clientRect.width) / 2;
        if (x < 0 - (dragDiv.offsetWidth - clientRect.width) / 2)
          x = 0 - (dragDiv.offsetWidth - clientRect.width) / 2
        y = y - this.selectedEle.offsetY - topBoundary - (dragDiv.offsetHeight - clientRect.height) / 2;
        if (y <= 0 - (dragDiv.offsetHeight - clientRect.height) / 2)
          y = 0 - (dragDiv.offsetHeight - clientRect.height) / 2

        if (y > templateAreaDiv.offsetHeight - clientRect.height - (dragDiv.offsetHeight - clientRect.height) / 2) {
          y = templateAreaDiv.offsetHeight - 4 - clientRect.height - (dragDiv.offsetHeight - clientRect.height) / 2
        }
        if (x > templateAreaDiv.offsetWidth - clientRect.width - (dragDiv.offsetWidth - clientRect.width) / 2) {
          x = templateAreaDiv.offsetWidth - 4 - clientRect.width - (dragDiv.offsetWidth - clientRect.width) / 2
        }
        dragDiv.style.left = x + 'px';
        if (this.printMode === 0) {
          dragDiv.style.top = y + 'px';
        }
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
        selected.onkeydown = this.moveByDirectKey
        selected.addEventListener("drag", this.ondrag, true)
        selected.addEventListener("dragstart", this.ondragstart, true)
        let tmp = selected.style
        this.contentType = selected.getAttribute("type")
        selected.classList.add("selectedEle")
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
            childElement.textContent = "Hello!"
            childElement.fontWidth = FONT_WIDTH
            childElement.exampleData = 'Hello!'
            childElement.fontHeight = FONT_HEIGHT
            childElement.fontType = FONT_TYPE
            childElement.setAttribute("type", "text")
            childElement.style = "position: absolute;cursor:default;transform:scaleX(1.5);font-weight:bolder;text-align:center;vertical-align:center;font-size:13px;padding:0px 10px"
            break;
          case 'barCode':
            childElement = document.createElement("img");
            childElement.classList.add("barCodeEle")
            childElement.setAttribute("type", "barCode")
            childElement.style = "position: absolute;cursor:default;transform:scale(0.6,0.6);"
            childElement.barCodeType = BARCODE_TYPE
            childElement.barCodeValuePosition = BARCODE_POS
            childElement.displayBarCodeValue = BARCODE_DISPLAY_VALUE
            childElement.barCodeWidth = BARCODE_WIDTH
            childElement.barCodeHeight = BARCODE_HEIGHT
            childElement.exampleData = 'Hello!'
            JsBarCode(childElement, childElement.exampleData, {
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
        childElement.horizenPosition = DEFAULT_HORIZEN_POS
        childElement.verticalPosition = DEFAULT_VERTICAL_POS
        childElement.style.top = DEFAULT_VERTICAL_POS + "px"
        childElement.style.left = DEFAULT_HORIZEN_POS + "px"
        //childElement.draggable=false
        childElement.addEventListener("click", this.selectedElement, true)
        childElement.addEventListener("contextmenu", this.popMenu)
        childElement.classList.add("templateElement");
        childElement.classList.add("selectedEle");
        templateAreaDiv.appendChild(childElement)
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
          tmp.horizenPosition = item.offsetLeft
          tmp.verticalPosition = item.offsetTop

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
        this.$http.post("http://localhost:7538/template/post", {
          "elements": this.addedEle,
          "printWidth": templateAreaDiv.clientWidth,
          "printHeight": templateAreaDiv.clientHeight,
          "html": templateAreaDiv.innerHTML,
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
          document.addEventListener("mousedown", this.closeMenu, false)
        }
      },
      popTemplateMenu(e) {
        e.stopPropagation()
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
        this.loadData(this, selected)
      },
      loadData(selected, element) {
        if (!element) {
          element = selected
        }
        selected.horizenPosition = element.horizenPosition
        selected.verticalPosition = element.verticalPosition
        selected.valueName = element.valueName
        selected.exampleData = element.exampleData
        let contentType = element.type
        switch (contentType) {
          case 'text':
            selected.fontHeight = element.fontHeight
            selected.fontWidth = element.fontWidth
            break
          case 'barCode':
            selected.barCodeType = element.barCodeType
            selected.barCodeHeight = element.barCodeHeight
            selected.barCodeWidth = element.barCodeWidth
            selected.barCodeValuePosition = element.barCodeValuePosition
            selected.displayBarCodeValue = element.displayBarCodeValue
            break
        }
      },
      closeDialog(flag) {
        this.centerDialogVisible = false
        if (flag && flag === 'apply') {
          let selected = document.getElementsByClassName("selectedEle")[0];
          selected.style.left = this.horizenPosition + "px"
          selected.style.top = this.verticalPosition + "px"
          selected.horizenPosition = this.horizenPosition
          selected.verticalPosition = this.verticalPosition
          selected.exampleData = this.exampleData
          selected.valueName = this.valueName
          //selected.style.fontSize = "50px"
          let contentType = selected.getAttribute("type");
          if (contentType === 'text') {
            selected.style.transform = "scale(" + (parseInt(this.fontWidth) + 1.5) + "," + (parseInt(this.fontHeight) + 1) + ")"
            selected.fontType = this.fontType
            selected.fontWidth = this.fontWidth
            selected.fontHeight = this.fontHeight
            selected.innerText = this.exampleData
          } else if (contentType === 'barCode') {
            selected.barCodeType = this.barCodeType
            selected.barCodeHeight = parseInt(this.barCodeHeight)
            selected.barCodeWidth = this.barCodeWidth
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

        for (let i = 0; i < parent.childNodes.length; i++) {
          let e = parent.childNodes[i]
          if (e.tagName === 'LI')
            index++
          if (e == currentTarget) {
            break
          }
        }
        contentTypeSelect.style.position = 'absolute'
        contentTypeSelect.style.left = parent.offsetLeft + parent.offsetWidth + 'px'
        contentTypeSelect.style.top = parent.offsetTop + currentTarget.offsetHeight * (index - 1) + 'px'
        this.contentTypeSelectVisible = true
      },
      closeContentTypeSelect(e) {
        let contentTypeSelect = document.getElementById("contentTypeSelect");
        this.contentTypeSelectVisible = false
        for (let i = 0; i < contentTypeSelect.children.length; i++) {
          if (e.toElement == contentTypeSelect.children[i]) {
            this.contentTypeSelectVisible = true
          }
        }
      },
      clearTemplateArea(e) {
        let templateAreaDiv = document.getElementById("templateArea");
        templateAreaDiv.innerHTML = "";
      },
      moveByDirectKey(e) {
        let selectedEle = document.getElementsByClassName("selectedEle")[0];
        let templateAreaDiv = document.getElementById("templateArea");
        var e = window.event || e;
        switch (e.keyCode) {
          case 37: //左
            selectedEle.style.left = Math.max(0, selectedEle.offsetLeft - 1) + "px";
            break;
          case 38: //上
            selectedEle.style.top = Math.max(0, selectedEle.offsetTop - 1) + "px";
            break;
          case 39:  //右
            selectedEle.style.left = Math.min(templateAreaDiv.offsetWidth - 4 - selectedEle.offsetWidth, selectedEle.offsetLeft + 1) + "px";
            break;
          case 40:  //下
            selectedEle.style.top = Math.min(templateAreaDiv.offsetHeight - 4 - selectedEle.offsetHeight, selectedEle.offsetTop + 1) + "px";
            break;
        }
      }
    }
  }
</script>

<style scoped>
  span.label {
    display: inline-block;
    font-size: 20px;
    margin-left: 20px;
    width: 80px;
  }
</style>

<style>

  ul.menu {
    z-index: 100;
    cursor: default;
    width: 150px;
    background-color: white;
    border-left: 1px solid #d1d1d1;
    border-top: 1px solid #d1d1d1;
    -moz-box-shadow: 0px 5px 5px #333333;
    -webkit-box-shadow: 0px 5px 5px #333333;
    box-shadow: 2px 2px 2px #b5b5b5;
    padding-left: 0px;
    list-style: none;
    margin: 0px;
  }


  ul.menu li:hover {
    background-color: #e8e8e8;
  }

  ul.menu li {
    height: 28px;
    font-size: 15px;
    font-weight: 500;
    vertical-align: center;
    padding-left: 20px;
    line-height: 28px;
  }

  .selectedEle {
    z-index: 99;
    background-color: #f1f1f1;
  }

  .templateElement {
    z-index: 99;
  }

  img.selectedEle {
    -moz-box-shadow: 2px 2px 5px #333333;
    -webkit-box-shadow: 2px 2px 5px #333333;
    box-shadow: 2px 2px 5px #333333;
  }
</style>
