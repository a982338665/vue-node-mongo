<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <!--  此处必须有外部元素包裹它-->
  <div>
    <div class="md-modal modal-msg md-modal-transition " v-bind:class="{'md-show':mdShow}">
      <div class="md-modal-inner">
        <div class="md-top">
          <div class="md-title">Login in</div>
          <button class="md-close" @click="loginModalFlag=false">Close</button>
        </div>
        <div class="md-content">
          <div class="confirm-tips">
            <!--<div class="error-wrap">
              <span class="error error-show" v-show="errorTip">用户名或者密码错误</span>
            </div>
            <ul>
              <li class="regi_form_input">
                <i class="icon IconPeople"></i>
                &lt;!&ndash;        使用v-model实现数据双向绑定        &ndash;&gt;
                <input type="text" tabindex="1" name="loginname" v-model="userName"
                       class="regi_login_input regi_login_input_left" placeholder="User Name" data-type="loginname">
              </li>
              <li class="regi_form_input noMargin">
                <i class="icon IconPwd"></i>
                <input type="password" tabindex="2" name="password" v-model="userPwd"
                       class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="Password"
                       @keyup.enter="login">
              </li>
            </ul>-->
            <slot name="message"></slot>
          </div>
          <div class="btn-wrap">
<!--            <a href="javascript:;" class="btn-login" @click="login">登 录</a>-->
            <slot name="btnGroup"></slot>

          </div>
        </div>
      </div>

    </div>
    <!--  点击遮罩时，关闭模态框  -->
    <div class="md-overlay" v-if="mdShow" @click="loginModalFlag=false"></div>
  </div>
</template>

<script>
  export default {
      props:['mdShow'],

  }

</script>

<style>

</style>

