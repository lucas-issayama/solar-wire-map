export default function isValidIE(ie: string): boolean {
  // Remove non-digit characters
  ie = ie.replace(/[^\d]+/g, "");

  // Basic length check (you can adjust this based on specific state rules)
  if (ie.length < 9 || ie.length > 14) return false;

  // Example: You could add specific checksum rules for each state here
  // For simplicity, we'll just return true if the length is valid
  return true;
}
