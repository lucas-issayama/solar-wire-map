import moment from "moment";

export function textToDate(value: string) {
  if (!value) return value;
  let d = new Date(value);
  d.setHours(d.getHours() + 3); //adjust time
  return d.toISOString();
}
