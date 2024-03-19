/**
 * 컴포넌트 이벤트
 * https://ko.vuejs.org/guide/components/events
 *
 * src/basics/custom-event.js
 * 내용 동일
 */

// 하위 컴포넌트
const MyComponent = {
  template: `
    <!-- 상위 컴포넌트 이벤트 호출 //-->
    <button @click="$emit('someEvent')">click me</button>
    `,
};

// 상위 컴포넌트
export default {
  template: `
    <!-- 하위 컴포넌트 이벤트 전달 받음 //-->
    <MyComponent @someEvent="callback" />
    `,
  components: {
    MyComponent,
  },
  methods: {
    callback() {
      console.log('Parent > callback');
    },
  },
};
