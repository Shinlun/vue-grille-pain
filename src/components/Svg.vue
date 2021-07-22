<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    viewBox="0 0 18 18"
    :aria-labelledby="iconName"
    role="presentation"
  >
    <title :id="iconName" lang="en">{{ iconName }} icon</title>
    <g :fill="iconColor">
      <slot />
    </g>
  </svg>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    width?: number;
    height?: number;
    iconName?: string;
    iconColor?: string;
  }>(),
  {
    width: 50,
    heigth: 50,
    iconName: "icon",
  }
);
</script>
