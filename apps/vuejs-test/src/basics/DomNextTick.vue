<template>
  <div v-for="item in list">
    <div v-bind:id="bindId(item)"></div>
  </div>
</template>

<script>
module.exports = {
  data: function () {
    return {
      list: [],
    };
  },
  created: function () {
    for (var i = 0; i < 100; i++) {
      this.list.push(i);
    }

    // nextTick 으로 감싼 뒤 callback 을 통해 DOM을 조작하게 되면
    // vue 데이터 갱신 후 UI까지 완료한 뒤에 nextTick에 있는 함수를 최종적으로 수행함
    this.$nextTick(function () {
      var dom = document.getElementById('item-0');
      dom.style.backgroundColor = 'red';
    });
  },
  methods: {
    bindId: function (item) {
      return 'item-' + item;
    },
  },
};
</script>
