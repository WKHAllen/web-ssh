<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="header">
    <RouterLink to="/">
      <h3 class="app-name green">Web SSH</h3>
    </RouterLink>
  </div>
</template>

<style scoped>
@import "@/assets/base.css";

.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: var(--padding);
  background-color: var(--color-background-mute);
}

.app-name {
  font-size: 1.25em;
}
</style>
