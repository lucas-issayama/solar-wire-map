import isTypeStructure from "@/utils/isTypeStructure";
import { KitItemTableHeader } from "./kit-item-table-header";
import { QuoteKitItemRow } from "./quote-kit-item-row";
import { QuoteKitItemCard } from "./quote-kit-item-card";

interface KitItemsCardProps {
  user: any;
  quoteKitItems: any;
  editable: any;
  setQuoteKitItem: any;
  quote?: any;
}

export function KitItemsCard({
  user,
  quoteKitItems,
  editable,
  setQuoteKitItem,
  quote,
}: KitItemsCardProps) {
  return (
    <div className="">
      {quoteKitItems
        ?.filter((item: any) => !item.deleted)
        .map((quoteKitItem: any) => (
          <QuoteKitItemCard
            editable={editable}
            quoteKitItem={quoteKitItem}
            key={`${quoteKitItem.id}-${quoteKitItem?.price?.id}`}
            setQuoteKitItem={setQuoteKitItem}
            quote={quote}
          ></QuoteKitItemCard>
        ))}
    </div>
  );
}
