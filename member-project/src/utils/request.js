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
