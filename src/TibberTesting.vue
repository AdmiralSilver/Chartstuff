<template>
<p> {{ msg }}</p>
</template>

<script>

// Only here for testing purposes
import { defineComponent } from 'vue'
export default defineComponent({
  name: "TibberTesting",
  props: {
    message: {
      type: String,
      default: "World",
    },
  },
  setup(props) {
    return {
      msg: props.message,
    };
  },
  methods: {
    sumOfTwoNumbers: function (a, b) {
      return a + b;
    },
  }
});
</script>

<style scoped>

</style>