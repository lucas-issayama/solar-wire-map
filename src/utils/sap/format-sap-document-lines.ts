// import { Quote, QuoteKitItem } from "@/types/quote";
// import { formatDateToSap } from "../format/format-date-to-sap";
// import { getSapItemPrice } from "./get-sap-item-price";
// import { getGefCodeFromDcPower } from "../format/get-gef-code-from-dc-power";
// import { getQuoteKitsDcPower } from "../format/get-quote-kits-dc-power";
// import { formatTextSefaz } from "../format/format-text-sefaz";
// import formatKitDescription from "../format/format-kit-description";
// import { getQuoteWeight } from "../format/get-quote-weight";
// import { formatDocumentLineQuoteKitItem } from "./format-sap-document-line-quote-kit-item";

// function itemWeight(quoteKitItem: any) {
//   let quantity = quoteKitItem?.quantity ?? 0;
//   let weight = quoteKitItem?.price?.product?.weight ?? 0;

//   return quantity * weight;
// }

// export function formatDocumentLines(
//   quote: Quote,
//   shipDate: any,
//   TaxCode: string,
//   Incoterms: string,
//   Usage: number,
//   ShippingMethod: number,
//   isFree: boolean,
//   singleItems: boolean
// ) {
//   if(singleItems){
//     return quote.quoteKits?.[0]?.quoteKitItems
//     ?.filter((el) => el.price?.product?.sapCode)
//     .map((item: QuoteKitItem) =>
//       formatDocumentLineQuoteKitItem(
//         quote,
//         item,
//         shipDate,
//         TaxCode,
//         Incoterms,
//         Usage ?? 69,
//         ShippingMethod,
//         isFree,
//         true
//       )
//     ),
//   }

//   // else return [
//   //   {
//   //     Incoterms,
//   //     ShippingMethod,
//   //     OwnerCode: null,
//   //     LineNum: 0,
//   //     ItemCode:
//   //       getGefCodeFromDcPower(getQuoteKitsDcPower(quote?.quoteKits)) ??
//   //       "GEF000001",
//   //     ItemDescription: quote?.quoteKits?.[0]
//   //       ? formatTextSefaz(formatKitDescription(quote?.quoteKits?.[0]))
//   //       : "GERADOR FOTOVOLTAICO",
//   //     Quantity: 1,
//   //     ShipDate: formatDateToSap(shipDate),
//   //     WarehouseCode: "20.07",
//   //     SalesPersonCode: -1,
//   //     CommisionPercent: 1,
//   //     CostingCode: "Solar",
//   //     CostingCode2: "4201",
//   //     Usage: Usage ?? 69, //Buscar options
//   //     TaxCode: TaxCode == "Auto" ? null : TaxCode,
//   //     UnitsOfMeasurment: 1,
//   //     TaxPercentagePerRow: 100,
//   //     PriceSource: "dpsManual",
//   //     Price: isFree ? 0 : quote.priceInCents / 100,
//   //     PriceAfterVAT: isFree ? 0 : quote.priceInCents / 100,
//   //     LineTotal: isFree ? 0 : quote.priceInCents / 100,
//   //     GrossPrice: isFree ? 0 : quote.priceInCents / 100,
//   //     GrossTotal: isFree ? 0 : quote.priceInCents / 100,
//   //     GrossTotalSC: isFree ? 0 : quote.priceInCents / 100,
//   //     ShipToCode: `Entrega_${quote.shippingAddress?.id}`,
//   //     Weight1: getQuoteWeight(quote),
//   //     Weight1Unit: 3,
//   //   },
//   // ],

// }
