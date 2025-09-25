import { toHyphenatedCase } from "./format/to-hyphenated-case";

export default function formatValueFromField(field: any) {
  switch (field?.type) {
    case "price":
      return field.value ? field.value : 0;
      break;
    case "number":
      return parseFloat(field.value) ?? 0;
      break;
    case "integer":
      return parseInt(field.value) ?? 0;
      break;
    case "boolean":
      return field.value ? field.value : false;
      break;
    case "deviceType":
      return field.value ? toHyphenatedCase(field.value) : false;
      break;
    case "accessLevel":
      return field.value ? parseInt(field.value) : 0;
      break;

    case "cep":
      return field.value ? field.value?.replace(/\D/g, "") : "";
      break;

    case "cnpj":
      return field.value ? field.value?.replace(/\D/g, "") : "";
      break;
    case "cpf":
      return field.value ? field.value?.replace(/\D/g, "") : "";
      break;
    case "object":
      //s alert(JSON.stringify(field.value));
      return field.value && field.value !== "" ? field.value : null;
      break;
    default:
      return field.value ? field.value : null;
  }
}
