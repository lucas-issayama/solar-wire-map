import { Quote } from "@/types/quote";
import { re } from "mathjs";

export function getSapUsageFromQuote(quote: Quote) {
  if (!quote) return null;
  //Remessas
  if ((quote?.sapOrders?.length ?? 0) >= 1) {
    //Venda futura
    if (quote.transactionType == 1) {
      return 79;
    }
    //Venda ordem
    if (quote.transactionType == 2) {
      return 90;
    }

    return 69;
  }
  //Primeira venda
  else {
    //Venda futura
    if (quote.transactionType == 1) {
      return 61;
    }
    //Venda ordem
    if (quote.transactionType == 2) {
      return 58;
    }

    return 69;
  }
}

// { value: 0, text: "Venda direta" }, //Contribuinte ou não, venda ordem ou não
// { value: 1, text: "Venda futura" },
// { value: 2, text: "Venda ordem" },
// { value: 99, text: "Outros" },
