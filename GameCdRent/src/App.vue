<template>
  <div id="app">
    <Wrapper-header></Wrapper-header>
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/pages/Header'
import Footer from '@/pages/Footer'
export default {
  name: 'App',
  components: {
    WrapperHeader: Header,
    Footer
  },
  mounted () {
    // 设置body背景色
    document.querySelector('body').setAttribute('style', 'background-color:#f6f6f6')
  },
  beforeDestroy () {
    // 设置body背景色
    document.querySelector('body').removeAttribute('style')
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
</style>
