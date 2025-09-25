import { Quote, QuoteKit, QuoteKitItem } from "@/types/quote";

export function getGefCodeFromDcPower(dcPower: number) {
  if (dcPower <= 0.75) return "GEF000002";
  if (dcPower > 0.75 && dcPower <= 75) return "GEF000003";
  if (dcPower > 75 && dcPower <= 375) return "GEF000004";
  if (dcPower > 375) return "GEF000005";

  return "Não encontrado";
}

// GEF000002 - 8501.31.20 – Geradores de corrente contínua, de potência inferior ou igual a 750 W
// GEF000003 - 8501.32.20 - Geradores De potência superior a 750 W, mas não superior a 75 kW
// GEF000004 - Geradores De potência superior a 75 kW, mas não superior a 375 kW
// GEF000005 - Geradores De potência superior a 375 kW
