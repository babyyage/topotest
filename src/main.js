import Vue from 'vue'
import App from './App.vue'
import VueTree from '@ssthouse/vue-tree-chart'
Vue.component('vue-tree', VueTree)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
