/**
 * @author YangLing
 * @date 2022/3/31 2:33 PM
 */
/*
有没有登录 (有没有token)

  没有token 未登录

      判断跳转的是不是登录页面

          是     next

          不是    next("/login")

  有token   已登录
       判断跳转的是不是登录页面
          进入的是登录页面
              则进入跳转之前的页面

          进入的不是登录页面
              判断是否有用户信息
                  有
                    next()  进入要进入的页面
                  没有
                    调用获取用户信息接口

                        获取到了
                            next()  进入要进入的页面
                        没有获取到了
                            next("/login")

 */


import router from "./router"
import store from "./store"

router.beforeEach(async (to,from,next)=>{
  //1. 获取token
  const token = store.getters.getToken
  //2. 获取用户信息
  const userInfo = store.getters.getUserInfo

  //3. 判断有没有token
  if(!token){  // 4. 没有token的处理
    if(to.path === "/login"){  // 4.1 进入的是登录页面
        next()  // 4.1.1 进入登录页面
    }else{  // 4.2 进入的不是登录页面
      next("/login") //  4.2.1 进入登录页面
    }
  }else{ // 5. 有token的处理
    if(to.path === "/login"){  //5.1 已登录的情况下进入登录页面
      next(from.path)   // 5.1.1  进入的是跳转之前的页面
    }else{ // 5.2 进入的不是登录页面
      if(userInfo.length > 0){  // 5.2.1 判断用户信息是否存在，
        // 存在 -- 进入要进入的页面
        next()
      }else{ // 5.2.2 用户信息不存在
        // 调用获取用户信息接口，重新获取用户信息
        const response =await store.dispatch("handleUserInfo")
        if(response.error_code == 0){  // 获取用户信息成功
          next()
        }else{  // 获取用户信息失败
          next("/login")
        }
      }
    }
  }
})

























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

// // 引入路由对象
// import router from "./router"
// // 引入vuex对象
// import store from "./store"
//
// //创建路由守卫方法
// router.beforeEach(async (to,from,next)=>{
//     // 1. 获取vuex的token
//     const token = store.getters.getToken
//     const userInfo = store.getters.getUserInfo
//     // 2. 判断有没有token
//     if(!token){
//        // 没有token的处理
//        if(to.path == "/login"){
//          next()
//        }else{
//          next("/login")
//        }
//     }else{
//       if(to.path === "/login"){
//         next(from.path)
//       }else{
//         if(userInfo.length > 0){
//           next()
//         }else{
//           const response = await store.dispatch("handleUserInfo")
//           if(response.flag){
//             next()
//           }else{
//             next("/login")
//           }
//         }
//       }
//     }
// })
