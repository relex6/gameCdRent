import Vue from 'vue'
import Router from 'vue-router'
// 一级路由
import Recommend from '@/pages/recommend/Recommend'
import Rent from '@/pages/rent/Rent'
import Cart from '@/pages/cart/Cart'
import Aboutme from '@/pages/aboutme/Aboutme'
// 二级路由
import Newest from '@/pages/recommend/newest/Newest'
import MyRent from '@/pages/aboutme/MyRent'
import MyOrder from '@/pages/aboutme/MyOrder'
import Gamedetail from '@/pages/recommend/Gamedetail'
import Strategydetail from '@/pages/recommend/Strategydetail'
// import Userinformation from '@/pages/aboutme/components/Userinformation'
import Login from '@/pages/aboutme/components/Login'
import Register from '@/pages/aboutme/components/Register'
import Forget from '@/pages/aboutme/components/Forget'
import Change from '@/pages/aboutme/components/Change'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Recommend',
      components: {
        default: Recommend,
        newest: Newest
      },
      meta: {isLogin: false}
    },
    {path: '/gamedetail/:id', name: 'Gamedetail', component: Gamedetail, meta: {isLogin: false}},
    {path: '/strategydetail/:id', name: 'Strategydetail', component: Strategydetail, meta: {isLogin: false}},
    {path: '/aboutme/login', name: 'Login', component: Login, meta: {isLogin: false}},
    {path: '/aboutme/register', name: 'Register', component: Register, meta: {isLogin: false}},
    {path: '/aboutme/forget', name: 'Forget', component: Forget, meta: {isLogin: false}},
    {path: '/aboutme/change', name: 'Change', component: Change, meta: {isLogin: false}},
    {path: '/aboutme/myrent', name: 'MyRent', component: MyRent, meta: {isLogin: false}},
    {path: '/aboutme/myorder', name: 'MyOrder', component: MyOrder, meta: {isLogin: false}},
    {path: '/aboutme', name: 'Aboutme', component: Aboutme, meta: {isLogin: true}},
    {path: '/cart', name: 'Cart', component: Cart, meta: {isLogin: false}},
    {path: '/rent', name: 'Rent', component: Rent, meta: {isLogin: false}}
  ]
  // mode: 'history'
})
