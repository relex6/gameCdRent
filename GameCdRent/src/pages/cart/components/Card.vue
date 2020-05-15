<template>
  <div id="card">
    <!--全选框-->
    <!--<input type="checkbox" id="checkall" v-model="checkall"/>-->
    <div v-if="baskets.length">
      <div class="card-box" v-for="(item, index) in baskets" :key="index">
        <!--<input type="checkbox" class="checkone" v-model="checked[item.id-1]" @click="checkone()">-->
        <div class="card-img"><img :src="item.gameid.coverimg"></div>
        <div class="card-information">
          <span class="title">{{item.gameid.title}}</span>
          <img class="cancel" @click="cancel(item)" src="@/assets/cancel.png">
          <span class="type">类型：{{item.type}}</span>
          <span class="price" v-if="item.type === '租赁'">￥{{item.gameid.rentPrice}}</span>
          <span class="price" v-if="item.type === '购买'">￥{{item.gameid.salePrice}}</span>
          <mt-button class="btn" type="danger" size="small" @click="pay(item)">结算</mt-button>
        </div>
      </div>
    </div>
    <div id="empty" v-if="!baskets.length">
      <img class="cart_img" src="@/assets/cart.png">
      <span class="empty_content">购物车内暂时无商品</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'card',
  data () {
    return {
      checkall: false,
      checked: [],
      checked_rent: [],
      checked_order: [],
      baskets: []
    }
  },
  methods: {
    pay (item) {
      console.log(item)
      var token = this.$store.getters.getToken
      if (item.type === '租赁') {
        let confirm = window.confirm('是否租赁？')
        if (confirm) {
          this.$axios.post('http://127.0.0.1:8888/api/deals/adddeal', item, {headers: {'Authorization': token}})
            .then(res => {
              console.log(res.data.message)
              this.$axios.post('http://127.0.0.1:8888/api/carts/del', {cartid: item._id}, {headers: {'Authorization': token}})
                .then(res => {
                  console.log('单个结算成功——>删除购物车成功')
                })
            })
        }
      } else {
        let confirm = window.confirm('是否购买？')
        if (confirm) {
          this.$axios.post('http://127.0.0.1:8888/api/deals/adddeal', item, {headers: {'Authorization': token}})
            .then(res => {
              console.log(res.data.message)
              this.$axios.post('http://127.0.0.1:8888/api/carts/del', {cartid: item._id}, {headers: {'Authorization': token}})
                .then(res => {
                  console.log('单个结算成功——>删除购物车成功')
                })
            })
        }
      }
    },
    cancel (item) {
      var token = this.$store.getters.getToken
      this.$axios.post('http://127.0.0.1:8888/api/carts/del', {cartid: item._id}, {headers: {'Authorization': token}})
        .then(res => {
          console.log(res.data.message)
        })
    },
    checkone () {
      console.log(this.checked)
    }
  },
  created () {
    var token = this.$store.getters.getToken
    var userid = this.$store.getters.getUserInfo.id
    this.$axios.post('http://127.0.0.1:8888/api/carts/getcart', {userid: userid}, {headers: {'Authorization': token}})
      .then(res => {
        this.baskets = res.data
      })
  }
}
</script>
<style lang="stylus" type="text/stylus" scoped>
  #card
    margin-bottom 130px
    #checkall
      width 20px
      height  20px
      position absolute
      left 90px
      top 75px
    .card-box
      height 160px
      width 380px
      background white
      margin 0 auto
      display flex
      border-top-left-radius 20px
      border-top-right-radius 20px
      margin-top 20px
      .checkone
        margin-top 7px
        margin-left 10px
        position absolute
      .card-img
        margin-left 0
        width 140px
        height 160px
        /*background yellow*/
        img
          width 110px
          height 120px
          margin-left 10px
          margin-top 20px
      .card-information
        flex 1
        height 160px
        .title
          display block
          margin-top 20px
        .cancel
          width 20px
          height 20px
          position relative
          left 210px
          bottom 20px
        .type
          display block
          position: relative
          bottom 10px
          font-size 13px
          color gray
        .price
          display inline-block
          margin-top 35px
          width 70px
        .btn
          margin-top 30px
          margin-left 95px
  #empty
    height 100px
    width 300px
    margin 50px auto
    .cart_img
      width 100px
      height 100px
    .empty_content
      display inline-block
      position relative
      bottom 40px
</style>
