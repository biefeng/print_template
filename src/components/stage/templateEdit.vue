<template>
    <div id="edit" >
        <ul id="editEleMenu" class="print-template-menu" v-show="this.attachEle">
            <li v-show="this.contentType==='textLine'" @mousedown="appendText">添加文本</li>
            <li @mousedown="deleteElement">删除元素</li>
        </ul>

        <ul id="editTextMenu" class="print-template-menu" v-show="this.textMenuVisiblity==true">
            <li @mousedown="deleteText">删除文本</li>
        </ul>

        <ul id="editTemMenu" class="print-template-menu" v-show="this.editTemMenu.visible"
            @mouseleave="closeEditTemMenu">
            <li @mousedown="editAreaDialogVisible =true" v-show="this.editTemMenu.menuType==='area'">编辑区域</li>
            <li @mousedown="function(e) {e.stopPropagation()}" @mouseenter="openContentTypeSelect"
                @mouseleave="closeContentTypeSelect">添加元素
            </li>
            <li @mousedown="deleteElement" v-show="this.editTemMenu.menuType==='area'">删除区域</li>
            <li @mousedown="clearTemplateArea">清除元素</li>
        </ul>

        <ul id="contentTypeSelect" class="print-template-menu" v-show="this.contentTypeSelectVisible"
            @mouseenter="editTemMenu.visible=true">
            <li @mousedown="appendElement1($event,'area',editTemMenu.menuType)"
                v-show="editTemMenu.menuType=='template'">页面
            </li>
            <li @mousedown="appendElement1($event,'textLine',editTemMenu.menuType)">文本行</li>
            <li @mousedown="appendElement1($event,'barCode',editTemMenu.menuType)">条形码</li>
            <li @mousedown="appendElement1($event,'qrCode',editTemMenu.menuType)">二维码</li>
        </ul>

        <div style="text-align:left">
            <div
                style="width: 470px;z-index: -1;text-align: left;margin: 100px auto;margin-bottom: 0px;display: inline-block">
                <div id="print-template-name">
                    <el-input :disabled="templateLoaded.editable" v-model="templateLoaded.value"
                              placeholder="请输入模板名称"></el-input>
                </div>
                <div id="template" ref="template" @click="cancelSelectedElement"
                     style="z-index:10;position: relative;margin: 10px auto;width: 450px;min-height: 220px;border: 3px solid #808080;border-radius: 3px;background-color: rgba(204,204,204,0.81);padding:50px 5px 50px 5px">
                </div>
                <el-button style="position: relative;margin: auto;display:inline-block;" type="primary"
                           @click="submitTemplate('save')">保存模板
                </el-button>
                <el-button style="position: relative;display:inline-block;" type="success"
                           @click="submitTemplate('export')">导出模板
                </el-button>
                <el-button style="position: relative;display:inline-block;" type="success"
                           @click="testPrint">测试打印
                </el-button>
                <el-button style="position: relative;display:inline-block;" type="info"
                           @click="e=>{this.$router.back()}">返回
                </el-button>
            </div>
            <div style="position: absolute;display: inline-block;margin-left: 40px">
                <div id="edit-template-panel" v-show="this.editElementDialogVisible"
                     style="margin-top :250px;width: 470px;text-align: left;border: 1px solid #cacaca;border-radius: 10px;position: absolute;display: inline-block">
                <span style="margin-top: 10px;">
                    <div class="prop-div"
                         v-show="this.contentType!='barCode'&&this.contentType!='qrCode' && this.editTemMenu.menuType!='area'">
                      <span class="label">水平定位</span>
                      <el-input v-model="horizenPosition" type="number" style="width: 120px;margin-left: 10px"
                                placeholder="请输入内容"></el-input>
                    </div>
                    <div class="prop-div"
                         v-show="this.contentType!='barCode'&&this.contentType!='qrCode' && this.editTemMenu.menuType!='area'">
                      <span class="label">垂直定位</span>
                      <el-input v-model="verticalPosition" style="width: 120px;margin-left: 10px"
                                placeholder="请输入内容"></el-input>
                    </div>
                    <div class="prop-div" v-show="this.contentType!='textLine'">
                      <span class="label">行高</span>
                      <el-input v-model="lineHeight" style="width: 120px;margin-left: 10px"
                                placeholder="请输入内容"></el-input>
                    </div>
                    <div class="prop-div">
                      <span class="label">键</span>
                      <el-input v-model="valueName" style="width: 120px;margin-left: 10px"
                                placeholder="请输入内容"></el-input>
                    </div>
                    <div class="prop-div">
                      <span class="label">值</span>
                      <el-input v-model="exampleData" style="width: 120px;margin-left: 10px"
                                placeholder="请输入内容"></el-input>
                    </div>
                    <div class="prop-div" v-show="this.contentType==='textLine'">
                      <span class="label">Label</span>
                      <el-input v-model="textLabel" style="width: 120px;margin-left: 10px"
                                placeholder="请输入标签内容"></el-input>
                    </div>
                    <div class="prop-div" v-show="this.contentType==='textLine'">
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
                    <div class="prop-div" v-show="this.contentType==='textLine'">
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
                    <div class="prop-div" v-show="contentType==='textLine'">
                      <span class="label">粗体</span>
                      <el-select v-model="border" style="width:120px;margin-left: 10px; " placeholder="请选择">
                        <el-option
                            v-for="item in borderSelect"
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
                    <div class="prop-div" v-show="this.contentType==='barCode' || this.contentType==='qrCode'">
                      <span class="label">高度</span>
                      <el-input v-model="barCodeHeight" style="width: 120px;margin-left: 10px"
                                placeholder="请输入内容"></el-input>
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
                    <div class="prop-div" v-show="this.contentType==='barCode'"
                         style="display: inline-block;margin-top: 10px;">
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
                    <el-button @click="editElementDialogVisible=false" type="danger">关闭</el-button>
                    <el-button type="success" @click="closeEditTemplateDialog($event,'apply') ">应用</el-button>
                </span>
                </div>

                <div id="edit-textLine-panel" v-show="this.editItemDialogVisible && this.contentType=='textLine'"
                     style="top :140px;width: 470px;text-align: left;border: 1px solid #cacaca;border-radius: 10px;position: absolute;">
                <span style="/*display: block;*/margin-top: 10px;">
                    <div class="prop-div"
                         v-show="this.contentType!='barCode'&&this.contentType!='qrCode' && this.editTemMenu.menuType!='area'">
                      <span class="label">行高</span>
                      <el-input v-model="lineHeight" style="width: 120px;margin-left: 10px"
                                placeholder="请输入内容"></el-input>
                    </div>

                    <div class="prop-div"
                         v-show="this.contentType!='barCode'&&this.contentType!='qrCode' && this.editTemMenu.menuType!='area'">
                      <span class="label">键</span>
                      <el-input v-model="textLineValueName" style="width: 120px;margin-left: 10px"
                                placeholder="请输入内容"></el-input>
                    </div>
                </span>
                    <span slot="footer" class="dialog-footer">
                    <el-button @click="editItemDialogVisible=false" type="danger">关闭</el-button>
                    <el-button type="success" @click="closeEditItemDialog">应用</el-button>
                </span>
                </div>
            </div>

        </div>
        <div v-show="printPanelVisiblity"
             style="margin-top: 10px;right:10px;width: 470px;text-align: left;border: 1px solid #cacaca;border-radius: 10px;position: absolute;">
            <div style="margin: 10px;width: 450px"><span
                style="font-size: 10px;font-family: 'Microsoft YaHei UI';display: inline-block;height:25px;line-height: 25px;margin-right: 10px;padding:0px 5px;border-radius: 3px;background-color: #f7f7f7;border:1px solid #eeeeee">打印机IP</span>
                <div style="display: inline-block">
                    <el-input v-model="printerIp" placeholder="0.0.0.0"></el-input>
                </div>
                <div style="margin: 10px 0px">
                    <el-input
                        type="textarea"
                        :rows="8"
                        placeholder="请输入内容"
                        v-model="printContent">
                    </el-input>
                </div>
                <div style="text-align: right">
                    <el-button @click="this.printPanelVisiblity=false" type="danger">关闭</el-button>
                    <el-button @click="this.printByXml" type="success">打印</el-button>
                </div>
            </div>

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
    </div>
</template>

<script>
    import Sortable from 'sortablejs'
    import JsBarCode from 'jsbarcode'
    import * as api from "../../api"
    import PlainDraggable from "~@/plain-draggable.min"
    import ePOSBuilder from "../../api/ePOSBulider"
    import ePOSPrinter from "../../api/ePOSPrinter"
    import QRCode from "qrcode"


    const FONT_WIDTH = 1
    const FONT_HEIGHT = 1
    const FONT_TYPE = "A"
    const BARCODE_WIDTH = 2
    const BARCODE_HEIGHT = 100
    const BARCODE_DISPLAY_VALUE = false
    const BARCODE_TYPE = 'code128'
    const BARCODE_POS = 'bottom'
    const DEFAULT_HORIZEN_POS = 100
    const DEFAULT_VERTICAL_POS = 100
    const DEFAULT_LINE_HEIGHT = 20
    const DEFAULT_HEIGHT = 100
    const DEFAULT_WIDTH = 100

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
                editItemDialogVisible: false,
                printPanelVisiblity: false,
                textMenuVisiblity: false,
                verticalPosition: 0,
                lineHeight: 20,
                textLineValueName: "",
                printerIp: "10.128.36.242",
                printContent: '',
                template: {},
                templateList: [],
                templateLoaded: {
                    value: '',
                    editable: false
                },
                printerType: 0,
                printMode: 0,
                contentTypeSelect: [{
                    value: 'textLine',
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
                border: 0,
                borderSelect: [
                    {
                        value: 1,
                        label: "是"
                    }, {
                        value: 0,
                        label: "否"
                    }
                ],
                contentType: 'textLine',
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
                languageSelect: [{
                    value: 'zh-cn',
                    label: '简体中文'
                }],
                language: 'zh-cn',
                'selectedItem': {},
                "addedEle": [],
                "attachEle": undefined,
                valueName: '',
                exampleData: '',
                textLabel: '',
                fontWidthSelect: [
                    {
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
                fontHeightSelect: [
                    {
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
                    value: 'code128',
                    label: 'CODE128'
                }, {
                    value: 'upc',
                    label: 'UPC'
                }, {
                    value: 'ean13',
                    label: 'EAN13'
                }, {
                    value: 'ean8',
                    label: 'EAN8'
                }, {
                    value: 'code39',
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
                        value: 'above',
                        label: '上'
                    }, {
                        value: 'bottom',
                        label: '下'
                    }, {
                        value: 'both',
                        label: "上下"
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
            let handleBarcodePosition = this.handleBarcodePosition
            draggableElements.forEach(e => {

                let draggable = new PlainDraggable(e);
                draggable.onMove = function (p) {
                    e.horizenPosition = parseInt(p.left - template.offsetLeft - e.parentElement.offsetLeft)
                    e.verticalPosition = parseInt(p.top - template.offsetTop - e.parentElement.offsetTop)
                    //console.log('left: %d top %d', p.left - template.offsetLeft - e.parentElement.offsetLeft, p.top - template.offsetTop - e.parentElement.offsetTop)
                    handleBarcodePosition(p)
                }
                draggable.onDragStart = selectedElementFun
                draggable.onDragEnd=function (p) {
                    this.horizenPosition=e.horizenPosition
                    this.verticalPosition=e.verticalPosition
                }
            })
        },
        mounted() {
            let templateAreaDiv = document.getElementById("template");
            templateAreaDiv.addEventListener("contextmenu", this.popTemplateMenu, false)
            let contentTyleSelect = document.getElementById("contentTypeSelect");
            //设置false，禁止对子元素事件进行捕获
            contentTyleSelect.addEventListener("mouseleave", this.closeContentTypeSelect, {capture: false})
        },
        created() {
            // document.addEventListener('keydown', this.moveByDirectKey)
        },
        watch: {
            '$route.params': {
                handler: function(to, from)  {
                    this.$nextTick(()=>{
                        this.loadTemplate(this.$route.params.row)
                    })

                },
                immediate: true
            }
        },
        methods: {
            loadTemplate(row) {
                this.clearTemplate()
                if (row) {
                    this.templateLoaded.value = row.templateName
                    this.templateLoaded.id = row.id
                    this.templateLoaded.editable = true
                    let elements = row.elements;
                    this.handleAttr(elements)
                }
            },
            clearTemplate() {
                let template = document.querySelector("#template")
                template.innerHTML = ""
                this.templateLoaded = {}
            },
            deleteTemplate(index, row) {
                if (row && row.id === this.templateLoaded.id) {
                    this.clearTemplate()
                }
                api.deleteTemplate({
                    id: row.id
                }).then(res => {
                    this.$message({
                        message: "删除成功！",
                        type: "success"
                    })
                    this.listTemplates()
                })
            },
            appendElement1(e, type, menuType, prop) {
                let template = this.editTemMenu.target
                if (!template) {
                    template = document.querySelector("#template")
                }
                let element;
                if (menuType == 'template') {
                    let selectedItem = document.getElementsByClassName("selectedItem")[0];
                    if (selectedItem) {
                        selectedItem.classList.remove("selectedItem")
                    }
                    element = document.createElement("div");
                    element.style.position = 'relative'
                    element.style.backgroundColor = '#A7A7A7'
                    element.style.width = "100%"
                    element.classList.add("selectedItem")
                    element.setAttribute("parent", "template")
                    switch (type) {
                        case 'area':
                            element.setAttribute("type", "area")
                            element.style.height = 500 + "px"
                            element.style.lineHeight = 500 + "px"
                            element.addEventListener("contextmenu", this.popMenu.bind(this, "area"), false)
                            element.addEventListener("click", this.selectedItemFun, true)
                            break
                        case  'textLine' || 'feed':
                            element.setAttribute("type", "textLine")
                            element.style.height = "18.5px"
                            element.addEventListener("click", this.selectedItemFun, true)
                            element.addEventListener("contextmenu", this.popMenu.bind(this, "textLine"), {capture: false})
                            if (prop && prop.children) {
                                this.textLineValueName = prop.valueName
                                this.lineHeight = prop.lineHeight
                                prop.children.forEach(item => {
                                    let attr = {}
                                    attr['horizenPosition'] = item.attr.x
                                    attr['verticalPosition'] = item.attr.y
                                    attr['exampleData'] = item.exampleData
                                    attr['fontHeight'] = item.attr.height
                                    attr['lineHeight'] = prop.lineHeight
                                    attr['fontWidth'] = item.attr.width
                                    attr['textLabel'] = item.textLabel
                                    attr['valueName'] = item.valueName
                                    attr['type'] = item.type
                                    attr['border']=item.border
                                    attr['lang'] = item.attr.lang
                                    attr['type'] = item.type
                                    attr.getAttribute = (name) => {
                                        return attr[name]
                                    }
                                    this.appendText(e, element, attr)
                                })
                            } else {
                                this.appendText(e, element, null)
                            }
                            element.valueName = this.textLineValueName
                            element.lineHeight = this.lineHeight
                            break
                        case "barCode":
                            element.setAttribute("type", "barCode")
                            element.style.height = BARCODE_HEIGHT + "px"
                            // element.style.lineHeight = BARCODE_HEIGHT + "px"
                            let childElement = document.createElement("img");
                            childElement.setAttribute("type", "barCode")
                            childElement.classList.add("barCodeEle", "draggableFlag")
                            // childElement.style.transform = "scale(0.6,0.6);"
                            childElement.style.height = "100%"
                            childElement.style.width = "150px"
                            childElement.barCodeType = BARCODE_TYPE
                            childElement.barCodeValuePosition = BARCODE_POS
                            childElement.displayBarCodeValue = BARCODE_DISPLAY_VALUE
                            childElement.barCodeWidth = BARCODE_WIDTH
                            childElement.barCodeHeight = BARCODE_HEIGHT
                            childElement.lineHeight = DEFAULT_LINE_HEIGHT
                            childElement.exampleData = 'Hello!'
                            // childElement.align = 'left'
                            element.addEventListener("contextmenu", this.popMenu.bind(this, "barCode"), false)
                            element.addEventListener("click", this.selectedItemFun, true)
                            if (prop && prop.align) {
                                element.style.textAlign = prop.align
                                childElement['align'] = prop['align']
                                element.style.height = prop['barCodeHeight'] + "px"
                                this.displayBarCodeValue = prop['displayBarCodeValue']
                                this.barCodeValuePosition = prop['barCodeValuePosition']
                                this.barCodeHeight = prop['barCodeHeight']
                                this.barCodeType = prop['barCodeType']
                                this.loadData(childElement, prop)
                            } else {
                                this.displayBarCodeValue = false
                            }
                            element.appendChild(childElement)
                            JsBarCode(childElement, childElement.exampleData, {
                                format: this.barCodeType,
                                lineColor: "black",
                                width: 2,
                                height: this.barCodeHeight,
                                displayValue: this.displayBarCodeValue,
                                textPosition: (function (p) {
                                    if (p === 'above')
                                        return 'top'
                                })(this.barCodeValuePosition)
                            })
                            break;

                        case 'qrCode':
                            let qrcode = document.createElement("canvas");

                            qrcode.classList.add("draggableFlag")
                            element.setAttribute("type", "qrCode")
                            qrcode.setAttribute("type", "qrCode")
                            qrcode.exampleData = "Hello World!"
                            qrcode.align = "left"
                            qrcode.lineHeight = DEFAULT_LINE_HEIGHT

                            if (prop && prop.align) {
                                element.style.textAlign = prop['align']
                                qrcode.align = prop['align']
                                this.qrCodeHeight = prop['barCodeHeight']
                                this.loadData(qrcode, prop)
                            } else {
                                this.barCodeHeight = DEFAULT_WIDTH
                            }
                            QRCode.toCanvas(qrcode, "Hello World!你好", {width: this.qrCodeHeight}, (error) => {
                                console.log(error)
                            })
                            qrcode.qrCodeHeight = this.qrCodeHeight
                            element.addEventListener("contextmenu", this.popMenu.bind(this, "qrCode"), false)
                            element.addEventListener("click", this.selectedItemFun, true)
                            element.appendChild(qrcode)
                            element.style.height = qrcode.height - 1 + "px"
                            break;

                        //element.style =element.style+"/*position: absolute;*/cursor:default;transform:scaleX(1.5);font-weight:bolder;text-align:center;vertical-align:center;font-size:13px;padding:0px 10px"
                    }
                    element.classList.add("selectedItem")
                    template.appendChild(element)
                } else if (menuType === 'area') {

                    switch (type) {
                        case 'textLine':
                            let child = document.createElement("div")
                            child.setAttribute("parent", "area")
                            child.classList.add("draggableFlag", "draggableEle")
                            child.style.display = "block"
                            child.style.position = 'absolute'
                            child.style.height = "30px"
                            child.style.whiteSpace = "pre"
                            child.setAttribute("type", "textLine")
                            child.style.lineHeight = "30px"
                            child.textContent = "你好"
                            child.zIndex = 100
                            this.contentType = "textLine"
                            child.addEventListener("contextmenu", this.popMenu.bind(this, "textLine"), false)
                            child.addEventListener("click", this.selectedElementFun, true)
                            template.appendChild(child)
                            break
                        case 'barCode':
                            let barCode = document.createElement("img")
                            barCode.setAttribute("parent", "area")
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
                //document.addEventListener("click", this.cancelSelectedElement, {capture: false, once: true})
            },
            appendText(e, element, prop) {
                if (!element) {
                    element = document.querySelector(".selectedItem")
                }
                let textSpan = document.createElement("span");
                textSpan.style.display = "inline-block"
                textSpan.style.whiteSpace = "pre"
                textSpan.setAttribute("type", "text")
                textSpan.style.margin = "auto"
                textSpan.classList.add("draggableFlag")
                textSpan.textContent = "Hello World"
                textSpan.lineHeight = DEFAULT_LINE_HEIGHT
                textSpan.zIndex = 100
                textSpan.border=0
                textSpan.fontType = FONT_TYPE
                textSpan.fontWidth = FONT_WIDTH
                textSpan.fontHeight = FONT_HEIGHT
                //textSpan.addEventListener("contextmenu", this.popMenu.bind(this, "text"))
                textSpan.addEventListener("click", (e) => {
                    alert(1)
                })
                textSpan.addEventListener("contextmenu", this.textMousedownResponse)
                if (prop) {
                    textSpan.textContent = prop.exampleData;
                    textSpan.style.marginLeft = String(prop.horizenPosition ? prop.horizenPosition : 0) + "px"
                    textSpan.style.marginTop = String(prop.verticalPosition ? prop.verticalPosition : 0) + "px"
                    this.loadData(textSpan, prop)
                }
                element.appendChild(textSpan)
            },
            textMousedownResponse(e) {
                e.preventDefault()
                e.stopPropagation()
                var _x = this.mouseX(event),
                    _y = this.mouseY(event);
                let editMenuUl = document.getElementById("editTextMenu")
                this.textMenuVisiblity = true
                editMenuUl.style.position = "absolute"
                editMenuUl.style.left = _x + "px";
                editMenuUl.style.top = _y + "px";

                let selectedItem = e.currentTarget.parentNode
                let htmlCollection = document.getElementsByClassName("selectedItem");
                let preSelected = htmlCollection[0]
                if (htmlCollection && htmlCollection.length > 0 && selectedItem != preSelected) {
                    let classList = preSelected.classList;
                    classList.remove("selectedItem")
                }
                selectedItem.classList.add("selectedItem")
                this.contentType = selectedItem.getAttribute("type")

                document.addEventListener("mousedown", this.closeMenu, {capture: true, once: true})
            },
            handleAttr(elements) {
                if (elements && elements.length > 0) {
                    elements.forEach(e => {
                        let attr = {}
                        if (e.type === 'area') {
                            attr['parent'] = 'area'
                        } else if (e.type === 'textLine') {
                            this.appendElement1(null, e.type, 'template', e)
                            return
                        } else {
                            attr['parent'] = 'template'
                        }
                        attr['horizenPosition'] = e.attr.x
                        attr['verticalPosition'] = e.attr.y
                        attr['exampleData'] = e.exampleData
                        attr['barCodeType'] = e.attr.type
                        attr['fontHeight'] = e.attr.height
                        attr['lineHeight'] = e.lineHeight
                        attr['barCodeHeight'] = e.attr.height
                        attr['barCodeWidth'] = e.attr.width
                        attr['fontWidth'] = e.attr.width
                        attr['valueName'] = e.valueName
                        attr['border']=e.attr.border
                        attr['textLabel'] = e.textLabel
                        attr['align'] = e.attr.align
                        attr['type'] = e.type
                        attr['lang'] = e.attr.lang
                        attr.getAttribute = function (name) {
                            return attr[name]
                        }
                        if (!e.attr.hri || e.attr.hri === 'none') {
                            attr['displayBarCodeValue'] = false
                        } else {
                            attr['displayBarCodeValue'] = true
                            attr['barCodeValuePosition'] = e.attr.hri
                        }


                        if (e.type === 'area') {
                            this.appendElement1(null, e.type, 'area', attr)
                        } else {
                            this.appendElement1(null, e.type, 'template', attr)
                        }
                    })
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

                //selected.addEventListener("drag", this.ondrag, true)
                //selected.addEventListener("dragstart", this.ondragstart, true)
                //document.addEventListener("click", this.cancelSelectedElement, {capture: false, once: true})
                // this.contentType = selected.getAttribute("type")
                selected.classList.add("selectedItem")
                this.contentType = selected.getAttribute("type")
                if (this.contentType === 'textLine') {
                    this.editItemDialogVisible = true
                    this.textLineValueName = selected.valueName
                }
            },
            selectedElementFun(e) {
                let selectedEle = e.currentTarget
                let preSelectedEle = document.getElementsByClassName("selectedEle")[0]
                if (preSelectedEle && selectedEle != preSelectedEle) {
                    preSelectedEle.classList.remove("selectedEle")
                }
                selectedEle.onkeydown = this.moveByDirectKey
                selectedEle.classList.add("selectedEle")
                this.contentType = selectedEle.getAttribute("type")
                this.openEditTemplateDialog()
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
                this.editTemMenu.menuType = 'template'
                this.editTemMenu.target = document.querySelector("#template")
                this.editElementDialogVisible = false
                this.editItemDialogVisible = false
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
                        let root = document.getElementById("template");
                        root.removeChild(template)
                        return
                    }
                    let selected = htmlCollection[0]
                    if (this.attachEle == selected) {
                        this.attachEle = undefined
                    }
                    template.removeChild(selected)
                }
            },
            deleteText(e) {
                let parentNode = document.querySelector(".selectedItem");
                let childNode = document.querySelector(".selectedEle");
                parentNode.removeChild(childNode)
            },
            popMenu(flag, e) {
                var event = e || window.event
                let currentTarget = event.currentTarget;
                let parent = currentTarget.getAttribute("parent");
                if (parent === 'template') {
                    this.editTemMenu.menuType = 'template'
                } else if (parent === 'area') {
                    this.editTemMenu.menuType = 'area'
                }
                if (event.button == 2) {
                    event.stopPropagation()
                    event.preventDefault();
                    var _x = this.mouseX(event),
                        _y = this.mouseY(event);
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
                    } else if (flag == 'textLine') {
                        editMenuUl = document.querySelector("#editEleMenu");
                        let selectedEle = e.currentTarget.childNodes[0]
                        this.attachEle = selectedEle
                        let preSelectedEle = document.getElementsByClassName("selectedEle")[0]
                        if (preSelectedEle && selectedEle != preSelectedEle) {
                            preSelectedEle.classList.remove("selectedEle")
                        }
                        selectedEle.classList.add("selectedEle")
                        this.selectedItemFun(e)
                        this.contentType = flag;
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
                            this.attachEle = currentTarget
                            this.selectedElementFun(event)
                        }

                    }
                    editMenuUl.style.position = "absolute"
                    editMenuUl.style.left = _x + "px";
                    editMenuUl.style.top = _y + "px";
                    document.addEventListener("mousedown", this.closeMenu, {capture: true, once: true})
                }
            },
            mouseX(evt) {
                if (evt.clientX)
                    return evt.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
                else return null;
            },
            mouseY(evt) {
                if (evt.clientY)
                    return evt.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
                else return null;
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
                this.textMenuVisiblity = false
                /*document.removeEventListener("mousedown", this.closeMenu, false)*/
            },
            openEditTemplateDialog() {
                this.editElementDialogVisible = true
                let selectedEle = document.querySelector(".selectedEle");
                this.loadData(this, selectedEle)
            },
            loadData(element, selected) {
                if (!selected) {
                    return
                }
                element.horizenPosition = selected.horizenPosition
                element.verticalPosition = selected.verticalPosition
                element.valueName = selected.valueName
                element.lineHeight = selected.lineHeight
                element.exampleData = selected.exampleData

                let contentType = selected.getAttribute("type")
                switch (contentType) {
                    case 'text':
                        element.fontHeight = selected.fontHeight
                        element.border=selected.border
                        element.fontWidth = selected.fontWidth
                        element.textLabel = selected.textLabel
                        break
                    case 'barCode':
                        element.barCodeType = selected.barCodeType
                        element.barCodeHeight = selected.barCodeHeight
                        element.barCodeWidth = selected.barCodeWidth
                        element.barCodeValuePosition = selected.barCodeValuePosition
                        element.displayBarCodeValue = selected.displayBarCodeValue
                        break
                    case 'qrCode':
                        element.barCodeHeight = selected.qrCodeHeight
                }
            },

            closeEditTemplateDialog(e, flag) {
                if (flag === 'apply') {
                    let elements = document.querySelector(".selectedEle");
                    let contentType = elements.getAttribute("type");
                    let x_ =parseInt( this.horizenPosition)-elements.horizenPosition;
                    elements.horizenPosition = this.horizenPosition
                    if(isNaN(x_)){
                        x_=0
                    }
                    let y_ =parseInt(this.verticalPosition)-elements.verticalPosition
                    elements.verticalPosition = this.verticalPosition
                    this.verticalPosition=0
                    if(isNaN(y_)||this.editTemMenu.menuType=="template"){
                        y_=0
                    }
                    elements.style.transform="translate("+x_ +"px,"+y_+"px)"
                    elements.valueName = this.valueName
                    elements.exampleData = this.exampleData
                    if (this.lineHeight && this.lineHeight > 10) {
                        elements.lineHeight = this.lineHeight
                    }
                    let parentElement;
                    let parent;
                    switch (contentType) {
                        case 'text':
                            elements.border=this.border
                            elements.fontWidth = this.fontWidth
                            elements.fontHeight = this.fontHeight
                            elements.fontType = this.fontType
                            elements.language = this.language
                            elements.textLabel = this.textLabel
                            elements.innerText = this.exampleData
                            break

                        case 'barCode':
                            parentElement = elements.parentElement;
                            parent = parentElement.getAttribute("parent");
                            if (parent === 'template') {
                                parentElement.style.height = this.barCodeHeight + "px"
                                parentElement.style.lineHeight = this.barCodeHeight + "px"
                            }
                            elements.barCodeValuePosition = this.barCodeValuePosition
                            elements.displayBarCodeValue = this.displayBarCodeValue
                            elements.style.height = this.barCodeHeight + "px"
                            elements.barCodeWidth = this.barCodeWidth
                            elements.barCodeHeight = this.barCodeHeight
                            elements.barCodeType = this.barCodeType
                            try {
                                JsBarCode(elements, this.exampleData, {
                                    format: this.barCodeType,
                                    displayValue: this.displayBarCodeValue,
                                    height: this.barCodeHeight,
                                    width: this.barCodeWidth,
                                    textPosition: (function (e) {
                                        if (e === 'above') {
                                            return 'top'
                                        } else {
                                            return 'bottom'
                                        }
                                    })(this.barCodeValuePosition)
                                })
                            } catch (err) {
                                if (this.barCodeType.toLowerCase() === 'upc') {
                                    err = err + ", UPC code  is made up of 12 num"
                                }
                                this.$message({message: err, type: 'error'})
                                return
                            }
                            break
                        case 'qrCode':
                            parentElement = elements.parentElement;
                            parent = parentElement.getAttribute("parent")
                            if (parent === 'template') {
                                parentElement.style.height = this.barCodeHeight + "px"
                            }
                            QRCode.toCanvas(elements, this.exampleData, {width: this.barCodeHeight}, (error) => {
                                console.log(error)
                            })
                            elements.qrCodeHeight = this.barCodeHeight
                            elements.valueName = this.valueName
                            elements.exampleData = this.exampleData
                            break

                    }
                    this.$message.success("应用成功")
                }
            },
            closeEditItemDialog(e) {
                let textLine = document.querySelector(".selectedItem");
                textLine.lineHeight = this.lineHeight
                textLine.valueName = this.textLineValueName
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
                let selectedItem = document.getElementsByClassName("selectedEle")[0];
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
            },
            submitTemplate(flag) {

                let templateNameRegx = /^\S+$/
                if (!templateNameRegx.test(this.templateLoaded.value)) {
                    this.$message.warning("请输入模板名称")
                    return
                }
                let xmlBuilder = new ePOSBuilder()
                let template = document.getElementById("template");
                let childrenNodes = template.childNodes;
                let elements = []

                function handleNodes(nodes, root) {
                    nodes.forEach((item, index) => {
                        let element = {}
                        let attr = {}
                        let contentType = item.getAttribute("type");
                        let parent = item.getAttribute("parent");

                        element['type'] = contentType
                        element['lineHeight'] = item.lineHeight;
                        element['parent'] = parent
                        switch (contentType) {
                            case 'textLine':
                                let children = []
                                handleNodes(item.childNodes, children)
                                element.children = children
                                element.valueName = item.valueName
                                element.lineHeight = item.lineHeight
                                break;

                            case 'text':
                                element['valueName'] = item.valueName
                                element['exampleData'] = item.exampleData
                                element['textLabel'] = item.textLabel
                                attr['x'] = item.horizenPosition
                                if (parent === 'area') {
                                    attr['y'] = item.verticalPosition
                                }
                                attr['width'] = item.fontWidth
                                attr['height'] = item.fontHeight
                                attr['lang'] = 'zh-cn'//item.language
                                attr['align'] = 'left'
                                attr['border']=item.border
                                attr['fontSize']=parseInt(item.fontWidth*(1<<4))+parseInt(item.fontHeight)
                                attr['font'] = 'font_a'
                                attr['list'] = false
                                let str = item.exampleData;
                                if (!str || str === 'undefind') {
                                    str = ''
                                }
                                xmlBuilder.addTag('text', str + "\n", attr)
                                element['attr'] = attr
                                break
                            case 'barCode':
                                if (parent === 'template') {
                                    item = item.childNodes[0]
                                }
                                element['valueName'] = item.valueName
                                element['lineHeight'] = item.lineHeight;
                                element['exampleData'] = item.exampleData
                                attr['width'] = item.barCodeWidth
                                attr['height'] = item.barCodeHeight
                                if (!item.displayBarCodeValue)
                                    attr['hri'] = "none"
                                else {
                                    attr['hri'] = item.barCodeValuePosition
                                }
                                attr['type'] = item.barCodeType
                                attr['align'] = item.align
                                attr['font'] = 'font_a'
                                if (parent === 'area')
                                    xmlBuilder.addPagePosition(item.horizenPosition, item.verticalPosition)
                                let data = item.exampleData;
                                if (attr['type'] === 'code128') {
                                    data = "{A" + data
                                }
                                xmlBuilder.addTag('barcode', data, attr)
                                element['attr'] = attr
                                break
                            case 'qrCode':
                                if (parent === 'template') {
                                    item = item.childNodes[0]
                                }
                                element['valueName'] = item.valueName
                                element['exampleData'] = item.exampleData
                                attr['height'] = item.qrCodeHeight
                                attr['align'] = item.align
                                element['lineHeight'] = item.lineHeight
                                element['attr'] = attr
                                break
                            case 'area':
                                let pageStart = {}
                                pageStart['type'] = 'pageStart'
                                /*---------*/
                                xmlBuilder.addPageBegin()
                                attr['x'] = 0
                                attr['y'] = 0
                                attr['width'] = 576
                                attr['height'] = 300
                                root.push(pageStart)
                                pageStart['attr'] = attr
                                xmlBuilder.addPageArea(0, 0, 100, 100)
                                handleNodes(item.childNodes)
                                xmlBuilder.addPageEnd()
                                let pageEnd = {}
                                pageEnd['type'] = 'pageEnd'
                                root.push(pageEnd)
                                break

                        }
                        root.push(element)
                    })
                }

                handleNodes(childrenNodes, elements)
                xmlBuilder.addFeed()
                xmlBuilder.addCut()
                if (flag && flag === 'save') {
                    console.log(elements)
                    api.saveTemplate({
                        id: this.templateLoaded.id,
                        templateName: this.templateLoaded.value,
                        elements: elements,
                        type:1 //1代表EPSON
                    }).then(res => {
                        if (res && res.rtnStatus === '0') {
                            this.$message.success("保存成功")
                        } else
                            this.$message.error("保存失败2")
                    }).catch(e => {
                        console.log(e)
                        this.$message.error("保存失败1")
                    })
                } else if (flag && flag === 'export') {
                    this.printContent = xmlBuilder.toString()
                    this.printPanelVisiblity = true

                }
            },
            handleBarcodePosition(e) {

                let template = document.querySelector("#template");

                let element = document.querySelector(".selectedEle");
                let parent = element.getAttribute("parent");
                let type = element.getAttribute("type");
                if ((!parent || parent != 'area') && type && (type === 'barCode' || type === 'qrCode')) {
                    let offset = e.left - template.offsetLeft;
                    let parentElement = element.parentElement;
                    if (offset < 20) {
                        parentElement.style.textAlign = 'left'
                        element.align = 'left'
                    } else if (offset > 20 && offset < parentElement.clientWidth / 2) {
                        parentElement.style.textAlign = 'center'
                        element.align = 'center'
                    } else {
                        parentElement.style.textAlign = 'right'
                        element.align = 'right'
                    }
                    element.style.transform = "translate(0px, 0px)"
                }
            },
            testPrint() {
                api.print({id: this.templateLoaded.id,"printIp":this.printerIp,"printTag":1}).then((res) => {
                    console.log(res)
                })
            },
            printByXml() {
                let ip = this.printerIp
                if (ip && ip != '') {
                    let printer = new ePOSPrinter(ip)
                    printer.send(this.printContent)
                } else {
                    this.$message.error("请输入IP")
                }
            }

        }
    }
</script>

<style scoped>
    span.label {
        display: inline-block;
        font-size: 16px;
        margin-left: 10px;
        width: 80px;
    }
</style>

<style>

    ul.print-template-menu {
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

    ul.print-template-menu li:hover {
        background-color: #e8e8e8;
    }

    ul.print-template-menu li {
        text-align: left;
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
        vertical-align: center;
    }

    .draggableEle {
        text-align: center;
        cursor: grab;
    }

    div#print-template-name {
        display: inline-block;
        font-weight: bolder;
        border-radius: 3px;
        margin-left: 3px;
        -moz-box-shadow: 0px 0px 3px #333333;
        -webkit-box-shadow: 0px 0px 3px #333333;
        box-shadow: 0px 0px 3px #333333;
    }

    span.dialog-footer {
        display: block;
        margin: 10px;
        text-align: right;
    }

</style>

