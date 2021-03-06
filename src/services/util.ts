/**
 * Check if an object has a specified property.
 *
 * @param obj The object.
 * @param prop The object property.
 * @returns Whether the object has the specified property.
 */
export function hasProperty(obj: any, prop: string): boolean {
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
export function equal(a: any, b: any): boolean {
  if (typeof a !== typeof b) return false;

  if (typeof a === "object") {
    for (const prop in a) {
      if (hasProperty(a, prop)) {
        if (!hasProperty(b, prop)) return false;
        if (!equal(a[prop], b[prop])) return false;
      }
    }

    for (const prop in b) {
      if (hasProperty(b, prop)) {
        if (!hasProperty(a, prop)) return false;
        if (!equal(a[prop], b[prop])) return false;
      }
    }

    return true;
  } else {
    return a === b;
  }
}

/**
 * Compare the structures of two objects.
 *
 * @param a An object.
 * @param b Another object.
 * @returns Whether the structures of the two objects are equal.
 */
export function structureEqual(a: any, b: any): boolean {
  if (typeof a !== typeof b) return false;

  if (typeof a === "object") {
    for (const prop in a) {
      if (hasProperty(a, prop)) {
        if (!hasProperty(b, prop)) return false;
        if (!structureEqual(a[prop], b[prop])) return false;
      }
    }

    for (const prop in b) {
      if (hasProperty(b, prop)) {
        if (!hasProperty(a, prop)) return false;
        if (!structureEqual(a[prop], b[prop])) return false;
      }
    }
  }

  return true;
}

/**
 * Copy an object.
 *
 * @param obj An object.
 * @returns A deep copy of the object.
 */
export function copyObject<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Merge two objects.
 *
 * @param a An object.
 * @param b Another object.
 * @returns Object a, with object b's structure.
 */
export function mergeObjects<T>(a: any, b: T): T {
  if (typeof a !== typeof b) return b;

  if (typeof a === "object") {
    const merged = copyObject(b);

    for (const prop in b) {
      if (hasProperty(b, prop)) {
        if (hasProperty(a, prop)) {
          merged[prop] = a[prop];
        } else {
          merged[prop] = b[prop];
        }
      }
    }

    return merged;
  }

  return b;
}
