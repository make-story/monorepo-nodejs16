/**
 * 모듈화 > 외부 JS 파일로 제공 > Vue 사용하는 곳에서 Vue.use(install) 하여 사용!
 */
import { store } from '@/basics/store/index';
import HelloWorld from '@/basics/components/HelloWorld.vue';

export const install = Vue => {
  Vue.component('hello-world', HelloWorld);
  Vue.mixin({
    store,
    methods: {},
  });
};

export { install, store };
//Vue.use(install);
