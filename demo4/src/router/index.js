import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '@/views/GoodsList'

Vue.use(Router)

export default new Router({
  //当配置为history时 http://localhost:8080/goods/id访问
  //当去掉该配置，默认hash，则使用http://localhost:8080/#/goods/id访问
  mode:'history',//'hash'
  routes: [
    {
      path: '/goods/:goodsId',//通过路由 http://localhost:8080/#/goods/id访问 【#默认指Hash，可以通过mode：'history'设置给去掉】
      name: 'GoodsList',
      component: GoodsList
    }
  ]
})
