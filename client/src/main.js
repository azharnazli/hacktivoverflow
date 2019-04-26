import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import swall from 'sweetalert2'

Vue.config.productionTip = false
Vue.prototype.axios = axios.create({
  baseURL: 'http://localhost:3000/'
})

Vue.prototype.swal = swall

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
