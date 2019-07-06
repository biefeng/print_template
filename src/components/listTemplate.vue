<template>
  <el-table
    :data="templates"
    border
    strip
    style="width: 801px;margin: auto">
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
</template>

<script>
  export default {
    name: "listTemplate",
    data() {
      return {
        templates: []
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
      }
    }
  }
</script>

<style scoped>
  .el-table td, .el-table th {
    text-align: center;
  }
</style>
