<template>
  <div>
    <h3 style="margin-left: 15px;margin-top: 8px;margin-bottom: 10px">我的租赁</h3>
    <div v-if="dealList.length">
      <div id="myrent" v-for="item in dealList" :key="item._id">
        <mt-cell :title="item.gameid.title">
          <span style="margin-right: 10px">租赁时间：{{item.date | filtdate}}</span>
          <el-button size="small" :disabled="item.status !== '未归还'" @click="returnback(item)">归还</el-button>
        </mt-cell>
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
  methods: {
    returnback (item) {
      this.$axios.post('http://127.0.0.1:8888/api/deals/returnback', {dealid: item._id})
        .then(res => {
          console.log(res.data.message)
        })
    }
  },
  created () {
    this.$axios.get('http://127.0.0.1:8888/api/deals/getdeals')
      .then(res => {
        res.data.forEach(element => {
          if (element.type === '租赁') {
            this.dealList.push(element)
          }
        })
        console.log('成功获取交易数据(MyRent)')
      })
  },
  filters: {
    filtdate (value) {
      return value.slice(0, 10)
    }
  }
}
</script>
<style lang="stylus" type="text/stylus" scoped>
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
