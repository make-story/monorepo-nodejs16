<template>
  <div>
    <countdown-helper
      :targetTimestamp="targetTimestamp"
      v-slot="{ days, hours, minutes, seconds }"
    >
      Time Remaining：{{ days }} days, {{ hours }} hours, {{ minutes }} minutes,
      {{ seconds }} seconds.</countdown-helper
    >
  </div>
</template>
<script>
import { CountdownHelper } from '@makestory/vue-helper/index'; // monorepo-nodejs16.git/packages/vue-helper

export default {
  name: 'Countdown',
  components: {
    CountdownHelper,
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
