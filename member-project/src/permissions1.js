/**
 * @author YangLing
 * @date 2022/4/1 9:56 AM
 */

// 部分页面鉴权
/**
 *
 *
 *
 *
 *        判断要进入的页面他的meta字段里面的requireAuth的值是否为true，
 *
 *
 *

 *
 */

import router from "./router"
import store from "./store"

router.beforeEach(async (to,from,next)=>{
    // 1. 获取token
    const token = store.getters.getToken
    // 2. 获取用户信息
    const userInfo = store.getters.getUserInfo

    //3. 获取要进入的页面是否有requireAuth字段的值为true
    const requireAuth = to.meta.requireAuth

    if(requireAuth){
      if(!token){
        next("/login")
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
    }else{
      next()
    }


})
