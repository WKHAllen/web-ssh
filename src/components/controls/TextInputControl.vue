<script setup lang="ts">
type InputControlType = "email" | "password" | "text" | "url";

defineProps<{
  modelValue: string;
  label: string;
  type?: InputControlType;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
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
    <label :for="'text-input-' + label">{{ label }}</label>
    <input
      class="form-control-inner text-input-control"
      :type="type ?? 'text'"
      :id="'text-input-' + label"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :required="required ?? 'false'"
      :minlength="minLength"
      :maxlength="maxLength"
      autocomplete="off"
    />
  </div>
</template>

<style scoped></style>
