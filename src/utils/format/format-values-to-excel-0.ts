import moment from "moment";
import deviceTypes from "../deviceTypes";
import { toHyphenatedCase } from "./to-hyphenated-case";
import accessLevels from "../accessLevels";
import { formatDecimalBr } from "./format-decimal-br";
import { formatPriceInCents } from "./format-price-in-cents";
import { formatDateTime } from "./format-date-time";
import { getExpirationDate } from "./get-expiration-date";
import { formatDate } from "./format-date";
import { formatShippingDate } from "./format-shipping-date";
import { formatCNPJ } from "./format-cnpj";
import { formatIe } from "./format-ie";

export function formatValuesToExcel(values: any, fields: any) {
  let items: any = [];
  for (let i = 0; i < values.length; i++) {
    let value = values[i];
    let item: any = {};
    for (let j = 0; j < fields?.length; j++) {
      let field = fields[j];
      if (!field.type?.includes("object")) {
        item[field.label] = formatValueFromField(value, field);
      } else {
        // if (i == 0) {
        //   console.log("subfields");
        //   console.log(JSON.stringify(field.fields));
        //   console.log(`Length: ${field.fields?.length}`);
        // }
        for (let k = 0; k < field.fields?.length; k++) {
          let subfield = field.fields[k];
          if (!subfield?.hideView && !subfield?.hide)
            item[`${field.label}-${subfield.label}`] = formatValueFromField(
              value?.[field.name],
              subfield
            );
        }
      }
    }
    items.push(item);
  }
  return items;
}

function formatValueFromField(value: any, field: any) {
  if (!field?.hideView && !field?.hide) {
    if (!field.type?.includes("object")) {
      if (field.type?.includes("deviceType")) {
        return deviceTypes.find(
          (el) => el.value == toHyphenatedCase(value?.[field.name])
        )?.label;
      }
    }

    if (field.type?.includes("accessLevel")) {
      accessLevels.find((el) => parseInt(el.value) == value?.[field.name])
        ?.label;
    }

    if (field.type == "variableType") {
      if (value[field.name] == "percentage") return "%";
      if (value[field.name] == "money") return "R$";
    }

    if (field.type == "variableValue") {
      return formatDecimalBr(value?.[field.name]);
    }
    if (field.type == "number" || field.type == "acVoltage") {
      return formatDecimalBr(value?.[field.name]);
    }

    if (field.type == "dcPowerWp") {
      return formatDecimalBr(value?.[field.name] * 1000);
    }

    if (field.type == "price") {
      return formatPriceInCents(value?.[field.name]);
    }

    if (field.type == "datetime") {
      return formatDateTime(value?.[field.name]);
    }

    if (field.type == "expirationDate") {
      return formatDateTime(getExpirationDate(value?.[field.name]) ?? "");
    }

    if (field.type == "date") {
      return formatDate(value?.[field.name]);
    }

    if (field.type == "shippingDate") {
      return formatShippingDate(value?.[field.name]);
    }

    if (field.type == "boolean") {
      return value?.[field.name] ? "Sim" : "Não";
    }

    if (field.type == "cnpj") {
      return formatCNPJ(value?.[field.name]);
    }

    if (field.type == "ie") {
      return formatIe(value?.[field.name]);
    }

    if (field.type == "image" && value?.[field.name]) {
      return `${process.env.NEXT_PUBLIC_API_URL}${value?.[field.name]}`;
    }

    return value?.[field.name];
  }

  //       {field.type?.includes("object") &&
  //         field.fields &&
  //         field?.fields?.map((subfield: any, index: number) => (
  //           <GraphqlDataTd
  //             key={`${field.name}${subfield.name}`}
  //             field={subfield}
  //             parentField={field}
  //             value={value?.[field?.name]}
  //           ></GraphqlDataTd>
  //         ))}
  //     </>
  //   )}
  // </>
}
