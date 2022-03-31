import ScrollLoader from 'vue-scroll-loader';
import VueToast from 'vue-toast-notification';
import {Plugin as VueScreen} from 'vue-screen/src/plugin';
import SvgVue from "svg-vue"; // required
import store from './store';
import i18n from './translation';
import router from './router';

Vue.use(ScrollLoader);
Vue.use(VueToast);
Vue.use(VueScreen, {
  extend: 'bootstrap',
  xxl: 1400,
});

export const app = new Vue({
  i18n,
  store,
  router,
  el: '#app',
  template: '<router-view/>',
});
