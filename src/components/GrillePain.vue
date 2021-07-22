<template>
  <div
    :class="{
      toaster: true,
      'toaster--top-left': position === GpPosition.TOP_LEFT,
      'toaster--top': position === GpPosition.TOP,
      'toaster--top-right': position === GpPosition.TOP_RIGHT,
      'toaster--right': position === GpPosition.RIGHT,
      'toaster--bottom-right': position === GpPosition.BOTTOM_RIGHT,
      'toaster--bottom': position === GpPosition.BOTTOM,
      'toaster--bottom-left': position === GpPosition.BOTTOM_LEFT,
      'toaster--left': position === GpPosition.LEFT,
    }"
  >
    <div
      :class="{
        toasts: true,
        'toasts--reverse': order === GpOrder.ASC,
      }"
    >
      <Toast
        v-for="toast in notifications"
        :key="toast.id"
        :id="toast.id"
        :title="toast.title"
        :message="toast.message"
        :type="toast.type"
        :animation="toastsAnimation"
        @clear="removeNotification"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { GpAnimation, GpPosition, GpOrder } from "../types/enums";
import Toast from "./Toast.vue";
import useNotifications from "../composition/useNotifications";

withDefaults(
  defineProps<{
    position?: GpPosition;
    toastsAnimation?: GpAnimation;
    order?: GpOrder;
  }>(),
  {
    position: GpPosition.BOTTOM_RIGHT,
    toastsAnimation: GpAnimation.POP,
    order: GpOrder.ASC,
  }
);

const { notifications, removeNotification } = useNotifications();
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables.scss";
.toaster {
  font: $font;
  position: fixed;
  padding: 10px;

  .toasts {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 250px;

    & > * {
      margin: 5px 0;
    }

    & > *:first-child {
      margin-top: 0;
      margin-bottom: 5px;
    }

    & > *:last-child {
      margin-top: 5px;
      margin-bottom: 0;
    }

    &--reverse {
      flex-direction: column-reverse;
      & > *:first-child {
        margin-top: 5px;
        margin-bottom: 0;
      }

      & > *:last-child {
        margin-top: 0;
        margin-bottom: 5px;
      }
    }
  }

  &--top-left {
    top: 0;
    left: 0;
  }
  &--top {
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
  }
  &--top-right {
    top: 0;
    left: 100%;
    transform: translate(-100%, 0);
  }
  &--right {
    top: 50%;
    left: 100%;
    transform: translate(-100%, -50%);
  }
  &--bottom-right {
    top: 100%;
    left: 100%;
    transform: translate(-100%, -100%);
  }
  &--bottom {
    top: 100%;
    left: 50%;
    transform: translate(-50%, -100%);
  }
  &--bottom-left {
    top: 100%;
    left: 0;
    transform: translate(0, -100%);
  }
  &--left {
    top: 50%;
    left: 0;
    transform: translate(0, -50%);
  }
}
</style>
