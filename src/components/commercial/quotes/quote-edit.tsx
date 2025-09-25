import { Quote, QuoteKit, QuoteKitItem } from "@/types/quote";
import { formatPriceInCents } from "@/utils/format/format-price-in-cents";
import quoteKitRecalc from "@/utils/quoteFunctions/quoteKitRecalc";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import useSession from "@/components/session/use-session";
import FormFields from "../form/form-fields";
import { QuoteKitCard } from "./quote-kit-card";
import { QuoteDiscountCard } from "./discount/quote-discount-card";
import corsolarApi from "@/utils/corsolar/corsolarApi";
import quoteRecalc from "@/utils/quoteFunctions/quoteRecalc";
import { formatPercent } from "@/utils/format/format-percent";
import { QuotePayment } from "./quote-payment";
import getQuoteKitNModules from "@/utils/getQuoteKitNModules";
import getItemsFromStructure from "@/utils/getItemsFromStructure";
import { useProductFilter } from "@/hooks/useProductFilter";
import isTypeStructure from "@/utils/isTypeStructure";
import { schemas } from "@/types/schemas/schemas";
import DialogSearchData from "../dialogs/dialog-search-data";
import getValueFromFields from "@/utils/getValueFromFields";
import { fieldsPriceKit } from "@/types/fields/fields-price-kits";
import CardPrimary from "@/components/ui/card-primary";
import ShippingEstimationCard from "./quote-shipping-estimation-card";
import QuoteOtherServicesCard from "./quote-other-services-card";
import { InputTextarea } from "@/components/ui/input-textarea";
import QuoteInputMoney from "./discount/quote-input-money";
import { QuoteKPIs } from "./quote-kpis";
import { formatAddressSingleLine } from "@/utils/format/format-address-single-line";
import { formatCityFullNameFromAddress } from "@/utils/format/format-city-full-name-from-address";
import CardSapProject from "@/components/quotes/card-sap-project";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import shippingAddressInfoOptions from "@/utils/shipping-address-info-options";

export function QuoteEdit({
  editable,
  quote,
  setQuote,
  setFields,
  setFilteredFields,
  setQuoteKit,
  fieldsUpdated,
  object,
  fields,
  setQuoteAndSave,
  maxDiscount,
  minContributionMargin,
  save,
  variables,
  openGeneratedPdf,
  setOpenGeneratedPdf,
}: any) {
  const { structures } = useProductFilter();
  const { session, isLoading } = useSession();
  const { user } = session;

  const [openDialog, setOpenDialog] = useState(false);

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

  async function addKitPrice(price: any, fields: any) {
    let priceFilter = fields ? { ...getValueFromFields(fields) } : null;
    let structureName =
      priceFilter?.product?.structureName == "none"
        ? null
        : priceFilter?.product.structureName;

    let assemblyFeeVariable;
    if (quote?.variables) {
      assemblyFeeVariable = quote?.variables?.find(
        (el: any) => el.name == "assemblyFee"
      );
    }

    if (price?.id && quote?.id) {
      if (price.product.type == "kit") {
        let ans = await corsolarApi.quotes.addKit(
          session?.token,
          quote?.id,
          price?.id
        );

        if (quote?.quoteKits && ans) {
          let quoteKit: QuoteKit = ans;

          let structure = structures?.find((el) => el.name == structureName);

          if (structureName && structure) {
            let layoutItems = [
              {
                id: 0,
                direction: "vertical",
                rows: 1,
                columns: getQuoteKitNModules(quoteKit),
              },
            ];

            let itemsToAdd = getItemsFromStructure(
              structure,
              layoutItems,
              quoteKit?.quoteKitItems?.find((el: any) => el.type == "module")
                ?.price?.product
            );

            if (quoteKit?.quoteKitItems && itemsToAdd) {
              setQuoteAndSave(
                quoteRecalc({
                  ...quote,
                  quoteKits: [
                    ...quote?.quoteKits,
                    quoteKitRecalc({
                      ...quoteKit,
                      assemblyFee: assemblyFeeVariable.value ?? 1.3,
                      structureName,
                      layoutItems,
                      quoteKitItems: [
                        ...quoteKit?.quoteKitItems?.map((el: any) => ({
                          ...el,
                          deleted: isTypeStructure(el.type),
                        })),
                        ...itemsToAdd,
                      ],
                    }),
                  ],
                })
              );
            } else {
              console.log("Error na structure quoteKitItems and itemsToAdd ");
            }
          } else {
            console.log("No structure");
            setQuoteAndSave(
              quoteRecalc({
                ...quote,
                quoteKits: [
                  ...quote?.quoteKits,
                  quoteKitRecalc({
                    assemblyFee: assemblyFeeVariable.value ?? 1.3,
                    ...quoteKit,
                  }),
                ],
              })
            );
          }
        } else {
          alert("Error adding kit");
        }
      } else {
        alert("Product !== kit");
      }
    } else {
      alert(`!price?.id(${price.id}) && quote?.id:(${quote.id})`);
    }
  }

  function setDiscountFinalValue(value: any) {
    setQuoteAndSave(quoteRecalc({ ...quote, discountFinalValue: value }, true));
  }

  function headerEditable() {
    return editable || user?.role?.type !== "integrator";
  }

  return (
    quote && (
      <div className="m-0 p-0 sm:p-0 md:p-4">
        <DialogSearchData
          open={openDialog}
          setOpen={setOpenDialog}
          schema={schemas.price}
          customFields={fieldsPriceKit}
          handleClickItem={addKitPrice}
        ></DialogSearchData>

        <CardPrimary title="ORÇAMENTO" className="md:m-2">
          <div className="p-4">
            <FormFields
              schema={schemas.quote}
              fields={fields
                ?.filter(
                  (field: any) => field.name !== "shippingEstimationCity"
                )
                .map((field: any) => ({
                  ...field,
                  editable: headerEditable() ? field.editable : false,
                }))}
              setFields={setFilteredFields}
              fieldsUpdated={fieldsUpdated}
            ></FormFields>
          </div>
          <div className="flex items-end justify-end"></div>
        </CardPrimary>

        <CardSapProject
          quote={quote}
          setQuoteAndSave={setQuoteAndSave}
        ></CardSapProject>

        <div className="">
          {quote?.quoteKits
            ?.filter((el: any) => !el.deleted)
            .map((quoteKit: any) => (
              <QuoteKitCard
                quoteKit={quoteKit}
                setQuoteKit={setQuoteKit}
                key={quoteKit.id}
                editable={editable}
                quote={quote}
              ></QuoteKitCard>
            ))}
        </div>
        {user?.role?.name !== "integrator" && quote?.quoteKits?.length == 0 && (
          <div className=" p-5 my-4  border-spacing-5">
            <div className="flex flex-row items-center justify-center">
              {editable && (
                <Button
                  className="bg-secondary font-bold"
                  onClick={(el) => {
                    setOpenDialog(true);
                  }}
                >
                  + Adicionar kit
                </Button>
              )}
            </div>
          </div>
        )}
        {process.env.NEXT_PUBLIC_MODE == "homolog" && (
          <QuoteKPIs quote={quote}></QuoteKPIs>
        )}

        <div className="flex  items-end justify-end my-2">
          <CardPrimary
            title="VALOR DO EQUIPAMENTO"
            className="w-full lg:w-[50%]"
          >
            <div className="flex justify-between p-2">
              <h2 className="text-primary font-bold text-lg  p-2 w-full">
                VALOR TOTAL DO KIT :
              </h2>
              <div className="font-bold text-xl p-2 bg-tertiary text-white rounded-md w-full flex justify-center">
                {formatPriceInCents(quote?.priceKitsFinalInCents ?? 0)}
              </div>
            </div>
          </CardPrimary>
        </div>
        {quote && user?.role?.name !== "integrator" && (
          <CardPrimary title="INFORMAÇÕES ADICIONAIS DO KIT" className="my-10">
            <QuoteDiscountCard
              quote={quote}
              setQuote={setQuoteAndSave}
              maxDiscount={maxDiscount}
              minContributionMargin={minContributionMargin}
              editable={editable || user?.role?.type == "director"}
            ></QuoteDiscountCard>
            <br></br>
          </CardPrimary>
        )}
        <ShippingEstimationCard
          editable={editable}
          fields={fields}
          onChangeShippingType={onChangeShippingType}
          quote={quote}
          setFields={setFields}
          setQuote={setQuoteAndSave}
        ></ShippingEstimationCard>

        <QuoteOtherServicesCard
          editable={editable}
          setQuote={setQuoteAndSave}
          quote={quote}
          variables={variables}
        ></QuoteOtherServicesCard>

        <br></br>
        <QuotePayment
          quote={quote}
          setQuote={setQuoteAndSave}
          editable={editable}
        ></QuotePayment>

        <br></br>

        {(user?.role?.name == "sales" ||
          user?.role?.name == "sales-leader" ||
          user?.role?.name == "director" ||
          user?.role?.name == "admin") && (
          <>
            <CardPrimary title="OBSERVAÇÕES INTERNAS">
              <InputTextarea
                setValue={(value: string) =>
                  setQuoteAndSave({ ...quote, obs: value })
                }
                value={quote.obs}
              ></InputTextarea>
            </CardPrimary>
            <br />
            <CardPrimary title="OBSERVAÇÕES NA NOTA">
              <InputTextarea
                setValue={(value: string) =>
                  setQuoteAndSave({ ...quote, invoiceObs: value })
                }
                value={quote.invoiceObs}
              ></InputTextarea>
            </CardPrimary>

            <br></br>

            <CardPrimary title="DESCONTO NO VALOR FINAL">
              <QuoteInputMoney
                label="Desconto final"
                value={quote.discountFinalValue}
                setValue={setDiscountFinalValue}
                disabled={
                  editable == false &&
                  user?.role?.type !== "director" &&
                  user?.role?.type !== "sales-leader"
                }
              ></QuoteInputMoney>
              {
                <>
                  {quote.kitFinalDiscountPercentage > maxDiscount && (
                    <p className="text-red-600">
                      Desconto muito alto ({" "}
                      {formatPercent(quote.kitFinalDiscountPercentage)}) -
                      (Máximo {formatPercent(maxDiscount)})
                    </p>
                  )}
                </>
              }
            </CardPrimary>
          </>
        )}

        {quote?.stage?.slug?.includes("summary") && (
          <>
            <CardPrimary title="ENDEREÇO DE FATURAMENTO" className="my-10">
              <p>{formatAddressSingleLine(quote?.invoiceAddress)}</p>
              <p className="m-2">
                {formatCityFullNameFromAddress(quote?.invoiceAddress)}
              </p>
            </CardPrimary>

            <CardPrimary title="ENDEREÇO DE ENTREGA" className="my-10">
              <p>{formatAddressSingleLine(quote?.shippingAddress)}</p>
              <p className="m-2">
                {formatCityFullNameFromAddress(quote?.shippingAddress)}
              </p>
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
                disabled={editable == false}
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
        <br></br>

        <QuoteKPIs quote={quote}></QuoteKPIs>
      </div>
    )
  );
}
