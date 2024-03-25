<template>
  <div>
    Container > Presentational > Item
    <h2>Container</h2>
    <p>{{ containerText }}</p>
    <p>{{ message }}</p>
    <p>{{ JSON.stringify(item) }}</p>
    <ul>
      <li><button @click="setChangeItemCount">setChangeItemCount</button></li>
      <li>
        <button @click="setChangeItemMessage">setChangeItemMessage</button>
      </li>
      <li>
        <button @click="setChangeMessage">setChangeMessage</button>
      </li>
    </ul>
    <h2>Presentational</h2>
    <Presentational
      :item="item"
      :onClick="onClick"
      :message="message"
    ></Presentational>
  </div>
</template>

<script>
/**
 * 상위 컴포넌트와 하위 컴포넌트간 테스트를 위한 컴포넌트
 */
import Presentational from './Presentational';

export default {
  name: 'Container',
  components: {
    Presentational,
  },
  props: {},
  data() {
    return {
      item: { count: 0, message: 'test', is: false },
      containerText: '',
      message: '',
    };
  },
  computed: {
    // item.count 만 watch 할 수 있도록 선언
    count() {
      return this.item.count;
    },
  },
  watch: {
    count: {
      deep: true,
      handler(value) {
        console.log('Container', 'count 값 변경!', value);
      },
    },
  },
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    // Object 타입의 props 테스트: 상위 컴포넌트에서 item 객체의 프로퍼티 값을 변경했을 떄, 하위 컴포넌트에서도 변경된 값을 받을 수 있는지? 받을 수 있다! 같이 변경됨
    setChangeItemCount() {
      this.item = {
        ...this.item,
        count: this.item.count + 1,
      };
    },
    setChangeItemMessage() {
      this.item = {
        ...this.item,
        message: `item-message-${Math.random()}`,
      };
    },
    setChangeMessage() {
      this.message = `message-${Math.random()}`;
    },
    // props 로 함수를 넘기고, 정상 실행되는지 여부? 가능하다!
    onClick(presentationalText) {
      this.containerText = presentationalText;
      console.log(
        '하위 컴포넌트에서 넘겨준 메시지(데이터)',
        presentationalText,
      );
    },
  },
};
</script>

<style lang="scss" scoped></style>
