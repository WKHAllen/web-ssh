<script setup lang="ts">
import MenuControl from "./MenuControl.vue";
import type { NumberInputControlType } from "@/types/components.types";

const props = defineProps<{
  modelValue: number;
  label: string;
  type?: NumberInputControlType;
  required?: boolean;
  placeholder?: string;
  min?: number;
  max?: number;
  menu?: boolean;
}>();

defineEmits<{
  (e: "update:modelValue", value: number): void;
  (e: "onEnter"): void;
}>();

function validateKeyPress(event: KeyboardEvent): boolean {
  const value = (event.target as HTMLInputElement).value;

  if (props.type === "integer" && event.key === ".") return false;
  if (props.type === "decimal" && event.key === "." && value.includes("."))
    return false;

  if ("0123456789".includes(event.key)) {
    const newValue =
      value.slice(0, (event.target as HTMLInputElement).selectionStart ?? 0) +
      event.key +
      value.slice((event.target as HTMLInputElement).selectionStart ?? 0);
    if (value === "") return true;
    if (isNaN(Number(newValue))) return false;
    if (props.min !== undefined && Number(newValue) < props.min) return false;
    if (props.max !== undefined && Number(newValue) > props.max) return false;
    return true;
  } else if (
    event.key === "-" &&
    (props.min === undefined || props.min < 0) &&
    ((event.target as HTMLInputElement).selectionStart ?? -1) === 0
  ) {
    if (props.min !== undefined && -Number(value) < props.min) return false;
    if (props.max !== undefined && -Number(value) > props.max) return false;
    return true;
  } else {
    return event.key.length > 1 || event.altKey || event.ctrlKey;
  }
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
      <label :for="'number-input-' + label">{{ label }}</label>
      <MenuControl v-if="menu">
        <slot name="menu-items"></slot>
      </MenuControl>
    </span>
    <input
      class="form-control-inner"
      type="text"
      :id="'number-input-' + label"
      :value="modelValue"
      @input="$emit('update:modelValue', Number(($event.target as HTMLInputElement).value))"
      :required="required ?? 'false'"
      :placeholder="placeholder"
      autocomplete="off"
      @keydown="validateKeyPress($event) ? null : $event.preventDefault()"
      @keyup.enter="$emit('onEnter')"
    />
  </div>
</template>

<style scoped></style>
