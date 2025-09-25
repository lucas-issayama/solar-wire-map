// export function toSnakeCase(str: string) {
//   return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
// }

export function toSnakeCase(str: string) {
  // Replace uppercase letters with an underscore and lowercase letter
  let snakeCased = str?.replace(
    /[A-Z]/g,
    (letter) => `_${letter.toLowerCase()}`
  );
  // Replace hyphens with underscores
  return snakeCased?.replace(/-/g, "_");
}
