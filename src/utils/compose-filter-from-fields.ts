export function composeFilterFromFields(fields: any[]) {
  let filters: any = {};

  for (let i = 0; i < fields.length; i++) {
    let field = fields[i];

    if (field.name == "shippingDate") {
      if (field.filter?.lte || field.filter?.gte) {
        let filter1: any = {};
        filter1[field.name] = field.filter;

        let filter2: any = {};
        filter2[field.name] = null;

        filters.or = [filter1, filter2];
      }
    } else {
      if (field.type !== "object-exploded" && field.filter) {
        filters[field.name] = field.filter;
      }
      if (field.type == "object-exploded" && field.fields) {
        filters[field.name] = composeFilterFromFields(field.fields);
      }
    }
  }

  return filters;
}
