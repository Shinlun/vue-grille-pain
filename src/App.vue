<template>
  <Demo />
  <GrillePain />
</template>

<script lang="ts" setup>
import Demo from "./components/Demo.vue";
import GrillePain from "./components/GrillePain.vue";
</script>

<style lang="scss">
@import "./assets/scss/variables.scss";

#app {
  height: 100vh;
  margin: 0;
  padding: 0;
  font-family: $font;
  color: $font-color;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
