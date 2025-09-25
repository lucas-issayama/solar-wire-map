import { Quote, QuoteKit, QuoteKitItem } from "@/types/quote";
import { getItemPriceRecalc } from "../sap/get-item-price-recalc";
import { taxesFactorKit } from "./taxes-factor-kit";
import getTaxesFactor from "./get-taxes-factor";

function updatePricesItemsRecalc(quote: Quote, priceRef: number) {
  let length = quote?.quoteKits?.[0]?.quoteKitItems?.length ?? 0;
  let total = 0;
  for (let i = 0; i < length; i++) {
    if (quote?.quoteKits?.[0]?.quoteKitItems?.[i]) {
      if (
        !quote?.quoteKits?.[0]?.quoteKitItems?.[i].deleted &&
        quote?.quoteKits?.[0]?.quoteKitItems?.[i].quantity > 0
      ) {
        let quoteKitItem: any = quote?.quoteKits?.[0]?.quoteKitItems?.[i];
        let itemPriceRaw = getItemPriceRecalc(quote, quoteKitItem, priceRef);
        let itemPrice;
        let itemRevenue;
        if (quoteKitItem.type == "module") {
          itemRevenue = itemPriceRaw * taxesFactorKit;
        } else {
          itemRevenue = itemPriceRaw * getTaxesFactor(quote);
        }

        quote.quoteKits[0].quoteKitItems[i].finalPriceInCents =
          Math.round(itemPriceRaw);
        quote.quoteKits[0].quoteKitItems[i].finalRevenueInCents =
          Math.round(itemRevenue);
      } else {
        quote.quoteKits[0].quoteKitItems[i].finalPriceInCents = 0;
        quote.quoteKits[0].quoteKitItems[i].finalRevenueInCents = 0;
      }
    }
  }

  return quote;
}

export default updatePricesItemsRecalc;
