import { Quote, QuoteKitItem } from "@/types/quote";
import getTotalKitItems from "../quoteFunctions/getTotalKitItems";
import dataSapNotaFiscaUsages from "../data/dataSapNotaFiscalUsages";

export function getSapOrderIsFree(Usage?: number) {
  let isFree = Usage == 90;
  let sapUsage = dataSapNotaFiscaUsages.find((el) => el.id == Usage);

  if (sapUsage) {
    //isFree = sapUsage.Usage.includes("Rem")
    isFree = sapUsage.id == 90 || sapUsage.id == 46;
  }
  return isFree;
}
