import moment from "moment";

export function formatDateToSap(d: Date) {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  //const date = new Date(Date.UTC(2024, 12, 30));
  // let d = value ?? new Date(value);
  // //  return value ? moment(d).format("DD/MM/YYYY") : "";
  // return value ? moment(d).format("DD/MM/YYYY") : "";

  const isoWithMillis = date.toISOString();
  // Remove the milliseconds to get "2024-12-30T00:00:00Z"
  return isoWithMillis.replace(".000", "");
}
