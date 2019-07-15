<template>
  <div id="draggable">aaaa</div>


</template>

<script >



  export default {
    name: "draggable",
    mounted() {

      let script_ele = document.createElement('script');
      script_ele.setAttribute("src","./util/plain-draggable.min.js")
      script_ele.setAttribute("type","javascript")
      document.body.appendChild(script_ele)
    },
    aftermounted(){
      console.log(1111111111)
      let element = document.getElementById("draggable")
      draggable =new PlainDraggable(element);

      console.log(draggable)
    }
  }
</script>

<style scoped>

</style>
