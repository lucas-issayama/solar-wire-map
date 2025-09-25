import { Quote, QuoteKit, QuoteKitItem } from "@/types/quote";

export function getTotalKitItems(quoteKitsItems: QuoteKitItem[]) {
  return (
    quoteKitsItems
      ?.filter((el) => !el.deleted)
      ?.reduce(
        (sum, item) => (sum += (item?.priceInCents ?? 0) * item.quantity),
        0
      ) ?? 0
  );
}

export default getTotalKitItems;
