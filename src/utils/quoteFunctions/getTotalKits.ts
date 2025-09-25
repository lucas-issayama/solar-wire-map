import { Quote, QuoteKit, QuoteKitItem } from "@/types/quote";

export function getTotalKits(quoteKits: QuoteKit[]) {
  return (
    quoteKits
      ?.filter((el) => !el.deleted)
      .reduce(
        (sum, item) => (sum += (item?.priceInCents ?? 0) * item.quantity),
        0
      ) ?? 0
  );
}

export default getTotalKits;
