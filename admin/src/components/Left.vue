<template>
  <div class="left">
    <el-menu
      style="border-right: none"
      :default-active="active"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :router="true">
      <!-- 首页 -->
      <el-menu-item index="1" route="/">
        <i class="el-icon-document"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <!-- 用户管理 -->
      <el-menu-item index="2" route="/user">
        <i class="el-icon-user-solid"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <!-- 订单管理 -->
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-goods"></i>
          <span slot="title">订单管理</span>
        </template>
        <el-menu-item index="3-1" route="/sale">出售</el-menu-item>
        <el-menu-item index="3-2" route="/rent">租赁</el-menu-item>
      </el-submenu>
      <!-- 游戏管理 -->
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-trophy"></i>
          <span slot="title">游戏管理</span>
        </template>
        <el-menu-item index="4-1" route="/gamelists">游戏列表</el-menu-item>
        <!-- <el-menu-item index="5-2" route="/today">每日推荐</el-menu-item> -->
        <el-menu-item index="4-2" route="/strategy">攻略管理</el-menu-item>
      </el-submenu>

    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Left',
  data () {
    return {
      active: ''
    }
  },
  created () {
    switch (this.$route.path) {
      case '/':
        this.active = '1'
        break
      case '/user':
        this.active = '2'
        break
      case '/sale':
        this.active = '3-1'
        break
      case '/rent':
        this.active = '3-2'
        break
      case '/gamelists':
        this.active = '4-1'
        break
      // case '/today':
      //   this.active = '5-2'
      //   break
      case '/strategy':
        this.active = '4-2'
        break
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" type="text/stylus" scoped>

</style>
