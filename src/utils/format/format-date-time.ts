import moment from "moment";

export function formatDateTime(value: string) {
  let d = value ?? new Date(value);
  return value ? moment(d).format("DD/MM/YYYY - HH:mm") : "";
}
