// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import "element-ui/lib/theme-chalk/index.css";
import axios from './util/axios'
import PlainDraggable from './util/hh'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$http = axios
console.log(11111)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
