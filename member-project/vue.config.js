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
