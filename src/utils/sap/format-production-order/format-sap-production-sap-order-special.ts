import { Quote, SapOrder } from "@/types/quote";
import { getQuoteKitsDcPower } from "../../format/get-quote-kits-dc-power";
import { getGefCodeFromDcPower } from "../../format/get-gef-code-from-dc-power";

export function formatSapProductionOrderSpecial(
  sapOrder: SapOrder,
  quote: Quote
) {
  let d = new Date();
  let d2 = new Date(d.toISOString().substring(0, 10));

  let sapProductionOrder: any = {
    method: "POST",
    url: "/api/v1/producao/ordem-producao",
    tipoOrdemProducao: "E",
    projeto: "",
    deposito: "501.07",

    nomeItem: "GERADOR FOTOVOLTAICO",
    // codigoItem:
    //   getGefCodeFromDcPower(getQuoteKitsDcPower(quote?.quoteKits)) ??
    //   "GEF000001",
    codigoItem: "GEF_5181",

    subproduto: [],

    programacao: `${sapOrder.DocNum}`,
    calculoManual: false,
    dataLiberacao: "0001-01-01T00:00:00",
    unidadeMedida: "UNID",
    //dataLancamento: "2024-10-11T00:00:00",
    //dataVencimento: "2024-10-11T00:00:00"  ,
    dataVencimento: dataVencimento(),
    fichaQualidade: "NM",
    destinoQualidade: "-1",
    codigoDeposito: "20.07",

    documentosCompras: [],
    regraDistribuicao: "",

    quantidadePlanejada: 1,
    statusOrdemProducao: "P",

    calculoBaseAlternativo: true,
    observacaoOrdemProducao: `Pedido num.${sapOrder.DocNum} ,entry:${sapOrder.DocEntry}`,
    documentosBeneficiamento: [],

    permitirEdicaoAposLiberacao: true,

    conteudo: [
      {
        // "lineId": "1",
        // "operacao": "MT",
        operacao: "1",
        sequenciaOperacao: 10,

        // "desconsiderarLeadTime": false,
        // "cancelado": false,

        linhasOperacao: linhasOperacao(quote),
        //---
        // linhasOperacao: [
        //   {
        //     tipoRecurso: "CP",
        //     codigoRecurso: "CS000085",
        //     quantidadeBase: 1.0,
        //     quantidadeFixa: 0.0,
        //     tempoFixo: 0.0,
        //     tempoVariavel: 0.0,
        //     tempoPlanejado: 0.0,
        //     dimensao1: 0.0,
        //     dimensao2: 0.0,
        //     depositoComponente: "10.07",
        //     metodoBaixa: "M",
        //     cancelado: false,
        //     perdaPercentual: "0.000000",
        //   },
        // ],
      },
    ],

    custos: {
      custoNaoAlocado: 0.0,
      custoComponentes: 0.0,
      custoAtualProdutoAcabado: 0.0,
      rateioCustoTerceiros: 0.0,
      custoPorProduto: 0.0,
      desvioTotal: 0.0,
      desvioPorProduto: 0.0,
      variacaoPercentual: 0.0,
      quantidadeConcluidaProdutoAcabado: 0.0,
      quantidadeRefugo: 0.0,
      percentualRefugo: 0.0,
      dataFechamento: "0001-01-01T00:00:00",
      diasAtraso: 0,
      ignorarNoFechamentoCustos: false,
      quantidadeRetornada: 0.0,
      quantidadeDentroPlanejado: 0.0,
      quantidadePendente: 0.0,
    },
  };
  return sapProductionOrder;
}

function dataVencimento() {
  let d = new Date();

  d.setMonth(d.getMonth() + 1);
  return d.toISOString();
}

function linhasOperacao(quote: Quote) {
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
      depositoComponente: el.shippingDate ? "501.07" : "10.07",
      quantidadeBase: el.quantity,
      //quantidadePlanejada: el.quantity,
      quantidadeFixa: 0,
      tempoFixo: 0,
      tempoVariavel: 0,
      metodoBaixa: "M",
    }));
  //let items =

  // linhasOperacao: [
  //   {
  //     tipoRecurso: "CP",
  //     codigoRecurso: "CS000085",
  //     depositoComponente: "10.07",

  //     quantidadeBase: 1.0,
  //     quantidadeFixa: 0.0,

  //     tempoFixo: 0.0,
  //     tempoVariavel: 0.0,

  //     tempoPlanejado: 0.0,
  //     dimensao1: 0.0,
  //     dimensao2: 0.0,

  //     metodoBaixa: "M",
  //     cancelado: false,
  //     perdaPercentual: "0.000000",
  //   },
  // ],

  return linhas;
}
