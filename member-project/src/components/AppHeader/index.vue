<template>
  <div class="header">
    <div class="header-center">
      <div class="header-logo">
        <img class="logo-img" width="25px" src="http://vue.mengxuegu.com/img/logo.7156be27.png" alt="">
        <router-link class="logo-title" to="/">
          星空会员管理系统
        </router-link>
      </div>
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="changePass">修改密码</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  computed : {
    username(){
      return this.$store.getters.getUserInfo.name || "";
    }
  },
  methods : {
    handleCommand : function (command){
      switch (command){
        case "changePass" :
          console.log("调用修改密码方法")
          break;
        case "logout" :
          this.$store.dispatch("handleLogout")
          break;
      }
    }
  }
}
</script>

<style scoped>
.header-center{
  width: 1280px;
  height: 100%;
  margin: 0 auto;
}
.header-logo{
  float: left;
}
.logo-img{
  vertical-align: middle;
  position: relative;
  top :-2px;
}
.logo-title{
  text-decoration: none;
  color : #fff;
  margin-left: 5px;
}
.el-dropdown{
  float: right;
  color : #fff;
  cursor: pointer;
}
</style>
