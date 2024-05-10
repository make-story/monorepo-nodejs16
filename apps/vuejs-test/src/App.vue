<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <Test />
    <div v-if="toggleCheck">{{ toggleCheck }}</div>
    <button @click="setToggle">Toggle</button>
  </div>
</template>

<script>
import HelloWorld from '@/basics/components/HelloWorld.vue';
import Test from '@/test/index.vue';
import '@/basics/style/test.css';

export default {
  name: 'App',
  components: {
    HelloWorld,
    Test,
  },
  data() {
    return {
      isToggle: true,
    };
  },
  computed: {
    toggleCheck() {
      return this.isToggle;
    },
  },
  mounted() {},
  methods: {
    setToggle() {
      this.isToggle = !this.isToggle;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
