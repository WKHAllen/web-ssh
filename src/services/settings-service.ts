import LocalStorageService from "./local-storage-service";
import UtilService from "./util-service";

/**
 * The local storage key for app settings.
 */
const appSettingsKey = "AppSettings";

/**
 * App settings.
 */
export interface AppSettings {
  fontSize: number;
}

/**
 * The default app settings.
 */
const defaultSettings: AppSettings = {
  fontSize: 12,
};

/**
 * Access app settings.
 */
export default abstract class SettingsService {
  /**
   * Get all app settings.
   *
   * @returns All app settings.
   */
  public static getSettings(): AppSettings {
    const settings = LocalStorageService.getItem<AppSettings>(appSettingsKey);

    if (settings === null) {
      LocalStorageService.setItem(appSettingsKey, defaultSettings);
      return defaultSettings;
    } else {
      if (!UtilService.structureEqual(settings, defaultSettings)) {
        return UtilService.mergeObjects(settings, defaultSettings);
      } else {
        return settings;
      }
    }
  }

  /**
   * Get an option from settings.
   *
   * @param key The settings option key.
   * @returns The settings option value.
   */
  public static getSettingsOption<T extends keyof AppSettings>(
    key: T
  ): AppSettings[T] {
    const settings = this.getSettings();
    return settings[key];
  }

  /**
   * Set an option in settings.
   *
   * @param key The settings option key.
   * @param value The settings option value.
   */
  public static setSettingsOption<T extends keyof AppSettings>(
    key: T,
    value: AppSettings[T]
  ): void {
    const settings = this.getSettings();
    settings[key] = value;
    LocalStorageService.setItem(appSettingsKey, settings);
  }
}
