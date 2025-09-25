import { Quote, SapOrder } from "@/types/quote";
import { getQuoteKitsDcPower } from "../../format/get-quote-kits-dc-power";
import { getGefCodeFromDcPower } from "../../format/get-gef-code-from-dc-power";

export function formatSapProductionSapOrder(sapOrder: SapOrder, quote: Quote) {
  let d = new Date();
  let d2 = new Date(d.toISOString().substring(0, 10));

  let sapProductionOrder: any = {
    method: "POST",
    url: "/api/v1/producao/ordem-producao",
    tipoOrdemProducao: "S",
    //S-Padrao
    //R-Retrabalho
    //D-Desmontagem

    statusOrdemProducao: "P",
    // R- Released (Liberada)
    // P-Planned (Planejada)
    // L-(Fechada)
    // C-Cancelada (Cancelada)

    //programacao: "Pedido Test",
    //programacao: `Pedido num.${sapOrder.DocNum} ,entry:${sapOrder.DocEntry}`,
    programacao: `${sapOrder.DocNum}`,
    codigoItem:
      getGefCodeFromDcPower(getQuoteKitsDcPower(quote?.quoteKits)) ??
      "GEF000001",
    nomeItem: "GERADOR FOTOVOLTAICO",

    quantidadePlanejada: 1,
    unidadeMedida: "UNID",
    //   deposito: "20.07",
    deposito: "501.07",
    //"filial": "07 - COR SOLAR",
    calculoManual: false,
    dataLancamento: "2024-10-11T00:00:00",
    //dataLancamento: d2.toISOString().substring(0, 19),
    dataLiberacao: "0001-01-01T00:00:00",
    dataVencimento: "2024-10-11T00:00:00",
    //dataVencimento: d2.toISOString().substring(0, 19),

    permitirEdicaoAposLiberacao: true,
    calculoBaseAlternativo: true,
    fichaQualidade: "NM",
    destinoQualidade: "-1",
    projeto: "",
    regraDistribuicao: "",
    recursos: [],
    subproduto: [],
    documentosCompras: [],
    //  "documentosVendas": [],
    observacaoOrdemProducao: `Pedido num.${sapOrder.DocNum} ,entry:${sapOrder.DocEntry}`,
    documentosBeneficiamento: [],
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

    documentosVendas: [
      {
        lineId: "1",
        //numeroDocumento: sapOrder.DocNum,
        numeroDocumento: `${sapOrder.DocNum}`,
        numeroLinha: "1",
        tipoDocumento: "Pedido de venda",
        codigoItem:
          getGefCodeFromDcPower(getQuoteKitsDcPower(quote?.quoteKits)) ??
          "GEF000001",
        descricao: "GERADOR FOTOVOLTAICO",
        quantidade: "1.000000",
        unidadeMedidaVenda: "UNID",
        quantidadeAlocada: "1.000000",
        unidadeMedidaEstoque: "UNID",
        // dataEntrega: "12/28/2025 00:00:00",
      },
    ],
  };
  return sapProductionOrder;
}
