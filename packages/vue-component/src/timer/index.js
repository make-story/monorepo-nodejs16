/**
 * vue timer
 * https://github.com/fengyuanchen/vue-countdown/blob/main/src/index.ts
 * https://fengyuanchen.github.io/vue-countdown/
 * https://joshua1988.github.io/vue-camp/reuse/v-slot.html#v-slot-%E1%84%80%E1%85%B5%E1%84%87%E1%85%A9%E1%86%AB-%E1%84%89%E1%85%A1%E1%84%8B%E1%85%AD%E1%86%BC-%E1%84%87%E1%85%A1%E1%86%BC%E1%84%87%E1%85%A5%E1%86%B8
 */
import Vue from 'vue';

const MILLISECONDS_SECOND = 1000; // 1000 = 1초 (밀리초 값이기 때문에 1000)
const MILLISECONDS_MINUTE = 60 * MILLISECONDS_SECOND; // 1초 * 60 = 1분
const MILLISECONDS_HOUR = 60 * MILLISECONDS_MINUTE; // 60초(1분) * 60 = 1시간
const MILLISECONDS_DAY = 24 * MILLISECONDS_HOUR; // 60분(1시간) * 24 = 1일
const EVENT_END = 'end';
const EVENT_START = 'start';
const EVENT_VISIBILITY_CHANGE = 'visibilitychange';

/**
 * timestamp > 사람이 인지 가능한 날짜포맷 (디버깅용)
 */
const getDateInstanceConvertFormat = (timestamp = Date.now()) => {
  const padTo2Digits = value => {
    return value.toString().padStart(2, '0');
  };

  //const timestamp = Date.now();
  //console.log(timestamp);
  //console.log(new Date(timestamp).getTime());
  try {
    const date = new Date(timestamp);
    return [
      [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
      ].join('-'),
      [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
        padTo2Digits(date.getSeconds()),
      ].join(':'),
    ].join(' ');
  } catch (error) {
    console.error(error);
  }
};

export default Vue.component('vue-timer', {
  name: 'VueTimer',

  props: {
    // console.log 출력 여부 (디버깅용)
    isDebug: {
      type: Boolean,
      default: false,
    },
    // 감싸는 태그
    tag: {
      type: String,
      default: 'span',
    },
    // 현재 시간 (서버 시간) - 밀리 초
    serverTimestamp: {
      type: Number,
      default: 0,
      //default: new Date('2024-05-15T14:00:00+09:00').getTime(),
    },
    // 타이머 타겟 시간 - 밀리 초
    targetTimestamp: {
      type: Number,
      default: 0,
      //default: new Date('2024-05-15T14:00:00+09:00').getTime(),
      validator: value => 0 <= value,
    },
    // 타임값 형태 수정 가능한 콜백
    transform: {
      type: Function,
      default: props => props,
    },
  },

  emits: [EVENT_END, EVENT_START],

  data() {
    return {
      isCounting: false,
      totalMilliseconds: 0, // 주의! 초단위가 0이라도 밀리세컨드 값은 0이 아닐 수 있음
      interval: 1000,
      intervalCode: 0,
      isDeviceTime: false,
      correctionTimestamp: 0,
    };
  },

  computed: {
    days() {
      return Math.floor(this.totalMilliseconds / MILLISECONDS_DAY);
    },
    hours() {
      return Math.floor(
        (this.totalMilliseconds % MILLISECONDS_DAY) / MILLISECONDS_HOUR,
      );
    },
    minutes() {
      return Math.floor(
        (this.totalMilliseconds % MILLISECONDS_HOUR) / MILLISECONDS_MINUTE,
      );
    },
    seconds() {
      return Math.floor(
        (this.totalMilliseconds % MILLISECONDS_MINUTE) / MILLISECONDS_SECOND,
      );
    },
    milliseconds() {
      return Math.floor(this.totalMilliseconds % MILLISECONDS_SECOND);
    },
    totalDays() {
      return this.days;
    },
    totalHours() {
      return Math.floor(this.totalMilliseconds / MILLISECONDS_HOUR);
    },
    totalMinutes() {
      return Math.floor(this.totalMilliseconds / MILLISECONDS_MINUTE);
    },
    totalSeconds() {
      return Math.floor(this.totalMilliseconds / MILLISECONDS_SECOND);
    },
  },

  watch: {
    $props: {
      deep: true,
      immediate: true,
      handler() {
        this.totalMilliseconds = this.targetTimestamp;
        this.correctionTimestamp = this.deviceTimestamp(); // 현재 디바이스의 시간 기록 (시간 보정을 위한 값)
        // 서버 시간과 디바이스 시간간 큰 차이가 없을 경우, 디바이스 시간 사용
        this.isDeviceTime =
          !this.serverTimestamp ||
          Math.abs(this.serverTimestamp - this.correctionTimestamp) <= 60000; // 디바이스타임 사용가능 여부판단, 서버타임과 디바이스타임 시간차이 비교 (60000 밀리초 === 1 분)

        // 로그 (디버깅용)
        if (this.isDebug) {
          console.log(
            this.$options?.name,
            '디바이스 날짜/시간 사용여부',
            this.isDeviceTime,
          );
          console.log(
            this.$options?.name,
            '목표 날짜/시간',
            this.targetTimestamp,
            getDateInstanceConvertFormat(this.targetTimestamp),
          );
          console.log(
            this.$options?.name,
            '서버 날짜/시간',
            this.serverTimestamp,
            getDateInstanceConvertFormat(this.serverTimestamp),
          );
          console.log(
            this.$options?.name,
            '디바이스 날짜/시간',
            this.correctionTimestamp,
            getDateInstanceConvertFormat(this.correctionTimestamp),
          );
        }
        this.update(); // 화면에 현재 계산된 타이머 정보 출력을 위해 start 전 update 실행
        this.start();
      },
    },
  },

  mounted() {
    document.addEventListener(
      EVENT_VISIBILITY_CHANGE,
      this.handleVisibilityChange,
    );
  },

  beforeUnmount() {
    document.removeEventListener(
      EVENT_VISIBILITY_CHANGE,
      this.handleVisibilityChange,
    );
    this.pause();
  },

  methods: {
    // 타이머 시작
    start() {
      if (this.isCounting) {
        // 이미 타이머 시작된 상태
        return;
      }
      this.isCounting = true; // 타이머 시작 (상태값 변경)
      // 주의! 사용자가 타이머가 동작하는 브라우저 탭을 보고 있을 때 실행됨
      if (document.visibilityState === 'visible') {
        this.execute();
      }
      this.$emit(EVENT_START);
    },
    // 타이머 진행
    execute() {
      if (!this.isCounting) {
        // 이미 타이머 종료된 상태
        return;
      }
      this.intervalCode = setInterval(() => {
        // 날짜/시간 재계산
        this.update();

        // 종료여부
        if (Math.min(this.totalMilliseconds, this.interval) <= 0) {
          this.end();
        }
      }, this.interval);
    },
    // 날짜/시간 값 업데이트
    update() {
      // 날짜/시간 계산
      if (this.isDeviceTime) {
        // 디바이스타임 기준
        this.totalMilliseconds = Math.max(
          0,
          this.targetTimestamp - this.deviceTimestamp(),
        );
      } else {
        // 서버타임 기준
        const second = this.deviceTimestamp() - this.correctionTimestamp; // 타이머 시작시 디바이스 시간과 현재 디바이스 시간 비교 (시간 보정을 위한 값)
        //console.log('보정된 second', second);
        this.totalMilliseconds = Math.max(
          0,
          this.targetTimestamp -
            new Date(this.serverTimestamp + second).getTime(),
        );
      }

      // 로그 (디버깅용)
      if (this.isDebug) {
        console.log(
          this.$options?.name,
          'D-Day',
          `${this.padTo2Digits(this.days)}일`,
          `${this.padTo2Digits(this.hours)}시`,
          `${this.padTo2Digits(this.minutes)}분`,
          `${this.padTo2Digits(this.seconds)}초`,
        );
        console.log(
          this.$options?.name,
          'Total D-Day',
          `${this.padTo2Digits(this.totalDays)}일`,
          `${this.padTo2Digits(this.totalHours)}시`,
          `${this.padTo2Digits(this.totalMinutes)}분`,
          `${this.padTo2Digits(this.totalSeconds)}초`,
        );
      }
    },
    // 타이머 정지
    pause() {
      clearInterval(this.intervalCode);
    },
    // 타이머 종료
    end() {
      if (!this.isCounting) {
        // 이미 타이머 종료된 상태
        return;
      }

      this.pause();
      this.totalMilliseconds = 0;
      this.isCounting = false; // 타이머 종료 (상태값 변경)
      this.$emit(EVENT_END);
    },
    // 디바이스 시간 반환
    deviceTimestamp() {
      return Date.now();
    },
    // 화면 노출 이벤트 핸들러
    handleVisibilityChange() {
      if (this.isDebug) {
        console.log(
          this.$options?.name,
          'document.visibilityState',
          document.visibilityState,
        );
      }
      switch (document.visibilityState) {
        case 'visible':
          this.update();
          this.execute();
          break;

        case 'hidden':
          this.pause();
          break;
      }
    },
    // 노출시간 '0' -> '00'
    padTo2Digits(num) {
      return num.toString().padStart(2, '0');
    },
  },

  render(createElement) {
    // 하위컴포넌트 <slot name="default"></slot>
    // 상위컴포넌트 v-slot:default=""
    // TODO: this.$scopedSlots 유효성검사 필요! v-slot 속성이 없을 수 있음
    return createElement(this.tag, [
      this.$scopedSlots.default(
        this.transform({
          days: this.days,
          hours: this.hours,
          minutes: this.minutes,
          seconds: this.seconds,
          milliseconds: this.milliseconds,
          totalDays: this.totalDays,
          totalHours: this.totalHours,
          totalMinutes: this.totalMinutes,
          totalSeconds: this.totalSeconds,
          totalMilliseconds: this.totalMilliseconds,
        }),
      ),
    ]);
  },
});
