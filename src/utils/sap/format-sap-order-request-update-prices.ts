import { Quote } from "@/types/quote";
import { formatDateToSap } from "../format/format-date-to-sap";
import dataSapOrder4422 from "../data/dataSapOrder4422";
import { e } from "mathjs";

export function formatSapOrderRequestUpdatePrices(sapOrderOnSap: any) {
  // let _sapOrder = dataSapOrder4422.value[0];
  let DocumentLines = sapOrderOnSap.DocumentLines.map(
    (el: any, index: number) => ({
      LineNum: el.LineNum,
      UnitPrice:
        el.Price / (1 + el.NetTaxAmount / (el.PackageQuantity * el.Price)),
    })
  );
  let request: any = {
    method: "PATCH",
    url: `/b1s/v1/Orders(${sapOrderOnSap.DocEntry})`,
    DocumentLines,
  };

  return request;
}
