<template>
  <div>
    <Timer
      :serverTimestamp="serverTimestamp"
      :targetTimestamp="targetTimestamp"
      :transform="transformSlotProps"
      v-slot="{ days, hours, minutes, seconds }"
    >
      Time Remaining {{ days }} days, {{ hours }} hours, {{ minutes }} minutes,
      {{ seconds }} seconds.</Timer
    >
  </div>
</template>
<script>
/**
 * 'vue-timer' 사용 테스트
 */
import { Timer } from '@makestory/vue-component/index'; // monorepo-nodejs16.git/packages/vue-component

/**
 * 'yyyyMMddHHmmss' 날짜 포맷 > new Date 변환
 */
const getConvertDateInstance = yyyyMMddHHmmss => {
  const stringParseInt = text => parseInt(text || 0, 10); // '00' > 0 변환
  if (typeof yyyyMMddHHmmss === 'string' && 8 <= yyyyMMddHHmmss.length) {
    return new Date(
      ...[
        yyyyMMddHHmmss.substring(0, 4),
        yyyyMMddHHmmss.substring(4, 6) - 1, // 월은 0부터 시작하므로 1을 빼줍니다.
        yyyyMMddHHmmss.substring(6, 8),
        yyyyMMddHHmmss.substring(8, 10),
        yyyyMMddHHmmss.substring(10, 12),
        yyyyMMddHHmmss.substring(12, 14),
      ].map(stringParseInt),
    );
  } else {
    return new Date();
  }
};

export default {
  name: 'TestTimer',
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
      //default: Date.now(),
      default: new Date('2024-05-15T16:40:00+09:00').getTime(),
      //default: getConvertDateInstance('20240513160500').getTime(),
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
