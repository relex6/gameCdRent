<template>
  <div class="index">
    <div style="height:100px"></div>
    <span class="title1">欢迎使用Relex游戏购买/租赁系统</span>
    <span class="title2">Welcome to use Relex’s game system for buying and renting.</span>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.index {
  background: url('../assets/bg.jpg');
  background-size: fill;
  height: 100%;
}
.title1 {
  color: white;
  display: block;
  font-size: 30px;
  letter-spacing: 5px;
  width: 540px;
  margin: 0 auto;
}
.title2 {
  text-align: center;
  width: 540px;
  margin: 0 auto;
  color: gray;
  display: block;
}
</style>
