<template>
  <div>
    商品列表页面
    <span>{{$route.params.goodsId}}</span><br>
    <!-- router-link通过router-view来访问子路由-->
    <!-- 此处需要将父地址写上-->
    <router-link to="/goods2/title">显示商品标题</router-link><br>
    <router-link to="/goods2/image">显示商品图片</router-link><br>
    <div>
      <router-view></router-view>
    </div>
    <router-link to="/cart">通过路由中的【path】跳转到购物车</router-link><br>
    <router-link v-bind:to="{name:'cart'}">通过路由中的【name】跳转到购物车</router-link><br>
<!--    <router-link v-bind:to="{name:'cart',params:{id:123}}">通过路由中的【name】跳转到购物车，动态路径跳转</router-link><br>-->
    <button @click="jump">button - 跳转到购物车页面 </button>
  </div>
</template>

<script>
    export default {
        data(){
            return {}
        },
        methods:{
          jump(){
              // this.$router.push('cart')//没有斜杠则会访问 localhost/goods2/cart
              // this.$router.push('/cart')//localhost/cart
              // this.$router.go(1) //向后一步
              // this.$router.go(-1) //退一步
              // this.$router.push({path:'/cart?name=li'})//localhost/cart
              this.$router.push({path:'/cart',query:{name:'li'}})//localhost/cart

          }
        }
    }
</script>

