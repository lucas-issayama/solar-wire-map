import { QuoteKit } from "@/types/quote";

export default function getQuoteKitNModules(_quoteKit: QuoteKit) {
  return _quoteKit.quoteKitItems
    ?.filter((el: any) => el.type == "module")
    ?.filter((el) => !el.deleted)
    ?.reduce((acc: any, curr: any) => acc + curr.quantity, 0);
}
