<template>
  <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
  <Weather />
  <!-- <div class="wdddd">wwwwwwwww</div> -->
  <!-- <h1>WWWWWWWWWWWWW</h1> -->
</template>

<script>
import { defineComponent } from "vue";
import Weather from "@/components/Weather.vue";

export default defineComponent({
  name: "App",
  components: {
    Weather,
  },
});
</script>



<style lang="scss">
@import "@/assets/scss/main.scss";

// .wdddd {
//   color: white;
// }

/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */

/* body {
  background: red;
} */

/* .www {
  color: green;
} */
</style>
