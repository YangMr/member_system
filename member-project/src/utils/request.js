/**
 * @author YangLing
 * @date 2022/3/29 2:05 PM
 */

// 引入axios
import axios from "axios"

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
  // 判断token 是否存在，如果存在，则通过请求头发送给后台
  if(getToken()){
    config.headers.token = getToken()
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

// 创建响应拦截器
request.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  return Promise.reject(error);
});

// 导出axios实例对象
export default request
