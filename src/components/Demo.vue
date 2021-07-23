<template>
  <div class="container">
    <div class="form">
      <h2>Toasts</h2>
      <div class="form__row">
        <label>Theme: </label>
        <select @input="updateTheme">
          <option
            :selected="config.theme === GpTheme.LIGHT"
            :value="GpTheme.LIGHT"
            >Light</option
          >
          <option
            :selected="config.theme === GpTheme.DARK"
            :value="GpTheme.DARK"
            >Dark</option
          >
        </select>
      </div>

      <div class="form__row">
        <label>Position: </label>
        <select @input="updatePosition">
          <option
            :selected="config.position === GpPosition.TOP_LEFT"
            :value="GpPosition.TOP_LEFT"
            >Top Left</option
          >
          <option
            :selected="config.position === GpPosition.TOP"
            :value="GpPosition.TOP"
            >Top</option
          >
          <option
            :selected="config.position === GpPosition.TOP_RIGHT"
            :value="GpPosition.TOP_RIGHT"
            >Top Right</option
          >
          <option
            :selected="config.position === GpPosition.RIGHT"
            :value="GpPosition.RIGHT"
            >Right</option
          >
          <option
            :selected="config.position === GpPosition.BOTTOM_RIGHT"
            :value="GpPosition.BOTTOM_RIGHT"
            >Bottom Right</option
          >
          <option
            :selected="config.position === GpPosition.BOTTOM"
            :value="GpPosition.BOTTOM"
            >Bottom</option
          >
          <option
            :selected="config.position === GpPosition.BOTTOM_LEFT"
            :value="GpPosition.BOTTOM_LEFT"
            >Bottom Left</option
          >
          <option
            :selected="config.position === GpPosition.LEFT"
            :value="GpPosition.LEFT"
            >Left</option
          >
        </select>
      </div>

      <div class="form__row">
        <label>Animation: </label>
        <select @input="updateAnimation">
          <option
            :selected="config.animation === GpAnimation.POP"
            :value="GpAnimation.POP"
            >Pop</option
          >
          <option
            :selected="config.animation === GpAnimation.SLIDE_UP"
            :value="GpAnimation.SLIDE_UP"
            >Slide up</option
          >
          <option
            :selected="config.animation === GpAnimation.SLIDE_DOWN"
            :value="GpAnimation.SLIDE_DOWN"
            >Slide down</option
          >
          <option
            :selected="config.animation === GpAnimation.SLIDE_LEFT"
            :value="GpAnimation.SLIDE_LEFT"
            >Slide left</option
          >
          <option
            :selected="config.animation === GpAnimation.SLIDE_RIGHT"
            :value="GpAnimation.SLIDE_RIGHT"
            >Slide right</option
          >
        </select>
      </div>

      <div class="form__row">
        <label>Ordering: </label>
        <select @input="updateOrder">
          <option :selected="config.order === GpOrder.ASC" :value="GpOrder.ASC">
            Most recent on top
          </option>
          <option
            :selected="config.order === GpOrder.DESC"
            :value="GpOrder.DESC"
          >
            Oldest on top
          </option>
        </select>
      </div>

      <h2>Notification</h2>
      <div class="form__row">
        <label>Notification type: </label>
        <select v-model="notifType">
          <option :value="GpNotificationType.MESSAGE">Basic message</option>
          <option :value="GpNotificationType.SUCCESS">Success</option>
          <option :value="GpNotificationType.WARNING">Warning</option>
          <option :value="GpNotificationType.ERROR">Error</option>
        </select>
      </div>

      <div class="form__row">
        <label>Show title header: </label>
        <input type="checkbox" v-model="hasTitle" />
      </div>

      <div class="form__row">
        <label>Fades: </label>
        <input type="checkbox" v-model="fade" @input="updateFade" />
      </div>
      <div v-if="fade" class="form__row">
        <label>Fades after (in seconds): </label>
        <input
          type="number"
          :value="config.fade / 1000 || 5"
          min="1"
          max="50"
          @input="updateFadeTiming"
        />
      </div>

      <div class="form__emit">
        <button @click="emit">Emit notification</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  GpNotificationType,
  GpTheme,
  GpPosition,
  GpAnimation,
  GpOrder,
} from "../types/enums";
import useNotifications from "../composition/useNotifications";
import useConfig from "../composition/useConfig";
import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";

const { addNotification } = useNotifications();

const emit = () =>
  addNotification({
    title: title.value,
    message: message.value,
    type: notifType.value,
  });

const notifType = ref(GpNotificationType.MESSAGE);
const hasTitle = ref(true);
const fade = ref(true);
const title = computed(() => {
  if (!hasTitle.value) {
    return;
  }

  switch (notifType.value) {
    case GpNotificationType.MESSAGE:
      return "Message";
    case GpNotificationType.SUCCESS:
      return "Success";
    case GpNotificationType.WARNING:
      return "Warning";
    case GpNotificationType.ERROR:
      return "Error";
    default:
      return "Notification";
  }
});
const message = computed(() => {
  switch (notifType.value) {
    case GpNotificationType.MESSAGE:
      return "Basic notification message";
    case GpNotificationType.SUCCESS:
      return "Success notification message";
    case GpNotificationType.WARNING:
      return "Warning notification message";
    case GpNotificationType.ERROR:
      return "Error notification message";
    default:
      return "Notification message";
  }
});

const { config, updateConfig } = useConfig();

const updateTheme = (e: Event) =>
  updateConfig({
    ...config.value,
    theme: parseInt(
      (e.target as HTMLSelectElement).value || "0",
      10
    ) as GpTheme,
  });

const updatePosition = (e: Event) =>
  updateConfig({
    ...config.value,
    position: parseInt(
      (e.target as HTMLSelectElement).value || "0",
      10
    ) as GpPosition,
  });

const updateAnimation = (e: Event) => {
  console.log((e.target as HTMLSelectElement).value);
  updateConfig({
    ...config.value,
    animation: parseInt(
      (e.target as HTMLSelectElement).value || "0",
      10
    ) as GpAnimation,
  });
};

const updateOrder = (e: Event) =>
  updateConfig({
    ...config.value,
    order: parseInt(
      (e.target as HTMLSelectElement).value || "0",
      10
    ) as GpOrder,
  });

const updateFade = (e: Event) =>
  updateConfig({
    ...config.value,
    fade: (e.target as HTMLInputElement).checked ? 5000 : 0,
  });
const updateFadeTiming = (e: Event) =>
  updateConfig({
    ...config.value,
    fade: parseInt((e.target as HTMLInputElement).value || "5", 10) * 1000,
  });
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables.scss";
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: left;
  width: 600px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .form {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 1px solid $grey1;
    padding: 20px;
    border-radius: $radius;
    box-shadow: $shadow;

    &__row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin: 10px 0;
    }

    &__emit {
      display: flex;
      justify-content: center;
      margin-top: 20px;

      button {
        width: 120px;
        height: 50px;
        box-shadow: $shadow;
      }
    }

    label {
      display: flex;
      align-items: flex-end;
    }

    select,
    input[type="number"] {
      width: 200px;
      height: 30px;
    }
  }
}
</style>
