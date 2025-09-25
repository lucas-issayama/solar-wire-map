import { Quote, QuoteKitItem } from "@/types/quote";
import { formatDateToSap } from "../../format/format-date-to-sap";
import { getDate } from "date-fns";
import getTotalKitItems from "../../quoteFunctions/getTotalKitItems";
import { e } from "mathjs";
import formatQuoteInvoiceObs from "../../format/format-quote-invoice-obs";
import dataSapNotaFiscaUsages from "../../data/dataSapNotaFiscalUsages";
import { formatCpf } from "../../format/format-cpf";
import { getQuoteWeight } from "../../format/get-quote-weight";
import { formatCNPJ } from "../../format/format-cnpj";
import { formatDocumentLineQuoteKitItem } from "../format-sap-document-line-quote-kit-item";
import { formatSapOrderTaxExtension } from "../format-sap-order-tax-extension";
import { getSapOrderIsFree } from "../get-sap-order-is-free";

export function formatSapOrderSingleItems(
  quote: Quote,
  TaxCode: string,
  PaymentGroupCode?: number,
  PaymentMethod?: string,
  Usage?: number
) {
  let contact: any =
    quote.billingEntity == "contact" ? quote.contact : quote.enterprise;

  let isFree = getSapOrderIsFree(Usage);
  let shippingType = quote.shippingType;
  //shippingType = "fob";
  let Incoterms = shippingType == "cif" ? "0" : "1";
  let ShippingMethod = shippingType == "cif" ? 1 : 2;
  let TransportationCode = shippingType == "cif" ? 1 : 2;

  let d = new Date();
  // d.setDate(d.getDate() - 1);
  let shipDate = new Date();
  shipDate.setDate(shipDate.getDate() + 7);

  let sapOrder: any = {
    method: "POST",
    url: "/b1s/v1/Orders",
    requestId: quote.id,
    NumAtCard: quote.id,
    U_UPP_IdIntegra: quote.id,
    DocType: "dDocument_Items",
    HandWritten: "tNO",
    Printed: "psNo",
    DocDate: formatDateToSap(d),
    DocDueDate: formatDateToSap(d), //***checar data de pagamento pelo pedido
    CardCode: contact?.sapCode,
    PaymentMethod,

    DocCurrency: "R$",
    DocRate: 1,
    //SalesPersonCode: -1,
    PaymentGroupCode: PaymentGroupCode ?? -2,
    SalesPersonCode: 1273,
    //TransportationCode: 1,
    TransportationCode,
    Confirmed: "tYES",
    TaxDate: formatDateToSap(d),
    ShipToCode: `Entrega_${quote.shippingAddress?.id}`,
    PayToCode: `Cobranca_${quote?.invoiceAddress?.id}`,
    DiscountPercent: 0,
    CreationDate: formatDateToSap(d),
    UpdateDate: formatDateToSap(d),
    UserSign: 1,
    NetProcedure: "tNO",
    // DocTotal: isFree ? 0 : (quote?.priceInCents ?? 0) / 100,
    // DocTotalSys: isFree ? 0 : (quote?.priceInCents ?? 0) / 100,
    NumberOfInstallments: 1,
    // BaseAmount: isFree ? 0 : quote.priceInCents / 100,
    // BaseAmountSC: isFree ? 0 : quote.priceInCents / 100,

    // BaseAmount: quote.priceInCents / 100,
    // BaseAmountSC: quote.priceInCents / 100,
    //  PayToCode: "FATURAMENTO",
    TotalDiscount: 0,
    ControlAccount: "1.1.02.01.01",
    BPLName: "07 - COR SOLAR",
    VATRegNum: "14.197.209/0010-92",
    BPL_IDAssignedToInvoice: 8,
    Document_ApprovalRequests: [],
    U_UPR_LocalEntrega: `Entrega_${quote.shippingAddress?.id}`,
    U_CS_ValorIntegracao: (quote.integratorServicesInCents ?? 0) / 100, // Repasse
    U_CS_PNVinculado: quote?.enterprise?.sapSupplierCode, //PN

    //OpeningRemarks: quote.invoiceObs,
    OpeningRemarks: formatQuoteInvoiceObs(quote),
    ClosingRemarks: ".",

    Comments: quote.obs,

    DocumentLines: quote.quoteKits?.[0]?.quoteKitItems
      ?.filter((el) => el.price?.product?.sapCode && el.quantity)
      .map((item: QuoteKitItem) =>
        formatDocumentLineQuoteKitItem(
          quote,
          item,
          shipDate,
          TaxCode,
          Incoterms,
          Usage ?? 69,
          ShippingMethod,
          isFree,
          true
        )
      ),
    U_UPR_TotalComissRS: quote?.integratorServicesInCents / 100,
  };

  sapOrder.TaxExtension = formatSapOrderTaxExtension(quote, Incoterms);

  // if (contact.cpf) {
  //   sapOrder.TaxExtension = {
  //     Incoterms,
  //     Carrier: Incoterms == "0" ? "F02910" : "F03552",
  //     TaxId1: contact.ie && contact.ie !== "" ? contact.ie : "Isento",
  //     TaxId4: formatCpf(contact.cpf),
  //     NetWeight: getQuoteWeight(quote),
  //   };
  // }

  // if (contact.cnpj) {
  //   sapOrder.TaxExtension = {
  //     Incoterms,
  //     Carrier: Incoterms == "0" ? "F02910" : "F03552",
  //     TaxId0: formatCNPJ(contact.cnpj),
  //     TaxId1: contact.ie && contact.ie !== "" ? contact.ie : "Isento",
  //     NetWeight: getQuoteWeight(quote),
  //   };
  // }

  return sapOrder;
}
