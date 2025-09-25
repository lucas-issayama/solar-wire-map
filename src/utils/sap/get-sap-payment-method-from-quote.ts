import { Quote } from "@/types/quote";
import { re } from "mathjs";

export function getSapPaymentMethodFromQuote(quote: Quote) {
  // const [paymentMethods, setPaymentMethods] = useState([
  //     { id: 1, label: "Boleto à vista" }, // , slug: "invoice"
  //     { id: 2, label: "Cartão de crédito" }, // slug: "credit-card"
  //     { id: 3, label: "Pix" },
  //     { id: 4, label: "Financimento" },
  //     { id: 5, label: "Especial" },
  //     { id: 6, label: "Depósito em conta" },
  //   ]);

  // const sapPaymentMethods = [
  //     {
  //       value: "CR_01", //BOLETO BANCÁRIO
  //       text: "BOLETO BANCÁRIO",
  //     },
  //     {
  //       value: "CR_02", //TRANSFERÊNCIA BANCÁRIA
  //       text: "TRANSFERÊNCIA BANCÁRIA",
  //     },
  //     {
  //       value: "CR_03", // CARTÃO DE CRÉDITO
  //       text: "CARTÃO DE CRÉDITO",
  //     },
  //   ];

  if (quote?.paymentMethod?.id == 1) {
    return "CR_01";
  }

  if (quote?.paymentMethod?.id == 2) {
    return "CR_03";
  }

  //   if (quote.paymentMethod?.id == 4) {
  //     return "CR_02";
  //   }
  return "CR_01";
}
