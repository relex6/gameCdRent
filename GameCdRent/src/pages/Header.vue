<template>
  <div id="wheader">
    <mt-header title="Relex" class="wrapper-header">
      <router-link to="" slot="left">
        <mt-button @click.native="$router.back(-1)" icon="back" class="back" v-if="isback"></mt-button>
      </router-link>
    </mt-header>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      view: true
    }
  },
  computed: {
    isback () {
      if (this.$route.path === '/' || this.$route.path === '/cart' || this.$route.path === '/aboutme') {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  padding: 0;
  margin: 0;
}
#wheader {
  background: #E9281C;
  height: 50px;
}
.wrapper-header {
 background: #E9281C;
}
.back {
  margin-left: 15px;
}
</style>
