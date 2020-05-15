<template>
  <div class="gamelist">
    <ul class="gameul">
      <li class="gameli" v-for="item in gamer" :key="item.title" @click="togamedetail(item)">
        <div class="game gameimg">
          <img :src="item.coverimg">
        </div>
        <div class="game gameinformation">
          <span class="title">{{item.title}}</span>
          <span class="score">{{item.score}}</span>
          <div class="engtitle">{{item.engtitle}}</div>
          <span v-for="item2 in item.language" :key="item2.index">
              <span class="language">{{item2}}</span>
              <span>&nbsp;</span>
            </span>
          <div class="price">
            <span class="discount">￥{{item.salePrice*(100-item.percent)*0.01 | numFilter}}</span>
            <span class="oricount">￥{{item.salePrice}}</span>
          </div>
          <div class="shape">
            <span class="shape-content">{{item.percent * 100}}%折扣</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'Search',
  props: {
    keyword: String
  },
  data () {
    return {
      gamer: [],
      timer: null,
      gamelists: []
    }
  },
  methods: {
    togamedetail (item) {
      this.$router.push({path: `/gamedetail/${item._id}`})
    }
  },
  filters: {
    // 保留两位小数的过滤器
    numFilter (value) {
      let realVal = ''
      if (value) {
        realVal = parseFloat(value).toFixed(2)
      } else {
        realVal = '--'
      }
      return realVal
    }
  },
  watch: {
    keyword () {
      const result = []
      for (let i in this.gamelists) {
        if (this.gamelists[i].title.indexOf(this.keyword) > -1) {
          result.push(this.gamelists[i])
        }
      }
      this.gamer = result
    }
  },
  created () {
    this.$axios.get('http://127.0.0.1:8888/api/gamelists/getgame')
      .then(res => {
        this.gamelists = res.data.game
        console.log('成功获取游戏列表(search)')
      })
  }
}
</script>
<style lang="stylus" type="text/stylus" scoped>
  .gamelist
    margin-bottom 55px
    .gameul
      .gameli > div
        flex none
      .gameli
        width 100%
        height 130px
        background white
        margin-bottom 5px
        display flex
        .gameimg
          height 130px
          width 100px
          /*background pink*/
          img
            height 130px
            width 120px
        .gameinformation
          height 130px
          background white
          flex 1
          padding-left 10px
          position relative
          .title
            font-weight bold
            font-size 20px
            display inline-block
          .score
            float right
            display inline-block
            position absolute
            top 5px
            right 15px
            background black
            font-size 10px
            color white
            border 3px solid gold
          .engtitle
            font-size 13px
            color gray
            margin-bottom 5px
          .language
            font-size 15px
            color #E9281C
            background #EBEBEB
            padding 3px
          .price
            position absolute
            bottom 5px
            .discount
              color #B22222
              font-size 20px
            .oricount
              text-decoration line-through
              color gray
              font-size 13px
          .shape
            width 90px
            height 0px
            border-left 25px solid transparent
            border-bottom 35px solid #E9281C
            position absolute
            right 0px
            bottom 0
            .shape-content
              position relative
              left 10px
              top 8px
              color #eee
</style>
