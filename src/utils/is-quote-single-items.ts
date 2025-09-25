import { Quote } from "@/types/quote";

export default function isQuoteSingleItems(quote: Quote) {
  return quote?.quoteKits?.[0]?.singleItems ? true : false;
}
