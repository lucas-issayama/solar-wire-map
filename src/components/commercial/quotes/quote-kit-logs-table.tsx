import { QuoteKit, QuoteKitItem } from "@/types/quote";
import { QuoteKitItemRow } from "./quote-kit-item-row";
import quoteKitRecalc from "@/utils/quoteFunctions/quoteKitRecalc";
import useSession from "@/components/session/use-session";
import isTypeStructure from "@/utils/isTypeStructure";
import { KitItemTableHeader } from "./kit-item-table-header";
import getAccessLevelFromRole from "@/utils/getAccessLevelFromRole";
import getQuoteKitItemSku from "@/utils/getQuoteKitItemSku";
import { formatPriceInCents } from "@/utils/format/format-price-in-cents";
import { formatDate } from "@/utils/format/format-date";

interface QuoteKitLogsTableProps {
  quoteKit: QuoteKit;
}

function ThKit({ user }: any) {
  return (
    <tr>
      {getAccessLevelFromRole(user?.role?.type) >= 3 && (
        <th scope="col" className="px-6 py-3 text-left font-medium text-white ">
          SKU
        </th>
      )}

      <th scope="col" className="px-6 py-3 text-left font-medium text-white ">
        Descrição
      </th>
      <th scope="col" className="px-6 py-3 text-left font-medium text-white ">
        Qtd
      </th>
      <th scope="col" className="px-6 py-3 text-left font-medium text-white ">
        Custo
      </th>
      <th scope="col" className="px-6 py-3 text-left font-medium text-white ">
        Preço
      </th>
      <th scope="col" className="px-6 py-3 text-left font-medium text-white ">
        Total
      </th>
      <th scope="col" className="px-6 py-3 text-left font-medium text-white ">
        Prazo
      </th>
    </tr>
  );
}

function TrKitItem({ user, quoteKitItem }: any) {
  return (
    <tr className="h-12">
      {getAccessLevelFromRole(user?.role?.type) >= 3 && (
        <td className="px-6">{getQuoteKitItemSku(quoteKitItem)}</td>
      )}
      <td className="px-6">{quoteKitItem.name}</td>

      <td>{quoteKitItem.quantity}</td>
      <td className="px-6">{formatPriceInCents(quoteKitItem.costInCents)}</td>
      <td className="px-6">{formatPriceInCents(quoteKitItem.priceInCents)}</td>
      <td className="px-6">
        {formatPriceInCents(quoteKitItem.priceInCents * quoteKitItem.quantity)}
      </td>
      <td className="px-6">
        {quoteKitItem.shippingDate
          ? formatDate(quoteKitItem.shippingDate)
          : "IMEDIATO"}
      </td>
    </tr>
  );
}

export function QuoteKitLogsTable({ quoteKit }: QuoteKitLogsTableProps) {
  const { session, isLoading } = useSession();
  const { user } = session;

  return (
    quoteKit && (
      <div className="my-10 border">
        <table className="min-w-full divide-y divide-gray-200 ">
          <thead className="bg-primary">
            <ThKit user={user}></ThKit>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 ">
            {quoteKit?.quoteKitItems
              ?.filter((item) => !item.deleted && item.quantity > 0)

              .filter((item) => !isTypeStructure(item.type))
              .map((quoteKitItem, index) => (
                <TrKitItem
                  key={index}
                  user={user}
                  quoteKitItem={quoteKitItem}
                ></TrKitItem>
              ))}
          </tbody>
        </table>
        <h2 className="font-extrabold text-xl   p-5">Estruturas</h2>
        <br></br>

        <table className="min-w-full divide-y divide-gray-200 ">
          <thead className="bg-primary">
            <ThKit user={user}></ThKit>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 ">
            {quoteKit?.quoteKitItems
              ?.filter((item) => !item.deleted && item.quantity > 0)
              .filter((item) => isTypeStructure(item.type))
              .map((quoteKitItem, index) => (
                <TrKitItem
                  key={index}
                  user={user}
                  quoteKitItem={quoteKitItem}
                ></TrKitItem>
              ))}
          </tbody>
        </table>
      </div>
    )
  );
}
