# member_system
会员管理系统

## 一、项目前期准备工作

### 1.1 在代码托管平台(Github、码云、Gitlab)创建远程仓库

- Github 上课的时候老师用的代码托管平台
- 码云  大家托管项目可以使用码云
- Gitlab  在公司里面我项目的托管一般是在Gitlab上面

### 1.2 将远程仓库克隆到本地的工作区

```
git clone 你的远程仓库地址
```

### 1.3 使用vue-cli创建项目

```
vue create 项目名称
```

- 关于项目创建的选项大家有不懂的地方可以直接问老师，咱们在课件里面就不贴图了

### 1.4 测试项目能否跑起来

```
cd 项目目录
npm run serve
```

访问localhost:8080 

### 1.5 将初始化的项目提交到远程仓库

```
git add .

git commit -m "feta:初始化项目"

git push origin master
```

### 1.6 对项目进行分析

## 二、对项目进行基础性配置

### 2.1 初始化项目

#### 2.1.1 修改标题

#### 2.1.2 修改ICON图标

#### 2.1.3 通过vue.config.js对服务器进行一些基础性配置

- 配置项目启动的端口号
- 配置了主机名
- 配置是否启动https协议
- 是否自动浏览器
- 关闭eslint语法检测
- 项目打包时不生成.map后缀名的文件

```
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
```

### 2.2 安装项目所需要的依赖

- element-ui (安装)
- axios (安装)
- day.js (后面用到在安装)

#### 2.2.1 使用element-ui,测试element-ui能否使用

#### 2.2.2 引入axios,测试axios能够使用
