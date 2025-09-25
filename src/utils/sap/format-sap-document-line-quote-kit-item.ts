import { Quote, QuoteKitItem } from "@/types/quote";
import { formatDateToSap } from "../format/format-date-to-sap";
import { getSapItemPrice } from "./get-sap-item-price";
import { getGefCodeFromDcPower } from "../format/get-gef-code-from-dc-power";
import { getQuoteKitsDcPower } from "../format/get-quote-kits-dc-power";
import { formatTextSefaz } from "../format/format-text-sefaz";
import formatKitDescription from "../format/format-kit-description";
import { getQuoteWeight } from "../format/get-quote-weight";
import { getSapItemCost } from "./get-sap-item-cost";
import { getSapItemPriceShipping } from "./get-sap-item-price-shipping";

function itemWeight(quoteKitItem: any) {
  let quantity = quoteKitItem?.quantity ?? 0;
  let weight = quoteKitItem?.price?.product?.weight ?? 0;

  return quantity * weight;
}

function getGrossProfit(
  quote: Quote,
  quoteKitItem: QuoteKitItem,
  isFree: boolean
) {
  if (!isFree) {
    return (
      getSapItemPrice(quote, quoteKitItem) / 100 -
      getSapItemCost(quote, quoteKitItem)
    );
  } else {
    return -getSapItemCost(quote, quoteKitItem);
  }
}

export function formatDocumentLineQuoteKitItem(
  quote: Quote,
  quoteKitItem: QuoteKitItem,
  shipDate: any,
  TaxCode: string,
  Incoterms: string,
  Usage: number,
  ShippingMethod: number,
  isFree: boolean,
  singleItems: boolean,
  ShipToCode?: string
) {
  if (singleItems && quote && quoteKitItem)
    return {
      Incoterms,
      ShippingMethod,
      //ShippingMethod: 1,
      OwnerCode: null,
      ItemCode: quoteKitItem?.price?.product?.sapCode,
      ItemDescription: quoteKitItem?.price?.product?.name,
      Quantity: quoteKitItem?.quantity,
      ShipDate: formatDateToSap(shipDate),
      WarehouseCode: "10.07",
      SalesPersonCode: -1,
      CommisionPercent: 1,
      CostingCode: "Solar",
      CostingCode2: "4201",
      Usage,
      TaxCode: TaxCode == "Auto" ? null : TaxCode,
      UnitsOfMeasurment: 1,
      TaxPercentagePerRow: 100,
      PriceSource: "dpsManual",
      Price: getSapItemPrice(quote, quoteKitItem) / 100,
      //PriceAfterVAT: getSapItemPrice(quote, quoteKitItem) / 100,
      //Is free added 07/05
      LineTotal: isFree
        ? 0
        : (quoteKitItem?.quantity * getSapItemPrice(quote, quoteKitItem)) / 100,

      U_UPP_Potencia:
        (quoteKitItem?.price?.product?.dcPower ?? 0) *
        (quoteKitItem?.quantity ?? 0),

      //GrossValues removidos depois de alinhamento com o Valdir 07/05
      // GrossPrice: getSapItemPrice(quote, quoteKitItem) / 100,
      // GrossTotal:
      //   (quoteKitItem?.quantity * getSapItemPrice(quote, quoteKitItem)) / 100,
      // GrossTotalSC:
      //   (quoteKitItem?.quantity * getSapItemPrice(quote, quoteKitItem)) / 100,
      // GrossProfit: getGrossProfit(quote, quoteKitItem, isFree),
      // GrossProfitSC: getGrossProfit(quote, quoteKitItem, isFree),
      ShipToCode: ShipToCode ?? `Entrega_${quote.shippingAddress?.id}`,
      Weight1: itemWeight(quoteKitItem),
      Weight1Unit: 3,
      FreeOfChargeBP: isFree ? "tYES" : "tNO",
      U_UPP_ValorFrete: getSapItemPriceShipping(quote, quoteKitItem) / 100,
    };
}
