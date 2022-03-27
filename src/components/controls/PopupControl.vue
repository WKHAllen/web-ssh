<script setup lang="ts">
defineProps<{
  popupOpen: boolean;
}>();
</script>

<template>
  <div :class="{ 'form-popup': true, 'form-popup-hidden': !popupOpen }">
    <slot></slot>
  </div>
</template>

<style scoped></style>
