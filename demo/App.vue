<template>
  <h1>Modal</h1>
  <h2>Simple Usage</h2>
  <modal />
</template>

<script>
import Modal from "../src/Modal.vue";

export default {
  components: {
    Modal,
  },
  data() {
    return {

    };
  },
  methods: {

  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

html, body {
  font-size: 16px;
  background-color: #f5f5f5;
}

h1 {
  font-size: 2.5rem;
  text-align: center;
  font-weight: 500;
  margin: 0;
  padding: 1rem;
  background-color: #fff;
  border-bottom: 1px solid #e5e5e5;
}
</style>