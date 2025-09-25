import { Quote, QuoteKit, QuoteKitItem } from "@/types/quote";

export function getQuoteDcPowerModules(quote: Quote) {
  let quoteKit = quote?.quoteKits?.[0];
  if (quoteKit) {
    return quoteKit.quoteKitItems
      ?.filter((el) => el.type == "module" && !el.deleted)
      ?.reduce((acc, curr) => {
        const quantity = curr?.quantity ?? 0;
        const dcPower = curr?.price?.product?.dcPower ?? 0;
        return acc + quantity * dcPower;
      }, 0);
  }
}
