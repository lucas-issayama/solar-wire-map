import { toHyphenatedCase } from "./format/to-hyphenated-case";
import formatValueFromField from "./formatValueFromField";

export default function getValueFromFields(fields: any) {
  let value: any = {};
  for (let i = 0; i < fields.length; i++) {
    let field = fields[i];

    if (!field.type.includes("object")) {
      //value[field.name] = field.value;
      value[field.name] = formatValueFromField(field);
    } else {
      value[field.name] = getValueFromFields(field.fields);
    }
  }

  return value;
}
