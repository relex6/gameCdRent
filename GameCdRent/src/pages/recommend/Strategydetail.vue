<template>
  <div id="wrapper">
    <h2 class="title">{{strategydetail.title}}</h2>
    <hr class="hr">
    <div class="html" v-html="strategydetail.content"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      strategydetail: {},
      wi: '100px'
    }
  },
  created () {
    this.$axios.post('http://127.0.0.1:8888/api/strategys/getdetail', {strategyid: this.$route.params.id})
      .then(res => {
        this.strategydetail = res.data.strategy
        console.log('成功获取游戏列表(strategydetail)')
      })
  },
  mounted () {
    document.getElementById('wrapper').style.width = document.body.clientWidth
  }
}
</script>

<style lang="stylus" scoped>
#wrapper
  overflow hidden
  margin-bottom 50px
  .title
    margin-bottom 10px
  .hr
    margin-bottom 10px
.html >>> img
  width 100% !important
</style>
