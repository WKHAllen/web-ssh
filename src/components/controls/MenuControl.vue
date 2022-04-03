<script setup lang="ts">
import { ref, watch } from "vue";
import IconControl from "./IconControl.vue";
import PopupControl from "./PopupControl.vue";
import type { IconType } from "@/types/components.types";

defineProps<{
  icon?: string;
  iconType?: IconType;
  popupClass?: string;
}>();

const emit = defineEmits<{
  (e: "opened"): void;
  (e: "closed"): void;
}>();

const menuOpen = ref(false);

watch(menuOpen, (newValue) => {
  if (newValue) {
    emit("opened");
  } else {
    emit("closed");
  }
});
</script>

<template>
  <button
    :class="{ 'icon-button': true, 'form-menu-button-open': menuOpen }"
    type="button"
    @click="menuOpen = !menuOpen"
  >
    <IconControl :icon="icon ?? 'ellipsis'" :type="iconType"></IconControl>
  </button>
  <PopupControl
    :popup-open="menuOpen"
    @click-off="menuOpen = false"
    :class="`form-menu-popup ${popupClass ?? ''}`"
  >
    <div class="form-menu-container">
      <div class="form-menu" @click="menuOpen = false">
        <slot></slot>
      </div>
    </div>
  </PopupControl>
</template>

<style scoped></style>
