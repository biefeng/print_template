import Vue from 'vue'
import Router from 'vue-router'
import editTemplate from '@/components/editTemplate'
import listTemplate from '@/components/listTemplate'
import testKeydown from '@/components/testKeydown'
import draggable from '@/components/draggable'

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
    },
    {
      path: '/testKeydown',
      name: 'testKeydown',
      component: testKeydown
    },
    {
      path: '/draggable',
      name: 'draggable',
      component: draggable
    }
  ]
})
