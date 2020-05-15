<template>
  <div class="wrapper">
    <!-- 图片展示 -->
    <div class="imgbox">
      <img :src="bannerimg" id="bigimg"/>
      <div class="slideimg-box">
        <div class="slideimg-for" v-for="(item, index) in gamedetail.gameimg" :key="index" @click="active(index, item)">
          <img :src="item.url" class="slideimg-item">
          <div class="active" v-if="index === activeindex"></div>
        </div>
      </div>
    </div>
    <h2 class="title">{{gamedetail.title}}{{gamedetail.engtitle}}</h2>
    <span class="language" v-for="(item, index) in gamedetail.language" :key="index">{{item}}</span>
    <span class="content">{{gamedetail.content}}</span>
    <!-- 游戏信息 -->
    <div class="detail">
      <div class="detail-item">
        <span class="res">{{gamedetail.size}}</span>
        <span class="option">容量</span>
      </div>
      <div class="detail-deliver"></div>
      <div class="detail-item">
        <span class="res">{{gamedetail.gamer}}</span>
        <span class="option">玩家人数</span>
      </div>
      <div class="detail-deliver"></div>
      <div class="detail-item">
        <span class="res">{{gamedetail.entity}}</span>
        <span class="option">实体卡带</span>
      </div>
      <div class="detail-deliver"></div>
      <div class="detail-item">
        <span class="res">{{gamedetail.try}}</span>
        <span class="option">试玩</span>
      </div>
    </div>
    <!-- 游戏评分 -->
    <div class="score-box">
      <div class="score-title">
        <span class="score-eng">metacritic</span>
        <span class="score-ch">媒体评分综合汇总</span>
      </div>
      <div class="score">{{gamedetail.score}}</div>
    </div>
    <div class="detail-content-box">
      <h4>详细介绍</h4>
      <span class="detail-content">{{gamedetail.detailcontent}}</span>
    </div>
    <div class="sale">
      <button class="rent" type="text" @click="openrent()">租赁</button>
      <button class="buy" type="text" @click="openbuy()">购买</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeindex: 0,
      gamedetail: {},
      items: 5,
      bannerimg: ''
    }
  },
  methods: {
    active (index, item) {
      this.activeindex = index
      this.bannerimg = item.url
    },
    openrent () {
      this.$confirm('你要租赁这款游戏吗？', '租赁', {
        confirmButtonText: '租赁',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        var token = this.$store.getters.getToken
        this.$axios.post('http://127.0.0.1:8888/api/carts/addcart', {type: '租赁', gameid: this.$route.params.id}, {headers: {'Authorization': token}})
          .then(res => {
            this.$message({
              type: 'success',
              message: '租赁成功!'
            })
          })
          .catch(err => {
            this.$message({
              type: 'warning',
              message: '请先登录'
            })
            console.log(err)
          })
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '已取消租赁'
        })
      })
    },
    openbuy () {
      this.$confirm('你要购买这款游戏吗？', '购买', {
        confirmButtonText: '购买',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        var token = this.$store.getters.getToken
        this.$axios.post('http://127.0.0.1:8888/api/carts/addcart', {type: '购买', gameid: this.$route.params.id}, {headers: {'Authorization': token}})
          .then(res => {
            this.$message({
              type: 'success',
              message: '购买成功!'
            })
          })
          .catch(err => {
            this.$message({
              type: 'warning',
              message: '请先登录'
            })
            console.log(err)
          })
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '已取消购买'
        })
      })
    }
  },
  created () {
    this.$axios.post('http://127.0.0.1:8888/api/gamelists/getdetail', {gameid: this.$route.params.id})
      .then(res => {
        this.gamedetail = res.data.game
        this.bannerimg = this.gamedetail.gameimg[0].url
        console.log('成功获取游戏列表(Gamedetail)')
      })
  },
  mounted () {
    var width = document.getElementById('bigimg').offsetWidth
    var bigimgheight = String(0.4 * width + 'px')
    document.getElementById('bigimg').style.height = bigimgheight
  }
}
</script>

<style lang="stylus" scoped>
.wrapper
  margin-bottom 100px
.imgbox
  display flex
  flex-direction column
  #bigimg
    object-fit cover
    width 100%
  .slideimg-box
    display flex
    flex-direction row
    justify-content space-between
    overflow-x scroll
    overflow-y hidden
    background black
    padding 4px 0 0 4px
    .slideimg-for
      position relative
      .slideimg-item
        width 140px
        height 75px
        margin-right 4px
      .active
        border 4px solid #ffffff
        position absolute
        left -4px
        top -4px
        width 140px
        height 75px
.title
  padding 0 10px
.language
  display inline-block
  background red
  color white
  padding 4px 8px
  border-radius 7px
  margin-top 10px
  position relative
  left 10px
.content
  display block
  margin 10px 0
  padding 0 10px
.detail
  display flex
  justify-content space-around
  align-items center
  box-shadow 0 5px 15px gray
  padding 0 10px
  .detail-item
    .res
      display block
      text-align center
      font-size 14px
      margin-top 8px
    .option
      display block
      text-align center
      color black
      font-size 10px
      color gray
      margin-top 3px
      margin-bottom 8px
  .detail-deliver
    width 1px
    background gray
    height 20px
.score-box
  display flex
  justify-content space-between
  align-items center
  margin-top 30px
  box-shadow 0 5px 15px gray
  .score-title
    display inline
    margin-left 20px
    .score-eng
      display block
      font-size 20px
    .score-ch
      display block
      font-size 12px
  .score
    display inline
    background black
    color white
    border 2px gold solid
    margin-right 20px
.detail-content-box
  padding 0 20px
  margin-top 30px
  .detail-content
    display block
    font-size 13px
    margin-top 10px
    letter-spacing 1px
    line-height 20px
    text-indent 2rem
.sale
  position fixed
  bottom 65px
  right 15px
  .rent
    width 100px
    height 30px
    background orange
    border 0
    border-top-left-radius 15px
    border-bottom-left-radius 15px
    margin-right -5px
    outline none
  .buy
    width 100px
    height 30px
    background red
    border 0
    border-top-right-radius 15px
    border-bottom-right-radius 15px
    outline none
</style>
