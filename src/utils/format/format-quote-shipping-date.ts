import moment from "moment";

export function formatQuoteShippingDate(quote: any) {
  console.log("formatQuoteShippingDate");
  if (!quote.shippingDate) return "Imediato";

  if (isSameOrBefore(quote.shippingDate, quote.createdAt)) {
    return "Imediato";
    // let d = quote.createdAt ?? new Date(quote.createdAt);
    // return quote.createdAt ? moment(d).format("DD/MM/YYYY") : "";
  } else {
    let d = quote.shippingDate ?? new Date(quote.shippingDate);
    return quote.shippingDate ? moment(d).format("DD/MM/YYYY") : "";
    //return quote.shippingDate ? moment(d).format("DD/MM/YYYY") : "";
  }
}

function isSameOrBefore(d1iso: string, d2iso: string) {
  // Import moment.js
  const moment = require("moment");

  // Define two dates
  const date1 = moment(d1iso);
  const date2 = moment(d2iso);

  // Normalize both dates to the start of the day
  const normalizedDate1 = date1.startOf("day");
  const normalizedDate2 = date2.startOf("day");

  // Compare the two dates
  if (normalizedDate1.isSame(normalizedDate2)) {
    return true;
  } else if (normalizedDate1.isBefore(normalizedDate2)) {
    return true;
  } else {
    return false;
  }
}
