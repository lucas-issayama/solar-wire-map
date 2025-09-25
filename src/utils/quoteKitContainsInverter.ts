import { Quote, QuoteKit, QuoteKitItem } from "@/types/quote";

function quoteKitContainsInverter(quoteKit: QuoteKit) {
  let quoteKitUpdated: QuoteKit;

  if (quoteKit && quoteKit?.quoteKitItems) {
    let quoteKitItemsInverters = quoteKit?.quoteKitItems?.filter(
      (el) =>
        !el.deleted && el?.price?.product?.type == "inverter" && el.quantity > 0
    );

    return quoteKitItemsInverters?.length > 0;
  }
}
export default quoteKitContainsInverter;
