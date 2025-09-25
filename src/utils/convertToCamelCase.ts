/**
 * Converts snake_case keys to camelCase recursively
 */
export function toCamelCase(str: string): string {
  return str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
}

/**
 * Recursively converts all snake_case keys in an object to camelCase
 */
export function convertToCamelCase(obj: any): any {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(convertToCamelCase);
  }

  if (typeof obj === 'object') {
    const converted: any = {};

    for (const [key, value] of Object.entries(obj)) {
      const camelKey = toCamelCase(key);
      converted[camelKey] = convertToCamelCase(value);
    }

    return converted;
  }

  return obj;
}