import { toHyphenatedCase } from "./format/to-hyphenated-case";
import { toSnakeCase } from "./format/to-snake-case";

export default function updatedFieldsFromObject(fields: any, object: any) {
  for (let i = 0; i < fields.length; i++) {}

  return fields.map((field: any) => ({
    ...field,
    value: formatValueFromField(field, object),
    fields: field.type.includes("object")
      ? updatedFieldsFromObject(field.fields, object?.[field.name])
      : {},
  }));
}

function formatValueFromField(field: any, object: any) {
  if (field.type.includes("object")) return "";

  if (field.type == "deviceType") return toHyphenatedCase(object?.[field.name]);

  return object?.[field.name];
}
