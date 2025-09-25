import { filter } from "mathjs";

export function customFilterChange(filters: any, schema: any) {
  if (schema.singular == "enterprise") {
    if (filters?.email?.containsi) {
      // alert(filters?.email?.containsi);
      let filterToAdd: any = { or: [] };
      filterToAdd.or.push({
        users: {
          email: {
            containsi: filters?.email?.containsi,
          },
        },
      });

      filterToAdd.or.push({
        email: {
          containsi: filters?.email?.containsi,
        },
      });

      return { ...filters, email: {}, ...filterToAdd };
    }
  }

  return filters;
}
