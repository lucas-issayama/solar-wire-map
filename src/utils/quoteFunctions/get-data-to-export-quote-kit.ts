import { Quote, QuoteKit, QuoteKitItem } from "@/types/quote";
import isQuoteSingleItems from "../is-quote-single-items";
import { taxesFactorSingleItems } from "./taxes-factor-single-items";
import { taxesFactorKit } from "./taxes-factor-kit";

export function getDataToExportQuoteKit(quote: Quote) {
  let data: any = quote?.quoteKits?.[0]?.quoteKitItems
    ?.filter((el: any) => !el.deleted)
    .map((item: any) => ({
      Nome: item.name,
      Quantity: item.quantity,
      "Custo (R$)": (item.quantity * item.costInCents) / 100,
      "Receita (R$)": (item.quantity * item.finalRevenueInCents) / 100,
      "Preço na nota (R$)": (item.quantity * item.finalPriceInCents) / 100,
    }));

  if (data?.length) {
    data.push({
      Nome: "Montagem",
      Quantity: 1,
      "Custo (R$)": quote.priceAssemblyInCents / 100,
    });

    data.push({
      Nome: "Repasse integrador",
      Quantity: 1,
      "Custo (R$)": 0,
    });

    data.push({
      Nome: "Ajudante entrega",
      Quantity: 1,
      "Custo (R$)": 0,
    });

    data.push({
      Nome: "Seguro engenharia",
      Quantity: 1,
      "Custo (R$)": 0,
    });

    data.push({
      Nome: "Juros",
      Quantity: 1,
      "Custo (R$)": 0,
    });

    data.push({
      Nome: "Frete",
      Quantity: 1,
      "Custo (R$)": quote.costShippingInCents / 100,
      "Receita (R$)": (quote?.priceShippingInCents ?? 0) / 100,
    });
  }
  return data;
}

export default getDataToExportQuoteKit;
