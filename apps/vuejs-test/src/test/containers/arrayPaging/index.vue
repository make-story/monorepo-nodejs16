<template>
  <div>
    <div class="dummy">
      TEST
      <template v-for="(item, index) in responseData">
        <Unit :key="index" :item="item"></Unit>
      </template>
    </div>
    <PagingObserver @pagingAction="pagingAction"></PagingObserver>
  </div>
</template>

<script>
/**
 * 배열에 담긴 정보를 가지고 페이징 호출
 */
import Unit from './Unit';
import PagingObserver from './PagingObserver';

export default {
  name: 'ArrayPaging',
  components: {
    Unit,
    PagingObserver,
  },
  props: {},
  data() {
    return {
      arrayIndex: 0,
      pageSize: 20,
      metaData: [],
      observer: null,
      isLoading: false,
      responseData: [],
    };
  },
  computed: {},
  watch: {},
  created() {
    // 더미데이터 생성
    this.metaData = [...Array(50).keys()].map(i => ({
      id: i,
      name: `${i}`.padStart(3, '0'),
    }));
    console.log('metaData', this.metaData);
  },
  mounted() {},
  updated() {
    // data 변경에 따라 DOM이 업데이트 되었을 경우
    this.$nextTick(function () {
      // ...
    });
  },
  destroyed() {},
  beforeDestroy() {},
  methods: {
    pagingAction(target) {
      //console.log('pagingAction', target);
      if (this.isLoading !== false) {
        console.log('데이터 호출중...');
        return;
      }

      // API 요청 리스트 추출
      const list = [
        ...this.metaData.slice(
          this.arrayIndex,
          this.arrayIndex + this.pageSize,
        ),
      ];
      console.log('list', list);

      // API 호출
      if (0 < list.length) {
        // 데이터 호출 (dummy 서버)
        (async () => {
          this.isLoading = true;
          const response = await fetch('http://localhost:9090/list', {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
              //'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ mallCdList: [], productInfoList: list }),
          });
          const date = await response.json();
          // Vue 배열 감지
          // https://v2.ko.vuejs.org/v2/guide/list.html#%EB%B0%B0%EC%97%B4-%EB%8C%80%EC%B2%B4
          this.responseData = this.responseData.concat(
            date?.productInfoList || [],
          );
          this.isLoading = false;
        })();
      }
      this.arrayIndex += this.pageSize;
    },
  },
};
</script>

<style scoped>
.dummy {
  min-height: 500px;
}
</style>
