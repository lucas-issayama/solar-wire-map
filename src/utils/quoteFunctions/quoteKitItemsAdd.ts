import { Quote, QuoteKit, QuoteKitItem } from "@/types/quote";
import { formatDecimalBr } from "../format/format-decimal-br";

function quoteKitItemsConcat(
  quoteKitItems: QuoteKitItem[],
  itemsToAdd: QuoteKitItem[]
) {
  let quoteKitItemsFinal = [...quoteKitItems];
  for (let i = 0; i < itemsToAdd.length; i++) {
    let itemToAdd = itemsToAdd[i];
    let itemFound = quoteKitItems.find((el) => el.price.id == itemToAdd.id);

    if (itemFound) {
      quoteKitItemsFinal = quoteKitItemsFinal.map((el) =>
        el.price.id == itemToAdd.id
          ? { ...el, quantity: el.quantity + itemToAdd.quantity }
          : { ...el }
      );
    } else {
      quoteKitItemsFinal = [...quoteKitItemsFinal, itemToAdd];
    }
  }
  return quoteKitItemsFinal;
}

export default quoteKitItemsConcat;
