import deviceTypes from "../deviceTypes";
import { toHyphenatedCase } from "./to-hyphenated-case";
import accessLevels from "../accessLevels";
import { formatDateTime } from "./format-date-time";
import { getExpirationDate } from "./get-expiration-date";
import { formatDate } from "./format-date";
import { formatShippingDate } from "./format-shipping-date";
import { formatCNPJ } from "./format-cnpj";
import { formatIe } from "./format-ie";

export function formatValuesToExcel(values: any[], fields: any[]): any[] {
  return values.map((value) => processFields(value, fields));
}

function processFields(value: any, fields: any[], prefix = ""): any {
  const item: any = {};

  fields.forEach((field) => {
    const fieldName = prefix ? `${prefix}-${field.label}` : field.label;

    if (!field.type?.includes("object")) {
      if (!field?.hideView && !field?.hide)
        item[fieldName] = formatValueFromField(value, field);
    } else if (field.fields?.length) {
      // Recursively process nested fields
      const nestedValue = value?.[field.name] ?? {};
      Object.assign(item, processFields(nestedValue, field.fields, fieldName));
    }
  });

  return item;
}

function formatValueFromField(value: any, field: any) {
  if (!field?.hideView && !field?.hide) {
    if (!field.type?.includes("object")) {
      if (field.type?.includes("deviceType")) {
        return deviceTypes.find(
          (el) => el.value === toHyphenatedCase(value?.[field.name])
        )?.label;
      }
    }

    if (field.type?.includes("accessLevel")) {
      return accessLevels.find(
        (el) => parseInt(el.value) === value?.[field.name]
      )?.label;
    }

    if (field.type === "variableType") {
      if (value[field.name] === "percentage") return "%";
      if (value[field.name] === "money") return "R$";
    }

    if (field.type === "variableValue") {
      //return formatDecimalBr(value?.[field.name]);
      return value?.[field.name];
    }
    if (field.type === "number" || field.type === "acVoltage") {
      // return formatDecimalBr(value?.[field.name]);
      return value?.[field.name];
    }

    if (field.type === "dcPowerWp") {
      // return formatDecimalBr(value?.[field.name] * 1000);
      return value?.[field.name] * 1000;
    }

    if (field.type === "price") {
      //return formatDecimalBr(value?.[field.name] / 100);
      return value?.[field.name] / 100;
    }

    if (field.type === "datetime") {
      return formatDateTime(value?.[field.name]);
    }

    if (field.type === "expirationDate") {
      return formatDateTime(getExpirationDate(value?.[field.name]) ?? "");
    }

    if (field.type === "date") {
      return formatDate(value?.[field.name]);
    }

    if (field.type === "shippingDate") {
      return formatShippingDate(value?.[field.name]);
    }

    if (field.type === "boolean") {
      return value?.[field.name] ? "Sim" : "Não";
    }

    if (field.type === "cnpj") {
      return formatCNPJ(value?.[field.name]);
    }

    if (field.type === "ie") {
      return formatIe(value?.[field.name]);
    }

    if (field.type === "image" && value?.[field.name]) {
      return `${process.env.NEXT_PUBLIC_API_URL}${value?.[field.name]}`;
    }

    return value?.[field.name];
  }

  return undefined; // Return undefined for hidden or unhandled fields
}
