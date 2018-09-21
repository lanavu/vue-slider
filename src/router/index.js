import Vue from 'vue'
import Vue2TouchEvents from 'vue2-touch-events'
import Router from 'vue-router'
import Slides from '@/components/Slides'

Vue.use(Router)
Vue.use(Vue2TouchEvents)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Slides',
      component: Slides
    }
  ]
})
