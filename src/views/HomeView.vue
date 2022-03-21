<script setup lang="ts">
import { ref } from "vue";
import DialogComponent from "../components/DialogComponent.vue";

const dialogOpen = ref(true);
</script>

<template>
  <h1>Home title</h1>
  <p>Home paragraph</p>
  <button type="button" @click="dialogOpen = true">Open dialog</button>
  <DialogComponent
    :dialog-open="dialogOpen"
    size="small"
    @close-request="dialogOpen = false"
  >
    <template #dialog-header>
      <h1>Dialog test</h1>
    </template>
    <template #dialog-body>
      <p>Just testing the dialog to ensure it works.</p>
    </template>
    <template #dialog-actions>
      <button type="button" @click="dialogOpen = false">Close</button>
    </template>
  </DialogComponent>
</template>
