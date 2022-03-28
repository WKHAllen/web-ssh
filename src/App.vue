<script setup lang="ts">
import { RouterView } from "vue-router";
import HeaderComponent from "@/components/HeaderComponent.vue";
</script>

<template>
  <header>
    <HeaderComponent />
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style>
@import "@/assets/base.css";

#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  flex-grow: 0;
  box-shadow: var(--box-shadow);
}

main {
  flex-grow: 1;
  padding: var(--padding);
  overflow-y: scroll;
}
</style>
