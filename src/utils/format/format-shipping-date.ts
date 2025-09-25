import moment from "moment";

export function formatShippingDate(value: string) {
  if (!value) return "Imediato";

  let d = value ?? new Date(value);
  return value ? moment(d).format("DD/MM/YYYY") : "";
}
