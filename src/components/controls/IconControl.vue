<script setup lang="ts">
type IconType = "solid" | "regular";

defineProps<{
  type?: IconType;
  icon: string;
}>();
</script>

<template>
  <font-awesome-icon
    :icon="[type === 'regular' ? 'far' : 'fas', icon]"
  ></font-awesome-icon>
</template>

<style scoped></style>
