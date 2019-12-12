<template>
  <div>
    商品列表页面
    <span>{{$route.params.goodsId}}</span>
    <!-- router-link通过router-view来访问子路由-->
    <!-- 此处需要将父地址写上-->
    <router-link to="/goods2/title">显示商品标题</router-link>
    <router-link to="/goods2/image">显示商品图片</router-link>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
    export default {}
</script>

