import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import md5 from 'md5'

import milligram from 'milligram'

//Declaration pour faire des requetes a l'API
window.api = axios.create({
  baseURL: 'https://allweb.fun/coop/api/',
  headers: { Authorization: '678972d5505a5b36335c892be8d1415d6a48b037' }
});
api.get('ping');
Vue.prototype.$bus = new Vue();
Vue.config.productionTip = false
new Vue({
    // ajouter automatiquement 
    // le token de session dans les appels axios
    beforeCreate() {
      api.interceptors.request.use(config => {
          if(this.$store.state.token) {
              config.url+='?token='+this.$store.state.token
          }
          return config;
      })
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
