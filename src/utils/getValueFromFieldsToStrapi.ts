import { sub } from "date-fns";
import { toHyphenatedCase } from "./format/to-hyphenated-case";
import formatValueFromField from "./formatValueFromField";

export default function getValueFromFieldsToStrapi(fields: any) {
  let value: any = {};
  for (let i = 0; i < fields.length; i++) {
    let field = fields[i];
    if (!field.type.includes("object")) {
      value[field.name] = formatValueFromField(field);
    } else {
      let subfieldId = field.fields?.find((el: any) => el.name == "id");
      if (subfieldId)
        value[field.name] = formatValueFromField(subfieldId) ?? null;
    }
  }

  return value;
}
