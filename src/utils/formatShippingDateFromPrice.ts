import { formatDate } from "./format/format-date";

export default function formatShippingDateFromPrice(price: any) {
  return price?.priceList?.shippingDate
    ? formatDate(price?.priceList?.shippingDate)
    : "Imediata";
}
