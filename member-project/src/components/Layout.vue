<template>
  <div class="layout-wrapper">
    <!--头部-->
    <app-header></app-header>
    <!--左侧-->
    <app-navbar></app-navbar>
    <!--主体内容-->
    <app-main></app-main>
  </div>
</template>

<script>
import AppHeader from "./AppHeader"
import AppNavbar from "./AppNavbar"
import AppMain from "./AppMain"
export default {
  name: "Layout",
  components : {
    AppHeader,
    AppNavbar,
    AppMain
  }
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
.navbar{
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
  right :0;
  overflow-y: auto;
  bottom:0;
}
</style>
