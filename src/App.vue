<script setup lang="ts">
import { RouterView } from "vue-router";
import AppHeader from "./components/AppHeader.vue";
</script>

<template>
  <header>
    <AppHeader />
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style>
@import "@/assets/base.css";

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  flex-grow: 0;
}

main {
  flex-grow: 1;
  padding: var(--padding);
}
</style>
