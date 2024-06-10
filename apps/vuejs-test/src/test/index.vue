<template>
  <div>
    <TestContainer>slot 값!!</TestContainer>
    <Todo></Todo>
  </div>
</template>

<script>
/**
 *
 */
import TestContainer from '@/test/containers/TestContainer';
import Todo from '@/test/containers/Todo';

export default {
  name: 'TestIndex',
  components: {
    TestContainer,
    Todo,
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
  methods: {},
};
</script>

<style lang="scss" scoped></style>
