<template>
  <p>{{ greeting }} World!</p>
</template>

<script>
/*
-
싱글 파일 컴포넌트 방식
https://kr.vuejs.org/v2/guide/single-file-components.html

Vue 전처리기
https://vue-loader-v14.vuejs.org/kr/configurations/pre-processors.html

-
관심사(역할) 분리!
주목해야 할 중요한 점은 관심사 분리가 파일 타입 분리와 같지 않다는 것입니다. 
현대적인 UI 개발에서 코드베이스를 서로 얽혀있는 세 개의 거대한 레이어로 나누는 대신, 
느슨하게 결합 된 컴포넌트로 나누고 구성하는 것이 더 중요합니다. 
컴포넌트 내부에서 템플릿, 로직 및 스타일이 본질적으로 결합되어 배치되면 컴포넌트의 응집력과 유지 보수성이 향상됩니다.
*/

// Webpack 또는 Browserify와 같은 빌드 도구를 이용해 .vue 확장자를 가진 싱글 파일 컴포넌트
module.exports = {
  name: 'LifeCycle',
  components: {},
  props: {
    num: {
      type: Number,
    },
    str: {
      type: String,
      default: '안녕',
      required: true,
    },
    obj: {
      type: Object, // Object 타입의 경우, 함수 return 형태로 반환해야 한다!
      default: () => {
        return {
          message: '안녕 객체',
        };
      },
    },
  },
  data() {
    return {
      sitename: 'Vue Test',
    };
  },
  computed: {
    // 계산된 속성, 캐싱
    reversedSitename: function () {
      return this.sitename.split('').reverse().join('');
    },
  },
  watch: {
    // 데이터 변경을 관찰하고 이에 반응
    sitename: function (newVal, oldVal) {
      console.log(`이전 : ${oldVal}, 변경 : ${newVal}`);
    },
  },
  created() {
    // data 접근가능, 데이터 초기화, 비동기 데이터 호출 등
    console.log('생성 후 이벤트');
  },
  mounted() {
    // this.$el 접근가능, element 접근관련 로직 등
    console.log('마운트 후 이벤트');
  },
  destroyed() {
    // 서버 렌더링시 호출되지 않는다.
    console.log('소멸 후 이벤트');
  },
  methods: {
    clickButton() {
      // ...
    },
  },
};
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
