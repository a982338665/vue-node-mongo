import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '@/views/GoodsList'
import GoodsList2 from '@/views/GoodsList2'
import Title from '@/views/Title'
import Image from '@/views/Image'
import Cart from '@/views/Cart'

Vue.use(Router)

export default new Router({
  //当配置为history时 http://localhost:8080/goods/id访问
  //当去掉该配置，默认hash，则使用http://localhost:8080/#/goods/id访问
  mode:'history',//'hash'
  routes: [
    {
      path: '/goods/:goodsId',//通过路由 http://localhost:8080/#/goods/id访问 【#默认指Hash，可以通过mode：'history'设置给去掉】
      name: 'GoodsList',
      component: GoodsList,
    },
    {
      path: '/goods2',
      name: 'GoodsList2',
      component: GoodsList2,
      children:[//定义子路由
        {
          path:'title',
          name:'title',
          component:Title
        },
        {
          path:'image',
          name:'image',
          component:Image
        }
      ]
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart,
    }
  ]
})
