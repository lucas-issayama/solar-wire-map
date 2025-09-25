// export function toHyphenatedCase(str: string) {
//   return str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
// }

export function toHyphenatedCase(str: string) {
  // First, replace underscores with hyphens
  let hyphenated = str?.replace(/_/g, "-");

  // Then, convert any uppercase letters to lowercase with a preceding hyphen
  return hyphenated?.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}
