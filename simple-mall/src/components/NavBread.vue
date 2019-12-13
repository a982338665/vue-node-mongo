<template>
  <!--  此处必须有外部元素包裹它-->
  <div class="nav-breadcrumb-wrap">
    <div class="container">
      <nav class="nav-breadcrumb">
        <a href="/">Home</a>
<!--        <span>Goods</span>-->
<!--        插槽-->
        <slot name="bread1"></slot>
<!--        <slot name="bread2"></slot>-->
      </nav>
    </div>
  </div>

</template>

<script>
</script>

<style>
</style>
