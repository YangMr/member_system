import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import Time from "./utils/time"
import 'element-ui/lib/theme-chalk/index.css';
import "./assets/css/reset.css"
Vue.use(ElementUI);

Vue.prototype.$Time = Time

Vue.config.productionTip = false;

import "./permissions"
import "./utils/test"


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

