# member_system
会员管理系统

## 一、项目前期准备工作

### 1.1 在代码托管平台(Github、码云、Gitlab)创建远程仓库

- Github 上课的时候老师用的代码托管平台
- 码云  大家托管项目可以使用码云
- Gitlab  在公司里面我项目的托管一般是在Gitlab上面

### 1.2 将远程仓库克隆到本地的工作区

```
git clone 你的远程仓库地址
```

### 1.3 使用vue-cli创建项目

```
vue create 项目名称
```

- 关于项目创建的选项大家有不懂的地方可以直接问老师，咱们在课件里面就不贴图了

### 1.4 测试项目能否跑起来

```
cd 项目目录
npm run serve
```

访问localhost:8080 

### 1.5 将初始化的项目提交到远程仓库

```
git add .

git commit -m "feta:初始化项目"

git push origin master
```

### 1.6 对项目进行分析

## 二、对项目进行基础性配置

### 2.1 初始化项目

#### 2.1.1 修改标题

#### 2.1.2 修改ICON图标

#### 2.1.3 通过vue.config.js对服务器进行一些基础性配置

- 配置项目启动的端口号
- 配置了主机名
- 配置是否启动https协议
- 是否自动浏览器
- 关闭eslint语法检测
- 项目打包时不生成.map后缀名的文件

```
/**
 * @author YangLing
 * @date 2022/3/29 10:30 AM
 */
module.exports = {
  // 服务器进行配置
  devServer : {
    // 配置端口号
    port : 9999,
    // 配置主机名
    host : "localhost",
    // 配置是否开启https协议
    https : false,
    // 配置项目启动时是否自动打开浏览器
    open : true
  },
  // 关闭eslint语法检测
  lintOnSave : false,
  // 打包时不会生成 .map 文件，加快打包速度
  productionSourceMap : false
}
```

### 2.2 安装项目所需要的依赖

- element-ui (安装)
- axios (安装)
- day.js (后面用到在安装)

#### 2.2.1 使用element-ui,测试element-ui能否使用

#### 2.2.2 引入axios,测试axios能够使用

### 2.3 配置跨域

##### 2.3.1 什么是同源策略？ 跨域是如何产生的？

答案： 老师就进行口述，至于内容自己去 总结

#### 2.3.2 如何解决跨域

- 本地开发 (vue.config.js)
```
/**
 * @author YangLing
 * @date 2022/3/29 10:30 AM
 */
module.exports = {
  // vue项目打包之后在本地打开是白屏问题
  publicPath : "./",
  // 服务器进行配置
  devServer : {
    // 配置端口号
    port : 9999,
    // 配置主机名
    host : "localhost",
    // 配置是否开启https协议
    https : false,
    // 配置项目启动时是否自动打开浏览器
    open : true,
    // 配置跨域
    proxy : {
      // /dev-api 代理名称, 请求的时候请求dev-api 就相当于是请求http://localhost:3001
      [process.env.VUE_APP_BASE_API] : {  // 开发阶段 代理名称是 /dev-api  生产环境阶段 /pro-api
        // 要跨域的地址
        target : process.env.VUE_APP_SERVICE_URL,
        // 开启跨域
        changeOrigin : true,
        // 路径重写
        pathRewrite : {
          ["^" + process.env.VUE_APP_BASE_API] : ""
        }
      }
    }
  },
  // 关闭eslint语法检测
  lintOnSave : false,
  // 打包时不会生成 .map 文件，加快打包速度
  productionSourceMap : false
}
```

- 线上 (nginx.conf)
```
location 代理名称{
    proxy_pass 要跨域的地址
}
```

### 2.4 二次封装axios

- utils/request.js
```
/**
 * @author YangLing
 * @date 2022/3/29 2:05 PM
 */

// 引入axios
import axios from "axios"

// 创建axios实例对象
const request = axios.create({
  // 请求的公共接口地址
  baseURL : process.env.VUE_APP_BASE_API,
  // 请求的超时时间
  timeout : 5000
})

// 创建请求拦截器

request.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});

// 创建响应拦截器
request.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return Promise.reject(error);
});

// 导出axios实例对象
export default request
```

### 2.5 封装api

```
/**
 * @author YangLing
 * @date 2022/3/29 2:34 PM
 */

// 引入request.js
import request from "../utils/request"

/**
 * 用户登录接口
 * @param data : {username, password}
 * @returns {AxiosPromise}
 */
const userLogin = (data) => {
  return request({url : "/user/login", method : "POST", data})
}

/**
 * 获取用户信息接口
 * @header token
 * @returns {AxiosPromise}
 */
const getUserInfo = () => {
  // TODO 调用获取用户信息接口我们需要通过请求头 将token发送给后台 我们到时候在拦截器里面进行处理
  return request({url : "/user/info/admin", method : "GET"})
}

/**
 * 校验原密码接口
 * @param data : {userId,password}
 * @returns {AxiosPromise}
 */
const checkOldPass = (data) => {
  return request({url: "/user/pwd", method : "POST", data})
}

/**
 * 修改密码接口
 * @param data : {userId,password}
 * @returns {AxiosPromise}
 */
const changeUserPass = (data) => {
  return request({url : "/user/pwd", method : "PUT", data})
}

/**
 * 用户退出登录接口
 * @header token
 * @returns {AxiosPromise}
 */
const userLogout = () => {
  // TODO 调用获退出登录接口我们需要通过请求头 将token发送给后台 我们到时候在拦截器里面进行处理
  return request({url : "/user/logout", method : "POST"})
}


// 导出user相关的接口
export default {
  userLogin,
  getUserInfo,
  checkOldPass,
  changeUserPass,
  userLogout
}

```

### 2.6 封装本地存储方法

- utils/auth.js

```
/**
 * @author YangLing
 * @date 2022/3/29 3:04 PM
 */

const TOKEN_KEY = "token"
const USER_INFO_KEY = "userInfo"

/**
 * 设置存储token的本地方法
 * @param token
 */
function setToken(token){
  localStorage.setItem(TOKEN_KEY,token)
}

/**
 * 获取token的方法
 * @returns {string}
 */
function getToken(){
 return localStorage.getItem(TOKEN_KEY)
}

/**
 * 设置存储用户信息的方法
 * @param info
 */
function setUserInfo(info){
  localStorage.setItem(USER_INFO_KEY,JSON.stringify(info))
}

/**
 * 获取用户信息的方法
 * @returns {string}
 */
function getUserInfo(){
  return localStorage.getItem(USER_INFO_KEY)
}

/**
 * 删除token的方法与删除用户信息的方法
 */
function removeTokenAndInfo(){
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_INFO_KEY)
}

/**
 * 导出存储token、userInfo,获取token、userInfo,删除token、userInfo 等的方法
 */
export {
  setToken,
  getToken,
  setUserInfo,
  getUserInfo,
  removeTokenAndInfo
}

```

## 三、登录模块开发

### 3.1 创建登录组件

### 3.2 配置登录页面路由

### 3.3 实现登录页面布局

- 创建公共样式，进行引入， 目的： 是可以解决浏览器自带的标签默认样式

### 3.4 实现登录功能



- 所有页面鉴权
- 部分页面鉴权
- 面包屑导航的封装
- 会员管理增、删、改、查、分页等功能
