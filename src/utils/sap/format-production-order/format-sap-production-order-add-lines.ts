import { Quote } from "@/types/quote";

export function formatSapProductionOrderAddLines(
  quote: Quote,
  sapProdDocNum: string
) {
  let quoteKits = quote?.quoteKits;
  let quoteKit = quoteKits?.[0];
  let items = quoteKit?.quoteKitItems?.filter(
    (el: any) => el.price?.product?.sapCode
  );

  let linhas: any = items
    ?.filter((el: any) => el.quantity)
    ?.map((el: any) => ({
      tipoRecurso: "CP",
      codigoRecurso: el.price?.product?.sapCode,
      // depositoComponente: "501.07",
      depositoComponente: el.shippingDate ? "501.07" : "10.07",
      quantidadeBase: el.quantity,
      // quantidadeFixa: el.quantity,
      quantidadePlanejada: el.quantity,
      quantidadeFixa: 0,
      tempoFixo: 0,
      tempoVariavel: 0,
      metodoBaixa: "M",
    }));
  //let items =

  if (quote?.integratorServicesInCents) {
    // linhas?.push({
    //   tipoRecurso: "MO",
    //   codigoRecurso: "REPASSE",
    //   // depositoComponente: "501.07",
    //   quantidadeBase: quote?.integratorServicesInCents / 100,
    //   //quantidadeFixa: quote?.integratorServicesInCents / 100,
    //   quantidadeFixa: 0,
    //   tempoFixo: 0,
    //   tempoVariavel: 0,
    //   metodoBaixa: "N",
    // });
  }

  let sapRequest: any = {
    method: "PATCH",
    url: `/api/v1/producao/ordens/${sapProdDocNum}/operacao/MT/sequencia/10`,
    //docNum
    linhasOperacao: linhas,
  };

  return sapRequest;
}
