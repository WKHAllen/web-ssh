<script setup lang="ts">
import { ref, watch } from "vue";

type DialogSize = "small" | "medium" | "large";

const props = defineProps<{
  dialogOpen: boolean;
  size?: DialogSize;
  closeButton?: boolean;
}>();

const emit = defineEmits<{
  (e: "closeRequest"): void;
}>();

const dialogContainerRef = ref(null);

function clickOutsideEvent(event: MouseEvent): void {
  if (event.target === dialogContainerRef.value) {
    emit("closeRequest");
  }
}

if (props.dialogOpen) {
  document.body.addEventListener("click", clickOutsideEvent);
}

watch(
  () => props.dialogOpen,
  (dialogOpen) => {
    if (dialogOpen) {
      document.body.addEventListener("click", clickOutsideEvent);
    } else {
      document.body.removeEventListener("click", clickOutsideEvent);
    }
  }
);
</script>

<template>
  <div
    :class="{
      'dialog-container': true,
      'dialog-container-hidden': !dialogOpen,
    }"
    ref="dialogContainerRef"
  >
    <div
      :class="{
        dialog: true,
        'dialog-small': size === 'small',
        'dialog-medium': size === 'medium' || !size,
        'dialog-large': size === 'large',
      }"
    >
      <div v-if="closeButton" class="dialog-header-actions">
        <button type="button" class="icon-button" @click="emit('closeRequest')">
          &times;
        </button>
      </div>
      <div class="dialog-header">
        <slot name="dialog-header"></slot>
      </div>
      <div class="dialog-body">
        <slot name="dialog-body"></slot>
      </div>
      <div class="dialog-actions">
        <slot name="dialog-actions"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dialog-container {
  visibility: visible;
  padding: var(--padding);
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
  transition: visibility 0s, opacity var(--dialog-animation-duration) linear,
    height calc(2 * var(--dialog-animation-duration));
}

.dialog-container.dialog-container-hidden {
  visibility: hidden;
  opacity: 0;
  height: 120%;
  transition: visibility var(--dialog-animation-duration),
    opacity var(--dialog-animation-duration) linear,
    height calc(2 * var(--dialog-animation-duration));
}

.dialog {
  padding: var(--padding);
  background-color: var(--color-background-soft);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  max-height: 100%;
  overflow: auto;
}

.dialog.dialog-small {
  width: clamp(250px, 25%, 500px);
}

.dialog.dialog-medium {
  width: clamp(250px, 50%, 800px);
}

.dialog.dialog-large {
  width: clamp(250px, 100%, 1200px);
}

.dialog-header-actions {
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
}

.dialog-header {
  text-align: center;
}

.dialog-body {
  margin: var(--padding) 0;
}

.dialog-actions {
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
}
</style>
