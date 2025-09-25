import { Quote, QuoteKit } from "@/types/quote";
import isQuoteSingleItems from "../is-quote-single-items";

function formatQuoteInvoiceObs(quote: Quote) {
  let deliveryAddress = `${quote.shippingAddress?.streetAddress}, ${
    quote.shippingAddress?.streetAddressNumber ?? ""
  }, ${quote.shippingAddress?.streetAddressLine2 ?? ""} , ${
    quote.shippingAddress?.neighborhood ?? ""
  }, ${quote.shippingAddress?.zipCode}, ${
    quote.shippingAddress?.city?.name
  } - ${quote.shippingAddress?.city?.stateShortName}`;
  return `${
    !isQuoteSingleItems(quote)
      ? `ISENTO ICMS CONFORME ART 30 INCISO IV ALINEA "a" DO ANEXO I DO RICMS/SP e CONVÊNIO 101/97  SUBST PELO CONVÊNIO 94/22 de  01/07/2022`
      : ""
  } (Obs.:${
    quote.invoiceObs ? quote.invoiceObs : ""
  }) Endereço de entrega: ${deliveryAddress}${
    quote?.shippingAddressInfo == "Normal"
      ? ""
      : `(${quote?.shippingAddressInfo})`
  }`;
}
//NCM 8501.72.10 EX 01
export default formatQuoteInvoiceObs;
