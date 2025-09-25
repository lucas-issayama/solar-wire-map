export function formatSapProductionOrderRemoveLine(
  sapProdDocNum: any,
  indexToRemove: number
) {
  let sapRequest: any = {
    method: "PATCH",
    url: `/api/v1/producao/ordem-producao/${sapProdDocNum}/linha/${indexToRemove}`, //,
    // "docNumOrdemProducao":2413,
    // "lineId":3
  };

  return sapRequest;
}
