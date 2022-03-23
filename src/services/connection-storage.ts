import * as localStorageService from "./local-storage";

/**
 * The local storage key for connection profiles.
 */
const connectionProfilesKey = "ConnectionProfiles";

/**
 * An SSH connection profile.
 */
export interface ConnectionProfile {
  host: string;
  port: number;
  username: string;
  password: string;
}

/**
 * All connection profiles as a mapping of names to profile info.
 */
export interface ConnectionProfiles {
  [connectionName: string]: ConnectionProfile;
}

/**
 * Get all SSH connection profiles.
 *
 * @returns All connection profiles.
 */
export function getProfiles(): ConnectionProfiles {
  const profiles = localStorageService.getItem<ConnectionProfiles>(
    connectionProfilesKey
  );

  if (profiles === null) {
    localStorageService.setItem(connectionProfilesKey, {});
    return {};
  } else {
    return profiles;
  }
}

/**
 * Add a new SSH connection profile.
 *
 * @param profileName The name of the new profile.
 * @param profileInfo The new profile info.
 */
export function addProfile(
  profileName: string,
  profileInfo: ConnectionProfile
): void {
  const profiles = getProfiles();
  profiles[profileName] = profileInfo;
  localStorageService.setItem(connectionProfilesKey, profiles);
}

/**
 * Remove an SSH connection profile.
 *
 * @param profileInfo The profile info to remove.
 */
export function removeProfile(profileName: string): void {
  const profiles = getProfiles();
  delete profiles[profileName];
  localStorageService.setItem(connectionProfilesKey, profiles);
}
