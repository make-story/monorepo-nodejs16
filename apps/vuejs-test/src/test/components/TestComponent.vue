<template>
  <div>
    <button @click="onClick">Click Button</button>
  </div>
</template>

<script>
/**
 *
 */
export default {
  name: 'TestComponent',
  components: {},
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
    goLinkPage() {
      console.log('TestComponent > goLinkPage');
    },
    onClick() {
      console.log('TestComponent > onClick');
      this.$emit('buttonClick');
    },
  },
};
</script>

<style lang="scss" scoped></style>
