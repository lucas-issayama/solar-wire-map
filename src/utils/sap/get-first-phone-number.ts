export function getFirstPhoneNumber(phoneText: string) {
  // Split by "/"
  const parts = phoneText.split("/");
  // Return the first part trimmed (remove leading/trailing spaces)
  return parts[0].trim()?.replace(/\D/g, "");
}
