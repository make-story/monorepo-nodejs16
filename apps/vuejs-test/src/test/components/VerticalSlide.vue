<template>
  <div class="banner">
    <div class="swiperWrap">
      <swiper
        ref="swiperComponent"
        :options="swiperOption"
        @slideChangeTransitionEnd="slideChangeTransitionEnd"
      >
        <swiper-slide
          v-for="value in Array(swiperDummySlideLength)"
          :key="value"
        ></swiper-slide>
        <swiper-slide v-for="(item, index) in rollingItem" :key="index">
          <p>{{ item.message }}</p>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
<script>
/**
 * 스와이퍼 위아래 슬라이드
 */

export default {
  name: 'VerticalSlide',
  components: {
    //Swiper,
    //swiper-slide,
  },
  props: {},
  data() {
    return {
      rollingItem: [],
      swiper: null,
      swiperOption: {
        direction: 'vertical', // 슬라이드 방향 (vertical, horizontal)
        loop: true, // 반복 설정
        spaceBetween: 4, // 슬라이드 사이 간격
        slidesPerView: 2, // 한개 슬라이드 노출 개수
        allowTouchMove: false, // 슬라이드 터치 이동 허용
        autoplay: false,
      },
      swiperDummySlideLength: 1,
      swiperDummySlideRemoveLength: 0,
    };
  },
  computed: {},
  watch: {
    test: {
      //deep: true,
      immediate: true,
      handler() {
        const list = [
          {
            //iconUrl: iconTime,
            text: '시계 아이콘',
            message: '1 가나다라마바사아자차카타파하',
          },
          {
            //iconUrl: iconTime,
            text: '시계 아이콘',
            message: '2 품절임박!',
          },
          {
            //iconUrl: iconBest,
            text: '엄지척 아이콘',
            message: '3 현재 999명이 보고 있어요',
          },
          {
            //iconUrl: iconShoppingback,
            text: '쇼핑백 아이콘',
            message: '4 방금 15건 구매되었어요',
          },
          {
            //iconUrl: iconShoppingback,
            text: '쇼핑백 아이콘',
            message: '5 100명의 장바구니에 담겨 있어요',
          },
        ];
        // 최초 메시지 로드시 더미 슬라이드 세팅
        if (this.rollingItem?.length === 0) {
          if (list.length <= 1) {
            this.swiperOption.autoplay = false;
          } else {
            this.swiperOption.autoplay = {
              delay: 2000, // 시간 설정
              disableOnInteraction: true, // 스와이프 후 자동 재생 여부
            };
          }
        }
        this.rollingItem = this.rollingItem.concat(list);
      },
    },
  },
  created() {},
  mounted() {},
  updated() {
    // data 변경에 따라 DOM이 업데이트 되었을 경우
    this.$nextTick(function () {
      // …
    });
  },
  destroyed() {},
  beforeDestroy() {},
  methods: {
    slideChangeTransitionEnd() {
      const swiper = this.$refs?.swiperComponent?.swiper || {};
      //console.log("slideChangeTransitionEnd", swiper.activeIndex, swiper.realIndex);
      if (!Array.isArray(this.rollingItem) || this.rollingItem.length <= 1) {
        // 1개 이하의 경우 자동슬라이드 멈춤
        swiper?.autoplay?.stop();
      } else if (
        this.swiperDummySlideRemoveLength < this.swiperDummySlideLength
      ) {
        // 더미 슬라이드 제거
        //console.log("slideChangeTransitionEnd", "더미 슬라이드 제거");
        this.swiperDummySlideRemoveLength += 1;
        swiper?.autoplay?.pause();
        swiper?.removeSlide(0);
        swiper?.update();
        swiper?.autoplay?.start();
      }
    },
    onImageError(event) {
      //console.log("onImageError", event);
      // 이미지 에러 대응
      event.target.src = '';
    },
  },
};
</script>
<style>
.banner {
  z-index: 1;
  overflow: hidden;
  position: absolute;
  bottom: 16px;
  left: 16px;
  height: 48px;
}
.swiperWrap .swiper-container {
  height: 48px;

  margin-left: auto;
  margin-right: auto;
  position: relative;
  overflow: hidden;
  list-style: none;
  padding: 0;
  z-index: 1;
}
.swiper-container-vertical > .swiper-wrapper {
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
}
.swiper-slide {
  -webkit-flex-shrink: 0;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  position: relative;
  -webkit-transition-property: -webkit-transform;
  transition-property: -webkit-transform;
  transition-property: transform;
  transition-property:
    transform,
    -webkit-transform;
}
</style>
