<template>
  <div id="wrap">
    <div id="infor">
      <div id="infor_box">
        <el-input v-model="username" type="text" placeholder="手机号/邮箱"></el-input>
        <el-input v-model="password" type="password" placeholder="新密码"></el-input>
        <el-input v-model="confirm" type="password" placeholder="确认新密码"></el-input>
        <el-button id="register" type="danger" round @click="forget()">找回密码</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: '',
      confirm: ''
    }
  },
  methods: {
    forget () {
    }
  }
}
</script>

<style lang="stylus" scoped>
#wrap
  >>> .el-input__inner
    width 200px
    height 27px
    margin 20px 0 0 0
  #infor
    position relative
    top 75px
    width 100%
    display flex
    justify-content center
    #infor_box
      width 200px
      .wrong
        margin-top 26px
        margin-left 10px
        width 15px
        height 15px
        position absolute
      #register
        width 200px
        height 30px
        line-height 0px
        margin-top 20px
</style>
