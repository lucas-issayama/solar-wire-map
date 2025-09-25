import { Quote } from "@/types/quote";
import { formatDateToSap } from "../../format/format-date-to-sap";
import { getDate } from "date-fns";
import formatQuoteInvoiceObs from "../../format/format-quote-invoice-obs";
import { formatCpf } from "../../format/format-cpf";
import { formatCNPJ } from "../../format/format-cnpj";
import formatKitDescription from "../../format/format-kit-description";
import { getQuoteWeight } from "../../format/get-quote-weight";
import { getQuoteKitsDcPower } from "../../format/get-quote-kits-dc-power";
import { getGefCodeFromDcPower } from "../../format/get-gef-code-from-dc-power";
import { formatSapOrderTaxExtension } from "../format-sap-order-tax-extension";
import { getSapOrderIsFree } from "../get-sap-order-is-free";
import { formatTextSefaz } from "../../format/format-text-sefaz";

export function formatSapOrderVendaOrdem(
  quote: Quote,
  TaxCode: string,
  PaymentGroupCode?: number,
  PaymentMethod?: string,
  Usage?: number,
  AltCatNum?: string | null
) {
  let contact: any = quote.enterprise;

  let d = new Date();
  let shipDate = new Date();
  shipDate.setDate(shipDate.getDate() + 7);

  let shippingType = quote.shippingType;
  //shippingType = "fob";
  let Incoterms = shippingType == "cif" ? "0" : "1";
  let ShippingMethod = shippingType == "cif" ? 1 : 2;
  let TransportationCode = shippingType == "cif" ? 1 : 2;
  let isFree = getSapOrderIsFree(Usage);
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
    // DocTotal: (quote?.priceInCents ?? 0) / 100,
    //DocTotalSys: (quote?.priceInCents ?? 0) / 100,
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

    NumberOfInstallments: 1,
    // BaseAmount: quote.priceInCents / 100,
    // BaseAmountSC: quote.priceInCents / 100,
    //PayToCode: "FATURAMENTO",
    TotalDiscount: 0,
    ControlAccount: "1.1.02.01.01",
    BPLName: "07 - COR SOLAR",
    VATRegNum: "14.197.209/0010-92",
    BPL_IDAssignedToInvoice: 8,
    Document_ApprovalRequests: [],
    //U_UPR_LocalEntrega: `Entrega_${quote.shippingAddress?.id}`,
    U_UPR_LocalEntrega: `Entrega_1`,
    U_CS_ValorIntegracao: (quote.integratorServicesInCents ?? 0) / 100, // Repasse
    U_CS_PNVinculado: quote?.enterprise?.sapSupplierCode, //PN
    //OpeningRemarks: quote.invoiceObs,
    OpeningRemarks: formatQuoteInvoiceObs(quote),
    ClosingRemarks: ".",
    Comments: quote.obs,
    //invoiceObs

    DocumentLines: [
      {
        //"OwnerCode": 55,
        OwnerCode: null,
        LineNum: 0,
        ItemCode:
          getGefCodeFromDcPower(getQuoteKitsDcPower(quote?.quoteKits)) ??
          "GEF000001",
        // ItemDescription: quote?.quoteKits?.[0]
        //   ? formatKitDescription(quote?.quoteKits?.[0])
        //   : "GERADOR FOTOVOLTAICO",
        ItemDescription: quote?.quoteKits?.[0]
          ? formatTextSefaz(formatKitDescription(quote?.quoteKits?.[0]))
          : "GERADOR FOTOVOLTAICO",
        Quantity: 1,
        ShipDate: formatDateToSap(shipDate),

        WarehouseCode: "20.07",
        SalesPersonCode: 1273,
        CommisionPercent: 1,
        CostingCode: "Solar",
        CostingCode2: "4201",
        Usage, //Buscar options
        TaxCode: TaxCode == "Auto" ? null : TaxCode,
        //ShippingMethod: 1,
        ShippingMethod,
        UnitsOfMeasurment: 1,
        U_UPP_Potencia: quote?.dcPower,
        TaxPercentagePerRow: 100,
        // CSTforIPI: "51",
        // CSTforPIS: "01",
        // CSTforCOFINS: "01",
        PriceSource: "dpsManual",
        // LineTotal: quote.priceInCents / 100,

        // GrossPrice: quote.priceInCents / 100,
        // GrossTotal: quote.priceInCents / 100,
        // GrossTotalSC: quote.priceInCents / 100,
        //   ShipToCode: `Entrega_${quote.shippingAddress?.id}`,
        ShipToCode: `Entrega_1`,
        Weight1: getQuoteWeight(quote),
        Weight1Unit: 3,

        FreeOfChargeBP: isFree ? "tYES" : "tNO",
        Price: quote.priceInCents / 100,
        //PriceAfterVAT: quote.priceInCents / 100,
        // LineTotal: isFree ? 0 : quote.priceInCents / 100,
        SupplierCatNum: AltCatNum ?? quote?.sapAltCatNum,
        U_UPP_ValorFrete: (quote?.priceShippingInCents ?? 0) / 100,
      },
    ],
    U_UPR_TotalComissRS: quote?.integratorServicesInCents / 100,
  };

  sapOrder.TaxExtension = formatSapOrderTaxExtension(quote, Incoterms);

  return sapOrder;
}
