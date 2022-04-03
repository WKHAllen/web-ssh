<script setup lang="ts">
import type { IconType } from "@/types/components.types";

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
