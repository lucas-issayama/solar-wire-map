import { Quote } from "@/types/quote";
import { formatDateToSap } from "../format/format-date-to-sap";
import { getDate } from "date-fns";
import formatQuoteInvoiceObs from "../format/format-quote-invoice-obs";
import { formatCpf } from "../format/format-cpf";
import { formatCNPJ } from "../format/format-cnpj";
import formatKitDescription from "../format/format-kit-description";
import dataSapNotaFiscaUsages from "../data/dataSapNotaFiscalUsages";
import { formatTextSefaz } from "../format/format-text-sefaz";
import { getQuoteWeight } from "../format/get-quote-weight";
import { getQuoteKitsDcPower } from "../format/get-quote-kits-dc-power";
import { getGefCodeFromDcPower } from "../format/get-gef-code-from-dc-power";

export function formatSapOrderTaxExtension(quote: Quote, Incoterms: string) {
  let contact: any =
    quote.billingEntity == "contact" ? quote.contact : quote.enterprise;
  // let shippingType = quote.shippingType;
  // let Incoterms = shippingType == "cif" ? "0" : "1";
  // let ShippingMethod = shippingType == "cif" ? 1 : 2;
  // let TransportationCode = shippingType == "cif" ? 1 : 2;

  let TaxExtension: any;

  if (contact.cpf) {
    TaxExtension = {
      Incoterms,
      Carrier: Incoterms == "0" ? "F02910" : "F03552",
      TaxId1: contact.ie && contact.ie !== "" ? contact.ie : "Isento",
      TaxId4: formatCpf(contact.cpf),
      NetWeight: getQuoteWeight(quote),
    };
  }

  if (contact.cnpj) {
    TaxExtension = {
      Incoterms,
      Carrier: Incoterms == "0" ? "F02910" : "F03552",
      TaxId0: formatCNPJ(contact.cnpj),
      TaxId1: contact.ie && contact.ie !== "" ? contact.ie : "Isento",
      NetWeight: getQuoteWeight(quote),
    };
  }

  return TaxExtension;
}
