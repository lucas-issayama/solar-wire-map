import { Quote } from "@/types/quote";
import { formatDateToSap } from "../format/format-date-to-sap";

export function formatSapOrderUpdate(
  quote: Quote,
  OrderDocEntry: string,
  OrdemDocNum?: number,
  OrdemDocEntry?: number
) {
  let sapOrder: any = {
    method: "PATCH",
    url: `/b1s/v1/Orders(${OrderDocEntry})`,
    NumAtCard: quote.id,
    Comments: `${
      quote.obs ? `${quote.obs},` : ""
    } Ordem de produção: ${OrdemDocNum} `,
    U_OP_CorSolar: OrdemDocEntry,
  };

  return sapOrder;
}
