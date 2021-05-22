import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'


import './css/remove-default.css'
import './css/box.css'
import './css/button.css'
import './css/flex.css'
import './css/badge.css'
import './css/animation.css'
import './css/form.css'
import './css/table.css'

import 'font-awesome/css/font-awesome.min.css'


Vue.config.productionTip = false
Vue.prototype.$http = axios.create({
  baseURL:'http://172.20.29.109:5000'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
