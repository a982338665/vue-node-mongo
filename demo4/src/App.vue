<template>
  <div id="app">
    <img src="./assets/logo.png">
    <!--    切分页面，分成三个view，常用于，头部，尾部，中间层-->
    <router-view class="main"></router-view>
    <router-view class='left' name='title'></router-view>
    <router-view class="right" name='img'></router-view>
    <!--    //渲染一级路由的-->
  </div>
</template>

<script>
    export default {
        name: 'App'
    }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .left,.right{
    float: left;
    width:49%;
    border:1px solid gray ;
  }
</style>
