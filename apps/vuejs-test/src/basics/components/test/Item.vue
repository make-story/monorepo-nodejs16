<template>
  <div>
    <p>message: {{ message }}</p>
    <p>computedMessage: {{ computedMessage }}</p>
    <p>computedItem: {{ JSON.stringify(computedItem) }}</p>
    <p>computedItemCount: {{ computedItemCount }}</p>
    <p>computedItemMessage: {{ computedItemMessage }}</p>
    <ul>
      <li><button @click="onClickContainer">onClickContainer</button></li>
      <li>
        <button @click="onClickContainerChangeItemCount">
          onClickContainerChangeItemCount
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
/**
 * 최상위 컴포넌트, 상위 컴포넌트간 테스트
 */
import Temp from './Temp';

export default {
  name: 'Item',
  components: {},
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    index: {
      type: Number,
    },
    onClick: {
      type: Function,
    },
    // string 타입의 props 가 상위 컴포넌트에서 변경되었을 때, 하위 컴포넌트도 변경되는지 여부? 변경된다!
    message: {
      type: String,
    },
  },
  data() {
    return {
      itemCount: this.item?.count,
      itemMessage: this.item?.message,
      itemData: `${this.item?.count} / ${this.item?.message}`,
    };
  },
  computed: {
    // 객체(Object, {}) 값이 변경되면, 반영되는지 확인? 변경되면 반영된다!
    computedItem() {
      return this.item;
    },
    computedItemCount() {
      return this.item?.count;
    },
    computedItemMessage() {
      return this.item?.message;
    },
    computedMessage() {
      return this.message;
    },
  },
  watch: {
    computedItemCount: function () {
      console.log('computedItemCount 값 변경 감지!!');
    },
    computedItemMessage: function () {
      console.log('computedItemMessage 값 변경 감지!!');
    },
    // 객체 불변성에 따른 감지(watch) 테스트
    // <Item :item="item" /> 경우, 불변성 여부 상관없이 상위 컴포넌트에서 객체 변경시 props 로 넘겨받은 하위 컴포넌트 무조건 영향 받음
    // <Item v-once :item="item" /> 경우, 불변성으로 객체 변경했을 경우 props 로 넘겨받은 하위 컴포넌트 영향 없음
    item: {
      //immediate: true, // 컴포넌트가 생성되자마자 즉시 실행
      deep: true, // data가 object(=배열 또는 객체)인 경우 object 내부의 값이 변경될때 watch가 감지 가능
      handler(value, oldValue) {
        console.log('item 값 변경 감지!!', value);
      },
    },
    itemCount: {
      //immediate: true, // 컴포넌트가 생성되자마자 즉시 실행
      //deep: true, // data가 object(=배열 또는 객체)인 경우 object 내부의 값이 변경될때 watch가 감지 가능
      handler(value, oldValue) {
        console.log('itemCount 값 변경 감지!!', value);
      },
    },
    itemMessage: {
      //immediate: true, // 컴포넌트가 생성되자마자 즉시 실행
      //deep: true, // data가 object(=배열 또는 객체)인 경우 object 내부의 값이 변경될때 watch가 감지 가능
      handler(value, oldValue) {
        console.log('itemMessage 값 변경 감지!!', value);
      },
    },
  },
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    // 상위 컴포넌트에서 함수를 props 로 넘겨주고, 하위 컴포넌트에서 호출하여, 상위컴포넌트로 데이터 전달되는지 여부? 변경된다!
    onClickContainer() {
      this.onClick(
        '최상위 컨테이너야 메시지(데이터) 받아라! - Item 컴포넌트에서 실행',
      );
    },
    // props 로 받은 객체타입 데이터 변경시, 상위 컴포넌트에도 반영되는지 여부? 변경된다!
    onClickContainerChangeItemCount() {
      this.item.count = this.item.count + 1;
    },
  },
};
</script>

<style lang="scss" scoped></style>
