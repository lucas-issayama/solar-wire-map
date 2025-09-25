import { Quote, QuoteKitItem } from "@/types/quote";

import getTotalKitItemsFinal from "../quoteFunctions/getTotalKitItemsFinal";

export function getItemPriceFinal(quote: Quote, quoteKitItem: QuoteKitItem) {
  let priceItems = quote.quoteKits?.reduce(
    (acc, cur: any) => acc + getTotalKitItemsFinal(cur.quoteKitItems),
    0
  );
  if (priceItems) {
    let factor = quote.priceInCents / priceItems;
    let priceTotalItem =
      (quoteKitItem.finalPriceInCents ?? 0) * quoteKitItem.quantity;
    return (priceTotalItem * factor) / quoteKitItem.quantity;
  }
  return 0;
}
