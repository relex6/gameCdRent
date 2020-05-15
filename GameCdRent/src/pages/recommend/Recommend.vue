<template>
  <div id="recommend">
    <div class="search">
      <!--搜索栏-->
      <mt-search placeholder="输入游戏名查询" v-model="keyword"></mt-search>
    </div>
    <div class="navbar">
      <!--导航栏-->
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">最新折扣</mt-tab-item>
        <mt-tab-item id="2">今日推荐</mt-tab-item>
        <mt-tab-item id="3">必读攻略</mt-tab-item>
      </mt-navbar>
      <!-- tab-container -->
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <div v-show="!keyword">
            <Newest></Newest>
          </div>
          <div v-show="keyword">
            <Search :keyword="keyword"></Search>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <div v-show="!keyword">
            <Today></Today>
          </div>
          <div v-show="keyword">
            <Search :keyword="keyword"></Search>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          <div v-show="!keyword">
            <Strategy></Strategy>
          </div>
          <div v-show="keyword">
            <Search :keyword="keyword"></Search>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>

<script>
import Newest from './newest/Newest.vue'
import Today from './newest/Today.vue'
import Strategy from './newest/Strategy.vue'
import Search from './newest/Search.vue'
export default {
  components: {
    Newest,
    Today,
    Strategy,
    Search
  },
  data () {
    return {
      selected: '1',
      keyword: ''
    }
  }
}
</script>

<style lang="stylus" type="text/stylus" scoped>
  #recommend >>> .mint-searchbar
    background-color #E9281C
    height 50px
  #recommend  >>> .mint-searchbar-inner
    height 18px
  #recommend  >>> .mint-searchbar-core
    font-size 13px
    margin-left 10px
  #recommend  >>> .mint-searchbar-cancel
    color white
  #recommend  >>> .mint-search
    height 50px
  #recommend  >>> .mint-navbar .mint-tab-item
    background #F6F6F6
  #recommend  >>> .mint-navbar .mint-tab-item.is-selected
    background #F6F6F6
    color #E9281C
    font-weight bold
    border-bottom 5px solid #E9281C
  #recommend
    .search
      height: 50px
      overflow hidden
</style>
