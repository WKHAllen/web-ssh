<script setup lang="ts">
import { ref, watch } from "vue";
import DialogComponent from "@/components/DialogComponent.vue";
import TextInputControl from "@/components/controls/TextInputControl.vue";
import NumberInputControl from "@/components/controls/NumberInputControl.vue";
import ButtonControl from "@/components/controls/ButtonControl.vue";
import DropdownControl from "@/components/controls/DropdownControl.vue";
import MenuItemControl from "@/components/controls/MenuItemControl.vue";
import ErrorControl from "@/components/controls/ErrorControl.vue";
import * as connectionStorage from "@/services/connection-storage";

const connectionDialogOpen = ref(true);
const saveNewProfileDialogOpen = ref(false);
const editProfileDialogOpen = ref(false);
const renameProfileDialogOpen = ref(false);
const deleteProfileDialogOpen = ref(false);

const connectionProfiles = ref(connectionStorage.getProfiles());

const selectedProfile = ref("");
const sshHost = ref("");
const sshPort = ref(22);
const sshUsername = ref("");
const sshPassword = ref("");

const connectionInfoError = ref("");

const newProfileName = ref("");
const newProfileError = ref("");

const updatedProfileName = ref("");
const updatedProfileError = ref("");

watch(selectedProfile, (newSelectedProfile) => {
  if (newSelectedProfile === "") {
    sshHost.value = "";
    sshPort.value = 22;
    sshUsername.value = "";
    sshPassword.value = "";
  } else {
    const profile = connectionProfiles.value[newSelectedProfile];

    if (profile) {
      sshHost.value = profile.host;
      sshPort.value = profile.port;
      sshUsername.value = profile.username;
      sshPassword.value = profile.password;
    }
  }
});

function validateConnectionInfo(): boolean {
  if (sshHost.value === "") {
    connectionInfoError.value = "SSH host is required";
    return false;
  } else if (sshPort.value < 0 || sshPort.value > 65535) {
    connectionInfoError.value = "SSH port must be between 1 and 65535";
    return false;
  } else if (sshUsername.value === "") {
    connectionInfoError.value = "SSH username is required";
    return false;
  }

  connectionInfoError.value = "";
  return true;
}

function sshConnect(): void {
  // TODO: perform SSH connection
}

function connectClicked(): void {
  if (validateConnectionInfo()) {
    if (selectedProfile.value === "") {
      saveNewProfileDialogOpen.value = true;
    } else {
      const profile = connectionProfiles.value[selectedProfile.value];

      if (profile) {
        if (
          sshHost.value !== profile.host ||
          sshPort.value !== profile.port ||
          sshUsername.value !== profile.username ||
          sshPassword.value !== profile.password
        ) {
          editProfileDialogOpen.value = true;
        } else {
          connectionDialogOpen.value = false;
          sshConnect();
        }
      }
    }
  }
}

function saveNewProfileClicked(): void {
  if (connectionProfiles.value[newProfileName.value] === undefined) {
    newProfileError.value = "";
    connectionStorage.addProfile(newProfileName.value, {
      host: sshHost.value,
      port: sshPort.value,
      username: sshUsername.value,
      password: sshPassword.value,
    });
    connectionProfiles.value = connectionStorage.getProfiles();
    saveNewProfileDialogOpen.value = false;
    connectionDialogOpen.value = false;
    sshConnect();
  } else {
    newProfileError.value =
      "A connection profile with this name already exists";
  }
}

function editProfileButtonClicked(): void {
  connectionStorage.editProfile(selectedProfile.value, {
    host: sshHost.value,
    port: sshPort.value,
    username: sshUsername.value,
    password: sshPassword.value,
  });
  connectionProfiles.value = connectionStorage.getProfiles();
  editProfileDialogOpen.value = false;
  connectionDialogOpen.value = false;
  sshConnect();
}

function renameSelectedProfile(): void {
  updatedProfileName.value = selectedProfile.value;
  renameProfileDialogOpen.value = true;
}

function deleteSelectedProfile(): void {
  deleteProfileDialogOpen.value = true;
}

function renameProfileClicked(): void {
  if (connectionProfiles.value[updatedProfileName.value] === undefined) {
    updatedProfileError.value = "";
    connectionStorage.renameProfile(
      selectedProfile.value,
      updatedProfileName.value
    );
    selectedProfile.value = updatedProfileName.value;
    connectionProfiles.value = connectionStorage.getProfiles();
    renameProfileDialogOpen.value = false;
    connectionDialogOpen.value = false;
    sshConnect();
  } else {
    updatedProfileError.value =
      "A connection profile with this name already exists";
  }
}

function deleteProfileClicked(): void {
  connectionStorage.removeProfile(selectedProfile.value);
  selectedProfile.value = "";
  connectionProfiles.value = connectionStorage.getProfiles();
  deleteProfileDialogOpen.value = false;
  connectionDialogOpen.value = false;
  sshConnect();
}
</script>

<template>
  <h1>Home title</h1>
  <p>Home paragraph</p>
  <ButtonControl type="button" @click="connectionDialogOpen = true"
    >Open dialog</ButtonControl
  >

  <DialogComponent
    :dialog-open="connectionDialogOpen"
    size="small"
    @close-request="connectionDialogOpen = false"
  >
    <template #dialog-header>
      <h1>SSH Connection</h1>
    </template>
    <template #dialog-body>
      <DropdownControl
        label="Select profile"
        v-model="selectedProfile"
        :options="Object.keys(connectionProfiles)"
        null-option="New profile"
        :menu="selectedProfile !== ''"
      >
        <template #menu-items>
          <MenuItemControl
            icon="pen-to-square"
            label="Rename"
            @click="renameSelectedProfile()"
          ></MenuItemControl>
          <MenuItemControl
            icon="trash"
            label="Delete"
            @click="deleteSelectedProfile()"
          ></MenuItemControl>
        </template>
      </DropdownControl>
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
      ></TextInputControl>
      <ErrorControl :message="connectionInfoError"></ErrorControl>
    </template>
    <template #dialog-actions>
      <ButtonControl
        @click="connectionDialogOpen = false"
        style-type="secondary"
        >Cancel</ButtonControl
      >
      <ButtonControl @click="connectClicked()">Connect</ButtonControl>
    </template>
  </DialogComponent>

  <DialogComponent
    :dialog-open="saveNewProfileDialogOpen"
    size="medium"
    @close-request="saveNewProfileDialogOpen = false"
  >
    <template #dialog-header>
      <h1>Save New Profile</h1>
    </template>
    <template #dialog-body>
      <p>
        Would you like to save this SSH configuration as a new profile? If so,
        enter a name for the new profile below.
      </p>
      <TextInputControl
        label="Profile name"
        v-model="newProfileName"
        :required="true"
      ></TextInputControl>
      <ErrorControl :message="newProfileError"></ErrorControl>
    </template>
    <template #dialog-actions>
      <ButtonControl
        @click="saveNewProfileDialogOpen = false"
        style-type="secondary"
        >Cancel</ButtonControl
      >
      <ButtonControl @click="saveNewProfileClicked()">Save</ButtonControl>
    </template>
  </DialogComponent>

  <DialogComponent
    :dialog-open="editProfileDialogOpen"
    size="medium"
    @close-request="editProfileDialogOpen = false"
  >
    <template #dialog-header>
      <h1>Edit Profile</h1>
    </template>
    <template #dialog-body>
      <p>
        The SSH configuration for this profile has changed. Would you like to
        save the new configuration to this profile?
      </p>
    </template>
    <template #dialog-actions>
      <ButtonControl
        @click="editProfileDialogOpen = false"
        style-type="secondary"
        >Cancel</ButtonControl
      >
      <ButtonControl @click="editProfileButtonClicked()">Save</ButtonControl>
    </template>
  </DialogComponent>

  <DialogComponent
    :dialog-open="renameProfileDialogOpen"
    size="medium"
    @close-request="renameProfileDialogOpen = false"
  >
    <template #dialog-header>
      <h1>Rename Profile</h1>
    </template>
    <template #dialog-body>
      <p>Type a new name for the SSH profile below.</p>
      <TextInputControl
        label="New profile name"
        v-model="updatedProfileName"
        :required="true"
      ></TextInputControl>
      <ErrorControl :message="updatedProfileError"></ErrorControl>
    </template>
    <template #dialog-actions>
      <ButtonControl
        @click="renameProfileDialogOpen = false"
        style-type="secondary"
        >Cancel</ButtonControl
      >
      <ButtonControl @click="renameProfileClicked()">Rename</ButtonControl>
    </template>
  </DialogComponent>

  <DialogComponent
    :dialog-open="deleteProfileDialogOpen"
    size="medium"
    @close-request="deleteProfileDialogOpen = false"
  >
    <template #dialog-header>
      <h1>Delete Profile</h1>
    </template>
    <template #dialog-body>
      <p>
        Are you sure you want to delete the "{{ selectedProfile }}" SSH
        connection profile?
      </p>
    </template>
    <template #dialog-actions>
      <ButtonControl
        @click="deleteProfileDialogOpen = false"
        style-type="secondary"
        >Cancel</ButtonControl
      >
      <ButtonControl @click="deleteProfileClicked()">Delete</ButtonControl>
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
