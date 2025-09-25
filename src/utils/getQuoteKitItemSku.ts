import { QuoteKit } from "@/types/quote";
import sanitize from "./sanitize";

export default function getQuoteKitItemSku(quoteKitItem: any) {
  let formattedQuoteKitItem = sanitize({
    ...quoteKitItem,
    attributes: quoteKitItem,
  });
  //console.log(JSON.stringify({ formattedQuoteKitItem }));

  // let sku =
  //   quoteKitItem.price?.sku ??
  //   quoteKitItem.erpId ??
  //   quoteKitItem.price?.product?.erpId;
  let sku =
    quoteKitItem.price?.sku ??
    quoteKitItem.price?.product?.erpId ??
    quoteKitItem.erpId;

  if (sku) {
    return sku;
  } else {
    sku =
      quoteKitItem.price?.data?.attributes?.sku ??
      quoteKitItem.erpId ??
      quoteKitItem.price?.data?.attributes?.product?.data?.attributes?.erpId;
    return sku;
  }
}
