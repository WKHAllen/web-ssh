import * as localStorageService from "./local-storage";
import * as utilService from "./util";

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
 * Get all SSH connection profiles.
 *
 * @returns All connection profiles.
 */
export function getProfiles(): ConnectionProfile[] {
  const profiles = localStorageService.getItem<ConnectionProfile[]>(
    connectionProfilesKey
  );

  if (profiles === null) {
    localStorageService.setItem(connectionProfilesKey, []);
    return [];
  } else {
    return profiles;
  }
}

/**
 * Add a new SSH connection profile.
 *
 * @param profileInfo The new profile info.
 */
export function addProfile(profileInfo: ConnectionProfile): void {
  const profiles = getProfiles();
  profiles.push(profileInfo);
  localStorageService.setItem(connectionProfilesKey, profiles);
}

/**
 * Remove an SSH connection profile.
 *
 * @param profileInfo The profile info to remove.
 */
export function removeProfile(profileInfo: ConnectionProfile): void {
  let profiles = getProfiles();
  profiles = profiles.filter(
    (profile) => !utilService.equal(profile, profileInfo)
  );
  localStorageService.setItem(connectionProfilesKey, profiles);
}
