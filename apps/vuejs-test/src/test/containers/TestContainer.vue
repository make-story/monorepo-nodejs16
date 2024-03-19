<template>
  <!-- @buttonClick="" 속성은 컴포넌트 내부 $emit("buttonClick") 이벤트 수신 -->
  <TestComponent
    @buttonClick="$emit('goLinkPage')"
    @click.prevent="onClick"
  ></TestComponent>
</template>

<script>
/**
 *
 */
import TestComponent from '@/test/components/TestComponent';

export default {
  name: 'TestContainer',
  components: {
    TestComponent,
  },
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    onClick() {
      console.log('TestContainer > onClick');
    },
  },
};
</script>

<style lang="scss" scoped></style>
