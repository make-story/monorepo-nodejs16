<template>
  <div>
    {{ JSON.stringify(computedItem) }}
    <ul>
      <li><button @click="onClickContainer">onClickContainer</button></li>
      <li>
        <button @click="onClickContainerDataChange">
          onClickContainerDataChange
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
/**
 *
 */
export default {
  name: 'Presentational',
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
  },
  data() {
    return {};
  },
  computed: {
    // 객체(Object, {}) 값이 변경되면, 반영되는지 확인
    computedItem() {
      return this.item;
    },
  },
  watch: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    // 상위 컴포넌트에서 함수를 props 로 넘겨주고, 하위 컴포넌트에서 호출하여 데이터 전달되는지 여부
    onClickContainer() {
      this.onClick('컨테이너야 데이터 받아라!');
    },
    // props 로 받은 객체타입 데이터 변경시, 상위 컴포넌트에도 반영되는지 여부
    onClickContainerDataChange() {
      this.item.count = this.item.count + 1;
    },
  },
};
</script>

<style lang="scss" scoped></style>
