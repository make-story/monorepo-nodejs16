<template>
  <div>
    <div class="group-line">
      <TestContainer>slot 값!!</TestContainer>
    </div>
    <div class="group-line">
      <Todo></Todo>
    </div>
    <div class="group-line">
      <Toggle></Toggle>
    </div>
    <div class="group-line">
      <ArrayPaging></ArrayPaging>
    </div>
  </div>
</template>

<script>
/**
 *
 */
import TestContainer from '@/test/containers/TestContainer';
import Todo from '@/test/containers/Todo';
import Toggle from '@/test/containers/Toggle';
import ArrayPaging from '@/test/containers/arrayPaging/index';

export default {
  name: 'TestIndex',
  components: {
    TestContainer,
    Todo,
    Toggle,
    ArrayPaging,
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
