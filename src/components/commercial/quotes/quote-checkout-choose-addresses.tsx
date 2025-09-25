import { Quote, QuoteKit, QuoteKitItem } from "@/types/quote";
import useSession from "@/components/session/use-session";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import quoteRecalc from "@/utils/quoteFunctions/quoteRecalc";
import { useProductFilter } from "@/hooks/useProductFilter";
import { schemas } from "@/types/schemas/schemas";
import QuoteCardSelectAddress from "./quote-card-select-address";
import QuoteCardSelectShippingAddress from "./quote-card-select-shipping-address";
import FieldInputData from "../field-inputs/field-input-data";
import { fieldsContact3 } from "@/types/fields/fields-contact3";
import CardPrimary from "@/components/ui/card-primary";
import { formatPriceInCents } from "@/utils/format/format-price-in-cents";
import calculateShipping from "@/utils/calculateShipping";
import { transactionTypes } from "@/types/data/transactionTypes";
import { EditIcon } from "lucide-react";
import getAccessLevelFromRole from "@/utils/getAccessLevelFromRole";
import { useState } from "react";
import DialogEditShippingPrice from "../dialogs/dialog-edit-shipping-price";
import shippingAddressInfoOptions from "@/utils/shipping-address-info-options";

export function QuoteCheckoutChooseAddresses({ quote, setQuoteAndSave }: any) {
  const { structures } = useProductFilter();
  const { session, isLoading } = useSession();
  const { user } = session;
  const [openModalEditShippingPrice, setOpenModalEditShippingPrice] =
    useState(false);

  function onChangeBillingEntity(value: string) {
    if (quote) {
      setQuoteAndSave(
        {
          ...quote,
          invoiceAddress: null,
          shippingAddress: null,
          contact: null,
          billingEntity: value,
        } //)
      );
    }
  }

  function onChangeTransactionType(value: string) {
    console.log(value);
    if (quote) {
      setQuoteAndSave(
        {
          ...quote,
          transactionType: parseInt(value),
          billingEntity: parseInt(value) == 2 ? "contact" : quote.billingEntity,
        } //)
      );
    }
  }

  function onChangeShippingType(value: string) {
    if (quote) {
      setQuoteAndSave(
        quoteRecalc({
          ...quote,
          shippingType: value,
        })
      );
    }
  }

  function showChangeAddress() {
    return (
      quote?.stage?.slug !== "order-completed" ||
      (quote?.stage?.slug == "order-completed" &&
        user?.role?.type !== "integrator")
    );
  }

  function checkAndRecalcQuote(quoteUpdate: Quote) {
    console.log(`old:${quote.priceShippingInCents}`);

    let {
      priceShippingInCents,
      costShippingInCents,
      shippingEstimationPriceInCents,
      shippingEstimated,
    } = calculateShipping(quoteUpdate);

    if (Math.abs(quote.priceShippingInCents - priceShippingInCents) < 1000) {
      setQuoteAndSave(quoteUpdate);
    } else {
      setQuoteAndSave(quoteRecalc(quoteUpdate));
    }
  }
  return (
    <div
      className={` ${
        quote?.stage?.slug == "order-completed" ? "" : "min-h-[80%]"
      }`}
    >
      <DialogEditShippingPrice
        open={openModalEditShippingPrice}
        setOpen={setOpenModalEditShippingPrice}
        quote={quote}
        setQuote={setQuoteAndSave}
      ></DialogEditShippingPrice>
      <div className="flex  p-2 m-4 mb-6 border-spacing-5">
        <span className="w-full"></span>
        <div className="w-full ">
          <p className="my-1">Tipo de operação </p>
          <Select
            value={quote?.transactionType?.toString() ?? "0"}
            onValueChange={onChangeTransactionType}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Tipo de operação" />
            </SelectTrigger>
            <SelectContent>
              {transactionTypes.map((el) => (
                <SelectItem key={el.value} value={el.value?.toString()}>
                  {el.text}
                </SelectItem>
              ))}
              {/* <SelectItem value="1">Veb</SelectItem> */}
            </SelectContent>
          </Select>
        </div>
      </div>
      {showChangeAddress() && (
        <>
          <CardPrimary
            title={
              quote.transactionType == 2
                ? "DADOS DO CLIENTE FINAL "
                : "FATURAMENTO E ENTREGA"
            }
            className="my-10 "
          >
            <div className=" p-2 m-4 mb-6 border-spacing-5">
              <Select
                value={quote?.billingEntity ?? ""}
                onValueChange={onChangeBillingEntity}
                disabled={quote?.transactionType?.toString() == 2}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Integrador ou cliente" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="enterprise">Integrador</SelectItem>
                  <SelectItem value="contact">Cliente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardPrimary>

          {quote?.billingEntity == "contact" && (
            <CardPrimary
              title={
                quote.transactionType == 2
                  ? "DADOS DO CLIENTE FINAL (ENTREGA)"
                  : "CLIENTE"
              }
              className="my-10 "
            >
              <FieldInputData
                schema={schemas.contact}
                label="Cliente"
                value={quote.contact}
                setValue={(value: any) => {
                  setQuoteAndSave({
                    ...quote,
                    contact: { ...value },
                    invoiceAddress: null,
                    shippingAddress: null,
                  });
                }}
                fieldsFromParent={[
                  {
                    name: "enterprise",
                    label: "Integrador",
                    type: "object",
                    editable: false,
                    hide: true,
                    filter: { id: { eq: quote?.enterprise?.id } },
                    object: {
                      name: "enterprise",
                      singular: "enterprise",
                      plural: "enterprises",
                      label: "Integrador",
                    },
                    fields: [
                      {
                        name: "id",
                        label: "Id",
                        type: "number",
                        value: quote?.enterprise?.id,
                      },
                      {
                        name: "name",
                        label: "Nome",
                        type: "string",
                        value: quote?.enterprise?.name,
                      },
                    ],
                  },
                ]}
                customFields={fieldsContact3}
              ></FieldInputData>
            </CardPrimary>
          )}

          {((quote?.billingEntity == "contact" && quote?.contact?.id) ||
            quote?.billingEntity == "enterprise") && (
            <CardPrimary title="ENDEREÇO DE FATURAMENTO" className="my-10 ">
              <QuoteCardSelectAddress
                quote={quote}
                setQuote={setQuoteAndSave}
                addressFieldName={"invoiceAddress"}
              ></QuoteCardSelectAddress>
            </CardPrimary>
          )}

          {((quote?.billingEntity == "contact" && quote?.contact?.id) ||
            quote?.billingEntity == "enterprise") && (
            <CardPrimary title="ENDEREÇO DE ENTREGA" className="my-10 ">
              <QuoteCardSelectShippingAddress
                quote={quote}
                setQuote={(_quote: Quote) => {
                  //setQuoteAndSave(quoteRecalc(quote));
                  checkAndRecalcQuote(_quote);
                }}
                addressFieldName={"shippingAddress"}
              ></QuoteCardSelectShippingAddress>
            </CardPrimary>
          )}

          {/* <p>{JSON.stringify(quote)}</p> */}
          <CardPrimary title="FRETE" className="my-10 ">
            <p className="text-primary font-bold">TIPO</p>
            <Select
              value={quote?.shippingType?.toString() ?? ""}
              onValueChange={onChangeShippingType}
              // disabled={editable == false}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Tipo de frete" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cif">CIF</SelectItem>
                <SelectItem value="fob">FOB</SelectItem>
              </SelectContent>
            </Select>

            <div className="font-bold text-xl p-2 bg-tertiary text-white rounded-md w-full flex justify-center mt-4">
              {formatPriceInCents(quote?.priceShippingInCents)}
              {getAccessLevelFromRole(user?.role?.type) >= 3 && (
                <EditIcon
                  className="cursor-pointer"
                  onClick={(ev) => setOpenModalEditShippingPrice(true)}
                ></EditIcon>
              )}
            </div>
          </CardPrimary>
          <CardPrimary
            title="INFORMAÇÃO DE ENDEREÇO DE ENTREGA"
            className="my-10 "
          >
            <Select
              value={quote.shippingAddressInfo}
              onValueChange={(value) => {
                setQuoteAndSave({ ...quote, shippingAddressInfo: value });
              }}
              // disabled={editable == false}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Escolher informação de endereço de entrega" />
              </SelectTrigger>
              <SelectContent>
                {shippingAddressInfoOptions.map((el) => (
                  <SelectItem key={el} value={el}>
                    {el}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardPrimary>
        </>
      )}
    </div>
  );
}
