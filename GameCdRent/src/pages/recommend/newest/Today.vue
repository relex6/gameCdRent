<template>
  <div id="today">
    <h3 style="margin-bottom: 20px;">今日</h3>
    <div class="recommend" v-for="item in todaygame" :key="item.title" @click="togamedetail(item)">
      <div class="recommend-img" :style='{ backgroundImage: "url("+item.recommendimg+")" }'>
        <span class="title">{{item.title}}</span>
        <span class="content">{{item.content | lessWord}}</span>
        <div class="imgBox"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Today',
  computed: {
    todaygame () {
      var arr = this.$store.getters.getGameLists
      var today = []
      arr.forEach(element => {
        if (element.isrecommend) {
          today.push(element)
        }
      })
      return today
    }
  },
  methods: {
    togamedetail (item) {
      this.$router.push({path: `/gamedetail/${item._id}`})
    }
  },
  filters: {
    lessWord (value) {
      var imgboxwidth = document.body.offsetWidth
      var rowlen = Math.floor((imgboxwidth - 56) / 15)
      var len = value.length
      if (len > 2 * rowlen) {
        return value.substring(0, 2 * rowlen - 2) + '......'
      } else {
        return value
      }
    }
  },
  created () {
    this.$axios.get('http://127.0.0.1:8888/api/gamelists/getgame')
      .then(res => {
        this.gamelists = res.data.game
        console.log('成功获取游戏列表(Today)')
        this.$store.dispatch('setGameLists', this.gamelists)
      })
  }
}
</script>

<style lang="stylus" type="text/stylus" scoped>
  #today
    margin-bottom 80px
    padding 18px
    .recommend
      width 100%
      height 200px
      margin 10px auto
      .recommend-img
        border-radius 20px
        height 200px
        background-position center
        background-size cover
        background-repeat no-repeat
        position relative
        .title
          z-index 1
          color white
          font-size 25px
          display block
          padding 0 10px
          position absolute
          top 115px
        .content
          z-index 1
          font-size 15px
          color white
          display block
          padding 0 10px
          position absolute
          top 150px
        .imgBox
          background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.9))
          height 150px
          width 100%
          margin-left 0
          border-radius 20px
          position absolute
          bottom 0
</style>
