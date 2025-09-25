"use client";
import CardPrimary from "@/components/ui/card-primary";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { QuoteEstimationZipCode } from "./quote-estimation-zip-code";
import { schemas } from "@/types/schemas/schemas";
import { Quote } from "@/types/quote";
import corsolarApi from "@/utils/corsolar/corsolarApi";
import { City } from "@/types/city";
import quoteRecalc from "@/utils/quoteFunctions/quoteRecalc";
import updatedFieldsFromObject from "@/utils/updatedFieldsFromObject";
import FieldSelectData from "../field-inputs/field-select-data";
import { formatPriceInCents } from "@/utils/format/format-price-in-cents";
import DialogEditShippingPrice from "../dialogs/dialog-edit-shipping-price";
import { useState } from "react";
import { EditIcon } from "lucide-react";
import getAccessLevelFromRole from "@/utils/getAccessLevelFromRole";
import useSession from "@/components/session/use-session";

interface ShippingEstimationCardProps {
  editable: boolean;
  quote: any;
  onChangeShippingType: any;
  setQuote: any;
  fields: any;
  setFields: any;
}

export default function ShippingEstimationCard({
  editable,
  quote,
  setQuote,
  onChangeShippingType,
  fields,
  setFields,
}: ShippingEstimationCardProps) {
  const [openModalEditShippingPrice, setOpenModalEditShippingPrice] =
    useState(false);

  const { session, isLoading } = useSession();
  const { user } = session;

  function formatAddress(address: any) {
    let addressArray: Array<string> = [];
    if (address) {
      if (address.streetAddress) addressArray.push(address.streetAddress);
      if (address.streetAddressNumber)
        addressArray.push(address.streetAddressNumber);
      if (address.neighborhood) addressArray.push(address.neighborhood);
      if (address.zipCode) addressArray.push(address.zipCode);

      return addressArray?.join(", ");
    }
  }

  const router = useRouter();

  async function setQuoteEstimationZipCode(updatedQuote: Quote) {
    let city: City = await corsolarApi.cities.getByName(
      session?.token,
      `${updatedQuote.shippingEstimationCityName} - ${updatedQuote.shippingEstimationStateShortName}`
    );

    if (city?.id) {
      let finalUpdatedQuote = quoteRecalc({
        ...updatedQuote,
        shippingEstimationCity: city,
        shippingEstimationCityName: city.name,
        shippingEstimationStateShortName: city.stateShortName,
      });
      setQuote(finalUpdatedQuote);
      setFields(updatedFieldsFromObject(fields, finalUpdatedQuote));
    } else {
      let finalUpdatedQuote = quoteRecalc({
        ...updatedQuote,
        shippingEstimationCity: undefined,
      });
      setQuote(finalUpdatedQuote);
      setFields(updatedFieldsFromObject(fields, finalUpdatedQuote));
    }
  }

  return (
    <>
      <DialogEditShippingPrice
        open={openModalEditShippingPrice}
        setOpen={setOpenModalEditShippingPrice}
        quote={quote}
        setQuote={setQuote}
      ></DialogEditShippingPrice>
      <CardPrimary title="TIPO DE ENTREGA" className="my-10 ">
        {!quote.shippingAddress?.zipCode && (
          <div className="block lg:flex px-5 ">
            <div className=" px-2 mt-4 border-spacing-5 w-full">
              <p className="text-primary font-bold">TIPO</p>
              <Select
                value={quote?.shippingType?.toString() ?? ""}
                onValueChange={onChangeShippingType}
                disabled={editable == false}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="CIF ou FOB" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cif">CIF</SelectItem>
                  <SelectItem value="fob">FOB</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="px-2  mb-6 border-spacing-5 w-full">
              {quote?.shippingType == "cif" && (
                <QuoteEstimationZipCode
                  quote={quote}
                  setQuote={setQuote}
                  setQuoteEstimationZipCode={setQuoteEstimationZipCode}
                  disabled={editable == false}
                ></QuoteEstimationZipCode>
              )}
            </div>
            {quote &&
              quote.shippingType == "cif" &&
              !quote.shippingAddress?.zipCode && (
                <div className="w-full mt-4 pr-2">
                  <FieldSelectData
                    editable={editable}
                    schema={schemas.city}
                    label="CIDADE ESTIMATIVA"
                    value={quote.shippingEstimationCity}
                    setValue={(value: any) => {
                      let dataToUpdate = { ...quote };
                      dataToUpdate.shippingEstimationCity = value;
                      dataToUpdate.shippingEstimationStateShortName =
                        value?.stateShortName;
                      dataToUpdate.shippingEstimationCityName = value?.name;
                      dataToUpdate.shippingEstimationZipCode = "";
                      setQuote(quoteRecalc({ ...quote, ...dataToUpdate }));
                    }}
                  ></FieldSelectData>
                </div>
              )}

            {(quote &&
            !quote.shippingAddress?.zipCode &&
            quote?.shippingEstimationPriceInCents
              ? true
              : false) && (
              <div className="w-full p-4">
                <div className="font-bold text-xl p-2 bg-tertiary text-white rounded-md w-full flex justify-center mt-4">
                  {(quote.manPriceShippingInCents ? false : true) && (
                    <span>
                      {formatPriceInCents(
                        quote?.shippingEstimationPriceInCents
                      )}
                    </span>
                  )}
                  {(quote.manPriceShippingInCents ? true : false) && (
                    <span>
                      {formatPriceInCents(quote?.priceShippingInCents)}
                    </span>
                  )}

                  {getAccessLevelFromRole(user?.role?.type) >= 3 && (
                    <EditIcon
                      className="cursor-pointer"
                      onClick={(ev) => setOpenModalEditShippingPrice(true)}
                    ></EditIcon>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
        {quote.shippingAddress?.zipCode && (
          <div className=" ">
            <div className="px-5">
              <p>{formatAddress(quote.shippingAddress)}</p>
            </div>
            <div className="block lg:flex px-5 ">
              <div className=" px-2 mt-4 border-spacing-5 w-full">
                <p className="text-primary font-bold">TIPO</p>
                <Select
                  value={quote?.shippingType?.toString() ?? ""}
                  onValueChange={onChangeShippingType}
                  disabled={editable == false}
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
              </div>

              <div className="w-full p-4">
                <div className="font-bold text-xl p-2 bg-tertiary text-white rounded-md w-full flex justify-center mt-4">
                  {formatPriceInCents(quote?.priceShippingInCents)}
                  {getAccessLevelFromRole(user?.role?.type) >= 3 && (
                    <EditIcon
                      className="cursor-pointer"
                      onClick={(ev) => setOpenModalEditShippingPrice(true)}
                    ></EditIcon>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardPrimary>
    </>
  );
}
