<template>
  <div>
    <div v-if="toggleCheck">{{ toggleCheck }}</div>
    <button @click="setToggle">Toggle</button>
  </div>
</template>

<script>
export default {
  name: 'Toggle',
  components: {},
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

<style></style>
