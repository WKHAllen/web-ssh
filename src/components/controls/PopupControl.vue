<script setup lang="ts">
import { ref, watch, onUnmounted } from "vue";

const props = defineProps<{
  popupOpen: boolean;
}>();

const emit = defineEmits<{
  (e: "clickOff"): void;
}>();

const popupRef = ref(null);

function clickEvent(event: MouseEvent): void {
  if (
    !(popupRef.value as unknown as HTMLElement).contains(
      event.target as HTMLElement
    )
  ) {
    emit("clickOff");
  }
}

onUnmounted(() => {
  if (props.popupOpen) {
    document.body.removeEventListener("click", clickEvent);
  }
});

watch(
  () => props.popupOpen,
  (isOpen) => {
    if (isOpen) {
      setTimeout(() => {
        document.body.addEventListener("click", clickEvent);
      }, 1);
    } else {
      document.body.removeEventListener("click", clickEvent);
    }
  }
);
</script>

<template>
  <div
    :class="{ 'form-popup': true, 'form-popup-hidden': !popupOpen }"
    ref="popupRef"
  >
    <slot></slot>
  </div>
</template>

<style scoped></style>
