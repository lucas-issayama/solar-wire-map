"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import FieldInputData from "../field-inputs/field-input-data";
import { schemas } from "@/types/schemas/schemas";
import { formatAddressSingleLine } from "@/utils/format/format-address-single-line";

export default function QuoteCardSelectAddress({
  fieldsFromParent,
  handleClickItem,
  quote,
  setQuote,
  addressFieldName,
}: any) {
  const router = useRouter();

  return (
    <div className="">
      {quote?.billingEntity == "enterprise" && (
        <FieldInputData
          schema={schemas.address}
          label="Endereço de faturamento"
          value={quote[addressFieldName]}
          setValue={(value: any) => {
            let dataToUpdate = { ...quote };
            dataToUpdate[addressFieldName] = value;
            setQuote({ ...dataToUpdate });
          }}
          fieldsFromParent={[
            {
              name: "type",
              label: "Tipo",
              editable: false,
              hide: true,
              type: "string",
              value: addressFieldName?.includes("invoice")
                ? "invoice"
                : "shipping",
              filter: {
                eq: addressFieldName?.includes("invoice")
                  ? "invoice"
                  : "shipping",
              },
            },
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
        ></FieldInputData>
      )}

      {quote?.billingEntity == "contact" && quote.contact && (
        <FieldInputData
          schema={schemas.address}
          label="Endereço de faturamento"
          value={quote[addressFieldName]}
          setValue={(value: any) => {
            let dataToUpdate = { ...quote };
            dataToUpdate[addressFieldName] = value;
            setQuote({ ...dataToUpdate });
          }}
          fieldsFromParent={[
            {
              name: "type",
              label: "Tipo",
              editable: false,
              hide: true,
              type: "string",
              value: addressFieldName?.includes("invoice")
                ? "invoice"
                : "shipping",
              filter: {
                eq: addressFieldName?.includes("invoice")
                  ? "invoice"
                  : "shipping",
              },
            },
            {
              name: "contact",
              label: "Contato",
              type: "object",
              editable: false,
              //hide: true,

              filter: { id: { eq: quote?.contact?.id } },
              object: {
                name: "contact",
                singular: "contact",
                plural: "contacts",
                label: "Contato",
              },
              fields: [
                {
                  name: "id",
                  label: "Id",
                  type: "number",
                  value: quote?.contact?.id,
                },
                {
                  name: "name",
                  label: "Nome",
                  type: "string",
                  value: quote?.contact?.name,
                },
              ],
            },
          ]}
        ></FieldInputData>
      )}
      {quote?.[addressFieldName] && (
        <p className="m-2">
          {formatAddressSingleLine(quote[addressFieldName])}
        </p>
      )}
    </div>
  );
}
