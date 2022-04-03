<script setup lang="ts">
import IconControl from "./IconControl.vue";
import type { IconType } from "@/types/components.types";

defineProps<{
  icon: string;
  iconType?: IconType;
  label: string;
}>();

const emit = defineEmits<{
  (e: "click"): void;
}>();
</script>

<template>
  <div class="form-menu-item" @click="emit('click')">
    <div class="form-menu-item-icon">
      <IconControl :icon="icon" :iconType="iconType"></IconControl>
    </div>
    <div class="form-menu-item-label">{{ label }}</div>
  </div>
</template>

<style scoped></style>
