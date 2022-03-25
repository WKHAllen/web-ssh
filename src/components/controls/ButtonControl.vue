<script setup lang="ts">
type ButtonControlType = "button" | "submit";
type ButtonStyleType = "primary" | "secondary" | "outline";

const props = defineProps<{
  type?: ButtonControlType;
  styleType?: ButtonStyleType;
}>();

defineEmits<{
  (e: "click"): void;
}>();
</script>

<template>
  <button
    :class="{
      'form-button': true,
      'form-button-secondary': props.styleType === 'secondary',
      'form-button-outline': props.styleType === 'outline',
    }"
    :type="type ?? 'button'"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<style scoped></style>
