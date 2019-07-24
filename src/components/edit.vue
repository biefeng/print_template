<template>
  <div id="edit">
    <ul id="editEleMenu" class="menu" v-show="this.attachEle">
      <li v-show="this.contentType==='text'" @mousedown="openEditTemplateDialog($event)">编辑文本</li>
      <li v-show="this.contentType==='barCode'" @mousedown="openEditTemplateDialog($event)">编辑条形码</li>
      <!--<li v-show="this.contentType==='area'" @mousedown="openEditTemplateDialog">编辑区域</li>-->
      <li @mousedown="deleteElement">删除元素</li>
    </ul>
    <ul id="editTemMenu" class="menu" v-show="this.editTemMenu.visible" @mouseleave="closeEditTemMenu">
      <li @mousedown="editAreaDialogVisible =true" v-show="this.editTemMenu.menuType==='template'">编辑模板</li>
      <li @mousedown="editAreaDialogVisible =true" v-show="this.editTemMenu.menuType==='area'">编辑区域</li>
      <li @mousedown="function(e) {
      e.stopPropagation()
      }" @mouseenter="openContentTypeSelect" @mouseleave="closeContentTypeSelect">添加元素
      </li>
      <!--<el-tooltip class="item" effect="light" content="从当前选定的元素开始生效，但不影响其以上的元素。" placement="right">
        <li>设置行高</li>
      </el-tooltip>-->
      <li @mousedown="clearTemplateArea">清除元素</li>
    </ul>

    <ul id="contentTypeSelect" class="menu" v-show="this.contentTypeSelectVisible"
        @mouseenter="editTemMenu.visible=true">
      <li @mousedown="appendElement1($event,'area',editTemMenu.menuType)" v-show="editTemMenu.menuType=='template'">页面
      </li>
      <li @mousedown="appendElement1($event,'text',editTemMenu.menuType)">文本</li>
      <li @mousedown="appendElement1($event,'barCode',editTemMenu.menuType)">条形码</li>
    </ul>

    <div id="template" ref="template"
         style="position: relative;margin: 10px auto;width: 450px;min-height: 220px;border: 3px solid #a3a3a3;background-color: rgba(218,250,238,0.14);padding:50px 5px 50px 5px">

    </div>

    <!--***********************-->


    <el-dialog
      title="提示"
      :visible.sync="editAreaDialogVisible"
      width="30%"
      center>
      <div class="prop-div">
        <span class="label">宽度</span>
        <el-input
          style="width: 120px" v-model="printAreaWidth" placeholder="打印区域宽度"></el-input>
      </div>
      <div class="prop-div">
        <span class="label">高度</span>
        <el-input style="width: 120px" v-model="printAreaHeight" placeholder="打印区域高度"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editAreaDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="closeEditAreaDialog">确 定</el-button>
      </span>
    </el-dialog>
    <br/>
    <el-button style="position: relative;margin: 5px 0px 10px 685px;display:inline-block;" type="primary">保存模板
    </el-button>
    <el-button style="position: relative;display:inline-block;" type="primary" @click="e=>{this.$router.back()}">返回
    </el-button>
    <!--<div id="templateArea"
         style="position: relative;margin: 10px auto;width: 450px;height: 220px;border: 3px solid #a3a3a3;background-color: rgba(218,250,238,0.14)">
    </div>-->
    <el-dialog title="编辑格式" :visible.sync="editElementDialogVisible" width="30%" center>
      <span style="/*display: block;*/margin-top: 10px;">
        <div class="prop-div">
          <span class="label">水平定位</span>
          <el-input v-model="horizenPosition" style="width: 120px;margin-left: 10px" placeholder="请输入内容"></el-input>
        </div>
        <div class="prop-div">
          <span class="label">垂直定位</span>
          <el-input v-model="verticalPosition" style="width: 120px;margin-left: 10px" placeholder="请输入内容"></el-input>
        </div>
        <div class="prop-div" v-show="printMode==1">
          <span class="label">行高</span>
          <el-input v-model="lineHeight" style="width: 120px;margin-left: 10px" placeholder="请输入内容"></el-input>
        </div>
        <div class="prop-div">
          <span class="label">键</span>
          <el-input v-model="valueName" style="width: 120px;margin-left: 10px" placeholder="请输入内容"></el-input>
        </div>
        <div class="prop-div">
          <span class="label">值</span>
          <el-input v-model="exampleData" style="width: 120px;margin-left: 10px" placeholder="请输入内容"></el-input>
        </div>
        <div class="prop-div" v-show="this.contentType==='text'">
          <span class="label">字宽：</span>
          <el-select style="width:120px;margin-left: 10px" v-model="fontWidth" placeholder="请选择">
            <el-option
              v-for="item in fontWidthSelect"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="prop-div" v-show="this.contentType==='text'">
          <span class="label">字高</span>
          <el-select v-model="fontHeight" style="width:120px;margin-left: 10px; " placeholder="请选择">
            <el-option
              v-for="item in fontHeightSelect"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="prop-div" v-show="contentType==='text'">
          <span class="label">字体</span>
          <el-select style="width:120px;margin-left: 10px" v-model="fontType" placeholder="请选择">
            <el-option
              v-for="item in fontTypeSelect"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="prop-div" v-show="this.contentType==='barCode'">
          <span class="label">线条宽度</span>
          <el-select v-model="barCodeWidth" style="width:120px;margin-left: 10px" placeholder="请选择">
            <el-option
              v-for="item in barCodeWidthSelect"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="prop-div" v-show="this.contentType==='barCode'">
          <span class="label">条码高度</span>
          <el-input v-model="barCodeHeight" style="width: 120px;margin-left: 10px" placeholder="请输入内容"></el-input>
        </div>
        <div class="prop-div" v-show="this.contentType==='barCode'">
          <span class="label">条码类型</span>
          <el-select v-model="barCodeType" style="width:120px;margin-left: 10px" placeholder="请选择">
            <el-option
              v-for="item in barCodeTypeSelect"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="prop-div" v-show="this.contentType==='barCode'" style="display: inline-block;margin-top: 10px;">
          <span class="label">显示数据</span>
          <el-select v-model="displayBarCodeValue" style="width:120px;margin-left: 10px" placeholder="请选择">
            <el-option
              v-for="item in displayBarCodeValueSelect"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="prop-div" v-show="this.contentType==='barCode' && this.displayBarCodeValue==true">
          <span class="label">数据位置</span>
          <el-select v-model="barCodeValuePosition" style="width:120px;margin-left: 10px" placeholder="请选择">
            <el-option
              v-for="item in barCodeValuePositionSelect"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeEditTemplateDialog($event,'cancel')">取 消</el-button>
        <el-button type="primary" @click="closeEditTemplateDialog($event,'apply')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import Sortable from 'sortablejs'
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
  const DEFAULT_HEIGHT = 100

  var index = 1
  export default {
    name: 'edit',
    data() {
      return {
        editElementDialogVisible: false,
        editAreaDialogVisible: false,
        editBarCodeDialogVisible: false,
        editTemMenu: {visible: false, menuType: "template"},
        contentTypeSelectVisible: false,
        horizenPosition: 0,
        verticalPosition: 0,
        lineHeight: 20,
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
        'selectedItem': {},
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
    updated() {
      new Sortable(template, {
        animation: 200,
        chosenClass: "sortable-chosen",  // Class name for the chosen item
        dragClass: "sortable-drag"
      })
      let draggableElements = Array.prototype.slice.call(document.getElementsByClassName("draggableFlag"));
      let selectedElementFun = this.selectedElementFun
      draggableElements.forEach(e => {
        let draggable = new PlainDraggable(e);
        draggable.onMove = function (p) {
          //console.log('left: %d top %d', p.left - template.offsetLeft - e.parentElement.offsetLeft, p.top - template.offsetTop - e.parentElement.offsetTop)
        }
        draggable.onDragStart = selectedElementFun
      })
    },
    mounted() {
      let templateAreaDiv = document.getElementById("template");
      templateAreaDiv.addEventListener("contextmenu", this.popTemplateMenu, false)
      let contentTyleSelect = document.getElementById("contentTypeSelect");
      //设置false，禁止对子元素事件进行捕获
      contentTyleSelect.addEventListener("mouseleave", this.closeContentTypeSelect, {capture: false})
      //接收参数
      this.printMode = this.$route.params.printMode ? this.$route.params.printMode : this.printMode
      this.printerType = this.$route.params.printerType ? this.$route.params.printerType : this.printerType
      // this.loadTemplates(this.$route.params.row)
    },
    created() {
      // document.addEventListener('keydown', this.moveByDirectKey)
    },
    methods: {
      appendElement1(e, type, menuType) {
        let template = this.editTemMenu.target
        /*let template = document.getElementById("template");
        if (menuType == 'template') {
          template = document.getElementById("template");
        }else if(menuType == 'area'){
          template = document.getElementsByClassName("selectedItem");
        }*/
        let element;
        if (menuType == 'template') {
          let selectedItem = document.getElementsByClassName("selectedItem")[0];
          if (selectedItem) {
            selectedItem.classList.remove("selectedItem")
          }
          element = document.createElement("div");
          element.style.position = 'relative'
          element.style.backgroundColor = 'yellow'
          element.style.width = "100%"
          element.classList.add("selectedItem")
          switch (type) {
            case 'area':
              element.setAttribute("type", "area")
              element.style.height = 500 + "px"
              element.style.lineHeight = 500 + "px"
              element.addEventListener("contextmenu", this.popMenu.bind(this, "area"), false)
              element.addEventListener("click", this.selectedItemFun, true)
              break
            case  'text':
              element.setAttribute("type", "text")
              element.style.height = "50px"
              element.style.lineHeight = "50px"
              let textSpan = document.createElement("span");
              textSpan.style.display = "inline-block"
              textSpan.setAttribute("type", "text")
              textSpan.style.margin = "auto"
              textSpan.classList.add("draggableFlag")
              textSpan.textContent = "Hello World"
              textSpan.zIndex = 20
              element.addEventListener("contextmenu", this.popMenu.bind(this, "text"), false)
              element.addEventListener("click", this.selectedItemFun, true)
              element.appendChild(textSpan)
              break
            case "barCode":
              element.setAttribute("type", "barCode")
              element.style.height = BARCODE_HEIGHT + "px"
              element.style.lineHeight = BARCODE_HEIGHT + "px"
              let childElement = document.createElement("img");
              childElement.classList.add("barCodeEle", "draggableFlag")
              // childElement.style.transform = "scale(0.6,0.6);"
              childElement.style.height = "100%"
              childElement.style.width = "150px"
              childElement.barCodeType = BARCODE_TYPE
              childElement.barCodeValuePosition = BARCODE_POS
              childElement.displayBarCodeValue = BARCODE_DISPLAY_VALUE
              childElement.barCodeWidth = BARCODE_WIDTH
              childElement.barCodeHeight = BARCODE_HEIGHT
              childElement.exampleData = 'Hello!'
              element.addEventListener("click", this.selectedItemFun, true)
              element.appendChild(childElement)
              JsBarCode(childElement, childElement.exampleData, {
                format: this.barCodeType,
                lineColor: "black",
                width: 2,
                height: this.barCodeHeight,
                displayValue: true
              })
              break;
            //element.style =element.style+"/*position: absolute;*/cursor:default;transform:scaleX(1.5);font-weight:bolder;text-align:center;vertical-align:center;font-size:13px;padding:0px 10px"
          }
          element.classList.add("selectedItem")
          template.appendChild(element)
        } else if (menuType === 'area') {

          switch (type) {
            case 'text':
              let child = document.createElement("div")
              child.classList.add("draggableFlag", "draggableEle")
              child.style.display = "block"
              child.style.position = 'absolute'
              child.style.height = "30px"
              child.setAttribute("type", "text")
              child.style.lineHeight = "30px"
              child.textContent = "你好"
              child.zIndex = 100
              this.contentType = "text"
              child.addEventListener("contextmenu", this.popMenu.bind(this, "text"), false)
              child.addEventListener("click", this.selectedElementFun, true)
              template.appendChild(child)
              break
            case 'barCode':
              let barCode = document.createElement("img")
              barCode.setAttribute("type", "barCode")
              barCode.classList.add("draggableFlag", "draggableEle")
              barCode.style.display = "inline-block"
              barCode.style.position = 'absolute'
              barCode.style.height = BARCODE_HEIGHT + "px"
              barCode.zIndex = 100
              barCode.exampleData = "Hello!"
              this.contentType = "barCode"
              barCode.addEventListener("contextmenu", this.popMenu.bind(this, "barCode"), false)
              barCode.addEventListener("click", this.selectedElementFun, true)
              template.appendChild(barCode)
              JsBarCode(barCode, barCode.exampleData, {
                format: this.barCodeType,
                lineColor: "black",
                width: 2,
                height: this.barCodeHeight,
                displayValue: true
              })
              break
          }
        }
      },
      selectedItemFun(e) {
        let selected;
        if (e) {
          e.stopPropagation()
          selected = e.currentTarget;
        }
        if (e instanceof CustomEvent) {
          selected = document.getElementsByClassName("sortable-chosen")[0];
        }
        let htmlCollection = document.getElementsByClassName("selectedItem");
        let preSelected = htmlCollection[0]
        if (htmlCollection && htmlCollection.length > 0 && selected != preSelected) {
          let classList = preSelected.classList;
          preSelected.removeEventListener("dragstart", this.ondragstart, true)
          preSelected.removeEventListener("drag", this.ondrag, true)
          classList.remove("selectedItem")
        }
        // selected.onkeydown = this.moveByDirectKey
        //selected.addEventListener("drag", this.ondrag, true)
        //selected.addEventListener("dragstart", this.ondragstart, true)
        document.addEventListener("click", this.cancelSelectedElement, {capture: false, once: true})
        // this.contentType = selected.getAttribute("type")
        selected.classList.add("selectedItem")
        this.contentType = selected.getAttribute("type")
      },
      selectedElementFun(e) {
        let selectedEle = e.currentTarget
        let preSelectedEle = document.getElementsByClassName("selectedEle")[0]
        if (preSelectedEle && selectedEle != preSelectedEle) {
          preSelectedEle.classList.remove("selectedEle")
        }
        selectedEle.classList.add("selectedEle")
        this.contentType = selectedEle.getAttribute("type")
      },
      cancelSelectedElement(e) {
        let selectedItem = document.getElementsByClassName("selectedItem")[0];
        if (selectedItem) {
          selectedItem.classList.remove("selectedItem")
        }
        let selectedEle = document.getElementsByClassName("selectedEle")[0];
        if (selectedEle) {
          selectedEle.classList.remove("selectedEle")
        }
      },
      deleteElement() {
        let template = this.editTemMenu.target
        if (this.editTemMenu.menuType === 'template') {
          let htmlCollection = document.getElementsByClassName("selectedItem");
          if (htmlCollection.length == 0) {
            this.$message.warning("删除需要选定一个元素")
            return
          }
          let selected = htmlCollection[0]
          if (this.attachEle == selected) {
            this.attachEle = undefined
          }
          template.removeChild(selected)
        } else if (this.editTemMenu.menuType === 'area') {
          let htmlCollection = document.getElementsByClassName("selectedEle");
          if (htmlCollection.length == 0) {
            this.$message.warning("删除需要选定一个元素")
            return
          }
          let selected = htmlCollection[0]
          if (this.attachEle == selected) {
            this.attachEle = undefined
          }
          template.removeChild(selected)
        }
      },
      popMenu(flag, e) {
        var event = e || window.event
        if (event.button == 2) {
          event.stopPropagation()
          event.preventDefault();
          var _x = event.clientX,
            _y = event.clientY;
          let editMenuUl
          if (flag === 'template') {
            this.editTemMenu.visible = true
            this.editTemMenu.target = e.currentTarget
            editMenuUl = document.getElementById("editTemMenu");
          } else if (flag == 'area') {
            this.editTemMenu.visible = true
            this.editTemMenu.target = e.currentTarget
            editMenuUl = document.getElementById("editTemMenu");
            this.editTemMenu.menuType = 'area'
            this.selectedItemFun(event)
          } else {
            editMenuUl = document.getElementById("editEleMenu");
            if (this.editTemMenu.menuType === 'template') {
              let selectedEle = e.currentTarget.childNodes[0]
              this.attachEle = selectedEle
              let preSelectedEle = document.getElementsByClassName("selectedEle")[0]
              if (preSelectedEle && selectedEle != preSelectedEle) {
                preSelectedEle.classList.remove("selectedEle")
              }
              selectedEle.classList.add("selectedEle")
              this.selectedItemFun(e)
              this.contentType = selectedEle.getAttribute("type")
            } else {
              this.attachEle = event.currentTarget
              this.selectedElementFun(event)
            }

          }
          editMenuUl.style.position = "absolute"
          editMenuUl.style.left = _x + "px";
          editMenuUl.style.top = _y + "px";
          document.addEventListener("mousedown", this.closeMenu, false)
        }
      },
      popTemplateMenu(e) {
        e.stopPropagation()
        this.editTemMenu.menuType = 'template'
        this.popMenu("template", e)
      },
      closeMenu(e) {
        let editMenuUl = document.getElementById("editEleMenu");
        this.editTemMenu.visible = false
        this.attachEle = undefined
        document.removeEventListener("mousedown", this.closeMenu, false)
      },
      openEditTemplateDialog() {
        this.editElementDialogVisible = true
      },
      closeEditTemplateDialog(e,flag) {
        this.editElementDialogVisible = false
        if (flag === 'apply') {
          console.log(e)
          let elements = document.querySelector(".selectedEle");
          console.log(elements)
        }
      },
      closeEditAreaDialog() {
        this.editAreaDialogVisible = false
        // let templateAreaDiv = document.getElementById("templateArea");
        let templateAreaDiv = this.editTemMenu.target
        templateAreaDiv.style.width = this.printAreaWidth + 'px'
        templateAreaDiv.style.height = this.printAreaHeight + 'px'
      },
      openContentTypeSelect(e) {
        let contentTypeSelect = document.getElementById("contentTypeSelect");
        let currentTarget = e.currentTarget;
        let parent = currentTarget.offsetParent;
        let index = 0

        for (let i = 0; i < parent.childNodes.length; i++) {
          let child = parent.childNodes[i]
          if (child.style && child.style.display != "none" && child.tagName === 'LI')
            index++
          if (child == currentTarget) {
            break
          }
        }
        contentTypeSelect.style.position = 'absolute'
        contentTypeSelect.style.left = parent.offsetLeft + parent.offsetWidth - 1 + 'px'
        contentTypeSelect.style.top = parent.offsetTop + currentTarget.offsetHeight * (index - 1) + 'px'
        this.contentTypeSelectVisible = true
        this.editTemMenu.visible = true
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
        let templateAreaDiv = this.editTemMenu.target
        templateAreaDiv.innerHTML = "";
      },
      moveByDirectKey(e) {
        let selectedItem = document.getElementsByClassName("selectedItem")[0];
        let templateAreaDiv = document.getElementById("templateArea");
        var e = window.event || e;
        switch (e.keyCode) {
          case 37: //左
            selectedItem.style.left = Math.max(0, selectedItem.offsetLeft - 1) + "px";
            break;
          case 38: //上
            selectedItem.style.top = Math.max(0, selectedItem.offsetTop - 1) + "px";
            break;
          case 39:  //右
            selectedItem.style.left = Math.min(templateAreaDiv.offsetWidth - 4 - selectedItem.offsetWidth, selectedItem.offsetLeft + 1) + "px";
            break;
          case 40:  //下
            selectedItem.style.top = Math.min(templateAreaDiv.offsetHeight - 4 - selectedItem.offsetHeight, selectedItem.offsetTop + 1) + "px";
            break;
        }
      },
      closeEditTemMenu(e) {
        this.editTemMenu.visible = false
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
    width: 100px;
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

  .selectedItem {
    z-index: 99;
    background-color: #f1f1f1;
    -moz-box-shadow: 1px 1px 5px #333333;
    -webkit-box-shadow: 1px 1px 5px #333333;
    box-shadow: 1px 1px 5px #333333;
  }

  .selectedEle {
    z-index: 99;
    background-color: #f1f1f1;
    -moz-box-shadow: 2px 2px 5px #333333;
    -webkit-box-shadow: 2px 2px 5px #333333;
    box-shadow: 2px 2px 5px #333333;
  }

  .templateElement {
    z-index: 99;
  }

  div.prop-div {
    display: inline-block;
    margin-top: 10px;
  }

  .draggableEle {
    text-align: center;
    cursor: grab;
  }
</style>
