export default function fieldsArrayToJson(fields: any) {
  const result: any = {
    data: {
      id: 0,
      attributes: {},
    },
  };
  fields.forEach((field: any) => {
    if (field.type.includes("object") && field.fields) {
      result.data.attributes[field.name] = fieldsArrayToJson(field.fields);
    } else {
      if (field.name !== "id") result.data.attributes[field.name] = field.value;
    }
  });
  return result;
}
