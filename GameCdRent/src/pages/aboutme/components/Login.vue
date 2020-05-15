<template>
  <div id="wrap">
    <div id="login">
      <div id="login_box">
        <el-input v-model="username" placeholder="手机号/邮箱"></el-input>
        <el-input v-model="password" type="password" placeholder="密码"></el-input>
        <img src="@/assets/user.png">
        <img src="@/assets/password.png">
          <el-button
            @click="login()"
            class="btn"
            icon="el-icon-thumb"
            type="danger"
            round
          >登录</el-button>
      </div>
    </div>
    <div id="foot">
      <span id="register" @click="register()">注册</span>
      <!-- |
      <span id="change" @click="change()">更改密码</span>
      |
      <span id="forget" @click="forget()">找回密码</span> -->
    </div>
  </div>
</template>

<script>
// import UserinformationVue from './Userinformation.vue'
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      this.$axios.post('http://127.0.0.1:8888/api/users/login', {
        username: this.username,
        password: this.password
      })
        .then((res) => {
          var token = res.data.token
          this.$store.dispatch('setToken', token)
          if (res.data.success === true) {
            // 根据token获取当前用户信息
            this.$axios.get('http://127.0.0.1:8888/api/users/current', {headers: {'Authorization': token}})
              .then(res => {
                if (res.data.status !== '冻结') {
                  this.$message('登录成功!')
                  this.$store.dispatch('setUserName', this.username)
                  this.$store.dispatch('setUserInfo', res.data)
                  this.$store.dispatch('setIsLogin', false)
                  this.$router.push({name: 'Aboutme'})
                } else {
                  this.$message('该账户已被冻结')
                }
              })
          } else if (res.data.message === '密码错误！') {
            this.$message('密码错误!')
          } else if (res.data.message === '当前用户名不存在！') {
            this.$message('当前用户名不存在！')
          }
        })
    },
    register () {
      this.$router.push({name: 'Register'})
    },
    forget () {
      this.$router.push({name: 'Forget'})
    },
    change () {
      this.$router.push({name: 'Change'})
    }
  },
  computed: {
    User () {
      return this.$store.getters.getUserInfo
    }
  }
}
</script>
<style lang="stylus" type="text/stylus" scoped>
  #wrap
    >>> .el-input__inner
      width 200px
      height 27px
      margin 20px 0 0 35px
    #login
      width 100%
      height 200px
      display flex
      justify-content center
      align-items center
      position relative
      top 100px
      #login_box
        width 240px
        height 170px
      img
        position relative
        bottom 75px
        display block
        margin-bottom 23px
        width 25px
        height 25px
      .btn
        position relative
        left 0px
        bottom 70px
        height: 40px
        width: 240px
        line-height: 0px
    #foot
      width 154px
      position absolute
      bottom 60px
      left 50%
      margin-left -10px
      color gray
      font-size 13px
</style>
