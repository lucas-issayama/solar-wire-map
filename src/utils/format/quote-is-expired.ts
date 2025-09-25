import moment from "moment";
import { getExpirationDate } from "./get-expiration-date";

export function quoteIsExpired(value: string) {
  let expirationDate = getExpirationDate(value?.substring(0, 10));
  const today = moment().startOf("day"); // Ensure time is set to midnight
  const parsedTargetDate = moment(expirationDate, "YYYY-MM-DD").startOf("day");
  const differenceInDays = today.diff(parsedTargetDate, "days");
  return differenceInDays > 0;
}
