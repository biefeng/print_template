<template>
  <div id="toolBar">
    <div style="border: 2px solid gray;border-radius:5px;display: inline-block;padding: 5px 10px 0px 10px;">
      <div class="tool-bar">
        <el-select v-model="font" placeholder="字体">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="tool-bar">
        <el-select v-model="font" placeholder="字体">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="tool-bar" style="font-weight: bolder">B</div>
      <div class="tool-bar"></div>
      <div class="tool-bar">D</div>
      <div class="tool-bar">E</div>
      <div class="tool-bar">
        <ul_select :options="options"></ul_select>
      </div>
      <div class="tool-bar"><i class="el-icon-delete"></i></div>
    </div>

    <div><img id="barCode"></img></div>
  </div>


</template>

<script>

  import ul_select from '@/components/select'
  import QRCode from "qrcode"
  import JsBarcode from 'jsbarcode'

  export default {
    name: "toolBar",
    components: {ul_select},
    data() {
      return {
        options: [
          {value: 4, label: "FONT_D"},
          {value: 5, label: "FONT_E"},
          {value: 6, label: "FONT_F"}
        ],
        font: ""
      }
    },
    mounted() {
      JsBarcode("#barCode","123456789999",{
        format:'upc'
      })
    },
    methods: {}
  }
</script>

<style>


  .el-input {
    height: 20px;
    font-size: 6px;
  }

  .el-input__inner {
    padding: 0px 5px;
    height: 20px;
    /*border: none;*/
  }

  .el-input__suffix {
    width: 10px;
  }

  .el-input__suffix-inner {
    width: 10px;
  }

  .el-input--suffix .el-input__inner {
    padding-right: 0px;
  }

  .el-input__icon {
    width: 5px;
    height: 30px;
  }

  .is-reverse {
    margin-top: -10px;
    margin-left: -15px;
  }

  .el-select-dropdown__item {
    font-size: 10px;
    height: 25px;
    line-height: 25px;
  }
</style>
<style scoped>

  .el-select {
    width: 75px;
    height: 20px;
    font-size: 10px;
  }


  .el-input {
    height: 20px;
    font-size: 6px;
  }

  .el-input__inner {
    padding: 0px 5px;
    height: 20px;
    /*border: none;*/
  }

  .el-input__suffix {
    width: 10px;
  }

  .el-input__suffix-inner {
    width: 10px;
  }

  .el-input--suffix .el-input__inner {
    padding-right: 0px;
  }

  .el-input__icon {
    width: 5px;
    height: 30px;
  }


  .el-select-dropdown__item {
    font-size: 10px;
    height: 25px;
    line-height: 25px;
  }

  div.tool-bar {
    display: inline-block;
    cursor: pointer;
    /*background-color: #5daf34;*/
  }

  #kkk:before {
    content: "\E6E1";
  }

  .arrow_select_selected {
    transition: all 0.3s ease-out;
    transform: rotate(180deg);
  }

  .arrow_select_cancel_selected {
    transition: all 0.3s ease-out;
    transform: rotate(0deg);
  }

  .selected_ul_item {
    margin-top: 6px;
    padding-left: 10px;
    font-size: 14px;
    cursor: default;
  }

  ul.selected_ul li:hover {
    background-color: #8c939d;
  }
</style>

