import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import qs from 'qs'
axios.defaults.baseURL ='http://127.0.0.1:3000'
Vue.prototype.axios = axios;
Vue.config.productionTip = false


//导入MintUI组件
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.min.css'; 
Vue.use(MintUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
