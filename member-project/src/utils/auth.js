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
  return JSON.parse(localStorage.getItem(USER_INFO_KEY))
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
