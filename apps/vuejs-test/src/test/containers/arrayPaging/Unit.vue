<template>
  <div>Unit {{ item.name }}</div>
</template>

<script>
/**
 *
 */
export default {
  name: 'Unit',
  components: {},
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  updated() {
    // data 변경에 따라 DOM이 업데이트 되었을 경우
    this.$nextTick(function () {
      // …
    });
  },
  destroyed() {},
  beforeDestroy() {},
  methods: {},
};
</script>

<style scoped></style>
