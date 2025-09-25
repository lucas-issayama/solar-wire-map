export function getDddFromPhone(phone: string) {
  return phone?.replace(/\D+/g, "")?.substring(0, 2);
}
