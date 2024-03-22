<template>
  <div>
    <h2>Container</h2>
    <p>{{ containerData }}</p>
    <p>{{ JSON.stringify(item) }}</p>
    <ul>
      <li><button @click="setCount">setCount</button></li>
      <li><button @click="setMessage">setMessage</button></li>
    </ul>
    <h2>Presentational</h2>
    <Presentational :item="item" :onClick="onClick"></Presentational>
  </div>
</template>

<script>
/**
 *
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
      containerData: '',
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    setCount() {
      this.item = {
        ...this.item,
        count: this.item.count + 1,
      };
    },
    setMessage() {
      this.item = {
        ...this.item,
        message: `test-${Math.random()}`,
      };
    },
    onClick(presentationalData) {
      this.containerData = presentationalData;
      console.log(
        'Presentational 컴포넌트에서 넘겨준 데이터',
        presentationalData,
      );
    },
  },
};
</script>

<style lang="scss" scoped></style>
