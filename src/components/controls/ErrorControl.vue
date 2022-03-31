<script setup lang="ts">
defineProps<{
  message?: string;
}>();
</script>

<template>
  <small v-if="message && message !== ''" class="error">{{ message }}</small>
</template>

<style scoped>
.error {
  color: red;
}
</style>
