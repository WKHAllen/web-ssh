/**
 * A service to handle local storage access.
 */
export default class LocalStorageService {
  /**
   * Check if an item exists.
   *
   * @param key The item key.
   * @returns Whether the item exists.
   */
  public static itemExists(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }

  /**
   * Get an item.
   *
   * @param key The item key.
   * @returns The item value.
   */
  public static getItem<T>(key: string): T {
    return JSON.parse(localStorage.getItem(key) || "null");
  }

  /**
   * Set an item.
   *
   * @param key The item key.
   * @param value The item value.
   */
  public static setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Remove an item.
   *
   * @param key The item key.
   */
  public static removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
