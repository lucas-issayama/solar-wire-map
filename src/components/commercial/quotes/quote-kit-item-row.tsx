import { DeleteIcon } from "@/components/icons/delete-icon";
import useSession from "@/components/session/use-session";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputQuantity } from "@/components/ui/input-quantity";
import { QuoteKit, QuoteKitItem } from "@/types/quote";
import { formatDate } from "@/utils/format/format-date";
import { formatDateTime } from "@/utils/format/format-date-time";
import { formatPriceInCents } from "@/utils/format/format-price-in-cents";
import getAccessLevelFromRole from "@/utils/getAccessLevelFromRole";
import getQuoteKitItemSku from "@/utils/getQuoteKitItemSku";
import { QuoteIcon } from "@radix-ui/react-icons";
import { ChangeEvent } from "react";

interface QuoteKitItemRowProps {
  quoteKitItem: QuoteKitItem;
  setQuoteKitItem?(quoteKitItem: QuoteKitItem): void;
  editable: boolean;
  quote?: any;
}

export function QuoteKitItemRow({
  quoteKitItem,
  setQuoteKitItem,
  editable,
  quote,
}: QuoteKitItemRowProps) {
  const { session, isLoading } = useSession();
  const { user } = session;
  function setQuantity(value: number) {
    if (setQuoteKitItem) setQuoteKitItem({ ...quoteKitItem, quantity: value });
  }

  function deleteMe() {
    let d = new Date();
    if (setQuoteKitItem) {
      setQuoteKitItem({ ...quoteKitItem, deleted: true });
    }
  }

  return (
    <tr className="h-12 text-primary font-bold " key={quoteKitItem?.id}>
      <td className="px-6">
        {getQuoteKitItemSku(quoteKitItem) ?? ""}{" "}
        {getAccessLevelFromRole(user?.role?.type) && (
          <>
            {quoteKitItem?.price?.product?.sapCode && (
              <span>{quoteKitItem?.price?.product?.sapCode}</span>
            )}
            {!quoteKitItem?.price?.product?.sapCode && (
              <p className="text-red-600">Cadastrar ítem no sap!</p>
            )}
          </>
        )}
        {getAccessLevelFromRole(user?.role?.type) &&
          quoteKitItem?.price?.product?.weight && (
            <p>({quoteKitItem?.price?.product?.weight} kg)</p>
          )}
        {getAccessLevelFromRole(user?.role?.type) &&
          !quoteKitItem?.price?.product?.weight && (
            <p className="text-red-900">Cadastrar peso</p>
          )}
        {user?.email == "lucas.issayama@grupomelocordeiro.com.br" && (
          <p>{formatDateTime(quoteKitItem?.createdAt ?? "")}</p>
        )}
      </td>

      <td className="px-6">{quoteKitItem.name}</td>
      <td>
        <InputQuantity
          value={quoteKitItem.quantity}
          setValue={setQuantity}
          editable={editable}
        ></InputQuantity>
      </td>
      {getAccessLevelFromRole(user?.role?.type) >= 2 && (
        <td className="px-6">{formatPriceInCents(quoteKitItem.costInCents)}</td>
      )}
      {user?.role?.name !== "integrator" && (
        <td className="px-6">
          <b>
            {" "}
            {formatPriceInCents(
              quoteKitItem.priceInCents * (1 - (quote?.categoryDiscount ?? 0))
            )}
          </b>
        </td>
      )}

      {user?.role?.name !== "integrator" && (
        <td className="px-6">
          <b>
            {" "}
            {formatPriceInCents(
              quoteKitItem.priceInCents *
                (1 - (quote?.categoryDiscount ?? 0)) *
                quoteKitItem.quantity
            )}
          </b>
        </td>
      )}
      <td className="px-6">
        {quoteKitItem.shippingDate
          ? formatDate(quoteKitItem.shippingDate)
          : "IMEDIATO"}
      </td>
      {getAccessLevelFromRole(user?.role?.type) >= 1 && (
        <td className="px-6">
          {/* {quoteKitItem.shippingDate
            ? ""
            : quoteKitItem.price?.product?.stockQuantity} */}
          {quoteKitItem.price?.availableQuantity}
        </td>
      )}

      {/* availableQuantity */}
      <td>
        <div className="col-span-1">
          <button
            disabled={editable == false}
            className={`bg-transparent ${
              editable ? "cursor-pointer" : " cursor-not-allowed"
            } `}
            onClick={(el) => {
              deleteMe();
            }}
          >
            <DeleteIcon></DeleteIcon>
          </button>
        </div>
      </td>
    </tr>
  );
}
