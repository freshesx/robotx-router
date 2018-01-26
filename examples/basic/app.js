import Vue from 'vue'
import './router.js'
import Layout from './components/Layout.vue'

new Vue({
  render: h => h(Layout)
}).$mount('#app')
