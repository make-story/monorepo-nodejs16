# Vue 개발을 도와주는 컴포넌트

## vue-timer

타이머 컴포넌트

Example

```vue
<template>
  <div>
    <Timer
      :targetTimestamp="targetTimestamp"
      v-slot="{ days, hours, minutes, seconds }"
    >
      Time Remaining：{{ days }} days, {{ hours }} hours, {{ minutes }} minutes,
      {{ seconds }} seconds.</Timer
    >
  </div>
</template>
<script>
import { Timer } from '@makestory/vue-component/index';

export default {
  name: 'VueTimer',
  components: {
    Timer,
  },
  props: {
    serverTimestamp: {
      type: Number,
      default: Date.now(),
    },
    targetTimestamp: {
      type: Number,
      default: Date.now(),
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {
    $props: {
      deep: true,
      immediate: true,
      handler() {},
    },
  },
  created() {},
  mounted() {},
  beforeUnmount() {},
  methods: {
    transformSlotProps(props) {
      const formattedProps = {};

      Object.entries(props).forEach(([key, value]) => {
        formattedProps[key] = value < 10 ? `0${value}` : String(value);
      });

      return formattedProps;
    },
  },
};
</script>

<style lang="scss" scoped></style>
```
