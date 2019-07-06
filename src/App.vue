<template>
  <div id="app">
    <router-view></router-view>
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
        templates: [],
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
      /*let templateAreaDiv = document.getElementById("templateArea");
      console.log(templateAreaDiv)
      templateAreaDiv.style.width = this.printAreaWidth + 'px'
      templateAreaDiv.style.height = this.printAreaHeight + 'px'
      templateAreaDiv.addEventListener("contextmenu", this.popTemplateMenu)
      let contentTyleSelect = document.getElementById("contentTypeSelect");
      //设置false，禁止子元素进行捕获
      contentTyleSelect.addEventListener("mouseleave", this.closeContentTypeSelect, {capture: false})*/
    },
    updated() {
      /*let templateList = document.getElementById("templateList");
      let loadTemplates = this.loadTemplates
      for (let i = 0; i < templateList.children.length; i++) {
        let child = templateList.children[i]
        child.addEventListener("click", function () {
          loadTemplates(child.getAttribute("index"))
        })
      }*/
    },
    created() {
      /*this.$http.get("http://localhost:7538/template/list").then(res => {
        this.templates = res.data;
      })*/
    },
    methods: {
      /*加载模板，即预览功能*/
      loadTemplates(index) {
        //闭包实现参数绑定
        let templates = this.templates
        let templateAreaDiv = document.getElementById("templateArea")

        let html = templates[index].html;
        templateAreaDiv.style.width = templates[index].printWidth + "px"
        templateAreaDiv.style.height = templates[index].printHeight + "px"
        templateAreaDiv.innerHTML = html

        let collection = document.getElementsByClassName("templateElement");
        for (let i = 0; i < collection.length; i++) {
          collection[i].addEventListener("mousedown", this.selectedElement, true)
          collection[i].addEventListener("contextmenu", this.popMenu)
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
            childElement.style = "position: absolute;top:100px;cursor:default;font-weight:bolder;text-align:center;vertical-align:center;font-size:13px;padding:0px 10px"
            break;
          case 'barCode':
            childElement = document.createElement("img");
            childElement.classList.add("barCodeEle")
            childElement.setAttribute("type", "barCode")
            childElement.style = "position: absolute;top:100px;cursor:default"
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
        this.$http.post("http://localhost:7538/template/add", {
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
        this.horizenPosition = selected.offsetLeft
        this.verticalPosition = selected.offsetTop
        this.valueName = selected.valueName
        this.exampleData = selected.exampleData
        switch (this.contentType) {
          case 'text':
            this.fontHeight = selected.fontHeight
            this.fontWidth = selected.fontWidth
            break
          case 'barCode':
            this.barCodeType = selected.barCodeType
            this.barCodeHeight = selected.barCodeHeight
            this.barCodeWidth = selected.barCodeWidth
            this.barCodeValuePosition = selected.barCodeValuePosition
            this.displayBarCodeValue = selected.displayBarCodeValue
            break
        }
      },
      closeDialog(flag) {
        this.centerDialogVisible = false
        if (flag && flag === 'apply') {
          let selected = document.getElementsByClassName("selectedEle")[0];
          selected.style.left = this.horizenPosition + "px"
          selected.style.top = this.verticalPosition + "px"
          selected.exampleData = this.exampleData
          selected.valueName = this.valueName
          //selected.style.fontSize = "50px"
          if (this.contentType === 'text') {
            selected.style.transform = "scale(" + (parseInt(this.fontWidth) + 1.5) + "," + (parseInt(this.fontHeight) + 1) + ")"
            selected.fontType = this.fontType
            selected.fontWidth = this.fontWidth
            selected.fontHeight = this.fontHeight
            selected.innerText = this.exampleData
            /*this.valueName = undefined
            this.fontType = undefined
            this.fontWidth = undefined
            this.fontHeight = undefined
            this.exampleData = undefined*/
          } else if (this.contentType === 'barCode') {
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
      closeContentTypeSelect(e) {
        let contentTypeSelect = document.getElementById("contentTypeSelect");
        this.contentTypeSelectVisible = false
        for (let i = 0; i < contentTypeSelect.children.length; i++) {
          if (e.toElement == contentTypeSelect.children[i]) {
            this.contentTypeSelectVisible = true
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


</style>
