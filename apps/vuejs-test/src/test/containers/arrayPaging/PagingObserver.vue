<template>
  <div ref="observer"></div>
</template>

<script>
/**
 * 배열에 담긴 정보를 가지고 페이징 호출
 */
export default {
  name: 'PagingObserver',
  components: {},
  props: {},
  data() {
    return {
      observer: null,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    try {
      this.observer = new IntersectionObserver(
        (entries, observer) => {
          this.handleObserver(entries[0]);
        },
        {
          threshold: 1.0,
        },
      );
      this.observer.observe(this.$refs.observer);
    } catch (error) {
      console.error(error);
    }
  },
  updated() {
    // data 변경에 따라 DOM이 업데이트 되었을 경우
    this.$nextTick(function () {
      // ...
    });
  },
  destroyed() {},
  beforeDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  },
  methods: {
    handleObserver(target) {
      //console.log('handleObserver', target);
      if (target?.isIntersecting) {
        this.$emit('pagingAction', target);
      }
    },
  },
};
</script>

<style scoped></style>
