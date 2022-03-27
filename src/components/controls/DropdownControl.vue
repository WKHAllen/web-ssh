<script setup lang="ts">
import { ref, watch, onUnmounted } from "vue";
import IconControl from "./IconControl.vue";
import PopupControl from "./PopupControl.vue";

const props = defineProps<{
  modelValue: string;
  label: string;
  options: string[];
  nullOption?: string;
  required?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: typeof props.options[0]): void;
}>();

const dropdownOpen = ref(false);
const dropdownButton = ref(null);
const dropdownOptionsRef = ref(null);

function clickEvent(event: MouseEvent): void {
  if (
    !(dropdownOptionsRef.value as unknown as HTMLElement).contains(
      event.target as HTMLElement
    )
  ) {
    dropdownOpen.value = false;
  }
}

onUnmounted(() => {
  if (dropdownOpen.value) {
    document.body.removeEventListener("click", clickEvent);
  }
});

watch(dropdownOpen, (isOpen) => {
  if (isOpen) {
    setTimeout(() => {
      document.body.addEventListener("click", clickEvent);
    }, 1);
  } else {
    document.body.removeEventListener("click", clickEvent);
  }
});

function selectItem(option: string): void {
  dropdownOpen.value = false;
  (dropdownButton.value as unknown as HTMLElement).focus();
  emit("update:modelValue", option);
}
</script>

<template>
  <div
    :class="{
      'form-control': true,
      'form-control-required': required ?? false,
    }"
  >
    <label :for="'dropdown-' + label">{{ label }}</label>
    <button
      class="form-control-dropdown"
      :id="'dropdown-' + label"
      @click="dropdownOpen = !dropdownOpen"
      :required="required ?? 'false'"
      ref="dropdownButton"
    >
      <span class="form-control-dropdown-selection">{{
        modelValue !== "" || nullOption === undefined ? modelValue : nullOption
      }}</span>
      <span
        :class="{
          'form-control-dropdown-icon': true,
          'form-control-dropdown-icon-open': dropdownOpen,
        }"
      >
        <IconControl icon="angle-down"></IconControl
      ></span>
    </button>
    <PopupControl
      :popup-open="dropdownOpen"
      :class="{
        'form-control-dropdown-popup': true,
        'form-control-dropdown-popup-hidden': !dropdownOpen,
      }"
    >
      <div
        class="form-control-dropdown-options-container"
        ref="dropdownOptionsRef"
      >
        <div
          v-if="nullOption !== undefined"
          class="form-control-dropdown-option"
          @click="selectItem('')"
        >
          {{ nullOption }}
        </div>
        <div
          v-for="option in options"
          :key="option"
          class="form-control-dropdown-option"
          @click="selectItem(option)"
        >
          {{ option }}
        </div>
      </div>
    </PopupControl>
  </div>
</template>

<style scoped></style>
