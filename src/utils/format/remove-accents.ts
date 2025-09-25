/**
 * Remove accents and diacritics from a string
 * @param str - The string to normalize
 * @returns The string without accents
 */
export function removeAccents(str: string): string {
  return str
    .normalize("NFD") // Decompose characters into base + accent
    .replace(/[\u0300-\u036f]/g, ""); // Remove accent marks
}