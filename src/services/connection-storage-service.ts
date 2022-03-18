import LocalStorageService from "./local-storage-service";
import UtilService from "./util-service";

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
 * A service to handle storage of SSH connections.
 */
export default abstract class ConnectionStorageService {
  /**
   * Get all SSH connection profiles.
   *
   * @returns All connection profiles.
   */
  public static getProfiles(): ConnectionProfile[] {
    const profiles = LocalStorageService.getItem<ConnectionProfile[]>(
      connectionProfilesKey
    );

    if (profiles === null) {
      LocalStorageService.setItem(connectionProfilesKey, []);
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
  public static addProfile(profileInfo: ConnectionProfile): void {
    const profiles = this.getProfiles();
    profiles.push(profileInfo);
    LocalStorageService.setItem(connectionProfilesKey, profiles);
  }

  /**
   * Remove an SSH connection profile.
   *
   * @param profileInfo The profile info to remove.
   */
  public static removeProfile(profileInfo: ConnectionProfile): void {
    let profiles = this.getProfiles();
    profiles = profiles.filter(
      (profile) => !UtilService.equal(profile, profileInfo)
    );
    LocalStorageService.setItem(connectionProfilesKey, profiles);
  }
}
