export function getOnlyPhone(phone: string) {
  return phone?.replace(/\D+/g, "")?.slice(2, 11);
}
