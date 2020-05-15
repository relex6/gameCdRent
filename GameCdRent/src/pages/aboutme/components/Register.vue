<template>
  <div id="wrap">
    <div id="infor">
      <div id="infor_box">
        <el-input v-model="email" placeholder="邮箱" :onkeyup="check_email()"></el-input>
        <el-tooltip effect="light" content="请填写正确的邮箱地址！" placement="right"><img v-if="email_wrong" class="wrong" src="@/assets/wrong.png"></el-tooltip>
        <el-input v-model="phone" placeholder="手机号" :onkeyup="check_phone()"></el-input>
        <el-tooltip effect="light" content="请填写11位手机号码！" placement="right"><img v-if="phone_wrong" class="wrong" src="@/assets/wrong.png"></el-tooltip>
        <el-input v-model="nick" placeholder="昵称"></el-input>
        <el-input v-model="password" type="password" placeholder="密码"></el-input>
        <el-input v-model="confirm" type="password" placeholder="确认密码"></el-input>
        <el-button id="register" type="danger" round @click="register()">注册</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      phone: '',
      password: '',
      nick: '',
      confirm: '',
      email_wrong: true,
      phone_wrong: true
    }
  },
  methods: {
    register () {
      if (this.email === '') {
        this.$message.error('你要有你的邮箱~')
      } else if (this.phone === '') {
        this.$message.error('看见红点没？')
      } else if (this.nick === '') {
        this.$message.error('请不要忘记你的昵称~')
      } else if (this.password === '') {
        this.$message.error('没有密码可不行')
      } else if (this.password !== this.confirm) {
        this.$message.error('两次密码要输入一致哦~')
      } else if (this.password === this.confirm) {
        console.log('正在注册......')
        this.$axios.post('http://127.0.0.1:8888/api/users/register', {
          email: this.email,
          phone: this.phone,
          password: this.password,
          nick: this.nick
        })
          .then(res => {
            if (res.data.message === '邮箱已经被注册!') {
              this.$message('邮箱已经被注册!')
            } else if (res.data.message === '手机号已经被注册!') {
              this.$message('手机号已经被注册!')
            } else {
              if (!this.email_wrong && !this.phone_wrong) {
                this.$message('注册成功!前往登录!')
                this.$router.push({name: 'Login'})
              }
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
    check_email () {
      var regEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (!regEmail.test(this.email)) {
        this.email_wrong = true
        this.email = this.email.replace(/[^(\w)@.]/ig, '')
      } else {
        this.email_wrong = false
      }
    },
    check_phone () {
      var regPhone = /^1[3456789]\d{9}$/
      if (!regPhone.test(this.phone)) {
        this.phone_wrong = true
        this.phone = this.phone.replace(/[^0-9]/ig, '')
      } else {
        this.phone_wrong = false
      }
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
