<template>
  <div>
    <p>{{ message }}</p>
    <p>{{ JSON.stringify(computedItem) }}</p>
    <ul>
      <li><button @click="onClickContainer">onClickContainer</button></li>
      <li>
        <button @click="onClickContainerChangeItemCount">
          onClickContainerChangeItemCount
        </button>
      </li>
    </ul>
    <h2>Item</h2>
    <!-- 
      v-once 속성을 추가한 경우, props 로 전달되는 객체 변경에 따라 영향도가 다름
       - 객채({})의 메모리 주소가 변경될 경우(불변성유지 값 변경) v-once 속성이 있을 경우 값 변경에 대한 영향을 받지 않음
       - 객체의 메모리 주소가 변경되지 않는다면 v-once 속성이 있어도 값 변경의 영향을 받음!
    -->
    <Item v-once :item="item" :onClick="onClick" :message="message"></Item>
  </div>
</template>

<script>
/**
 * 상위 컴포넌트와 하위 컴포넌트간 테스트를 위한 컴포넌트
 */
import Item from './Item';

export default {
  name: 'Presentational',
  components: {
    Item,
  },
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
    // 상위 컴포넌트에서 함수를 props 로 넘겨주고, 하위 컴포넌트에서 호출하여, 상위컴포넌트로 데이터 전달되는지 여부? 변경된다!
    onClickContainer() {
      this.onClick(
        '컨테이너야 메시지(데이터) 받아라! - Presentational 컴포넌트에서 실행',
      );
    },
    // props 로 받은 객체타입 데이터 변경시, 상위 컴포넌트에도 반영되는지 여부? 변경된다!
    /**
     * [경고!!!!] 하위 컴포넌트 등에서 item (객체타입) 값을 변경해서는 안된다!
     * item.xxx.yyy = true; 형태로 값을 변경할 경우, item 을 참조하는 다른 컴포넌트에 영향이 있다! 즉, 디버깅 또는 watch 등이 있을 경우 순환참조에 빠질 수 있다!
     * props 로 받은 item 객체타입을 data 에 원시타입형태로 바인딩(data() { return { isTest: this.item.isTest }; }) 하고, 해당 값을 사용하는 것이 좋다!
     */
    onClickContainerChangeItemCount() {
      this.item.count = this.item.count + 1;
    },
  },
};
</script>

<style lang="scss" scoped></style>
