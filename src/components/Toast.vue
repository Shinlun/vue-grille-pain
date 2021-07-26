<template>
  <div
    :class="{
      toast: true,
      'toast--message': type === GpToastType.INFO,
      'toast--success': type === GpToastType.SUCCESS,
      'toast--warning': type === GpToastType.WARNING,
      'toast--error': type === GpToastType.ERROR,
      [animationClass]: animate,
      'toast--hide': timeup,
      'toast--show': !timeup,
      'toast--light': theme === GpTheme.LIGHT,
      'toast--dark': theme === GpTheme.DARK,
      'toast--clickable': clickable,
      ...customClasses,
    }"
    @mouseenter="stopTimer"
    @mouseleave="resetTimer"
    @animationend="onAnimationEnd"
    @click="onClick"
  >
    <div
      v-if="title"
      :class="{
        toast__header: true,
        'toast__header--message': type === GpToastType.INFO,
        'toast__header--success': type === GpToastType.SUCCESS,
        'toast__header--warning': type === GpToastType.WARNING,
        'toast__header--error': type === GpToastType.ERROR,
        'toast__header--light': theme === GpTheme.LIGHT,
        'toast__header--dark': theme === GpTheme.DARK,
      }"
    >
      <div class="toast__header__title">
        {{ title }}
      </div>
      <button v-if="!closeOnClick" class="toast__close" @click="onClose">
        <Svg :width="10" :height="10" iconName="close" :iconColor="crossColor">
          <Cross />
        </Svg>
      </button>
    </div>
    <div class="toast__message">
      {{ maxMessageLength && showMore ? truncatedMessage : message }}
    </div>
    <div
      v-if="
        typeof maxMessageLength === 'number' &&
          message.length > maxMessageLength
      "
      :class="{
        toast__footer: true,
        'toast__footer--open': showMore,
        'toast__footer--close': !showMore,
        'toast__footer--light': theme === GpTheme.LIGHT,
        'toast__footer--dark': theme === GpTheme.DARK,
      }"
      @click="toggleShowMore"
      ref="footerElement"
    >
      {{ showMore ? "▼" : "▲" }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import { GpAnimation, GpToastType, GpTheme } from "../types/enums";
import Svg from "./Svg.vue";
import Cross from "./icons/Cross.vue";
import useTimer from "../composition/useTimer";
import useToggle from "../composition/useToggle";

const props = withDefaults(
  defineProps<{
    title?: string;
    message?: string;
    type?: GpToastType;
    animation?: GpAnimation;
    theme?: GpTheme;
    fadeAfter?: number;
    closeOnClick?: boolean;
    maxMessageLength?: number;
    className?: string | string[];
    id: string;
  }>(),
  {
    message: "",
    type: GpToastType.INFO,
    animation: GpAnimation.SLIDE_UP,
    theme: GpTheme.LIGHT,
    fadeAfter: 5000,
    closeOnClick: false,
  }
);

const emit = defineEmits<{
  (e: "clear", id: string): void;
}>();

const animate = ref(true);

const {
  title,
  message,
  animation,
  theme,
  fadeAfter,
  closeOnClick,
  maxMessageLength,
  className,
} = toRefs(props);

const customClasses = computed(() => {
  if (!className) return;

  if (typeof className.value === "string") {
    return { [className.value]: true };
  }

  const classes: { [key: string]: boolean } = {};

  className.value?.map((name) => (classes[name] = true));

  return classes;
});

const clickable = computed(
  () => (!title?.value && fadeAfter.value === 0) || closeOnClick.value
);
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

const truncatedMessage = computed(() =>
  !!maxMessageLength?.value && message.value.length > maxMessageLength.value
    ? `${message.value.slice(0, maxMessageLength.value)}...`
    : message.value
);

const { bool: showMore, toggle: toggleShowMore } = useToggle(true);

const { timeup, stopTimer, resetTimer } = useTimer(fadeAfter.value);

const crossColor = computed(() =>
  theme.value === GpTheme.LIGHT ? "" : "#fff"
);

const onAnimationEnd = (e: AnimationEvent) => {
  if (fadeAfter.value > 0 && timeup.value) {
    emit("clear", props.id);
  }

  animate.value = false;
};

const footerElement = ref();
const onClick = (e: MouseEvent) => {
  if (!clickable || e.target === footerElement.value) return;
  emit("clear", props.id);
};

const onClose = () => emit("clear", props.id);
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables.scss";
@import "../assets/scss/mixins.scss";
.toast {
  border-radius: $radius;
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
  &--clickable {
    cursor: pointer;
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
    overflow: hidden;
    text-overflow: ellipsis;

    &__title {
      overflow: hidden;
      text-overflow: ellipsis;
    }

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

  &__footer {
    display: flex;
    justify-content: center;
    font-size: 0.8em;
    border-top: 1px solid;
    cursor: pointer;
    padding: 2px;

    &--light {
      border-color: $grey1;
    }
    &--dark {
      border-color: $dark-grey;
    }
  }

  &__close {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  &--light {
    color: $grey;
    background-color: $white;
    box-shadow: $shadow;
  }
  &--dark {
    color: $dark-text;
    background-color: $dark-bg;
    box-shadow: $dark-shadow;
  }
}
</style>
