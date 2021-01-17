import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Wallet from '../components/Wallet.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/wallets/:name',
    name: 'Wallet',
    component: Wallet
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
