import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入外部router
import {routes} from './router'

Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

export default router
