<script setup lang="ts">
import { ref } from "vue";
import IconControl from "./IconControl.vue";
import PopupControl from "./PopupControl.vue";

defineProps<{
  modelValue: string;
  label: string;
  options: string[];
  nullOption?: string;
  required?: boolean;
  menu?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const dropdownOpen = ref(false);
const dropdownButton = ref(null);
const dropdownOptionsRef = ref(null);

const menuOpen = ref(false);

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
    <span class="form-control-label">
      <label :for="'dropdown-' + label">{{ label }}</label>
      <button
        v-if="menu ?? false"
        class="icon-button"
        type="button"
        @click="menuOpen = !menuOpen"
      >
        <IconControl icon="ellipsis"></IconControl>
      </button>
      <PopupControl
        :popup-open="menuOpen"
        @click-off="menuOpen = false"
        class="form-menu"
      >
        <slot name="menu"></slot>
      </PopupControl>
    </span>
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
      @click-off="dropdownOpen = false"
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
