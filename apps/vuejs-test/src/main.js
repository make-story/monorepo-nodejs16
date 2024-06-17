import Vue from 'vue';
import VueAwesomeSwiper from 'vue-awesome-swiper';

import App from './App.vue';
import { basicTest, vuexTest } from './basics/index';

import 'swiper/dist/css/swiper.css';
import './assets/css/index.css';

Vue.config.productionTip = false;
Vue.use(VueAwesomeSwiper);

const eventBus = (Vue.prototype.EventBus = new Vue());

new Vue({
  render: h => h(App),
}).$mount('#app');
new Vue(basicTest);
new Vue(vuexTest);

export { eventBus };
