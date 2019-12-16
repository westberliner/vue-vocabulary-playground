import Vue from 'vue'
import App from './App.vue'
import store from './store'
import i18n from './i18n'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import router from './router'
Vue.use(VueMaterial)

Vue.config.productionTip = false

new Vue({
  store,
  i18n,
  router,
  beforeCreate() {
		this.$store.commit('vocabulary/INITIALIZE_STORE')
	},
  render: h => h(App)
}).$mount('#app')


