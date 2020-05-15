<template>
  <div id="footer">
    <mt-tabbar fixed v-model="selected">
      <mt-tab-item id="tab1">
        <div class="big"  @click="recommend()">
          <img slot="icon" class="big_img" src="@/assets/icon1.png">
          <span class="big_span">最新折扣</span>
        </div>
      </mt-tab-item>
      <!-- <mt-tab-item id="tab2">
        <div class="big"  @click="rent()">
          <img slot="icon" class="big_img" src="@/assets/icon2.png">
          <span class="big_span">所有游戏</span>
        </div>
      </mt-tab-item> -->
      <mt-tab-item id="tab3">
        <div class="big"  @click="cart()">
          <img slot="icon" class="big_img" src="@/assets/icon3.png">
          <span class="big_span">购物车</span>
        </div>
      </mt-tab-item>
      <mt-tab-item id="tab4">
        <div class="big"  @click="aboutme()">
          <img slot="icon" class="big_img" src="@/assets/icon4.png">
          <span class="big_span">戳我</span>
        </div>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      selected: 'tab1'
    }
  },
  methods: {
    recommend () {
      if (this.$route.path !== '/') {
        this.$router.push({name: 'Recommend'})
      }
    },
    rent () {
      if (this.$route.path !== '/rent') {
        this.$router.push({name: 'Rent'})
      }
    },
    cart () {
      if (this.$route.path !== '/cart') {
        this.$router.push({name: 'Cart'})
      }
    },
    aboutme () {
      if (this.$route.path !== '/aboutme') {
        this.$router.push({name: 'Aboutme'})
      }
    }
  },
  created () {
    switch (this.$route.path) {
      case '/' :
        this.selected = 'tab1'
        break
      case '/rent' :
        this.selected = 'tab2'
        break
      case '/cart' :
        this.selected = 'tab3'
        break
      case '/aboutme':
      case '/aboutme/register':
      case '/aboutme/login':
        this.selected = 'tab4'
        break
    }
  }
}
</script>

<style lang="stylus" type="text/stylus" scoped>
  #footer >>> .mint-tab-item
    padding 0
  #footer >>> .mint-tabbar > .mint-tab-item.is-selected
    /*color #E9281C*/
    color white
    background #E9281C
    font-weight bold
  .big
    width 100%
    height 55px
    .big_img
      width 30px
      height 30px
      margin-top 5px
    .big_span
      display block
</style>
