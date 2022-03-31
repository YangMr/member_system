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
  // TODO 调用获取用户信息接口我们需要通过请求头 将token发送给后台 我们到时候在拦截器里面进行处理 已完成
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
  // TODO 调用获退出登录接口我们需要通过请求头 将token发送给后台 我们到时候在拦截器里面进行处理  已完成
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
