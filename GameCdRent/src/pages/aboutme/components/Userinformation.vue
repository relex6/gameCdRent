<template>
  <div>
    <div id="usercard">
      <div id="card">
        <el-avatar id="userimg" :size="size" :src="userinfo.avatar"></el-avatar>
        <span id="notice" @click="login()" v-if="isLogin">请登录</span>
        <span id="nick" v-if="!isLogin">{{userinfo.nick}}</span>
        <img src="@/assets/quit.png" id="quit" @click="quit()" v-if="!isLogin">
        <span id="username" v-if="!isLogin">账号：{{username}}</span>
      </div>
    </div>
    <div id="information" v-if="!isLogin">
      <mt-cell class="infor-item" title="名字" :value="userinfo.nick"></mt-cell>
      <mt-cell class="infor-item" title="手机号" :value="userinfo.phone"></mt-cell>
      <mt-cell class="infor-item" title="邮箱" :value="userinfo.email"></mt-cell>
      <mt-cell class="infor-item" title="我的租赁" is-link :to="{name: 'MyRent'}" style="cursor: pointer;"></mt-cell>
      <mt-cell class="infor-item" title="我的订单" is-link :to="{name: 'MyOrder'}"></mt-cell>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      size: 'large'
    }
  },
  methods: {
    login () {
      this.$router.push({name: 'Login'})
    },
    quit () {
      this.$store.dispatch('setIsLogin', true)
      this.$store.dispatch('setUserInfo', {})
    }
  },
  computed: {
    isLogin () {
      return this.$store.getters.getIsLogin
    },
    userinfo () {
      return this.$store.getters.getUserInfo
    },
    username () {
      return this.$store.getters.getUserName
    }
  },
  created () {
  }
}
</script>

<style lang="stylus" type="text/stylus" scoped>
  #usercard
    height 120px
    background #E9281C
    padding-left 25px
    padding-right 25px
    #card
      background white
      width 100%
      height 120px
      border-top-left-radius 20px
      border-top-right-radius 20px
    #userimg
      display inline-block
      margin-left 20px
      margin-top 45px
    #notice
      position relative
      left 20px
      bottom 15px
      font-size 18px
      cursor pointer
    #nick
      position relative
      left 20px
      bottom 23px
      display inline-block
      font-weight bold
      font-size 20px
    #quit
      width 25px
      height 25px
      position absolute
      right 35px
      top 65px
    #username
      font-size 12px
      color gray
      position absolute
      top 120px
      left 110px
  #information
    margin-top 0px
</style>
