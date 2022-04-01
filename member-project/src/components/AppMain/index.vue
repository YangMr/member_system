<template>
  <div class="main">
    <breadcrumb v-show="$route.path !== '/index'"></breadcrumb>
    <router-view></router-view>
  </div>
</template>

<script>
import Breadcrumb from "../common/Breadcrumb";
export default {
  name: "index",
  data(){
    return {

    }
  },
  components : {
    Breadcrumb
  }
}
</script>

<style scoped>
</style>
