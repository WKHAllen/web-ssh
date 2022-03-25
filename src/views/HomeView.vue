<script setup lang="ts">
import { ref } from "vue";
import DialogComponent from "@/components/DialogComponent.vue";
import TextInputControl from "@/components/controls/TextInputControl.vue";
import NumberInputControl from "../components/controls/NumberInputControl.vue";
import * as connectionStorage from "@/services/connection-storage";

const connectionDialogOpen = ref(true);

const connectionProfiles = connectionStorage.getProfiles();

const selectedProfile = ref("");
const sshHost = ref("");
const sshPort = ref(22);
const sshUsername = ref("");
const sshPassword = ref("");
</script>

<template>
  <h1>Home title</h1>
  <p>Home paragraph</p>
  <button type="button" @click="connectionDialogOpen = true">
    Open dialog
  </button>
  <DialogComponent
    :dialog-open="connectionDialogOpen"
    size="small"
    @close-request="connectionDialogOpen = false"
  >
    <template #dialog-header>
      <h1>SSH Connection</h1>
    </template>
    <template #dialog-body>
      <div class="connection-control">
        <label for="profile-select">Select profile</label>
        <select v-model="selectedProfile" id="profile-select">
          <option value="">New profile</option>
          <option
            v-for="profileName in Object.keys(connectionProfiles)"
            :key="profileName"
            :value="connectionProfiles[profileName]"
          >
            {{ profileName }}
          </option>
        </select>
      </div>
      <TextInputControl
        label="Host"
        v-model="sshHost"
        :required="true"
      ></TextInputControl>
      <NumberInputControl
        label="Port"
        v-model="sshPort"
        type="integer"
        placeholder="default: 22"
        :min="1"
        :max="65535"
      ></NumberInputControl>
      <TextInputControl
        label="Username"
        v-model="sshUsername"
        :required="true"
      ></TextInputControl>
      <TextInputControl
        label="Password"
        type="password"
        v-model="sshPassword"
        :required="true"
      ></TextInputControl>
    </template>
    <template #dialog-actions>
      <button type="button" @click="connectionDialogOpen = false">
        Cancel
      </button>
      <button type="button" @click="() => {}">Connect</button>
    </template>
  </DialogComponent>
</template>

<style scoped>
.connection-control {
  width: 100%;
}

.connection-control * {
  width: 100%;
}
</style>
