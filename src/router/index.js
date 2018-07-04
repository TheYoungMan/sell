import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Goods from '../components/goods'
import Ratings from '../components/ratings'
import Sellers from '../components/sellers'
Vue.use(Router)
export default new Router({
  routes: [{
    path: '/',
    name: 'goods',
    component: Goods,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/goods',
    component: Goods,
    name: 'good',
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/ratings',
    component: Ratings,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/sellers',
    component: Sellers,
    meta: {
      keepAlive: true
    }
  }
  ]
})
