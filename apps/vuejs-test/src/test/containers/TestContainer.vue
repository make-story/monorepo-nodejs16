<template>
  <div>
    <VerticalSlide></VerticalSlide>
    <!-- @buttonClick="" 속성은 컴포넌트 내부 $emit("buttonClick") 이벤트 수신 -->
    <TestComponent @buttonClick="$emit('goLinkPage')" @click.prevent="onClick">
      <slot></slot>
    </TestComponent>
  </div>
</template>

<script>
/**
 *
 */
import TestComponent from '@/test/components/TestComponent';
import VerticalSlide from '@/test/components/VerticalSlide';

export default {
  name: 'TestContainer',
  components: {
    TestComponent,
    VerticalSlide,
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
