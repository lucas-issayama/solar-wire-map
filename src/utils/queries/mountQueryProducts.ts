import { FilterStructure } from "@/contexts/filter-product-context-provider";

import { Manufacturer } from "@/types/manufacturer";
import { Product } from "@/types/product";
import { SortTypes } from "@/types/sort-types";
import { User } from "@/types/users";

export const mountQueryProducts = (
  type: string,
  sortBy: SortTypes,
  manufacturers: Manufacturer[],
  user: User | undefined
) => {
  let sort = [];
  let manufacturersFilterActive = manufacturers.filter((el) => el.filterActive);
  let filters: any = {};

  if (manufacturersFilterActive.length > 0) {
    filters = {
      inverterManufacturer: {
        in: manufacturersFilterActive.map((el) => el.name?.toUpperCase()),
      },
    };
  }
  sort.push("inverterManufacturer");
  //sort.push("inverter.manufacturerName");
  if (sortBy == SortTypes.LATEST) sort.push("createdAt:desc");
  if (sortBy == SortTypes.PRICE_HIGH_TO_LOW_PRICE) sort.push("cost:desc");
  if (sortBy == SortTypes.PRICE_LOW_TO_HIGH) sort.push("cost");

  return {
    query: `
      query products($filters:ProductFiltersInput!, $sort:[String]){
        products(filters:$filters, sort:$sort, pagination:{pageSize:12}){
            meta{
              pagination{
                total
                page
                pageSize
                pageCount
              }
            }  
            data{
              id
              attributes{
                name
                description
                cost
                nModules
                acPower
                dcPower
                type
                inverterManufacturer
                
              }
            }
          }
        }
  `,

    variables: {
      filters,
      sort,
    },
  };
};
