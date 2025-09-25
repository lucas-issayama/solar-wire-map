import { Quote, QuoteKitItem } from "@/types/quote";
import getTotalKitItems from "../quoteFunctions/getTotalKitItems";

export function getSapItemPriceShipping(
  quote: Quote,
  quoteKitItem: QuoteKitItem
) {
  let priceItems = quote.quoteKits?.reduce(
    (acc, cur: any) =>
      acc +
      getTotalKitItems(
        cur.quoteKitItems?.filter(
          (item: any) => item.price?.product?.sapCode && !item.deleted
        )
      ),
    0
  );
  if (priceItems) {
    let factor = (quote?.priceShippingInCents ?? 0) / priceItems;
    let priceTotalItem = quoteKitItem.priceInCents * quoteKitItem.quantity;

    return priceTotalItem * factor;
  }
  return 0;
}
