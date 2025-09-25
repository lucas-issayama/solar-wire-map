import { Quote } from "@/types/quote";
import { formatDateToSap } from "../../format/format-date-to-sap";
import { getDate } from "date-fns";
import formatQuoteInvoiceObs from "../../format/format-quote-invoice-obs";
import { formatCpf } from "../../format/format-cpf";
import { formatCNPJ } from "../../format/format-cnpj";
import formatKitDescription from "../../format/format-kit-description";
import dataSapNotaFiscaUsages from "../../data/dataSapNotaFiscalUsages";
import { formatTextSefaz } from "../../format/format-text-sefaz";
import { getQuoteWeight } from "../../format/get-quote-weight";
import { getQuoteKitsDcPower } from "../../format/get-quote-kits-dc-power";
import { getGefCodeFromDcPower } from "../../format/get-gef-code-from-dc-power";
import { formatSapOrderTaxExtension } from "../format-sap-order-tax-extension";
import { getSapOrderIsFree } from "../get-sap-order-is-free";

export function formatSapOrder(
  quote: Quote,
  TaxCode: string,
  PaymentGroupCode?: number,
  PaymentMethod?: string,
  Usage?: number,
  AltCatNum?: string | null
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
  let shipDate = new Date();
  shipDate.setDate(shipDate.getDate() + 7);

  //alert(quote?.dcPower);

  let sapOrder: any = {
    method: "POST",
    url: "/b1s/v1/Orders",
    //U_EmailEnvDanfe: "lucas.issayama@grupomelocordeiro.com.br",
    NumAtCard: quote.id,
    requestId: quote.id,
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
    TotalDiscount: 0,
    ControlAccount: "1.1.02.01.01",
    BPLName: "07 - COR SOLAR",
    VATRegNum: "14.197.209/0010-92",
    BPL_IDAssignedToInvoice: 8,
    Document_ApprovalRequests: [],
    U_UPR_LocalEntrega: `Entrega_${quote.shippingAddress?.id}`,
    U_CS_ValorIntegracao: (quote.integratorServicesInCents ?? 0) / 100, // Repasse
    U_CS_PNVinculado: quote?.enterprise?.sapSupplierCode, //PN
    OpeningRemarks: formatQuoteInvoiceObs(quote),
    ClosingRemarks: ".",
    Comments: quote.obs,
    //invoiceObs
    DocumentLines: [
      {
        Incoterms,
        ShippingMethod,
        OwnerCode: null,
        LineNum: 0,
        ItemCode:
          getGefCodeFromDcPower(getQuoteKitsDcPower(quote?.quoteKits)) ??
          "GEF000001",
        ItemDescription: quote?.quoteKits?.[0]
          ? formatTextSefaz(formatKitDescription(quote?.quoteKits?.[0]))
          : "GERADOR FOTOVOLTAICO",
        Quantity: 1,
        ShipDate: formatDateToSap(shipDate),
        WarehouseCode: "20.07",
        SalesPersonCode: -1,
        CommisionPercent: 1,
        CostingCode: "Solar",
        CostingCode2: "4201",
        Usage: Usage ?? 69, //Buscar options
        TaxCode: TaxCode == "Auto" ? null : TaxCode,
        UnitsOfMeasurment: 1,
        TaxPercentagePerRow: 100,
        PriceSource: "dpsManual",
        Weight1: getQuoteWeight(quote),
        Weight1Unit: 3,
        ShipToCode: `Entrega_${quote.shippingAddress?.id}`,
        U_UPP_Potencia: quote?.dcPower,
        //price
        // Price: isFree ? 0 : quote.priceInCents / 100,
        // PriceAfterVAT: isFree ? 0 : quote.priceInCents / 100,
        // LineTotal: isFree ? 0 : quote.priceInCents / 100,
        // GrossPrice: isFree ? 0 : quote.priceInCents / 100,
        // GrossTotal: isFree ? 0 : quote.priceInCents / 100,
        // GrossTotalSC: isFree ? 0 : quote.priceInCents / 100,

        // GrossPrice: quote.priceInCents / 100,
        // GrossTotal: quote.priceInCents / 100,
        // GrossTotalSC: quote.priceInCents / 100,
        FreeOfChargeBP: isFree ? "tYES" : "tNO",

        Price: quote.priceInCents / 100,

        SupplierCatNum: AltCatNum ?? quote?.sapAltCatNum,

        //priceShippingInCents
        U_UPP_ValorFrete: (quote?.priceShippingInCents ?? 0) / 100,

        // PriceAfterVAT: quote.priceInCents / 100,
        // LineTotal: isFree ? 0 : quote.priceInCents / 100,
      },
    ],
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
