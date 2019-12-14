// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'


Vue.config.productionTip = false

//分页引入
Vue.use(infiniteScroll)
//图片懒加载
Vue.use(VueLazyLoad,{
  loading:'/static/loading-svg/loading-bars.svg'
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

//使用此种方式也可以正常挂载
// new Vue({
//   router,
//   // components: { App },
//   // template: '<App/>'
//   render:function (h) {
//     return h(App)
//   }
// }).$mount('#app')
