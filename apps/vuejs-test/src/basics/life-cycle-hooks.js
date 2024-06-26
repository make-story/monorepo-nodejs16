/**
 * Vue 생명 주기 훅 - Options / Lifecycle Hooks
 * https://v2.vuejs.org/v2/api/#Options-Lifecycle-Hooks
 *
 * method, computed, watch 내용은 "property.js" 파일 참고
 */
//import Vue from 'vue';

export default {
  name: 'LifeCycle',
  template: `
		<div>
      <p>Built-in Directives</p>
      <span v-text="sitename"></span>
      <button v-bind:click="clickButton">click me</button>
		</div>
	`,
  data() {
    return {
      sitename: 'Vue Test',
    };
  },
  beforeCreate() {
    console.log('생성 전 이벤트');
  },
  created() {
    // data 접근가능, 데이터 초기화, 비동기 데이터 호출 등
    console.log('생성 후 이벤트');
  },
  beforeMount() {
    console.log('마운트 전 이벤트');
  },
  mounted() {
    // this.$el 접근가능, element 접근관련 로직 등
    console.log('마운트 후 이벤트');
  },
  beforeUpdate() {
    console.log('업데이트 전 이벤트');
  },
  updated() {
    // data 변경에 따라 DOM이 업데이트 되었을 경우
    console.log('업데이트 후 이벤트');
    this.$nextTick(function () {
      // Code that will run only after the
      // entire view has been re-rendered
    });
  },
  beforeDestroy() {
    console.log('소멸 전 이벤트');
  },
  destroyed() {
    // 서버 렌더링시 호출되지 않는다.
    console.log('소멸 후 이벤트');
  },
  methods: {
    clickButton() {
      // ...
    },
  },
};
