/**
 * @author YangLing
 * @date 2022/3/29 2:05 PM
 */

// 引入axios
import axios from "axios"

import { Loading } from 'element-ui';

import store from "../store"

/**
 * loading加载方法， 定义全局loading加载的时候，频繁请求的时候，loading会开启多次， loading效果就会出现问题
 * 解决方法： 使用单例模式， 每次loading开启的时候只产生一个loading实例对象
 * @type {{loadingInstance: null, close: loading.close, open: loading.open}}
 */
const loading = {
  // 保存的是loading实例对象
  loadingInstance : null,
  // 开启loading方法
  open : function (){
    if(this.loadingInstance == null){
      this.loadingInstance = Loading.service({
        target : ".main",
        background : "rgba(0,0,0,0.5)",
        text : "拼命加载中..."
      });
    }
  },
  // 关闭loading方法
  close : function (){
    if(this.loadingInstance !== null){
      this.loadingInstance.close()
    }
    this.loadingInstance = null
  }
}


import {getToken} from "./auth";

// 创建axios实例对象
const request = axios.create({
  // 请求的公共接口地址
  baseURL : process.env.VUE_APP_BASE_API,
  // 请求的超时时间
  timeout : 5000
})

// 创建请求拦截器
request.interceptors.request.use(function (config) {
  // 开启loading
  loading.open()
  // 判断token 是否存在，如果存在，则通过请求头发送给后台
  if(getToken()){
    config.headers.authorization ="Bearer " + getToken()
  }
  return config;
}, function (error) {
  // 关闭loading
  loading.close()
  return Promise.reject(error);
});

// 创建响应拦截器
request.interceptors.response.use(function (response) {
  // 关闭loading
  loading.close()
  console.log(response.data.code)
  // token的过期处理
  if(response.data.code == "-1"){
    store.dispatch("handleLogout")
  }
  return response.data;
}, function (error) {
  // 关闭loading
  loading.close()
  return Promise.reject(error);
});

// 导出axios实例对象
export default request
