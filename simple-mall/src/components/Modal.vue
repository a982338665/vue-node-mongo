<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <!--  此处必须有外部元素包裹它-->
  <div>
    <div class="md-modal modal-msg md-modal-transition " v-bind:class="{'md-show':mdShow}">
      <div class="md-modal-inner">
        <div class="md-top">
<!--          <div class="md-title">Login in</div>-->
          <button class="md-close" @click="closeModal">Close</button>
        </div>
        <div class="md-content">
          <div class="confirm-tips">
            <slot name="message"></slot>
          </div>
          <div class="btn-wrap">
            <slot name="btnGroup"></slot>
          </div>
        </div>
      </div>

    </div>
    <!--  点击遮罩时，关闭模态框  -->
    <div class="md-overlay" v-if="mdShow" @click="closeModal"></div>
  </div>
</template>

<script>
    export default {
        props: ['mdShow'],
        methods: {
            closeModal() {
                //调用父组件的close自定义事件，将关闭通知给父组件
                this.$emit('close')
            },
        }
    }

</script>

<style>

</style>

