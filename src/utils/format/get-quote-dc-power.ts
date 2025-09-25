import { Quote, QuoteKit, QuoteKitItem } from "@/types/quote";

export function getQuoteDcPower(quote: Quote) {
  let quoteKit = quote?.quoteKits?.[0];
  if (quoteKit) {
    return quoteKit.quoteKitItems?.reduce((acc, curr) => {
      const quantity = curr?.quantity ?? 0;
      const dcPower = curr?.price?.product?.dcPower ?? 0;
      return acc + quantity * dcPower;
    }, 0);
  }
}
