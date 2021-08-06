<template>
  <div
    :class="{
      timer: true,
      'timer--info': type === GpToastType.INFO,
      'timer--success': type === GpToastType.SUCCESS,
      'timer--warning': type === GpToastType.WARNING,
      'timer--error': type === GpToastType.ERROR,
      'timer--stop': !!stop,
    }"
    :style="{ animationDuration: `${time}ms` }"
  ></div>
</template>

<script lang="ts" setup>
import { GpToastType } from "../../types/enums";

defineProps<{
  time: number;
  type: GpToastType;
  stop?: boolean;
}>();
</script>

<style lang="postcss" scoped>
@import "../../assets/css/variables.css";
@import "../../assets/css/animations.css";

@keyframes reset {
}
.timer {
  width: 20px;
  height: 20px;
  border-radius: 50%;

  animation: fillDisc;
  animation-timing-function: linear;

  &--info {
    --timer-color: var(--info-blue);
  }
  &--success {
    --timer-color: var(--success-green);
  }
  &--warning {
    --timer-color: var(--warning-yellow);
  }
  &--error {
    --timer-color: var(--error-red);
  }

  &--stop {
    animation: reset;
    background-color: var(--timer-color);
  }
}
</style>
