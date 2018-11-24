// import Vue from 'vue'
import Vue from 'vue'


import App from './App.vue'
import router from './router'
import store from './store'
import commonUI from './common'
Vue.use(commonUI);
Vue.prototype.$center = new Vue;
// var date = new Date();
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
