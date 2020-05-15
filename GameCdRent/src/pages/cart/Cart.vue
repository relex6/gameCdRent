<template>
  <div>
    <h3 class="header">购物车</h3>
    <Card :baskets="Baskets"></Card>
    <End :baskets="Baskets"></End>
  </div>
</template>
<script>
import Card from './components/Card.vue'
import End from './components/End.vue'
export default {
  name: 'Cart',
  components: {
    Card,
    End
  },
  computed: {
    Baskets () {
      return this.$store.getters.getBaskets
    }
  }
}
</script>
<style>
  .header {
    display: block;
    margin-left: 20px;
    margin-top: 20px;
  }
</style>
