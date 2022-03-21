import * as localStorageService from "./local-storage";
import * as utilService from "./util";

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
 * Get all app settings.
 *
 * @returns All app settings.
 */
export function getSettings(): AppSettings {
  const settings = localStorageService.getItem<AppSettings>(appSettingsKey);

  if (settings === null) {
    localStorageService.setItem(appSettingsKey, defaultSettings);
    return defaultSettings;
  } else {
    if (!utilService.structureEqual(settings, defaultSettings)) {
      return utilService.mergeObjects(settings, defaultSettings);
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
export function getSettingsOption<T extends keyof AppSettings>(
  key: T
): AppSettings[T] {
  const settings = getSettings();
  return settings[key];
}

/**
 * Set an option in settings.
 *
 * @param key The settings option key.
 * @param value The settings option value.
 */
export function setSettingsOption<T extends keyof AppSettings>(
  key: T,
  value: AppSettings[T]
): void {
  const settings = getSettings();
  settings[key] = value;
  localStorageService.setItem(appSettingsKey, settings);
}
