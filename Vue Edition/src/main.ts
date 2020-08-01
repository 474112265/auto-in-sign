import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
require('assets/css/common.css');
require('assets/js/rAF.js');


// require('jquery');



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
