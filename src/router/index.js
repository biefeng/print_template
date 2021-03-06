import Vue from 'vue'
import Router from 'vue-router'
import editTemplate from '@/components/editTemplate'
import edit from '@/components/templateEdit'
import listTemplate from '@/components/listTemplate'
import testKeydown from '@/components/testKeydown'

import draggable from '@/components/draggable'
import toolBar from '@/components/toolBar'

import tree from '@/components/tree'


import sortable from '@/components/sortable'

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
    },
    {
      path: '/sortable',
      name: 'sortable',
      component: sortable
    },
    {
      path: '/toolBar',
      name: 'toolBar',
      component: toolBar
    },
    {
      path: '/',
      name: 'edit',
      component: edit
    }, {
      path: '/tree',
      name: "tree",
      component: tree
    }
  ]
})
