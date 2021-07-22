<template>
  <div
    :class="{
      toast: true,
      'toast--message': type === GpNotificationType.MESSAGE,
      'toast--success': type === GpNotificationType.SUCCESS,
      'toast--warning': type === GpNotificationType.WARNING,
      'toast--error': type === GpNotificationType.ERROR,
      [animationClass]: animate,
      'toast--hide': timeup,
      'toast--show': !timeup,
    }"
    @mouseenter="stopTimer"
    @mouseleave="resetTimer"
    @animationend="onAnimationEnd"
  >
    <div v-if="title" class="toast__header">
      {{ title }}
      <button class="toast__close" @click="onClose">
        <Svg :width="10" :height="10" iconName="close">
          <Cross />
        </Svg>
      </button>
    </div>
    <div class="toast__message">{{ message }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import { GpAnimation, GpNotificationType } from "../types/enums";
import Svg from "./Svg.vue";
import Cross from "./icons/Cross.vue";
import useTimer from '../composition/useTimer';

const props = withDefaults(
  defineProps<{
    title?: string;
    message?: string;
    type?: GpNotificationType;
    animation?: GpAnimation;
    id: string;
  }>(),
  {
    message: "Toast",
    type: GpNotificationType.MESSAGE,
    animation: GpAnimation.POP,
  }
);

const emit = defineEmits<{
  (e: "clear", id: string): void;
}>();

const animate = ref(true);

const { animation } = toRefs(props);
const animationClass = computed(() => {
  switch (animation.value) {
    case GpAnimation.POP:
      return "toast--pop";
    case GpAnimation.SLIDE_RIGHT:
      return "toast--slide-right";
    case GpAnimation.SLIDE_LEFT:
      return "toast--slide-left";
    case GpAnimation.SLIDE_UP:
      return "toast--slide-up";
    case GpAnimation.SLIDE_DOWN:
      return "toast--slide-down";
    default:
      return "toast--pop";
  }
});

const { timeup, stopTimer, resetTimer } = useTimer(5000);

const onAnimationEnd = (e: AnimationEvent) => {
  if (timeup.value) {
    emit("clear", props.id);
  }

  animate.value = false;
};

const onClose = () => emit("clear", props.id);
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables.scss";
@import "../assets/scss/mixins.scss";
.toast {
  border-radius: $radius;
  box-shadow: $shadow;
  text-align: left;
  width: 100%;
  background-color: $white;

  &--message {
    border-left: 5px solid $message-blue;
    color: $message-blue;
  }
  &--success {
    border-left: 5px solid $success-green;
    color: $success-green;
  }
  &--warning {
    border-left: 5px solid $warning-yellow;
    color: $warning-yellow;
  }
  &--error {
    border-left: 5px solid $error-red;
    color: $error-red;
  }
  &--pop {
    @include animate(pop, 0.2s);
  }
  &--slide-right {
    @include animate(slide-right, 0.1s);
  }
  &--slide-left {
    @include animate(slide-left, 0.1s);
  }
  &--slide-up {
    @include animate(slide-up, 0.1s);
  }
  &--slide-down {
    @include animate(slide-down, 0.1s);
  }
  &--hide {
    @include animate(fade, 1s);
  }
  &--show {
    opacity: 1;
  }

  &__header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    border-bottom: 1px solid $grey1;
    padding: 10px;
  }

  &__message {
    color: $grey;
    padding: 10px;
  }

  &__close {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
}
</style>
