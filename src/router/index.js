import Vue from 'vue'
import Router from 'vue-router'
import editTemplate from '@/components/editTemplate'
import listTemplate from '@/components/listTemplate'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/listTemplate',
      name: 'listTemplate',
      component: listTemplate
    },
    {
      path: '/editTemplate',
      name: 'editTemplate',
      component: editTemplate
    }
  ]
})
