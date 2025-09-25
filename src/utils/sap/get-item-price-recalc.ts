import { Quote, QuoteKitItem } from "@/types/quote";
import getTotalKitItems from "../quoteFunctions/getTotalKitItems";

export function getItemPriceRecalc(
  quote: Quote,
  quoteKitItem: QuoteKitItem,
  priceRef: number
) {
  let priceItems = quote.quoteKits?.reduce(
    (acc, cur: any) => acc + getTotalKitItems(cur.quoteKitItems),
    0
  );
  if (priceItems) {
    let factor = priceRef / priceItems;
    let priceTotalItem = quoteKitItem.priceInCents * quoteKitItem.quantity;
    return (priceTotalItem * factor) / quoteKitItem.quantity;
  }
  return 0;
}
