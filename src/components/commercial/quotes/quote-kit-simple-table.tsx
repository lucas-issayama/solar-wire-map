import { QuoteKit, QuoteKitItem } from "@/types/quote";
import { QuoteKitItemRow } from "./quote-kit-item-row";
import quoteKitRecalc from "@/utils/quoteFunctions/quoteKitRecalc";
import useSession from "@/components/session/use-session";
import isTypeStructure from "@/utils/isTypeStructure";
import { KitItemTableHeader } from "./kit-item-table-header";
import getAccessLevelFromRole from "@/utils/getAccessLevelFromRole";
import getQuoteKitItemSku from "@/utils/getQuoteKitItemSku";

interface QuoteKitSimpleTableProps {
  quoteKit: QuoteKit;
}

export function QuoteKitSimpleTable({ quoteKit }: QuoteKitSimpleTableProps) {
  const { session, isLoading } = useSession();
  const { user } = session;

  return (
    quoteKit && (
      <div className="my-10 border">
        <table className="min-w-full divide-y divide-gray-200 ">
          <thead className="bg-primary">
            <tr>
              {getAccessLevelFromRole(user?.role?.type) >= 3 && (
                <th
                  scope="col"
                  className="px-6 py-3 text-left font-medium text-white "
                >
                  SKU
                </th>
              )}

              <th
                scope="col"
                className="px-6 py-3 text-left font-medium text-white "
              >
                Nome
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left font-medium text-white "
              >
                Qtd
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 ">
            {quoteKit?.quoteKitItems
              ?.filter((item) => !item.deleted && item.quantity > 0)

              .filter((item) => !isTypeStructure(item.type))
              .map((quoteKitItem, index) => (
                <tr className="h-12" key={index}>
                  {getAccessLevelFromRole(user?.role?.type) >= 3 && (
                    <td className="px-6">{getQuoteKitItemSku(quoteKitItem)}</td>
                  )}
                  <td className="px-6">{quoteKitItem.name}</td>

                  <td>{quoteKitItem.quantity}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <h2 className="font-extrabold text-xl   p-5">Estruturas</h2>
        <br></br>

        <table className="min-w-full divide-y divide-gray-200 ">
          <thead className="bg-primary">
            <tr>
              {getAccessLevelFromRole(user?.role?.type) >= 3 && (
                <th
                  scope="col"
                  className="px-6 py-3 text-left font-medium text-white "
                >
                  SKU
                </th>
              )}

              <th
                scope="col"
                className="px-6 py-3 text-left font-medium text-white "
              >
                Nome
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left font-medium text-white "
              >
                Qtd
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 ">
            {quoteKit?.quoteKitItems
              ?.filter((item) => !item.deleted && item.quantity > 0)
              .filter((item) => isTypeStructure(item.type))
              .map((quoteKitItem, index) => (
                <tr className="h-12" key={index}>
                  {getAccessLevelFromRole(user?.role?.type) >= 3 && (
                    <td className="px-6">{getQuoteKitItemSku(quoteKitItem)}</td>
                  )}
                  <td className="px-6">{quoteKitItem.name}</td>
                  <td>{quoteKitItem.quantity}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    )
  );
}
