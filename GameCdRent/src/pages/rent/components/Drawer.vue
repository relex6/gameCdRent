<template>
  <div id="drawer">
    <mt-cell class="drawer-cell" v-for="item in DiscountGame" :key="item.title" :title="item.title">
      <span>￥{{item.price}}</span>
      <el-button size="small" @click="drawer = true; save(item)" type="danger" style="margin-left: 16px;">
        购买
      </el-button>
      <img class="cell-img" slot="icon" :src="item.img" width="80" height="100">
      <!--抽屉内容-->
      <el-drawer :before-close="close" :title="temp.title" :visible.sync="drawer" direction="btt">
        <div>
          <el-radio-group v-model="radio" fill="#E9281C" text-color='#fff' size="mini">
            <el-radio-button label="全新卡带" style="margin-left: 20px">全新卡带</el-radio-button>
            <el-radio-button label="二手租赁">二手租赁</el-radio-button>
          </el-radio-group>
          <el-button type="danger" size="small" style="margin-left: 90px" @click="addToBasket(temp)">加入购物车</el-button>
        </div>
      </el-drawer>
    </mt-cell>
  </div>
</template>
<script>
export default {
  data () {
    return {
      drawer: false,
      radio: '全新卡带',
      temp: {},
      baskets: [],
      color: '#E9281C',
      id: 1
    }
  },
  computed: {
    DiscountGame () {
      return this.$store.getters.getDiscountGame
    }
  },
  methods: {
    save (item) {
      this.temp = item
    },
    addToBasket (item) {
      if (this.radio) {
        this.baskets = this.$store.getters.getBaskets
        let basket = {
          img: item.img,
          title: item.title,
          type: this.radio
        }
        if (this.radio === '全新卡带') {
          basket.price = item.price
          basket.engtitle = item.engtitle
          basket.id = this.id
          this.id++
          let year = new Date().getFullYear()
          let month = new Date().getMonth() + 1
          let day = new Date().getDate()
          let date = year + '-' + month + '-' + day
          basket.date = date
        } else {
          basket.price = item.price_second
          basket.id = this.id
          this.id++
          let year = new Date().getFullYear()
          let month = new Date().getMonth() + 1
          let day = new Date().getDate()
          let date = year + '-' + month + '-' + day
          basket.date = date
        }
        this.baskets.push(basket)
        this.$store.dispatch('setBaskets', this.baskets)
      }
    },
    close (done) {
      this.radio = '全新卡带'
      done()
    }

  }
}
</script>
<style lang="stylus" type="text/stylus" scoped>
  #drawer
    margin-top 10px
    margin-bottom 65px
    .drawer-cell
      margin-bottom 10px
      .cell-img
        width 110px
        margin-top 10px
        margin-bottom 10px
</style>
