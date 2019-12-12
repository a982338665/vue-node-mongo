# vue-node-mongo
mall

### 1.基于MV*模式的VUE框架
    
    ·model绑定view
    ·没有控制器概念
    ·数据驱动，状态管理
    
### 2.全栈开发简易商城：vue+node+mongo（vue-cli webpack）

#### 2.1 前置知识
    
    1.html/css/js
    2.vue
    3.es6
    4.node
    5.npm 
    6.webpack
   
#### 2.2 vue基础：

##### 2.2.1 nodejs和npm的安装和环境搭建
    
    ·cnpm list
    ·npm list
    
##### 2.2.2 vue环境搭建及vue-cli的使用
    
    1.vue多页面应用文件引入：D:\go-20191030\vue-node-mongo\demo1\index.html
        ·官网拷贝：... 、使用 CDN 方法
            以下推荐国外比较稳定的两个 CDN，国内还没发现哪一家比较好，目前还是建议下载到本地。
            Staticfile CDN（国内） : https://cdn.staticfile.org/vue/2.2.2/vue.min.js
            unpkg：https://unpkg.com/vue/dist/vue.js, 会保持和 npm 发布的最新的版本一致。
            cdnjs : https://cdnjs.cloudflare.com/ajax/libs/vue/2.1.8/vue.min.js
        ·npm安装：D:\go-20191030\vue-node-mongo\demo2
            cnpm i vue --save   安装vue并且，添加到package.json里
    2.vue-cli构建SPA应用：-- 安装脚手架
        1.安装：npm install -g vue-cli
        2.初始化项目-简单模式的webpack项目：vue init webpack-simple demo3 [vue-node-mongo下执行] D:\go-20191030\vue-node-mongo\demo3
        3.初始化项目-完整模式的webpack项目：vue init webpack demo4        [vue-node-mongo下执行] D:\go-20191030\vue-node-mongo\demo4
            ? Project name demo4
            ? Project description miaoshu
            ? Author li
            ? Vue build standalone
            ? Install vue-router? Yes              项目路由
            ? Use ESLint to lint your code? No     代码检查 
            ? Set up unit tests No                 单元测试 
            ? Setup e2e tests with Nightwatch? No

##### 2.2.3 vue配置介绍：主要关注
    
    1.D:\go-20191030\vue-node-mongo\demo4\config\index.js
    2.D:\go-20191030\vue-node-mongo\demo4\build\webpack.base.conf.js
    
##### 2.2.4 vue基础语法
    
    1.模板语法：
        ·Mustache语法：{{msg}}
        ·Html赋值：v-html=""
        ·绑定属性：v-bind:id=""
        ·文本赋值：v-text=""
        ·使用表达式：{{ok?'yes':'no'}}
        ·if：v-if=""
        ·过滤器：{{message|capitalize}} 和v-bind:id = 'rawId | formatId'
    2.Class和Style绑定:
        ·对象语法：v-bind:class="{active:isActive}" isActive是data中的值，通过此来判断属性是否该显示
        ·数组语法：
        ·style绑定：v-bind:style="{color:colorVal}" colorVal是data中的值，通过此来判断属性是否该显示
    3.条件渲染：
        ·v-if
        ·v-else
        ·v-else-if
        ·v-show     判断div是否显示或隐藏
        ·v-cloak    
    4.事件处理器：
        ·v-on:click="greet" 或者 @click ="greet"
        ·v-on:click.stop            阻止冒泡
        ·v-on:click.stop.prevent    阻止默认事件，例如a标签，点击会跳转，该属性会阻止该事件
        ·v-on:click.self            给div事件绑定
        ·v-on:click.once            给事件绑定一次，仅生效一次
        ·v-on:keyup.enter           键盘事件
            tab
            delete
            esc
            space
            up
            down
            left
            right
    5.vue组件：
        ·全局和局部组件
        ·父子组件通信 -数据传递 prop emit 只允许父组件流向子组件，通过emit可以变相将子组件数据流向父组件
        ·slot

#### 2.3 vue路由：

##### 2.3.1 路由基础

    1.vue-router用来构建SPA
    2.<router-link></router-link>或者this.$router.push({path:''}) 跳转实为a标签
    3.<router-view></router-view>   组件渲染 和2配合使用
    4.路由介绍：
        ·动态路由匹配
            模式              匹配路径            $route.params
            /user/:username  /user/evan         {username:'evan'}
            /user/:a1/a2     /user/1/2          {a1:'1',a2:'2'}
        ·嵌套路由: html里面的路由
        ·编程式路由：通过js实现页面跳转
            $router.push('name')
            $router.push({path:'name'})
            $router.push({path:'name?a=13'})
            $router.push({path:'name',query:{a:123}})
            $router.go(1) 和go(-1)  
        ·命名路由和命名视图
            ·给路由定义不同的名字，根据名字进行匹配
            ·给不同的route-view定义名字，通过名字进行对应组件的渲染
    5.
