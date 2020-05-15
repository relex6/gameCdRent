<template>
  <div id="end">
    <span class="text">合计：</span>
    <span class="count">￥{{total}}</span>
    <button class="btn" @click="payall">结算</button>
  </div>
</template>
<script>
export default {
  name: 'End',
  data () {
    return {
      baskets: []
    }
  },
  computed: {
    total () {
      let cost = 0
      for (let index in this.baskets) {
        let item = this.baskets[index]
        if (item.type === '租赁') {
          cost += Number(item.gameid.rentPrice)
        } else if (item.type === '购买') {
          cost += Number(item.gameid.salePrice)
        }
      }
      return parseFloat(cost).toFixed(2)
    }
  },
  methods: {
    payall () {
      var creatbaskets = this.baskets
      var newbaskets = []
      creatbaskets.forEach(element => {
        var newbasket = {}
        newbasket.date = element.date
        newbasket.gameid = element.gameid
        newbasket.userid = element.userid
        newbasket.cartid = element._id
        newbasket.type = element.type
        newbaskets.push(newbasket)
      })
      this.$axios.post('http://127.0.0.1:8888/api/deals/addmany', newbaskets)
        .then(res => {
          console.log(res.data.message)
          var token = this.$store.getters.getToken
          this.$axios.get('http://127.0.0.1:8888/api/carts/delmany', {headers: {'Authorization': token}})
            .then(res => {
              console.log(res.data)
            })
        })
    }
  },
  created () {
    var token = this.$store.getters.getToken
    var userid = this.$store.getters.getUserInfo.id
    this.$axios.post('http://127.0.0.1:8888/api/carts/getcart', {userid: userid}, {headers: {'Authorization': token}})
      .then(res => {
        this.baskets = res.data
        console.log('成功获取数据(End)')
      })
  }
}
</script>
<style lang="stylus" type="text/stylus" scoped>
  #end
    width 100%
    height 50px
    background white
    position fixed
    bottom 55px
    .text
      margin-left 30px
      font-size 15px
      line-height 50px
    .count
      font-size 18px
      color #E9281C
    .btn
      height 40px
      width 100px
      border-radius 30px
      background #E9281C
      outline none
      position absolute
      right 30px
      margin-top 5px
</style>
