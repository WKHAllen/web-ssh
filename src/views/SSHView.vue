<script setup lang="ts">
import { ref } from "vue";
import TextInputControl from "@/components/controls/TextInputControl.vue";
import IconControl from "@/components/controls/IconControl.vue";
import * as settings from "@/services/settings";

const currentSSH = ref(settings.getSettingsOption("currentSSH"));

const stdin = ref("");
const stdout = ref([] as string[]);

function sendStdin(): void {
  // TODO: send
  stdout.value.push(stdin.value);
  stdin.value = "";
}
</script>

<template>
  <div class="ssh">
    <div class="ssh-stdout">
      <div v-for="(line, index) in stdout" :key="index" class="stdout-line">
        {{ line }}
      </div>
    </div>
    <div class="ssh-stdin">
      <TextInputControl
        label=""
        v-model="stdin"
        @on-enter="sendStdin()"
      ></TextInputControl>
      <button class="icon-button" type="button" @click="sendStdin()">
        <IconControl icon="paper-plane"></IconControl>
      </button>
    </div>
  </div>
</template>

<style scoped>
.ssh {
  display: flex;
  flex-direction: column;
}

.ssh-stdout {
  flex-grow: 1;
  padding: 12px;
  padding-bottom: 0;
  overflow-y: auto;
}

.ssh-stdin {
  flex-grow: 0;
  padding: 0 12px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.stdout-line {
}
</style>

<style>
main {
  max-height: 100vh;
}
</style>
