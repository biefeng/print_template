<template>
  <div>
    <div id="moved" style="background-color: darkgrey;width: 100px;height: 100px" ></div>

  </div>
</template>

<script>
  export default {
    name: "testKeydown",
    mounted(){
      let moved = document.getElementById("moved");
      moved.onkeydown=this.moveByDirectKey
    }
  }
</script>
<style scoped>

</style>
