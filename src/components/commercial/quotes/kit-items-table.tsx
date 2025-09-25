import { KitItemTableHeader } from "./kit-item-table-header";
import { QuoteKitItemRow } from "./quote-kit-item-row";

interface KitItemsTableProps {
  user: any;
  quoteKitItems: any;
  editable: any;
  setQuoteKitItem: any;
  quote?: any;
}

export function KitItemsTable({
  user,
  quoteKitItems,
  editable,
  setQuoteKitItem,
  quote,
}: KitItemsTableProps) {
  return (
    <table className="min-w-full divide-y divide-gray-200 rounded-lg border border-tertiary bg-tertiary border-collapse overflow-hidden ">
      <KitItemTableHeader user={user}></KitItemTableHeader>
      <tbody className="bg-white divide-y divide-gray-200  ">
        {quoteKitItems
          ?.filter((item: any) => !item.deleted)
          ?.sort(
            (a: any, b: any) =>
              new Date(a.createdAt)?.getTime() -
              new Date(b.createdAt)?.getTime()
          )
          .map((quoteKitItem: any) => (
            <QuoteKitItemRow
              editable={editable}
              quoteKitItem={quoteKitItem}
              key={`${quoteKitItem.id}-${quoteKitItem?.price?.id}`}
              setQuoteKitItem={setQuoteKitItem}
              quote={quote}
            ></QuoteKitItemRow>
          ))}
      </tbody>
    </table>
  );
}
