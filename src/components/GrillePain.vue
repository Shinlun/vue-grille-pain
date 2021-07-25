<template>
  <div
    :class="{
      'grille-pain': true,
      'grille-pain--top-left': config.position === GpPosition.TOP_LEFT,
      'grille-pain--top': config.position === GpPosition.TOP,
      'grille-pain--top-right': config.position === GpPosition.TOP_RIGHT,
      'grille-pain--right': config.position === GpPosition.RIGHT,
      'grille-pain--bottom-right': config.position === GpPosition.BOTTOM_RIGHT,
      'grille-pain--bottom': config.position === GpPosition.BOTTOM,
      'grille-pain--bottom-left': config.position === GpPosition.BOTTOM_LEFT,
      'grille-pain--left': config.position === GpPosition.LEFT,
    }"
  >
    <div
      :class="{
        toasts: true,
        'toasts--reverse': config.order === GpOrder.ASC,
      }"
    >
      <Toast
        v-for="toast in notifications"
        :key="toast.id"
        :id="toast.id"
        :title="toast.title"
        :message="toast.message"
        :type="toast.type"
        :animation="
          typeof toast.animation !== 'undefined'
            ? toast.animation
            : config.animation
        "
        :theme="typeof toast.theme !== 'undefined' ? toast.theme : config.theme"
        :fade-after="
          typeof toast.fadeAfter !== 'undefined'
            ? toast.fadeAfter
            : config.fadeAfter
        "
        :close-on-click="
          typeof toast.closeOnClick !== 'undefined'
            ? toast.closeOnClick
            : config.closeOnClick
        "
        :max-message-length="
          typeof toast.maxMessageLength !== 'undefined'
            ? toast.maxMessageLength
            : config.maxMessageLength
        "
        @clear="clean"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { GpPosition, GpOrder } from "../types/enums";
import Toast from "./Toast.vue";
import useGrillePain from "../composition/useGrillePain";
import useConfig from "../composition/useConfig";

const { config } = useConfig();
const { notifications, clean } = useGrillePain();
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables.scss";
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
.grille-pain {
  font-family: $font;
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

    &:not(.toasts--reverse) {
      & > *:first-child {
        margin-top: 0;
      }

      & > *:last-child {
        margin-bottom: 0;
      }
    }

    &--reverse {
      flex-direction: column-reverse;
      & > *:first-child {
        margin-bottom: 0;
      }

      & > *:last-child {
        margin-top: 0;
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
