import formatKitDescription from "../format/format-kit-description";
import { formatTextSefaz } from "../format/format-text-sefaz";
import { getQuoteKitsDcPower } from "../format/get-quote-kits-dc-power";
import { getGefCodeFromDcPower } from "../format/get-gef-code-from-dc-power";

export function formatSapAlternateCatNum(quote: any) {
  let contact: any =
    quote.billingEntity == "contact" ? quote.contact : quote.enterprise;
  let sapRequest: any = {
    method: "POST",
    url: "/b1s/v1/AlternateCatNum",
    ItemCode:
      getGefCodeFromDcPower(getQuoteKitsDcPower(quote?.quoteKits)) ??
      "GEF000001",
    CardCode: contact?.sapCode,
    Substitute: `GEF_${quote.id}`,
    DisplayBPCatalogNumber: "tNO",
    IsDefault: "tYES",
    Description: formatTextSefaz(
      formatKitDescription(quote?.quoteKits[0]) ?? "GEF"
    ),
  };

  return sapRequest;
}
