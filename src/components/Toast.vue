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
      'toast--light': theme === GpTheme.LIGHT,
      'toast--dark': theme === GpTheme.DARK,
    }"
    @mouseenter="stopTimer"
    @mouseleave="resetTimer"
    @animationend="onAnimationEnd"
  >
    <div
      v-if="title"
      :class="{
        toast__header: true,
        'toast__header--message': type === GpNotificationType.MESSAGE,
        'toast__header--success': type === GpNotificationType.SUCCESS,
        'toast__header--warning': type === GpNotificationType.WARNING,
        'toast__header--error': type === GpNotificationType.ERROR,
        'toast__header--light': theme === GpTheme.LIGHT,
        'toast__header--dark': theme === GpTheme.DARK,
      }"
    >
      {{ title }}
      <button class="toast__close" @click="onClose">
        <Svg :width="10" :height="10" iconName="close" :iconColor="crossColor">
          <Cross />
        </Svg>
      </button>
    </div>
    <div
      :class="{
        toast__message: true,
        'toast__header--light': theme === GpTheme.LIGHT,
        'toast__header--dark': theme === GpTheme.DARK,
      }"
    >
      {{ message }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import { GpAnimation, GpNotificationType, GpTheme } from "../types/enums";
import Svg from "./Svg.vue";
import Cross from "./icons/Cross.vue";
import useTimer from "../composition/useTimer";

const props = withDefaults(
  defineProps<{
    title?: string;
    message?: string;
    type?: GpNotificationType;
    animation?: GpAnimation;
    theme?: GpTheme;
    fade?: number;
    id: string;
  }>(),
  {
    message: "Toast",
    type: GpNotificationType.MESSAGE,
    animation: GpAnimation.POP,
    theme: GpTheme.LIGHT,
    fade: 5000,
  }
);

const emit = defineEmits<{
  (e: "clear", id: string): void;
}>();

const animate = ref(true);

const { animation, theme, fade } = toRefs(props);
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

const { timeup, stopTimer, resetTimer } = useTimer(fade.value);

const crossColor = theme.value === GpTheme.LIGHT ? "" : "#fff";

const onAnimationEnd = (e: AnimationEvent) => {
  console.log("FADE VALUE: ", fade.value);
  console.log("TIMEUP VALUE: ", timeup.value);
  if (fade.value > 0 && timeup.value) {
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

  &--message {
    border-left: 5px solid $message-blue;
  }
  &--success {
    border-left: 5px solid $success-green;
  }
  &--warning {
    border-left: 5px solid $warning-yellow;
  }
  &--error {
    border-left: 5px solid $error-red;
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
    padding: 10px;
    border-bottom: 1px solid;

    &--message {
      color: $message-blue;
    }
    &--success {
      color: $success-green;
    }
    &--warning {
      color: $warning-yellow;
    }
    &--error {
      color: $error-red;
    }

    &--light {
      border-color: $grey1;
    }
    &--dark {
      border-color: $dark-grey;
    }
  }

  &__message {
    padding: 10px;
  }

  &__close {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  &--light {
    color: $grey;
    background-color: $white;
  }
  &--dark {
    color: $dark-text;
    background-color: $dark-bg;
  }
}
</style>
