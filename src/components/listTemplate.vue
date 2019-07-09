<template>
  <div style="width: 801px;height:600px;margin: auto;text-align: center">
    <div style="text-align: left">
      <el-button type="primary" icon="el-icon-circle-plus-outline" style="margin:20px auto"
                 @click="configTemplateDialogVisible = true">
        创建模板
      </el-button>
    </div>

    <el-dialog title="配置模板" :visible.sync="configTemplateDialogVisible" width="30%" center>
      <div class="configField">
        <span style="display: block">
          <span class="label">模板名称</span>
          <el-input style="width: 300px;margin-left: 10px" v-model="templateName" placeholder="template-1"></el-input>
        </span>
      </div>
      <div class="configField">
        <span class="label">打印机类型</span>
        <el-select style="width:120px;margin-left: 10px" v-model="printerType" placeholder="请选择">
          <el-option v-for="item in printerTypeSelect" :key="item.value" :label="item.label" :value="item.value">
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
    </el-dialog>

    <el-table
      :data="templates"
      border
      strip
    >
      <el-table-column
        prop="templateName"
        label="模板名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="模板信息"
        width="300">
      </el-table-column>
      <el-table-column
        prop="address"
        width="160"
        label="绑定设备">
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
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="position: absolute;text-align: center;top: 750px;width: 800px">
      <el-pagination
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: "listTemplate",
    data() {
      return {
        templates: [],
        configTemplateDialogVisible: false,
        templateName: '',
        printerTypeSelect: [
          {
            label: "EPSON",
            value: 0
          }, {
            label: "HoneyWell",
            value: 1
          }
        ],
        printerType: 0,
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
    created() {
      this.$http.get("http://localhost:7538/template/list").then(res => {
        this.templates = res.data;
      })
    }, methods: {
      editTemplatePage(index, row) {
        this.$router.push({
          name: "editTemplate", params: {
            index: index,
            row: row
          }
        })
      },
      createTemplate(e) {
        this.$router.push({
          name: "editTemplate",
          params: {
            templateName: this.templateName,
            printMode: this.printMode,
            printerType: this.printerType
          }
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
