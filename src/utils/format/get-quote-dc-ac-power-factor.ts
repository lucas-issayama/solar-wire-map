import { Quote, QuoteKit, QuoteKitItem } from "@/types/quote";
import { getQuoteDcPowerModules } from "./get-quote-dc-power-modules";
import { getQuoteAcPowerInverter } from "./get-quote-ac-power-inverters";

export function getQuoteDcAcPowerFactor(quote: Quote) {
  return (
    (getQuoteDcPowerModules(quote) ?? 0) / (getQuoteAcPowerInverter(quote) ?? 1)
  );
}
