import { Quote, QuoteKit, QuoteKitItem } from "@/types/quote";

export function getTotalKitItemsFinal(quoteKitsItems: QuoteKitItem[]) {
  return (
    quoteKitsItems
      ?.filter((el) => !el.deleted)
      ?.reduce(
        (sum, item) => (sum += (item?.finalPriceInCents ?? 0) * item.quantity),
        0
      ) ?? 0
  );
}

export default getTotalKitItemsFinal;
