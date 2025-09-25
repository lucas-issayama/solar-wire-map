import { Quote, QuoteKit, QuoteKitItem } from "@/types/quote";
import { formatDecimalBr } from "../format/format-decimal-br";

function quoteKitItemsUniquePriceId(
  quoteKitItems: QuoteKitItem[]
): QuoteKitItem[] {
  // Use reduce to aggregate the quantities for identical items
  return Object.values(
    quoteKitItems.reduce((acc: any, item) => {
      // Check if the item id already exists in the accumulator
      if (!acc[item.price.id]) {
        // If it doesn't exist, add the item to the accumulator
        acc[item.price.id] = { ...item };
      } else {
        // If it exists, add the quantity
        acc[item.price.id].quantity += item.quantity;
      }
      return acc;
    }, {})
  );
}

export default quoteKitItemsUniquePriceId;
