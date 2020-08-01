import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/query',
      name: 'query',
      component: () => import(/* webpackChunkName: "about" */ './views/query.vue')
    },
    {
      path: '/donation',
      name: 'donation',
      component: () => import(/* webpackChunkName: "about" */ './views/donation.vue')
    }
  ]
})
