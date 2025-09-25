import { Quote, QuoteKit, QuoteKitItem } from "@/types/quote";
import isQuoteSingleItems from "../is-quote-single-items";
import { taxesFactorSingleItems } from "./taxes-factor-single-items";
import { taxesFactorKit } from "./taxes-factor-kit";

export function getTaxesFactor(quote: Quote) {
  //const taxesFactor = 1 - 0.0925; // Taxes 9.25%
  if (isQuoteSingleItems(quote)) {
    //return 1 - 0.0925 - 0.2725; // Taxes 9.25%
    return taxesFactorSingleItems;
  } else {
    return taxesFactorKit;
  }
}

export default getTaxesFactor;
