/**
 * A utility service.
 */
export default class UtilService {
  /**
   * Check if an object has a specified property.
   *
   * @param obj The object.
   * @param prop The object property.
   * @returns Whether the object has the specified property.
   */
  public static hasProperty(obj: any, prop: string): boolean {
    const proto = obj.__proto__ || obj.constructor.prototype;
    return prop in obj && (!(prop in proto) || proto[prop] !== obj[prop]);
  }

  /**
   * Compare two objects.
   *
   * @param a An object.
   * @param b Another object.
   * @returns Whether the objects are equal.
   */
  public static equal(a: any, b: any): boolean {
    if (typeof a !== typeof b) return false;

    if (typeof a === "object") {
      for (const prop in a) {
        if (this.hasProperty(a, prop)) {
          if (!this.hasProperty(b, prop)) return false;
          if (!this.equal(a[prop], b[prop])) return false;
        }
      }

      for (const prop in b) {
        if (this.hasProperty(b, prop)) {
          if (!this.hasProperty(a, prop)) return false;
          if (!this.equal(a[prop], b[prop])) return false;
        }
      }

      return true;
    } else {
      return a === b;
    }
  }
}
