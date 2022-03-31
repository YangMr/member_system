<template>
  <div class="layout-wrapper">
    <div class="header">头部区域</div>
    <div class="aside">
      <p v-for="(item,index) in 200">侧边栏{{index}}</p>
    </div>
    <div class="main">
      <p v-for="(item,index) in 200">主体内容{{index}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Layout"
}
</script>

<style scoped>
.layout-wrapper{
  width: 100%;
  height: 100%;
}
.header{
  height: 50px;
  line-height: 50px;
  background-color: #2d3a4b;
  position: absolute;
  left :0;
  top : 0;
  right : 0;
}
.aside{
  background-color: #545c64;
  width: 230px;
  top : 50px;
  left :0;
  bottom:0;
  position: absolute;
  overflow-y: auto;
}
.main{
  position: absolute;
  left: 230px;
  top: 50px;
  background-color: red;
  right :0;
  overflow-y: auto;
  bottom:0;
}
</style>
