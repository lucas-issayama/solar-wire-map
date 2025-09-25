import { FilterStructure } from "@/contexts/filter-product-context-provider";
import { Manufacturer } from "@/types/manufacturer";
import { SortTypes } from "@/types/sort-types";
import { User } from "@/types/users";

import businessUnit from "../global/businessUnit";

function getArrayManufacturers(array: string[]) {
  let hasCordeiroSolis = array.find((el) => el == "CORDEIRO-SOLIS");
  if (hasCordeiroSolis) return [...array, "SOLIS"];
  else return array;
}

export const mountQueryPrices = (
  type: string,
  page: number,
  pageSize: number,
  sortBy: SortTypes,
  manufacturers: Manufacturer[],
  user: User | undefined,
  dcPowerMin: number | undefined,
  dcPowerMax: number | undefined,
  overloadMin: number | undefined,
  overloadMax: number | undefined,
  modules: any,
  structures: FilterStructure[],
  filterInverterTypes: any,
  filterAcVoltage: any,
  filterAcPhases: any
) => {
  let sort = [];
  let manufacturersFilterActive = manufacturers.filter((el) => el.filterActive);
  let modulesFilterActive = modules?.filter((el: any) => el.filterActive);
  let structuresFilterActive = structures?.filter((el: any) => el.filterActive);

  let filterType: any;

  if (type == "accessory") {
    filterType = {
      in: ["clamp", "connector", "rail", "rail-connector", "support"],
    };
  } else {
    filterType = { eq: type };
  }

  let filters: any = {
    businessUnit: { containsi: businessUnit },
    enabled: { eq: true },
    valueInCents: { gt: 0 },
    //FilterEnabledProduct - necessario ajustar a funcao createKits e inserir o campo enabled no Product tipo kit
    //---
    //product: { and: [{ type: filterType }, { enabled: { eq: true } }] },
    and: [
      { product: { type: filterType } },
      { product: { enabled: { eq: true } } },
    ],
  };

  if (type == "kit") {
    if (manufacturersFilterActive.length > 0) {
      filters.and.push({
        product: {
          inverterManufacturer: {
            in: getArrayManufacturers(
              manufacturersFilterActive.map((el) => el.name?.toUpperCase())
            ),
          },
        },
      });
    }

    if (modulesFilterActive.length > 0) {
      filters.and.push({
        or: modulesFilterActive.map((el: any) => ({
          modulePriceId: { eq: el.price?.id },
        })),
      });
    }

    if (filterInverterTypes?.filter((el: any) => el.filterActive)?.length > 0) {
      filters.and.push({
        product: {
          or: filterInverterTypes
            .filter((el: any) => el.filterActive)
            .map((el: any) => ({ inverterType: { eq: el.value } })),
        },
      });
    }

    if (filterAcVoltage?.filter((el: any) => el.filterActive)?.length > 0) {
      filters.and.push({
        product: {
          or: filterAcVoltage
            .filter((el: any) => el.filterActive)
            .map((el: any) => ({ acVoltage: { eq: el.value } })),
        },
      });
    }

    if (filterAcPhases?.filter((el: any) => el.filterActive)?.length > 0) {
      filters.and.push({
        product: {
          or: filterAcPhases
            .filter((el: any) => el.filterActive)
            .map((el: any) => ({ acPhases: { eq: el.value } })),
        },
      });
    }

    if (dcPowerMin !== undefined) {
      filters.and.push({ product: { dcPower: { gte: dcPowerMin / 100 } } });
    }

    if (dcPowerMax !== undefined) {
      filters.and.push({ product: { dcPower: { lte: dcPowerMax / 100 } } });
    }
    if (overloadMin !== undefined && overloadMin > 0) {
      filters.and.push({ product: { overload: { gte: overloadMin / 100 } } });
    }

    if (overloadMax !== undefined) {
      filters.and.push({ product: { overload: { lte: overloadMax / 100 } } });
    }
  }
  filters.priceList = { enabled: { eq: true } };
  sort.push("inverterManufacturer");

  //---create sort
  if (sortBy == SortTypes.LATEST) sort.push("createdAt:desc");
  if (sortBy == SortTypes.PRICE_HIGH_TO_LOW_PRICE) sort.push("value:desc");
  if (sortBy == SortTypes.PRICE_LOW_TO_HIGH) sort.push("value");
  // costInCents
  //cost
  return {
    query: `
      query prices($filters: PriceFiltersInput!, $sort:[String], $pagination:PaginationArg ){
        prices(filters:$filters, sort:$sort, pagination:$pagination ){
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
                value
                valueInCents
                sku
                priceList{
                  data{
                      id
                      attributes{
                        name
                        shippingDate
                        tag{
                          data{
                            id
                            attributes{
                              formats
                            }
                          }
                        }
                      }
                    }
                }
                product{
                  data{
                    id
                    attributes{
                      name
                      description
                      nModules
                      acPower
                      dcPower
                      type
                      inverterManufacturer
                      manufacturerName
                      overload
                      moduleName
                      structureType
                      structureName
                      moduleId
                      kitItems
                      image{
                        data{
                          id
                          attributes{
                            formats
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
    `,
    variables: {
      filters,

      sort,
      pagination: { pageSize, page },
    },
  };
};
