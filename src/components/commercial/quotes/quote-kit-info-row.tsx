import { DeleteIcon } from "@/components/icons/delete-icon";

import { Button } from "@/components/ui/button";

import { InputQuantity } from "@/components/ui/input-quantity";

import { formatDate } from "@/utils/format/format-date";
import { formatPriceInCents } from "@/utils/format/format-price-in-cents";

interface QuoteKitInfoRowProps {
  quoteKit: any;
  editable: any;
  deleteMe: any;
  setQuantity: any;
  user: any;
}

export function QuoteKitInfoRow({
  quoteKit,
  editable,
  deleteMe,
  setQuantity,
  user,
}: QuoteKitInfoRowProps) {
  return (
    <div className="grid grid-cols-12 gap-5 ">
      <div className="col-span-1">
        <Button
          disabled={!editable}
          className=" bg-transparent"
          onClick={(el) => {
            deleteMe();
          }}
        >
          <DeleteIcon></DeleteIcon>
        </Button>
      </div>
      <div className="col-span-5">
        <p>Nome</p>
        <p>
          ({quoteKit?.dcPower}kWp){quoteKit?.name}
        </p>
      </div>

      {(user?.role?.name == "sales-leader" ||
        user?.role?.name == "director" ||
        user?.role?.name == "admin") && (
        <div className="col-span-2 ">
          <p>Custo</p>
          <p>
            {formatPriceInCents(quoteKit?.costInCents * quoteKit?.quantity)}
          </p>
        </div>
      )}
      {user?.role?.name !== "integrator" && (
        <div className="col-span-2 ">
          <p>Preço</p>
          <p>
            {formatPriceInCents(quoteKit?.priceInCents * quoteKit?.quantity)}
          </p>
        </div>
      )}

      <div className="col-span-2  ">
        <p>Prazo</p>
        <p>
          {quoteKit?.shippingDate
            ? formatDate(quoteKit?.shippingDate)
            : "Imediato"}
        </p>
      </div>
    </div>
  );
}
