<template>
  <div>
    <p>
      D-Day {{ padTo2Digits(days) }} {{ padTo2Digits(hours) }}:{{
        padTo2Digits(minutes)
      }}:{{ padTo2Digits(seconds) }}:{{ padTo2Digits(milliseconds) }}
    </p>
  </div>
</template>
<script>
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

/**
 * 'yyyyMMddHHmmss' 날짜 포맷 > new Date 변환
 */
const getConvertDateInstance = yyyyMMddHHmmss => {
  const stringParseInt = text => parseInt(text || 0, 10); // '00' > 0 변환
  if (typeof yyyyMMddHHmmss === 'string' && 8 <= yyyyMMddHHmmss.length) {
    return new Date(
      ...[
        yyyyMMddHHmmss.substring(0, 4),
        yyyyMMddHHmmss.substring(4, 6) - 1, // 월은 0부터 시작하므로 1을 빼줍니다.
        yyyyMMddHHmmss.substring(6, 8),
        yyyyMMddHHmmss.substring(8, 10),
        yyyyMMddHHmmss.substring(10, 12),
        yyyyMMddHHmmss.substring(12, 14),
      ].map(stringParseInt),
    );
  } else {
    return new Date();
  }
};

export default {
  name: 'DDay',
  components: {},
  props: {
    // console.log 출력 여부 (디버깅용)
    isDebug: {
      type: Boolean,
      default: true,
    },
    // 시작시간 기준값?
    startTimestamp: {
      type: Number,
      default: 0,
      validator: value => 0 <= value,
    },
    // 현재 시간 (서버 시간) - 밀리 초
    serverTimestamp: {
      type: Number,
      default: 0,
      //default: new Date('2024-05-16T13:00:00+09:00').getTime(),
      validator: value => 0 <= value,
    },
    // 카운트다운 타겟 시간 - 밀리 초
    targetTimestamp: {
      type: Number,
      default: 0,
      //default: new Date('2024-05-15T14:00:00+09:00').getTime(),
      //default: getConvertDateInstance('20240513160000').getTime(),
      validator: value => 0 <= value,
    },
  },
  emits: [EVENT_END, EVENT_START],
  data() {
    return {
      isCounting: false,
      totalMilliseconds: 0, // totalMilliseconds 값으로 카운트다운 실행여부 판단가능 (0보다 크다면 카운트다운 남은상태)
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
        this.update(); // 화면에 현재 계산된 카운트다운 정보 출력을 위해 start 전 update 실행
        this.start();
      },
    },
  },
  created() {},
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
        // 이미 카운트다운 시작된 상태
        return;
      }
      this.isCounting = true; // 카운트다운 시작 (상태값 변경)
      if (document.visibilityState === 'visible') {
        this.continue();
      }
      this.$emit(EVENT_START);
    },
    // 타이머 진행
    continue() {
      if (!this.isCounting) {
        // 이미 카운트다운 종료된 상태
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
        // 이미 카운트다운 종료된 상태
        return;
      }

      this.pause();
      this.totalMilliseconds = 0;
      this.isCounting = false; // 카운트다운 종료 (상태값 변경)
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
          this.continue();
          break;

        case 'hidden':
          this.pause();
          break;
      }
    },
    // 노출시간 '0' -> '00'
    padTo2Digits(value) {
      return value.toString().padStart(2, '0');
    },
  },
};
</script>

<style lang="scss" scoped></style>
