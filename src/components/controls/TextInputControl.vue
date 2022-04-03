<script setup lang="ts">
import MenuControl from "./MenuControl.vue";
import type { TextInputControlType } from "@/types/components.types";

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
      <MenuControl v-if="menu">
        <slot name="menu-items"></slot>
      </MenuControl>
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
