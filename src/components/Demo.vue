<template>
  <div class="container">
    <div class="form">
      <div class="form__section">
        <h2>Grille Pain</h2>
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
          <label>Ordering: </label>
          <select @input="updateOrder">
            <option
              :selected="config.order === GpOrder.ASC"
              :value="GpOrder.ASC"
            >
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
      </div>

      <div class="form__section">
        <h2>Toast</h2>
        <div class="form__row">
          <label>Notification type: </label>
          <select v-model="notifType">
            <option :value="GpToastType.INFO">Info</option>
            <option :value="GpToastType.SUCCESS">Success</option>
            <option :value="GpToastType.WARNING">Warning</option>
            <option :value="GpToastType.ERROR">Error</option>
          </select>
        </div>

        <div class="form__row">
          <label>Theme: </label>
          <select v-model="theme">
            <option :value="GpTheme.LIGHT">Light</option>
            <option :value="GpTheme.DARK">Dark</option>
          </select>
        </div>

        <div class="form__row">
          <label>Animation: </label>
          <select v-model="animation">
            <option :value="GpAnimation.POP">Pop</option>
            <option :value="GpAnimation.SLIDE_UP">Slide up</option>
            <option :value="GpAnimation.SLIDE_DOWN">Slide down</option>
            <option :value="GpAnimation.SLIDE_LEFT">Slide left</option>
            <option :value="GpAnimation.SLIDE_RIGHT">Slide right</option>
          </select>
        </div>

        <div class="form__row">
          <div class="form__checkbox">
            <label>Show title header: </label>
            <input type="checkbox" v-model="hasTitle" />
          </div>
          <div>
            <label :class="{ form__disabled: !hasTitle }">Title: </label>
            <input type="text" :disabled="!hasTitle" v-model="notifTitle" />
          </div>
        </div>

        <div class="form__row">
          <label>Text: </label>
          <textarea v-model="notifMessage"></textarea>
        </div>

        <div class="form__row">
          <div class="form__checkbox">
            <label>Truncate long text: </label>
            <input type="checkbox" v-model="truncate" />
          </div>
          <div>
            <label :class="{ form__disabled: !truncate }">
              Max message length:
            </label>
            <input
              type="number"
              :disabled="!truncate"
              v-model="maxMessageLength"
              min="0"
            />
          </div>
        </div>

        <div class="form__row">
          <div class="form__checkbox">
            <label>Fades: </label>
            <input type="checkbox" v-model="fade" />
          </div>
          <div>
            <label :class="{ form__disabled: !fade }"
              >Fades after (in seconds):
            </label>
            <input
              type="number"
              :disabled="!fade"
              v-model="fadeAfter"
              min="1"
              max="50"
            />
          </div>
        </div>

        <div class="form__row">
          <div class="form__checkbox">
            <label :class="{ form__disabled: !hasTitle && !fade }"
              >Close on click:
            </label>
            <input
              type="checkbox"
              v-model="closeOnClick"
              :checked="(!hasTitle && !fade) || closeOnClick"
              :disabled="!hasTitle && !fade"
            />
          </div>
          <div v-if="!hasTitle && !fade" class="form__explanation">
            If title header is not shown and toast never fades, it will be
            closable on click
          </div>
        </div>
      </div>

      <div class="form__emit">
        <button @click="emit">Emit notification</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  GpToastType,
  GpTheme,
  GpPosition,
  GpAnimation,
  GpOrder,
} from "../types/enums";
import useConfig from "../composition/useConfig";
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
import useGrillePain from "../composition/useGrillePain";

const notifType = ref(GpToastType.INFO);
const hasTitle = ref(true);
const animation = ref(GpAnimation.SLIDE_UP);
const theme = ref(GpTheme.LIGHT);
const fade = ref(true);
const fadeAfter = ref("5");
const closeOnClick = ref(false);
const truncate = ref(false);
const maxMessageLength = ref("100");

watch(notifType, () => {
  notifTitle.value = getTitle();
  notifMessage.value = getMessage();
});

const { toast } = useGrillePain();

const emit = () =>
  toast({
    title: hasTitle.value ? notifTitle.value : undefined,
    message: notifMessage.value,
    type: notifType.value,
    fadeAfter: fade.value ? parseInt(fadeAfter.value, 10) * 1000 : 0,
    animation: animation.value,
    theme: theme.value,
    closeOnClick: closeOnClick.value,
    maxMessageLength: truncate.value
      ? parseInt(maxMessageLength.value, 10)
      : undefined,
  });

const getTitle = () => {
  switch (notifType.value) {
    case GpToastType.INFO:
      return "Info";
    case GpToastType.SUCCESS:
      return "Success";
    case GpToastType.WARNING:
      return "Warning";
    case GpToastType.ERROR:
      return "Error";
    default:
      return "Notification";
  }
};

const getMessage = () => {
  switch (notifType.value) {
    case GpToastType.INFO:
      return "Info notification message";
    case GpToastType.SUCCESS:
      return "Success notification message";
    case GpToastType.WARNING:
      return "Warning notification message";
    case GpToastType.ERROR:
      return "Error notification message";
    default:
      return "Notification message";
  }
};

const notifTitle = ref(getTitle());
const notifMessage = ref(getMessage());

const { config, updateConfig } = useConfig();

const updatePosition = (e: Event) =>
  updateConfig({
    position: parseInt(
      (e.target as HTMLSelectElement).value || "0",
      10
    ) as GpPosition,
  });

const updateOrder = (e: Event) =>
  updateConfig({
    order: parseInt(
      (e.target as HTMLSelectElement).value || "0",
      10
    ) as GpOrder,
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

    &__section {
      border: 1px solid $grey1;
      padding: 10px;
      margin: 10px 0;

      .form__row:first-child {
        padding-top: 0;
      }
      .form__row:last-child {
        border-bottom: none;
        padding-bottom: 0;
      }
    }

    &__row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid $grey1;
    }

    &__checkbox {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
    }

    &__disabled {
      color: $dark-text;
    }

    &__explanation {
      flex: 0.5;
      font-style: italic;
      color: $dark-text;
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
    input[type="text"],
    input[type="number"] {
      width: 200px;
      height: 30px;
    }
    textarea {
      width: 200px;
    }
  }
}
</style>
