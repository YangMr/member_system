<template>
  <div class="login-wrapper">
      <div class="login-form">
        <h2 class="login-form-title">星空会员管理系统</h2>
        <el-form ref="loginForm"  :rules="rules" :model="loginForm" label-width="60px">
          <el-form-item label="账号" prop="username">
            <el-input v-model.trim="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model.trim="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleLogin">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
  </div>
</template>

<script>
import UserModel from "../../api/user"
export default {
  name: "index",
  data : function () {
    return {
      loginForm : {
        username : "",
        password : ""
      },
      rules : {
        username : [
          {required: true, message : "账号不能为空", trigger : "blur"},
          {min : 3, max : 20, message : "长度在 3 到 20 个字符", trigger: "blur"}
        ],
        password : [
          {required: true, message : "密码不能为空", trigger : "blur"}
        ]
      }
    }
  },
  methods : {
    /**
     * 登录方法
     */
    handleLogin(){
      this.$refs["loginForm"].validate(async valid=>{
        //当表单校验不通过是，程序不在继续往下执行
        if(!valid) return;
        const response = await this.$store.dispatch("handleUserLogin",this.loginForm)
        console.log(response)
        if(response.code == 1){
          // TODO 跳转到主页
          this.$router.push("/")
        }
      })
    }
  }
}
</script>

<style scoped>
.login-wrapper{
  width: 100%;
  height: 100%;
  background : url("http://vue.mengxuegu.com/img/login.b665435f.jpg");
}
.login-form{
  width: 350px;
  background: rgba(255,255,255,0.8);
  position: absolute;
  left : 50%;
  top : 160px;
  margin-left: -175px;
  padding:28px;
  border-radius: 20px;
}
.login-form-title{
  text-align: center;
  font-size : 26px;
  font-weight: bold;
}
.el-form{
  margin-top:40px;
}
</style>
