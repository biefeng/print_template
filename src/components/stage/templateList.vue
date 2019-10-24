<template>
    <div>
        <div
            style="width: 521px;height:350px;text-align: center;margin-left: 10px;position: absolute;margin-top: 100px;z-index: 2000">
            <div style="text-align: left">
                <el-select style="width:220px;margin-left: 0px" v-model="printerType" placeholder="请选择">
                    <el-option v-for="item in printerTypeSelect" :key="item.value" :label="item.label"
                               :value="item.value">
                    </el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-circle-plus-outline"
                           style="margin:20px auto;width: 80px;padding-left: 5px"
                           @click="createTemplate">
                    新建模板
                </el-button>
            </div>

            <!--<el-dialog title="配置模板" :visible.sync="configTemplateDialogVisible" width="30%" center>
                <div class="configField">
            <span style="display: block">
              <span class="label">模板名称</span>
              <el-input style="width: 300px;margin-left: 10px" v-model="templateName" placeholder="template-1"></el-input>
            </span>
                </div>
                <div class="configField">
                    <span class="label">打印机类型</span>
                    <el-select style="width:120px;margin-left: 10px" v-model="printerType" placeholder="请选择">
                        <el-option v-for="item in printerTypeSelect" :key="item.value" :label="item.label"
                                   :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div v-show="printerType === 0" class="configField">
                    <span class="label">打印模式：</span>
                    <el-select style="width:120px;margin-left: 10px" v-model="printMode" placeholder="请选择">
                        <el-option
                            v-for="item in printModeSelect" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <span slot="footer" class="dialog-footer">
            <el-button @click="configTemplateDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="createTemplate">确 定</el-button>
          </span>
            </el-dialog>-->

            <el-table :data="page.list" border strip>
                <el-table-column
                    prop="id"
                    label="模板ID"
                    width="60">
                </el-table-column>
                <el-table-column
                    prop="templateName"
                    label="模板名称"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="type"
                    label="模板类型"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="操作" width="160">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="editTemplatePage(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="deleteTemplate(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--<div style="position: absolute;text-align: center;top: 750px;width: 800px">
                <el-pagination
                    layout="prev, pager, next"
                    :total="1000">
                </el-pagination>
            </div>-->
            <div class="block">
                <el-pagination
                    @current-change="changePageNo"
                    @pre-click="changePageNo"
                    @next-click="changePageNo"
                    @size-change="changePageSize"
                    :page-sizes=[15,20]
                    :page-size="this.page.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="page.total">
                </el-pagination>
            </div>
        </div>
        <div style="padding-left: 575px;position: absolute;">
            <router-view name="editPanel"></router-view>
        </div>
    </div>
</template>

<script>
    import * as api from "../../api"

    export default {
        name: "listTemplate",
        data() {
            return {
                configTemplateDialogVisible: false,
                templateName: '',
                page: {
                    list: [],
                    pageNo: 1,
                    pageSize:15,
                    total: 0
                },
                printerTypeSelect: [
                    {
                        label: "EPSON",
                        value: 1
                    }, {
                        label: "HoneyWell",
                        value: 2
                    }
                ],
                printerType: 1,
                printModeSelect: [
                    {
                        label: "页模式",
                        value: 0
                    }, {
                        label: "标准模式",
                        value: 1
                    }
                ],
                printMode: 0
            }
        },
        mounted() {
            this.listTemplates()
        }, methods: {
            changePageNo(pageNo) {
                this.page.pageNo = pageNo
                this.listTemplates()
            },
            changePageSize(pageSize) {
                this.page.pageSize = pageSize
                this.listTemplates()
            },
            listTemplates() {
                api.listTemplate({
                    "pageNo": this.page.pageNo,
                    "pageSize": this.page.pageSize
                }).then(res => {
                    this.page.total=res.data['count']
                    this.page.list = res.data['list'].map(e => {
                        let parse = JSON.parse(e['template']);
                        parse['id'] = e['id']
                        parse['type'] = e['typeStr']
                        return parse
                    });
                })
            },
            editTemplatePage(index, row) {
                let routeName = ''
                switch (row.type) {
                    case "EPSON":
                        routeName = "epson"
                        break;
                    case "HoneyWell":
                        routeName = "honey"
                        break;
                }
                this.$router.replace({name: "templateList"})
                if (routeName && routeName.length > 0) {
                    this.$router.replace({
                        name: routeName, params: {
                            index: index,
                            row: row,
                            templateId: row.id
                        }
                    })
                }
            },
            createTemplate(e) {
                let routeName = ''

                switch (this.printerType) {
                    case 1:
                        routeName = "epson"
                        break;
                    case 2:
                        routeName = "honey"
                        break;
                }
                this.$router.replace({name: "templateList"})
                if (routeName && routeName.length > 0) {
                    this.$router.replace({
                        name: routeName, params: {
                            index: null,
                            row: null,
                            templateId: null
                        }
                    })
                }
            },
            deleteTemplate(index, row) {
                this.$confirm("确认删除？","提示",{confirmButtonText:"删除",cancelButtonText:"取消",type:'warning'}).then(()=>{
                    api.deleteTemplate({
                        id: row.id
                    }).then(res => {
                        this.$message({
                            message: "删除成功！",
                            type: "success"
                        })
                        this.listTemplates()
                    })
                    this.$router.replace({path: "/templateList",})
                }).catch(err=>{
                    this.$message({
                        type:'info',
                        message:'取消删除'
                    })
                })

            }
        }
    }
</script>

<style scoped>
    .el-table td, .el-table th {
        text-align: center;
    }

    div.configField {
        margin-top: 12px;
    }

    span.label {
        width: 90px;
        display: inline-block;
    }
</style>
