<template>
  <button @click="emit">EMIT</button>
  <GrillePain
    :position="GpPosition.BOTTOM"
    :order="GpOrder.ASC"
    :toasts-animation="GpAnimation.SLIDE_UP"
  />
</template>

<script lang="ts" setup>
import GrillePain from "./components/GrillePain.vue";
import {
  GpNotificationType,
  GpPosition,
  GpAnimation,
  GpOrder,
} from "./types/enums";
import useNotifications from "./composition/useNotifications";

const { addNotification } = useNotifications();

const emit = () =>
  addNotification({
    title: "Test",
    message: "Message de ouf les gars",
    type: GpNotificationType.MESSAGE,
  });
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
