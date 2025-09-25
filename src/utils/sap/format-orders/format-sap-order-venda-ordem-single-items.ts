import { Quote, QuoteKitItem } from "@/types/quote";
import { formatDateToSap } from "../../format/format-date-to-sap";
import { getDate } from "date-fns";
import formatQuoteInvoiceObs from "../../format/format-quote-invoice-obs";
import { formatCpf } from "../../format/format-cpf";
import { formatCNPJ } from "../../format/format-cnpj";
import { getQuoteWeight } from "../../format/get-quote-weight";

import getTotalKitItems from "../../quoteFunctions/getTotalKitItems";
import { formatDocumentLineQuoteKitItem } from "../format-sap-document-line-quote-kit-item";
import { formatSapOrderTaxExtension } from "../format-sap-order-tax-extension";
import dataSapNotaFiscaUsages from "../../data/dataSapNotaFiscalUsages";

export function formatSapOrderVendaOrdemSingleItems(
  quote: Quote,
  TaxCode: string,
  PaymentGroupCode?: number,
  PaymentMethod?: string,
  Usage?: number
) {
  let contact: any = quote.enterprise;
  let d = new Date();
  let shipDate = new Date();
  shipDate.setDate(shipDate.getDate() + 7);
  let isFree = Usage == 90;
  let sapUsage = dataSapNotaFiscaUsages.find((el) => el.id == Usage);
  if (sapUsage) {
    isFree = sapUsage.Usage.includes("Rem");
  }

  let shippingType = quote.shippingType;
  //shippingType = "fob";
  let Incoterms = shippingType == "cif" ? "0" : "1";
  let ShippingMethod = shippingType == "cif" ? 1 : 2;
  let TransportationCode = shippingType == "cif" ? 1 : 2;

  let sapOrder: any = {
    method: "POST",
    url: "/b1s/v1/Orders",
    requestId: quote.id,
    CardCode: contact?.sapCode,
    U_UPP_IdIntegra: quote.id,
    NumAtCard: quote.id,
    DocType: "dDocument_Items",
    HandWritten: "tNO",
    Printed: "psNo",
    DocDate: formatDateToSap(d),
    DocDueDate: formatDateToSap(d), //***checar data de pagamento pelo pedido
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
    // ShipToCode: `Entrega_${quote.shippingAddress?.id}`,
    // PayToCode: `Cobranca_${quote?.invoiceAddress?.id}`,
    ShipToCode: `Entrega_1`,
    PayToCode: `Cobranca_1`,
    DiscountPercent: 0,
    CreationDate: formatDateToSap(d),
    UpdateDate: formatDateToSap(d),
    UserSign: 1,
    NetProcedure: "tNO",
    // DocTotal: (quote?.priceInCents ?? 0) / 100,
    // DocTotalSys: (quote?.priceInCents ?? 0) / 100,
    NumberOfInstallments: 1,
    // BaseAmount: quote.priceInCents / 100,
    // BaseAmountSC: quote.priceInCents / 100,
    TotalDiscount: 0,
    ControlAccount: "1.1.02.01.01",
    BPLName: "07 - COR SOLAR",
    VATRegNum: "14.197.209/0010-92",
    BPL_IDAssignedToInvoice: 8,
    Document_ApprovalRequests: [],
    U_UPR_LocalEntrega: `Entrega_1`,
    U_CS_ValorIntegracao: (quote.integratorServicesInCents ?? 0) / 100, // Repasse
    U_CS_PNVinculado: quote?.enterprise?.sapSupplierCode, //PN
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
          true,
          `Entrega_1`
        )
      ),

    U_UPR_TotalComissRS: quote?.integratorServicesInCents / 100,
  };

  sapOrder.TaxExtension = formatSapOrderTaxExtension(quote, Incoterms);

  return sapOrder;
}
