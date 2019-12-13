// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

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
