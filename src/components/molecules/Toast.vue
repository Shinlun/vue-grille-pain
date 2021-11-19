<template>
  <div
    :class="{
      toast: true,
      'toast--info': type === GpToastType.INFO,
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
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @animationend="onAnimationEnd"
    @click="onClick"
    ref="toastElement"
  >
    <div
      v-if="title"
      :class="{
        toast__header: true,
        'toast__header--info': type === GpToastType.INFO,
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
      <div class="toast__message__text">
        {{ maxMessageLength && showMore ? truncatedMessage : message }}
      </div>
      <div class="toast__message__timer" v-if="displayTimer && fadeAfter > 0">
        <Timer
          :time="fadeAfter"
          :type="type || GpToastType.INFO"
          :stop="stopPieTimer"
        />
      </div>
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
import { GpAnimation, GpToastType, GpTheme } from "../../types/enums";
import Svg from "../atoms/Svg.vue";
import Timer from "../atoms/Timer.vue";
import Cross from "../atoms/icons/Cross.vue";
import useTimer from "../../composition/useTimer";
import useToggle from "../../composition/useToggle";

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
    displayTimer?: boolean;
    id: string;
  }>(),
  {
    message: "",
    type: GpToastType.INFO,
    animation: GpAnimation.SLIDE_UP,
    theme: GpTheme.LIGHT,
    fadeAfter: 5000,
    closeOnClick: false,
    displayTimer: false,
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

const { bool: stopPieTimer, toggle: toggleStopPieTimer } = useToggle(false);

const onMouseEnter = () => {
  toggleStopPieTimer();
  stopTimer();
};

const onMouseLeave = () => {
  toggleStopPieTimer();
  resetTimer();
};

const toastElement = ref();
const onAnimationEnd = (e: AnimationEvent) => {
  if (e.target !== toastElement.value) return;
  if (fadeAfter.value > 0 && timeup.value) {
    emit("clear", props.id);
  }

  animate.value = false;
};

const footerElement = ref();
const onClick = (e: MouseEvent) => {
  if (!clickable.value || e.target === footerElement.value) return;
  emit("clear", props.id);
};

const onClose = () => emit("clear", props.id);
</script>

<style lang="postcss" scoped>
@import "../../assets/css/variables.css";
@import "../../assets/css/animations.css";
.toast {
  border-radius: var(--radius);
  text-align: left;
  width: 100%;
  box-sizing: border-box;

  &--info {
    border-left: 5px solid var(--info-blue);
  }
  &--success {
    border-left: 5px solid var(--success-green);
  }
  &--warning {
    border-left: 5px solid var(--warning-yellow);
  }
  &--error {
    border-left: 5px solid var(--error-red);
  }
  &--clickable {
    cursor: pointer;
  }
  &--pop {
    animation: pop;
    animation-duration: var(--pop-duration);
    animation-timing-function: var(--pop-timing);
  }
  &--slide-right {
    animation: slideRight;
    animation-duration: var(--slide-duration);
    animation-timing-function: var(--slide-timing);
  }
  &--slide-left {
    animation: slideLeft;
    animation-duration: var(--slide-duration);
    animation-timing-function: var(--slide-timing);
  }
  &--slide-up {
    animation: slideUp;
    animation-duration: var(--slide-duration);
    animation-timing-function: var(--slide-timing);
  }
  &--slide-down {
    animation: slideDown;
    animation-duration: var(--slide-duration);
    animation-timing-function: var(--slide-timing);
  }
  &--hide {
    animation: fade;
    animation-duration: var(--fade-duration);
    animation-timing-function: var(--fade-timing);
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
    padding: var(--spacing3);
    border-bottom: 1px solid;
    overflow: hidden;
    text-overflow: ellipsis;

    &__title {
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &--info {
      color: var(--info-blue);
    }
    &--success {
      color: var(--success-green);
    }
    &--warning {
      color: var(--warning-yellow);
    }
    &--error {
      color: var(--error-red);
    }

    &--light {
      border-color: var(--light-grey);
    }
    &--dark {
      border-color: var(--dark-grey);
    }
  }

  &__message {
    padding: var(--spacing3);
    position: relative;

    &__text {
      position: relative;
      z-index: 2;
    }

    &__timer {
      position: absolute;
      bottom: var(--spacing3);
      right: var(--spacing3);
      opacity: 0.4;
    }
  }

  &__footer {
    display: flex;
    justify-content: center;
    font-size: 0.8em;
    border-top: 1px solid;
    cursor: pointer;
    padding: var(--spacing1);

    &--light {
      border-color: var(--light-grey);
    }
    &--dark {
      border-color: var(--dark-grey);
    }
  }

  &__close {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  &--light {
    color: var(--grey);
    background-color: var(--white);
    box-shadow: var(--shadow);
  }
  &--dark {
    color: var(--dark-text);
    background-color: var(--dark-bg);
    box-shadow: var(--dark-shadow);
  }
}
</style>
