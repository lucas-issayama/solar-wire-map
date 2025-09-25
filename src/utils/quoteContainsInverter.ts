import { Quote, QuoteKit, QuoteKitItem } from "@/types/quote";
import quoteKitContainsInverter from "./quoteKitContainsInverter";

function quoteContainsInverter(quote: Quote) {
  let quoteKitUpdated: QuoteKit;
  if (!quote?.quoteKits) return false;

  for (let k = 0; k < quote?.quoteKits?.length; k++) {
    if (quoteKitContainsInverter(quote?.quoteKits[k])) {
      return true;
    }
  }
  return false;
}
export default quoteContainsInverter;
