import Vue from 'vue'
import Router from 'vue-router'
import user from '@/components/User'
import index from '@/components/Index'
import rent from '@/components/Order/Rent'
import sale from '@/components/Order/Sale'
import gamelists from '@/components/Game/Gamelists'
import strategy from '@/components/Game/Strategy'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/user',
      name: 'user',
      component: user
    },
    {
      path: '/rent',
      name: 'rent',
      component: rent
    },
    {
      path: '/sale',
      name: 'sale',
      component: sale
    },
    {
      path: '/gamelists',
      name: 'gamelists',
      component: gamelists
    },
    {
      path: '/strategy',
      name: 'strategy',
      component: strategy
    }
  ]
})
