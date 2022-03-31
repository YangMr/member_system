/**
 * @author YangLing
 * @date 2022/3/31 2:33 PM
 */

/**
 * router.beforeEach
 * 全局  router.beforeEach
 * 局部  组件
 * 路由独享守卫  路由
 *
   to 要进入的路由信息
   from  跳转之前的路由信息
   next 设置要跳转到的路由
 */

/**
 * 实现所有页面鉴权的思路
 *    1. 当路由跳转的时候，获取vuex 或者 本地存储的token
 *    2. 判断获取的token是否存在
 *        有token的处理 (已登录)
 *            判断有没有用户信息
 *                有用户信息
 *                  next()
 *                没有用户信息
 *                    获取一下用户信息
 *                        获取到了
 *                            next()
 *                        没有获取到
 *                          next("/login")
 *
 *
 *        没有token的处理 (未登录)
 *            判断跳转的是不是登录页
 *              是
 *                进入登录页
 *              不是
 *                不能进入，进入到登录页
 *
 */

// 引入路由对象
import router from "./router"
// 引入vuex对象
import store from "./store"

//创建路由守卫方法
router.beforeEach(async (to,from,next)=>{
    // 1. 获取vuex的token
    const token = store.getters.getToken
    const userInfo = store.getters.getUserInfo
    // 2. 判断有没有token
    if(!token){
       // 没有token的处理
       if(to.path == "/login"){
         next()
       }else{
         next("/login")
       }
    }else{
      if(to.path === "/login"){
        next(from.path)
      }else{
        if(userInfo.length > 0){
          next()
        }else{
          const response = await store.dispatch("handleUserInfo")
          if(response.flag){
            next()
          }else{
            next("/login")
          }
        }
      }
    }
})
