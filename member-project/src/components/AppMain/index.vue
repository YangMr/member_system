<template>
  <div class="main">
    <div v-if="$route.path !== '/index'">我是面包屑导航</div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "index"
}
</script>

<style scoped>

</style>
