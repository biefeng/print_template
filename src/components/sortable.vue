<template>


  <div>
    <ul id="sortable" style="width: 400px;list-style: none">
      <li>
        <div style="height: 40px;border:1px solid rebeccapurple;background-color: yellow">1</div>
      </li>
      <li>
        <div style="height: 50px;border:1px solid rebeccapurple;background-color: yellow">2</div>
      </li>
      <li>
        <div style="height: 70px;border:1px solid rebeccapurple;background-color: yellow">3</div>
      </li>
      <li>
        <div style="height: 20px;border:1px solid rebeccapurple;background-color: yellow">4</div>
      </li>
      <li>
        <div style="height: 110px;border:1px solid rebeccapurple;background-color: yellow">5</div>
      </li>
    </ul>
    <div style="width: 400px" id="sortDiv">
      <div style="height: 110px;border:1px solid rebeccapurple;background-color: yellow">1</div>
      <div style="height: 110px;border:1px solid rebeccapurple;background-color: yellow">2</div>
      <div style="height: 110px;border:1px solid rebeccapurple;background-color: yellow">3</div>
      <div style="height: 110px;border:1px solid rebeccapurple;background-color: yellow">4</div>
      <div style="height: 110px;border:1px solid rebeccapurple;background-color: yellow">5</div>
    </div>

  </div>
</template>


<script>

  import Sortable from 'sortablejs'

  export default {
    name: "sortable",
    mounted() {
      let el = document.getElementById('sortable');
      new Sortable(el, {
        animation: 150
      })

      let sortDiv = document.getElementById('sortDiv')
      new Sortable(sortDiv, {
        animation: 150
      })
    }
  }


</script>

<style scoped>

</style>
