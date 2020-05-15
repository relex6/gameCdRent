<template>
  <div class="list">
    <h3 style="margin-bottom: 20px;">新手必读</h3>
    <div v-for="item in strategys" :key="item.title" @click="tostrategy(item)" class="list-item" :style='{ backgroundImage: "url("+item.imgurl+")" }'>
      <div class="shadow"></div>
      <span class="font">{{item.title}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Strategy',
  data () {
    return {
      strategys: []
    }
  },
  methods: {
    tostrategy (item) {
      console.log(item._id)
      this.$router.push({path: `/strategydetail/${item._id}`})
    }
  },
  computed: {
    strategy () {
      return this.$store.getters.getStrategy
    }
  },
  created () {
    this.$axios.get('http://127.0.0.1:8888/api/strategys/get')
      .then(res => {
        this.strategys = res.data
      })
  }
}
</script>

<style lang="stylus" type="text/stylus" scoped>
.list
  padding 18px
  margin-bottom 80px
  .list-item
    height 150px
    width 100%
    border-radius 15px
    margin 0 auto
    margin-bottom 18px
    background-size cover
    background-position center
    background-repeat no-repeat
    position relative
    .shadow
      position absolute
      border-radius 15px
      background rgba(0, 0, 0, 0.5)
      width 100%
      height 150px
    .font
      display block
      width 100%
      color white
      font-weight bold
      font-size 20px
      line-height 150px
      text-align center
      position absolute
</style>
