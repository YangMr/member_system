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
