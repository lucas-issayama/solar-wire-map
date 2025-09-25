import { Quote, QuoteKitItem } from "@/types/quote";
import getTotalKitItems from "../quoteFunctions/getTotalKitItems";
import getTotalCostKitItems from "../quoteFunctions/get-total-cost-kit-items";

export function getSapItemCost(quote: Quote, quoteKitItem: QuoteKitItem) {
  let costItems = quote.quoteKits?.reduce(
    (acc, cur: any) =>
      acc +
      getTotalCostKitItems(
        cur.quoteKitItems?.filter((item: any) => item.price?.product?.sapCode)
      ),
    0
  );
  if (costItems) {
    let factor = quote.priceInCents / costItems;
    let priceTotalItem = quoteKitItem.costInCents * quoteKitItem.quantity;
    // return Math.round((priceTotalItem * factor) / quoteKitItem.quantity);
    return (priceTotalItem * factor) / quoteKitItem.quantity;
  }
  return 0;
}
