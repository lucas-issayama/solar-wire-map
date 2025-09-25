import { Quote, QuoteKitItem } from "@/types/quote";
import getTotalKitItems from "../quoteFunctions/getTotalKitItems";

export function getItemPrice(quote: Quote, quoteKitItem: QuoteKitItem) {
  let priceItems = quote.quoteKits?.reduce(
    (acc, cur: any) => acc + getTotalKitItems(cur.quoteKitItems),
    0
  );
  if (priceItems) {
    let factor = quote.priceInCents / priceItems;
    let priceTotalItem = quoteKitItem.priceInCents * quoteKitItem.quantity;
    return (priceTotalItem * factor) / quoteKitItem.quantity;
  }
  return 0;
}
