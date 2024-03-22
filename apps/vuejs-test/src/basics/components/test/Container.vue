<template>
  <div>
    <Presentational :item="item" :onClick="onClick"></Presentational>
    <ul>
      <li><button @click="setCount">setCount</button></li>
      <li><button @click="setMessage">setMessage</button></li>
    </ul>
    <p>{{ containerData }}</p>
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
