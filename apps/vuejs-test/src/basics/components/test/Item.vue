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
    return {};
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
  watch: {},
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
