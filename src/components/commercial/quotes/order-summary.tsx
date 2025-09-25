import { Quote } from "@/types/quote";
import { useState } from "react";
import useSession from "@/components/session/use-session";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProductFilter } from "@/hooks/useProductFilter";

import { QuoteKitSimpleTable } from "./quote-kit-simple-table";
import CardPrimary from "@/components/ui/card-primary";
import { formatCityFullNameFromAddress } from "@/utils/format/format-city-full-name-from-address";
import { formatAddressSingleLine } from "@/utils/format/format-address-single-line";

export function OrderSummary({ quote }: any) {
  const { session, isLoading } = useSession();
  const { user } = session;
  const [openDialog, setOpenDialog] = useState(false);

  function formatBillingEntity(quote: Quote) {
    if (quote?.billingEntity == "contact") {
      return (
        <>
          <div className="flex justify-between my-2">
            <p className="w-full">
              <span className="font-bold mr-2">Nome:</span>

              {quote?.contact?.name ?? ""}
            </p>
            <p className="w-full">
              <span className="font-bold  mr-2 ">Telefone:</span>
              {quote?.contact?.phone ?? ""}
            </p>
            <p className="w-full">
              <span className="font-bold  mr-2">Email:</span>
              {quote?.contact?.email ?? ""}
            </p>
          </div>

          {quote?.contact?.typeId == 2 && (
            <div className="flex justify-between my-2">
              <p className="w-full">
                <span className="font-bold  mr-2">CPF: </span>
                {quote?.contact?.cpf ?? ""}
              </p>
            </div>
          )}

          {quote?.contact?.typeId == 1 && (
            <div className="flex justify-between my-2">
              <p className="w-full">
                <span className="font-bold ">CNPJ:</span>{" "}
                {quote?.contact?.cnpj ?? ""}
              </p>
              <p className="w-full">
                <span className="font-bold  ">I.E.:</span>{" "}
                {quote?.contact?.ie ?? ""}
              </p>
            </div>
          )}
        </>
      );
    }
    if (quote?.billingEntity == "enterprise") {
      return <></>;
    }
    return <></>;
  }
  return (
    <div className="defaultPage">
      {quote?.stage?.slug == "integrator-order-completed" && (
        <h1 className="text-2xl font-extrabold my-10  ">
          Pedido em processamento
        </h1>
      )}
      {quote?.stage?.slug !== "integrator-order-completed" && (
        <h1 className="text-2xl font-extrabold my-10">Resumo do pedido</h1>
      )}
      <CardPrimary title="FATURAMENTO" className="m-10">
        <Select value={quote?.billingEntity ?? ""} disabled>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Integrador ou cliente?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="enterprise">Integrador</SelectItem>
            <SelectItem value="contact">Cliente</SelectItem>
          </SelectContent>
        </Select>

        <div className="p-4">{formatBillingEntity(quote)}</div>
      </CardPrimary>

      <CardPrimary title="ENDEREÇO DE FATURAMENTO" className="m-10">
        <p>{formatAddressSingleLine(quote?.invoiceAddress)}</p>
        <p className="m-2">
          {formatCityFullNameFromAddress(quote?.invoiceAddress)}
        </p>
      </CardPrimary>

      <CardPrimary title="ENDEREÇO DE ENTREGA" className="m-10">
        <p>{formatAddressSingleLine(quote?.shippingAddress)}</p>
        <p className="m-2">
          {formatCityFullNameFromAddress(quote?.shippingAddress)}
        </p>
      </CardPrimary>
      <CardPrimary title="RESUMO DE PRODUTOS" className="m-10">
        <div className="my-10">
          {quote?.quoteKits
            ?.filter((el: any) => !el.deleted)
            .map((quoteKit: any) => (
              <QuoteKitSimpleTable
                key={quoteKit.id}
                quoteKit={quoteKit}
              ></QuoteKitSimpleTable>
            ))}
        </div>
      </CardPrimary>
    </div>
  );
}
