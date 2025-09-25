import { Quote, QuoteKit, QuoteKitItem } from "@/types/quote";

export function getQuoteWeight(quote: Quote) {
  // return quote?.quoteKits?.reduce(
  //    (qkAcc:number, qkCurr:QuoteKit)=> qkAcc + qkCurr.quantity* qkCurr.quoteKitItems?.reduce( (acc:number, curr:QuoteKitItem)=>acc+ (curr.quantity *  curr?.price?.product?.weight)??0 , 0 )  ,0)
  let quoteKit = quote?.quoteKits?.[0];
  if (quoteKit) {
    return quoteKit.quoteKitItems?.reduce((acc, curr) => {
      const quantity = curr?.quantity ?? 0;
      const weight = curr?.price?.product?.weight ?? 0;
      return acc + quantity * weight;
    }, 0);
  }
}
