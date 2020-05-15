<template>
  <div id="app">
    <div id="left">
      <left/>
    </div>
    <div id="right">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import left from './components/Left'
export default {
  name: 'App',
  components: {
    left
  }
}
</script>

<style>
@font-face {
    font-family: font_one;
    src: url('./assets/fonts/font.ttf')
}
* {
  padding: 0;
  margin: 0;
}
html,body{
  height:100%;
  background: #f6f6f6
}
#app {
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
}
#left {
  width: 230px;
  background: rgb(84, 92, 100);
}
#right {
  flex: 1;
  background: rgb(246, 246, 246);
  border: 8px solid rgb(84, 92, 100);
}
</style>
