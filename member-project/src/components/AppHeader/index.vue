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
          {{getUserInfo.username}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="changePass">修改密码</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <el-dialog title="修改密码" width="400px" :visible.sync="dialogFormVisible">
      <el-form :model="changePassForm" :rules="rules">
        <el-form-item label="原密码" label-width="80px" prop="oldPassword">
          <el-input type="password" v-model="changePassForm.oldPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" label-width="80px" prop="newPassword">
          <el-input type="password" v-model="changePassForm.newPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" label-width="80px" prop="checkPassword">
          <el-input type="password" v-model="changePassForm.checkPassword" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmitPassword">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import UserModel from "../../api/user"
export default {
  name: "index",
  data(){
    // 校验原密码
    const validatorOldPass = async (rule, value,callback)=>{
      const passData = {password : value,userId : this.getUserInfo.id}
      const response = await UserModel.checkOldPass(passData)
      if(!response.flag){
        callback(new Error("原密码不正确"))
      }else{
        callback()
      }
    };
    // 判断确认密码和新密码是否一致
    const validatorChangePass = (rule,value,callback)=>{
      if(value === this.changePassForm.newPassword){
        callback()
      }else{
        callback(new Error("两次输入密码不一致!"))
      }
    };
    return {
      dialogFormVisible : false,
      changePassForm : {
        oldPassword : "",
        newPassword : "",
        checkPassword : ""
      },
      rules : {
        oldPassword: [
          {required : true, message : "原密码不能为空", trigger : "blur"},
          {validator : validatorOldPass, trigger: "blur"}
        ],
        newPassword: [
          {required : true, message : "新密码不能为空", trigger : "blur"}
        ],
        checkPassword: [
          {required : true, message : "确认密码不能为空", trigger : "blur"},
          {validator : validatorChangePass, trigger: "blur"}
        ]
      }
    }
  },
  computed : {
    getUserInfo(){
      return this.$store.getters.getUserInfo || "";
    }
  },
  methods : {
    handleCommand(command){
      switch (command){
        case "changePass" :
          this.handleShowDiaLog()
          break;
        case "logout" :
          this.$store.dispatch("handleLogout")
          break;
      }
    },
    handleShowDiaLog(){
      this.dialogFormVisible = true;
    },
    handleCloseDiaLog(){
      this.dialogFormVisible = false
    },
    async handleSubmitPassword(){
      const submitPassData = {password : this.changePassForm.newPassword, userId : this.getUserInfo.id }
      const response = await UserModel.changeUserPass(submitPassData)
      if(response.flag){
        this.$store.dispatch("handleLogout")
      }
    }
  }
}
</script>

<style scoped>
.header-center{
  width: 1350px;
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
