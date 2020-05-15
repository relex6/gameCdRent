<template>
  <div class="wrap">
    <h3 style="margin-left: 15px;margin-top: 8px">我的订单</h3>
    <div v-if="dealList.length">
      <div v-for="item in dealList" :key="item.title">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{item.gameid.title}}</span>
          </div>
          <div class="content">
            <img class="content_img" :src="item.gameid.coverimg">
            <div class="content_box">
              <div class="information">
                <span class="title">{{item.gameid.title}}</span>
                <span class="engtitle">{{item.gameid.engtitle}}</span>
                <span class="date">{{item.date | filtdate}}</span>
              </div>
              <span style="font-size: 14px;position: absolute;bottom: 13px;right: 80px">￥</span>
              <span class="price">{{item.gameid.salePrice * (100 - item.gameid.percent ) * 0.01 | filtprice}}</span>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    <div id="empty" v-if="!dealList.length">
      <img class="cart_img" src="@/assets/order.png">
      <span class="empty_content">暂无记录</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MyRent',
  data () {
    return {
      dealList: []
    }
  },
  computed: {
    Order () {
      return this.$store.getters.getOrder
    }
  },
  created () {
    this.$axios.get('http://127.0.0.1:8888/api/deals/getdeals')
      .then(res => {
        res.data.forEach(element => {
          if (element.type === '购买') {
            this.dealList.push(element)
          }
        })
        console.log('成功获取交易数据(MyOrder)')
      })
  },
  filters: {
    filtdate (value) {
      return value.slice(0, 10)
    },
    filtprice (value) {
      return parseFloat(value).toFixed(2)
    }
  }
}
</script>
<style lang="stylus" type="text/stylus" scoped>
  .wrap
    margin-bottom 70px
    .box-card
      >>> .el-card__body
        padding 20px 20px 0 20px
      >>> .el-card__header
        padding 8px 20px
      width 400px
      margin 30px auto
      .content
        position relative
        .content_img
          width 100px
          height 110px
          position absolute
          bottom 15px
          left 0px
        .content_box
          width 230px
          height 110px
          padding 0 0 10px 20px
          position relative
          left 110px
          bottom 5px
          .information
            width 155px
            display inline-block
            .title
              display block
            .engtitle
              display block
              color gray
              font-size 13px
            .date
              display block
              position absolute
              bottom 13px
          .price
            position absolute
            bottom 10px
            right 15px
            font-size 20px
    #empty
      height 100px
      width 300px
      margin 50px auto
      .cart_img
        width 100px
        height 100px
        margin-left 30px
      .empty_content
        display inline-block
        position relative
        bottom 40px
        left 20px
</style>
