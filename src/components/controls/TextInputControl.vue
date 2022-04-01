<script setup lang="ts">
import { ref } from "vue";
import IconControl from "./IconControl.vue";
import PopupControl from "./PopupControl.vue";

type TextInputControlType = "email" | "password" | "text" | "url";

defineProps<{
  modelValue: string;
  label: string;
  type?: TextInputControlType;
  required?: boolean;
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  menu?: boolean;
}>();

defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const menuOpen = ref(false);
</script>

<template>
  <div
    :class="{
      'form-control': true,
      'form-control-required': required ?? false,
    }"
  >
    <span class="form-control-label">
      <label :for="'text-input-' + label">{{ label }}</label>
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
    <input
      class="form-control-inner"
      :type="type ?? 'text'"
      :id="'text-input-' + label"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :required="required ?? 'false'"
      :placeholder="placeholder"
      :minlength="minLength"
      :maxlength="maxLength"
      autocomplete="off"
    />
  </div>
</template>

<style scoped></style>
