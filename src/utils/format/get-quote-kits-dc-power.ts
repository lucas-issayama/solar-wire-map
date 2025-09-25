import { Quote, QuoteKit, QuoteKitItem } from "@/types/quote";

export function getQuoteKitsDcPower(quoteKits?: QuoteKit[]) {
  return (
    quoteKits?.reduce(
      (sum, item) => (sum += (item?.dcPower ?? 0) * item.quantity),
      0
    ) ?? 0
  );
}
