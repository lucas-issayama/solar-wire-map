import { formatPriceInCents } from "@/utils/format/format-price-in-cents";
import { formatDate } from "@/utils/format/format-date";
import { formatDateTime } from "@/utils/format/format-date-time";
import { formatCNPJ } from "@/utils/format/format-cnpj";
import { formatIe } from "@/utils/format/format-ie";
import { formatShippingDate } from "@/utils/format/format-shipping-date";
import deviceTypes from "@/utils/deviceTypes";
import { formatDecimalBr } from "@/utils/format/format-decimal-br";
import { toHyphenatedCase } from "@/utils/format/to-hyphenated-case";
import accessLevels from "@/utils/accessLevels";
import { getExpirationDate } from "@/utils/format/get-expiration-date";

export default function GraphqlDataTd({ value, field, parentField }: any) {
  return (
    <>
      {!field?.hideView && !field?.hide && (
        <>
          {!field.type?.includes("object") && (
            // <td className={`p-4 w-[${300 * (field?.size ?? 1)}px]`}>
            <td className={`p-4`}>
              {(field.type == "string" ||
                field.type == "inverterManufacturer" ||
                field.type == "moduleManufacturer" ||
                field.type == "moduleName" ||
                field.type == "structureType" ||
                field.type == "structureName" ||
                field.type == "integer") && <span>{value?.[field.name]}</span>}

              {field.type?.includes("deviceType") && (
                <span>
                  {
                    deviceTypes.find(
                      (el) => el.value == toHyphenatedCase(value?.[field.name])
                    )?.label
                  }
                </span>
              )}

              {field.type?.includes("accessLevel") && (
                <span>
                  {
                    accessLevels.find(
                      (el) => parseInt(el.value) == value?.[field.name]
                    )?.label
                  }
                </span>
              )}

              {field.type == "variableType" && (
                <>
                  {value[field.name] == "percentage" && <span>%</span>}
                  {value[field.name] == "money" && <span>R$</span>}
                </>
              )}
              {field.type == "variableValue" && (
                <span>{formatDecimalBr(value?.[field.name])}</span>
              )}

              {(field.type == "number" || field.type == "acVoltage") && (
                <span>{formatDecimalBr(value?.[field.name])}</span>
              )}

              {field.type == "percentage" && (
                <span>{formatDecimalBr(value?.[field.name] * 100)}</span>
              )}

              {field.type == "dcPowerWp" && (
                <span>{formatDecimalBr(value?.[field.name] * 1000)}</span>
              )}
              {field.type == "price" && (
                <span>{formatPriceInCents(value?.[field.name])}</span>
              )}
              {field.type == "datetime" && (
                <span>{formatDateTime(value?.[field.name])}</span>
              )}
              {field.type == "expirationDate" && (
                <span>
                  {formatDateTime(getExpirationDate(value?.[field.name]) ?? "")}
                </span>
              )}
              {field.type == "date" && (
                <span>{formatDate(value?.[field.name])}</span>
              )}
              {field.type == "shippingDate" && (
                <span>{formatShippingDate(value?.[field.name])}</span>
              )}
              {field.type == "boolean" && (
                <span>{value?.[field.name] ? "Sim" : "Não"}</span>
              )}
              {field.type == "cnpj" && (
                <span>{formatCNPJ(value?.[field.name])}</span>
              )}
              {field.type == "ie" && (
                <span>{formatIe(value?.[field.name])}</span>
              )}
              {field.type == "image" && value?.[field.name] && (
                <img
                  width={30}
                  src={`${process.env.NEXT_PUBLIC_API_URL}${
                    value?.[field.name]
                  }`}
                ></img>
              )}
            </td>
          )}
          {field.type?.includes("object") &&
            field.fields &&
            field?.fields?.map((subfield: any, index: number) => (
              <GraphqlDataTd
                key={`${field.name}${subfield.name}`}
                field={subfield}
                parentField={field}
                value={value?.[field?.name]}
              ></GraphqlDataTd>
            ))}
        </>
      )}
    </>
  );
}
