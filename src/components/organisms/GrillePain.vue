<template>
  <div
    :class="{
      'grille-pain': true,
      'grille-pain--top': top,
      'grille-pain--right': right,
      'grille-pain--bottom': bottom,
      'grille-pain--left': left,
      'grille-pain--full-width': config.fullWidth,
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
        :display-timer="
          typeof toast.displayTimer !== 'undefined'
            ? toast.displayTimer
            : config.displayTimer
        "
        @clear="clean"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { GpPosition, GpOrder } from "../../types/enums";
import Toast from "../molecules/Toast.vue";
import useGrillePain from "../../composition/useGrillePain";
import useConfig from "../../composition/useConfig";
import { computed } from "@vue/runtime-core";

const { config } = useConfig();
const { notifications, clean } = useGrillePain();

const top = computed(() =>
  [GpPosition.TOP_LEFT, GpPosition.TOP, GpPosition.TOP_RIGHT].includes(
    config.value.position
  )
);
const right = computed(() =>
  [GpPosition.TOP_RIGHT, GpPosition.RIGHT, GpPosition.BOTTOM_RIGHT].includes(
    config.value.position
  )
);
const bottom = computed(() =>
  [GpPosition.BOTTOM_LEFT, GpPosition.BOTTOM, GpPosition.BOTTOM_RIGHT].includes(
    config.value.position
  )
);
const left = computed(() =>
  [GpPosition.TOP_LEFT, GpPosition.LEFT, GpPosition.BOTTOM_LEFT].includes(
    config.value.position
  )
);
</script>

<style lang="postcss" scoped>
@import "../../assets/css/variables.css";
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

.grille-pain {
  font-family: var(--font);
  position: fixed;
  padding: var(--spacing3);

  .toasts {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    & > * {
      margin: var(--spacing2) 0;
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

  &--top {
    top: 0;
  }
  &--right {
    right: 0;
  }
  &--bottom {
    bottom: 0;
  }
  &--left {
    left: 0;
  }
  &--full-width {
    left: 0;
    right: 0;
  }

  &:not(.grille-pain--full-width) {
    width: 250px;

    &:not(.grille-pain--left):not(.grille-pain--right) {
      left: 50%;
      transform: translate(-50%, 0);
    }
  }
}
</style>
