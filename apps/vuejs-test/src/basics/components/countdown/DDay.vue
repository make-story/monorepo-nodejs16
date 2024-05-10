<template>
  <div>DDDDDDD</div>
</template>
<script>
export const getKoreaStandardTime = () => {
  // 1. 현재 시간(Locale)
  const date = new Date();

  // 2. UTC 시간 계산
  // getTimezoneOffset() 함수는 현재 사용자 PC 설정 시간대로부터 UTC 시간까지의 차이를 '분'단위로 리턴
  // getTime() 함수는 '1970년 1월1 일 00:00:00 UTC'로부터 주어진 시간 사이의 경과시간(밀리초)를 리턴
  const UTC = date.getTime() + date.getTimezoneOffset() * 60 * 1000;

  // 3. UTC to KST (UTC + 9시간)
  // 한국 시간(KST)은 UTC시간보다 9시간 더 빠름
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const dateKR = new Date(UTC + KR_TIME_DIFF);

  return dateKR;
};

export const getDDay = (targetDate, { referenceDate = new Date() } = {}) => {
  const result = {
    targetDate: null, // D-Day 대상 날짜
    referenceDate, // 기준일자 (대부분 현재)
    timeDifference: 0, // 시간차이
    day: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  // D-Day 날짜 지정
  targetDate = targetDate instanceof Date ? targetDate : new Date(targetDate);
  // 'Invalid Date' 잘못된 Date 형식 확인
  if (isNaN(targetDate.getTime())) {
    return result;
  }
  result.targetDate = targetDate;

  // D-Day 날짜에서 현재 날짜의 차이를 getTime 메서드를 사용해서 밀리초의 값으로 가져온다.
  result.timeDifference =
    result.targetDate.getTime() - result.referenceDate.getTime();

  // D-day 날짜의 연,월,일 구하기
  //const dateYear = targetDate.getFullYear();
  //const dateMonth = targetDate.getMonth() + 1; // getMonth 메서드는 0부터 세기 때문에 +1 해준다.
  //const dateDay = targetDate.getDate();

  // Math.floor 함수를 이용해서 근접한 정수값을 가져온다.
  // 밀리초 값이기 때문에 1000을 곱한다.
  // 1000*60 => 60초(1분)*60 => 60분(1시간)*24 = 24시간(하루)
  // 나머지 연산자(%)를 이용해서 시/분/초를 구한다.
  result.day = Math.floor(result.timeDifference / (1000 * 60 * 60 * 24));
  result.hours = Math.floor(
    (result.timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  result.minutes = Math.floor(
    (result.timeDifference % (1000 * 60 * 60)) / (1000 * 60),
  );
  result.seconds = Math.floor((result.timeDifference % (1000 * 60)) / 1000);

  return result;
};

export default {
  name: 'DDay',
  components: {},
  props: {
    serverTimestamp: {
      type: Number,
      default: Date.now(),
    },
    targetTimestamp: {
      type: Number,
      default: Date.now(),
    },
  },
  data() {
    return {
      time: null,
    };
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
  mounted() {
    window.clearInterval(this.time);
    this.time = window.setInterval(() => {
      const { day, hours, minutes, seconds } = getDDay(
        '2024-05-11T15:00:00+09:00',
      );
      console.log(day, [hours, minutes, seconds].join(':'));
    }, 10000);
  },
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
