<template>
    <div id="HoneyWellTemplateEdit" style="text-align: center">

        <ul id="editElementMenu" class="print-template-menu" v-show="editElementMenuVisible">
            <li @mousedown="deleteElement">删除元素</li>
        </ul>

        <div style="margin-top: 100px">
            <div style="text-align: left;margin-top: 20px;">

                <el-tooltip class="item" effect="light" content="将元素拖拽到模板框内以添加元素" placement="top-start">
                    <div
                        style="border:2px solid #a3a3a3; width: 420px;border-radius: 7px;margin-bottom: 10px">
                        <div draggable="true" class="draggable-text-parent" type="text">
                            文本
                        </div>
                        <div draggable="true" class="draggable-text-parent" type="image">
                            图片
                        </div>
                        <div draggable="true" class="draggable-text-parent" type="barCode">
                            条形码
                        </div>
                        <div draggable="true" class="draggable-text-parent" type="qrCode">
                            二维码
                        </div>
                    </div>
                </el-tooltip>
                <div class="print-template-name">
                    <el-select v-model="labelModel" placeholder="模板规格" @change="adjustModel">
                        <el-option
                            v-for="item in templateModel.options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div>
                    <div class="print-template-name" style="display: inline-block">
                        <el-input :disabled="templateLoaded.editable" v-model="templateLoaded.value"
                                  placeholder="请输入模板名称"></el-input>
                    </div>
                    <el-tooltip class="item" effect="dark" placement="right">
                        <div slot="content">1.拖拽元素到模板框中以添加元素<br/>2.元素上右键以删除元素<br/>3.模板名称保存后无法再更改<br/>4.模板尺寸与实际打印效果可能不符，按实际效果来布置元素<br/>
                        </div>
                        <i style="margin-left: 10px" class="el-icon-info"></i>
                    </el-tooltip>
                </div>


                <div id="template" @mousedown="this.cancelSelected"
                     style="border: 5px solid #a3a3a3;height: 370px;width: 500px;margin: auto;position:relative;border-radius: 6px;margin:0px 10px 0px 0px ;display: inline-block">
                </div>

                <div id="edit-textLine-panel" v-show="editElementPropPanelVisible"
                     style="max-width: 470px;min-width: 230px;text-align: left;border: 1px solid #cacaca;position:relative;border-radius: 10px;float: right">
                <span style="/*display: block;*/margin-top: 10px;">
                    <div class="prop-div">
                      <span class="label">键</span>
                      <el-input v-model="valueName" style="width: 120px;margin-left: 10px"
                                placeholder="请输入内容"></el-input>
                    </div>

                    <div class="prop-div">
                      <span class="label">值</span>
                      <el-input v-model="exampleData" style="width: 120px;margin-left: 10px"
                                placeholder="请输入内容" :disabled="this.contentType==='image'"></el-input>
                    </div>

                    <div class="prop-div" v-show="this.contentType==='text'">
                      <span class="label">Label</span>
                      <el-input v-model="textLabel" style="width: 120px;margin-left: 10px"
                                placeholder="请输入标签内容"></el-input>
                    </div>

                    <div class="prop-div" v-show="this.contentType==='text'||contentType==='barCode'">
                      <span class="label">字号</span>
                      <el-select v-model="fontSize" style="width:120px;margin-left: 10px" placeholder="请选择">
                        <el-option
                            v-for="item in fontSizeSelect"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                      </el-select>
                    </div>

                    <div class="prop-div" v-show="contentType==='text'">
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
                    <div class="prop-div" v-show="contentType==='text'">
                      <span class="label">字数
                      <el-tooltip class="item" effect="dark" placement="right">
                        <div slot="content">1.一行所能显示的中文个数。<br/>2.必须为整数。
                        </div>
                        <i style="margin-left: 10px" class="el-icon-info"></i>
                    </el-tooltip>
                      </span>
                      <el-input v-model="lineLimit" type="number" style="width: 120px;margin-left: 10px"
                                placeholder="请输入内容" :disabled="this.contentType==='image'"></el-input>
                    </div>
                    <div class="prop-div" v-show="contentType==='barCode'">
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

                    <div class="prop-div" v-show="contentType==='barCode'">
                      <span class="label">条码高度</span>
                      <el-input v-model="barCodeHeight" style="width: 120px;margin-left: 10px"
                                placeholder="范围约为50-130"></el-input>
                    </div>

                    <div class="prop-div" v-show="contentType==='barCode'">
                      <span class="label">条码宽度</span>

                      <el-select v-model="barCodeWidth" style="width:120px;margin-left: 10px" placeholder="请选择">
                        <el-option
                            v-for="item in barCodeWidthSelect"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                    <div class="prop-div" v-show="contentType==='qrCode'">
                      <span class="label">规格</span>
                      <el-select v-model="qrCodeHeight" style="width:120px;margin-left: 10px; " placeholder="请选择">
                        <el-option
                            v-for="item in qrCodeHeightSelect"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                    <div class="prop-div" v-show="contentType==='barCode'">
                      <span class="label">显示位置</span>
                      <el-select v-model="hri" style="width:120px;margin-left: 10px; " placeholder="请选择">
                        <el-option
                            v-for="item in hriSelect"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                      </el-select>
                    </div>

                    <div style="margin-top:10px;margin-left: 10px" v-show="contentType==='image'">
                        <el-upload ref="image_upload_com"
                                   class="upload-demo"
                                   action="fakeaction"
                                   multiple
                                   :http-request="uploadImage"
                                   :limit="1"
                                   :with-credentials="true"
                                   :file-list="fileList">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <!--<span style="padding-left: 10px" slot="tip"
                                  class="el-upload__tip">支持jpg/png格式，文件大小不能超过50kb.</span>-->
                        </el-upload>
                    </div>
                </span>
                    <div style="font-weight: bolder;padding: 10px ;font-size: 12px">
                        <p class="template-prop-edit-tip" v-show="contentType==='image'"><span
                            class="template-prop-edit-tip-prefix">></span>文件只能上传一份，且格式必须为单色位图
                        </p>
                        <p class="template-prop-edit-tip" v-show="contentType==='image'"><span
                            class="template-prop-edit-tip-prefix">></span>指定键后，会优先以键取图片数据，未取到再从上传的文件获取.
                        </p>
                        <p class="template-prop-edit-tip" v-show="contentType==='image'"><span
                            class="template-prop-edit-tip-prefix">></span>文件上传后，会自动将模板名称追加在文件名之前，值所展示的即为上传后的<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;文件名。
                        </p>
                        <p class="template-prop-edit-tip" v-show="contentType==='barCode'"><span
                            class="template-prop-edit-tip-prefix">></span>条码大小与实际打印不符，尽量保证位置对应正确。
                        </p>
                    </div>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="closeElementPropPanel" type="danger">关闭</el-button>
                        <el-button @click="closeElementPropPanel('apply')" type="success">应用</el-button>
                    </div>
                </div>

                <div style="text-align: left;margin-top: 10px;margin-left: 3px">
                    <el-button type="primary" @click="saveTemplate">保存模板</el-button>
                    <el-button type="success" @click="testPrint">测试打印</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import * as api from "../../api"

    import PlainDraggable from "~@/plain-draggable.min"
    import JsBarCode from 'jsbarcode'
    import QRCode from "qrcode"

    let defaultImage = "data:image/png;base64,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"

    export default {
        name: "HoneyWellTemplateEdit",
        data() {
            return {
                dragedType: null,
                dragedElement: null,
                editElementMenuVisible: false,
                editElementPropPanelVisible: false,
                contentType: '',
                textLabel:"",
                valueName: '',
                exampleData: '',
                lineLimit:100,
                templateLoaded: {
                    editable: false,
                    value: ''
                },
                fileList: [],
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

                fontSize: 8,
                fontSizeSelect: [6, 7, 8, 9, 10, 11, 12, 13, 14].map(item => {
                    return {
                        value: item,
                        label: item
                    }
                }),

                barCodeType: 'CODE128',
                barCodeTypeSelect: ['CODE128', 'UPC', 'EAN13', 'EAN8',  'CODE39'].map(item=>{
                    return {
                        value:item,
                        label:item
                    }
                }),
                hri: '',
                hriSelect: [{
                    value: 'none',
                    label: "无"
                }, {
                    value: 'top',
                    label: "上"
                }, {
                    value: 'bottom',
                    label: "下"
                }],
                barCodeWidth: '',
                barCodeWidthSelect: [1, 2, 3, 4, 5].map(item => {
                    return {
                        value: item,
                        label: item
                    }
                }),
                qrCodeHeight: 5,
                qrCodeHeightSelect: [1, 2, 3, 4, 5, 6, 7].map(item => {
                    return {
                        value: item,
                        label: item
                    }
                }),
                barCodeHeight: '',
                fontSize: '',
                templateModel: (function () {
                    let model = {}
                    let options = [
                        {
                            value: 1,
                            label: '60mm x 40mm',
                            height: "370px",
                            width: "500px",
                            editPanelWidth: "470px"
                        },
                        {
                            value: 2,
                            label: '80mm x 60mm',
                            height: "500px",
                            width: "750px",
                            editPanelWidth: "240px"
                        }
                    ]
                    model.options = options
                    model.getModel = (value) => {
                        let result;
                        options.forEach(item => {
                            if (item.value == value) {
                                result = {
                                    height: item.height,
                                    width: item.width,
                                    editPanelWidth: item.editPanelWidth
                                }
                                return
                            }
                        })
                        return result
                    }
                    return model
                })(),
                labelModel: 1
            }
        },
        created() {
            // this.templateProp = this.$route.params.row
        },
        updated() {
            this.enablePlainDrag()
        },
        watch: {
            '$route.params': {
                handler: function () {
                    this.$nextTick(() => {
                        this.loadTemplate(this.$route.params.row)
                    })
                },
                immediate: true
            }
        },
        mounted() {
            let template = document.querySelector("#template");
            template.addEventListener("dragenter", this.onDragEnter)
            template.addEventListener("dragleave", this.onDragLeave)
            template.addEventListener("contextmenu", (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.cancelSelected()
            })

            let root = document.querySelector("#HoneyWellTemplateEdit");
            root.ondragenter = function (e) {
                e.preventDefault()
            }
            root.ondragover = function (e) {
                e.preventDefault()
            }

            let draggeableParent = document.querySelectorAll(".draggable-text-parent")
            draggeableParent.forEach(item => {
                item.addEventListener("dragstart", this.onDragStart)
                item.addEventListener("dragend", this.onDragEnd)
            })

        },
        methods: {
            loadTemplate(templateProp) {
                this.clearTemplate()
                if (!templateProp) {
                    return
                }
                this.templateLoaded.value = templateProp.templateName
                this.templateLoaded.id = templateProp.id
                this.templateLoaded.editable = true

                if (templateProp.elements) {
                    templateProp.elements.forEach(item => {
                        this.handleAttr(item)
                    })
                }
            },
            clearTemplate() {
                this.templateLoaded = {
                    editable: false,
                    value: ''
                }
                let template = document.querySelector("#template");
                if (template) {
                    template.innerHTML = ""
                }
            },
            handleAttr(element) {
                let attr = {}
                if (element.attr) {
                    Object.keys(element.attr)
                        .filter(item => item != 'type')//过滤重复属性，以防覆盖属性
                        .forEach(item => {
                            element[item] = element.attr[item]
                        })
                }
                attr['horizenPosition'] = element.attr.x
                attr['verticalPosition'] = element.attr.y
                attr['exampleData'] = element.exampleData
                attr['barCodeType'] = element.attr.type
                attr['barCodeHeight'] = element.attr.height
                attr['barCodeWidth'] = element.attr.width
                attr['fontSize'] = element.attr.fontSize
                attr['valueName'] = element.valueName
                attr['type'] = element.type
                attr['lineLimit']=element.lineLimit
                attr['textLabel']=element.textLabel
                attr['hri']=element.attr.hri
                attr['border']=element.attr.border
                attr['qrCodeHeight'] = element.attr.height
                attr.getAttribute = function (name) {
                    return attr[name]
                }
                this.qrCodeHeight = attr['qrCodeHeight'] ? attr['qrCodeHeight'] : 5
                this.appendElement(null, element.type, attr)
            },

            appendElement(e, type, prop) {
                let template = document.getElementById("template");
                let element
                if (!this.dragedType && !type) {
                    return
                }
                switch (type || this.dragedType) {
                    case 'text':
                        element = document.createElement("div");
                        element.style.height = "15px";
                        element.style.lineHeight = "15px"
                        // element.style.padding = "3px 6px 3px 6px"
                        element.style.position = "absolute"
                        element.style.backgroundColor = "#e6e6e6"
                        element.innerText = "H"
                        element.setAttribute("type", "text")
                        element.exampleData = "8"
                        element.fontSize = 8
                        element.lineLimit=100
                        element.border = 0
                        let classList = element.classList;
                        classList.add("template-draggeable", "template-element")
                        template.appendChild(element)
                        break;
                    case 'barCode':
                        element = document.createElement("img");
                        element.style.height = '70px'
                        element.style.border = "2px solid #E3E3E3"
                        element.style.display = "inline-block"
                        element.style.position = 'absolute'
                        element.setAttribute("type", "barCode")
                        element.classList.add("template-draggeable")
                        element.exampleData = "1234567"

                        element.barCodeType = "CODE128"
                        JsBarCode(element, element.exampleData, {
                            width: 2, format: 'code128'
                        })
                        template.appendChild(element)
                        break;
                    case 'qrCode':
                        element = document.createElement("canvas");
                        element.style.position = 'absolute'
                        element.classList.add("template-draggeable")
                        element.setAttribute("type", "qrCode")
                        element.exampleData = "Hello World!"
                        element.style.border = "2px solid #E3E3E3"
                        QRCode.toCanvas(element, element.exampleData, {width: this.qrCodeHeight * 30}, (error) => {
                            console.log(error)
                        })
                        element.qrCodeHeight = 5

                        template.appendChild(element)
                        break;
                    case 'image':
                        element = document.createElement("img");
                        element.setAttribute("src", defaultImage)
                        element.setAttribute("type", "image")
                        element.style.height = "50px"
                        element.style.position = 'absolute'
                        element.style.border = "2px solid #E3E3E3"
                        element.classList.add("template-draggeable")
                        template.appendChild(element)
                        break;
                }
                this.dragedType = null
                this.dragedElement = null
                if (element) {
                    element.addEventListener("contextmenu", this.popMenu)
                    element.addEventListener("click", this.selectElement)
                    if (!prop) {
                        this.selectElement(element)
                    } else {
                        element.innerText = prop['exampleData']
                        this.loadData(element, prop, type || this.dragedType)
                    }
                }
            },
            selectElement(e) {
                let preSelected = document.querySelector(".selectedElement");
                let currentTarget = e.currentTarget || e;
                this.contentType = currentTarget.getAttribute("type")
                if (preSelected && preSelected != currentTarget) {
                    preSelected.classList.remove("selectedElement")
                }
                currentTarget.classList.add("selectedElement")
                this.openElementPropPanel()
            },
            onDragEnter(e) {
                if (!this.dragedElement) {
                    return
                }
                this.dragedElement.enterTemplate = true
            },
            onDragLeave(e) {
                if (!this.dragedElement) {
                    return
                }
                this.dragedElement.enterTemplate = false
            },
            onDragStart(e) {
                let dragedElement = e.currentTarget;
                e.dataTransfer.effectAllowed = "copyLink"
                this.dragedType = dragedElement.getAttribute("type")
                this.dragedElement = dragedElement
                this.selectElement(dragedElement)
            },
            onDragEnd(e) {
                let dragedElement = e.currentTarget;
                if (dragedElement.enterTemplate) {
                    this.appendElement(e)
                }
                dragedElement.enterTemplate = false
            },
            enablePlainDrag() {
                let template = document.getElementById("template");

                let draggableElements = Array.prototype.slice.call(document.getElementsByClassName("template-draggeable"));
                draggableElements.forEach(element => {
                    let plainDraggable = new PlainDraggable(element);
                    plainDraggable.onMove = (p) => {
                        element['horizenPosition'] = p.left - template.offsetLeft - 5//5 为template边框宽度
                        element['verticalPosition'] = template.clientHeight - (p.top - template.offsetTop + element.clientHeight) + 5 //5 为template边框宽度
                        // console.log("x:" + element.horizenPosition + ",y:" + element.verticalPosition)
                    }
                })
            },
            deleteElement(e) {
                let element = document.querySelector(".selectedElement");
                let template = document.getElementById("template");
                if (template && element) {
                    template.removeChild(element)
                }
            },
            popMenu(e) {
                let event = e || window.event
                event.stopPropagation()
                event.preventDefault();
                let target = event.currentTarget;
                this.selectElement(target)
                var _x = this.mouseX(event),
                    _y = this.mouseY(event);
                if (event.button == 2) {
                    let menu = document.getElementById("editElementMenu");
                    menu.style.position = "absolute"
                    menu.style.left = _x + "px";
                    menu.style.top = _y + "px";
                    this.editElementMenuVisible = true;
                }
                document.addEventListener("mousedown", (e => {
                    this.editElementMenuVisible = false
                }), {capture: true, once: true})
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

            testPrint() {
            	api.print({id: this.templateLoaded.id,"printIp":"10.128.36.200","printTag":2}).then((res) => {
                    console.log(res)
                })
            },

            saveTemplate() {

                if (!this.validateTemplateName()) {
                    return
                }

                let template = document.getElementById("template");
                let childNodes = template.childNodes;
                if (!childNodes || childNodes.length == 0) {
                    this.$message({
                        type: "info",
                        message: "模板为空"
                    })
                    return
                }
                let elements = []
                childNodes.forEach(item => {
                    let type = item.getAttribute("type");
                    let element = {}
                    element['type'] = type
                    element['valueName'] = item.valueName
                    element['exampleData'] = item.exampleData
                    let attr = {}
                    element['attr'] = attr
                    attr['x'] = item.horizenPosition
                    attr['y'] = item.verticalPosition
                    switch (type) {
                        case 'text':
                            attr['fontSize'] = item.fontSize
                            attr['font'] = 'font_a'
                            attr['border']=item.border
                            element['lineLimit']=item.lineLimit
                            element['textLabel']=item.textLabel
                            elements.push(element)
                            break;
                        case 'barCode':
                            attr['fontSize'] = item.fontSize
                            attr['width'] = item.barCodeWidth
                            attr['height'] = item.barCodeHeight
                            attr['hri'] = item.hri
                            attr['type'] = item.barCodeType
                            elements.push(element)
                            break;
                        case 'qrCode':
                            attr['height'] = item.qrCodeHeight
                            elements.push(element)
                            break;

                        case 'image':
                            element['exampleData'] = item.exampleData
                            elements.push(element)
                            break;
                        default:
                            return
                            console.log("%s类型不支持，支持的类型有：text,barCode,qrCode,image", type)
                            break
                    }
                })
                api.saveTemplate({
                    id: this.templateLoaded.id,
                    templateName: this.templateLoaded.value,
                    elements: elements,
                    type: 2   //2代表HoneyWell
                }).then(res => {
                    this.$message({
                        type: "success",
                        message: '保存成功'
                    })
                    this.$parent.listTemplates()
                }).catch(err => {
                    this.$message({
                        type: "error",
                        message: err.response.data.msg
                    })
                })
                console.log(elements)
            },
            validateTemplateName() {
                let templateNameRegx = /^\S+$/
                if (!templateNameRegx.test(this.templateLoaded.value)) {
                    this.$message.warning("请输入模板名称")
                    return false
                }
                if (this.templateLoaded.value.length > 30) {
                    this.$message.warning("模板名称不能超过30个字符")
                    return false
                }

                return true
            },
            cancelSelected(e) {
                // e.stopPropagation()
                let elements = document.querySelectorAll(".selectedElement");
                if (elements) {
                    elements.forEach(item => {
                        item.classList.remove('selectedElement')
                    })
                }
                this.editElementPropPanelVisible = false
            },
            openElementPropPanel() {
                let selected = document.querySelector(".selectedElement");
                if (!selected) {
                    return
                }
                this.editElementPropPanelVisible = true;
                let contentType = selected.getAttribute("type");
                this.loadData(this, selected, contentType)
            },
            loadData(tar, src, contentType) {

                let template = document.querySelector("#template");

                if (!src) {
                    return
                }
                tar.horizenPosition = src.horizenPosition

                tar.verticalPosition = src.verticalPosition
                tar.valueName = src.valueName
                tar.exampleData = src.exampleData

                if (src.horizenPosition && tar.style) {
                    tar.style.left = (src.horizenPosition) + "px"
                }
                if (src.verticalPosition && tar.style) {
                    tar.style.top = (template.clientHeight - src.verticalPosition - tar.clientHeight) + "px"
                }


                switch (contentType) {
                    case 'text':
                        tar.fontSize = src.fontSize
                        tar.border = src.border
                        tar.lineLimit=src.lineLimit
                        tar.textLabel=src.textLabel
                        break
                    case 'barCode':
                        tar.barCodeType = src.barCodeType
                        tar.barCodeHeight = src.barCodeHeight
                        tar.barCodeWidth = src.barCodeWidth
                        tar.fontSize = src.fontSize
                        tar.hri = src.hri
                        break
                    case 'qrCode':
                        tar.qrCodeHeight = src.qrCodeHeight
                        break;
                    default:
                        break
                }
            },
            closeElementPropPanel(flag) {
                this.editElementPropPanelVisible = false
                if (flag === 'apply') {
                    let selected = document.querySelector(".selectedElement");
                    if (!selected) {
                        return
                    }
                    let contentType = selected.getAttribute("type");
                    this.loadData(selected, this, contentType)
                    if (contentType === 'barCode') {
                        selected.style.height = "70px"
                        JsBarCode(selected, this.exampleData, {
                            format: "CODE128",
                            width: 2,
                            textPosition: this.hri
                        })
                    } else if (contentType === 'qrCode') {
                        let width = parseInt(this.qrCodeHeight * 30);
                        QRCode.toCanvas(selected, selected.exampleData, {width: width}, (error) => {
                            console.log(error)
                        })
                    } else if (contentType === 'text') {
                        selected.innerText = this.exampleData
                    }
                    this.$message({
                        type: 'success',
                        message: "应用成功"
                    })
                }
            },
            validateUpload() {
                console.log("changed")
            },
            uploadImage(params) {
                if (!this.validateTemplateName()) {
                    this.$refs['image_upload_com'].clearFiles()
                    return false
                }
                this.$confirm('文件上传后将无法修改模板名称, 是否继续?', '提示', {
                    confirmButtonText: '上传',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let formData = new FormData();
                    this.templateLoaded.editable = true
                    formData.append("image", params.file)
                    api.uploadImage(formData).then(res => {
                        let element = document.querySelector(".selectedElement");
                        if (element) {
                            element.exampleData =  params.file.name
                        }
                        this.$message({
                            type: 'success',
                            message: '上传成功!'
                        });
                    }).catch(err => {
                        this.$refs['image_upload_com'].clearFiles()
                        this.$message({
                            type: 'error',
                            message: err.response.data.msg
                        });
                    })
                }).catch(() => {
                    this.$refs['image_upload_com'].clearFiles()
                    return false
                    this.$message({
                        type: 'info',
                        message: '取消上传'
                    });
                });
            },
            adjustModel(value) {
                let model = this.templateModel.getModel(value);
                let template = document.querySelector("#template");
                template.style.height = model.height
                template.style.width = model.width
                let editPanel = document.querySelector("#edit-textLine-panel");
                editPanel.style.width = model.editPanelWidth
                this.loadTemplate(this.$route.params.row)
            }
        }
    }
</script>

<style scoped>

    .draggable-text-parent {

        text-align: left;
        display: inline-block;
        border: 1px solid gray;
        height: 30px;
        line-height: 30px;
        padding-left: 15px;
        margin: 5px 7.1px;
        width: 70px;
        font-weight: bolder;
        border-radius: 3px;
        cursor: grab;
    }

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
        position: absolute;
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

    div.prop-div {
        display: inline-block;
        margin-top: 10px;
        vertical-align: center;
    }

    span.label {
        display: inline-block;
        font-size: 16px;
        margin-left: 10px;
        width: 80px;
    }

    div.dialog-footer {
        margin: 10px;
        text-align: right;
    }
</style>

<style>
    div.template-element {
        padding: 5px 10px 5px 10px;
        height: 50px;
        background-color: orange;
    }

    .selectedElement {
        -moz-box-shadow: 0px 5px 5px #E3E3E3 !important;
        -webkit-box-shadow: 0px 5px 5px #E3E3E3 !important;
        box-shadow: 2px 2px 2px #E3E3E3 !important;
    }

    .print-template-name {
        font-weight: bolder;
        border-radius: 3px;
        margin-left: 3px;
        width: 200px;
        margin-bottom: 10px;
        text-align: left;
        -moz-box-shadow: 0px 0px 3px #333333;
        -webkit-box-shadow: 0px 0px 3px #333333;
        box-shadow: 0px 0px 3px #333333;
    }

    .template-prop-edit-tip {
        line-height: 20px;
    }

    .template-prop-edit-tip-prefix {
        padding-right: 10px;
    }
</style>
