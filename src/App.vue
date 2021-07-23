<template>
  <Demo />
  <GrillePain
    :position="config.position"
    :order="config.order"
    :toasts-animation="config.animation"
    :theme="config.theme"
    :fadeAfter="config.fade"
  />
</template>

<script lang="ts" setup>
import Demo from "./components/Demo.vue";
import GrillePain from "./components/GrillePain.vue";
import useConfig from "./composition/useConfig";

const { config } = useConfig();
</script>

<style lang="scss">
@import "./assets/scss/variables.scss";

#app {
  font-family: $font;
  color: $font-color;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
</style>
