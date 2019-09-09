<template>

  <div id="ul_select" style="height: 30px;display: inline-block">
    <div style="border: 1px solid gray;display: inline-block;border-radius: 3px;"
         @click="rotateArrow($event)"><input
      style="border: none;width: 85px;outline: none;color: transparent;text-shadow: 0 0 0 #000;padding: 3px 8px;cursor: default;font-size: 10px"></input><i
      class="el-icon-caret-bottom arrow_select_cancel_selected"></i>
    </div>
    <ul class="selected_ul"
        style="background-color:#f1f1f1;margin-top: -1px; list-style: none;border: 1px solid gray;border-radius :3px;width: 115px;padding-left: 0px;padding-bottom :6px;visibility: hidden;position: absolute">
      <li class="selected_ul_item" v-for="option in options" :key="option.value" :value="option.label">
        {{option.label}}
      </li>
    </ul>
  </div>


</template>

<script>
  export default {
    name: "ul_select",
    props: {'options': Array},
    mounted() {
      let var1 = document.querySelectorAll("ul.selected_ul");
      let choose_option = this.chose_option
      if (var1 && var1.length > 0) {
        for (var x = 0; x < var1.length; x++) {
          let tmp = var1[x]
          if (tmp.childNodes && tmp.childNodes.length > 0) {
            tmp.childNodes.forEach(item => {
              if (item['localName'] === 'li') {
                item.addEventListener("click", choose_option)
              }
            })
          }
        }
      }
    },
    methods: {
      rotateArrow(e) {
        let currentTarget = e.currentTarget;
        if (currentTarget.childNodes.length > 0) {
          currentTarget.childNodes.forEach(e => {
            if (e.classList.contains("el-icon-caret-bottom")) {
              if (e.classList.contains("arrow_select_cancel_selected")) {
                e.classList.remove("arrow_select_cancel_selected")
                e.classList.add("arrow_select_selected")
              } else {
                e.classList.add("arrow_select_cancel_selected")
                e.classList.remove("arrow_select_selected")
              }
            }
          })
        }
        currentTarget.parentNode.childNodes.forEach(item => {
          if (item.classList && item.classList.contains("selected_ul")) {
            item.style.zIndex = "999"
            if (item.style.visibility === 'hidden') {
              item.style.visibility = 'visible'
            } else {
              item.style.visibility = 'hidden'
            }
          }
        })
      },
      chose_option(e) {
        let choosed = e.currentTarget;
        let key = choosed.getAttribute("key");
        let value = choosed.getAttribute("value");
        let parentNode = choosed.parentNode;
        parentNode.style.visibility = 'hidden'
        parentNode.parentNode.childNodes[0].childNodes.forEach(item => {
          if (item.classList.contains("el-icon-caret-bottom")) {
            if (item.classList.contains("arrow_select_cancel_selected")) {
              item.classList.remove("arrow_select_cancel_selected")
              item.classList.add("arrow_select_selected")
            } else {
              item.classList.add("arrow_select_cancel_selected")
              item.classList.remove("arrow_select_selected")
            }
          }
          if (item['localName'] === 'input') {
            item['value'] = value
            item['innerText'] = value
            console.log(key)
            console.log(item)
          }
        })
      }
    }
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

