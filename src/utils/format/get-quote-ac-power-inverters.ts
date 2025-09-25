import { Quote, QuoteKit, QuoteKitItem } from "@/types/quote";

export function getQuoteAcPowerInverter(quote: Quote) {
  let quoteKit = quote?.quoteKits?.[0];
  if (quoteKit?.quoteKitItems) {
    return quoteKit.quoteKitItems
      ?.filter((el) => el.type == "inverter" && !el.deleted)
      ?.reduce((acc, curr) => {
        const quantity = curr?.quantity ?? 0;
        const acPower = curr?.price?.product?.acPower ?? 0;
        return acc + quantity * acPower;
      }, 0);
  }
  return 0;
}
