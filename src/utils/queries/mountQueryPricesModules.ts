import { User } from "@/types/users";

export const mountQueryPricesModules = () => {
  let sort = [];

  let filters: any = {
    enabled: { eq: true },
    product: {
      and: [
        { type: { eq: "module" } },
        // {
        //   or: [
        //     { id: { eq: 400001002 } },
        //     { id: { eq: 400000997 } },
        //     { id: { eq: 400000957 } },
        //     { id: { eq: 400000920 } },
        //   ],
        // },.
        {
          enabled: { eq: true },
          enabledOnKits: { eq: true },
        },
      ],
    },
  };

  // filters.priceList = { id: { eq: user?.enterprise?.priceList?.id } };

  //filters.enabled = { eq: true };
  sort.push("product.manufacturerName");

  sort.push("product:dcPower");

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
                costInCents
                sku
                priceList{
                  data{
                      id
                      attributes{
                        name
                        shippingDate
                      }
                    }
                }
                product{
                  data{
                    id
                    attributes{
                      label
                      erpId
                      name
                      dcPower
                      manufacturerName
                      code
                      cost
                      costInCents
                      type
                      height
                      width
                      module{
                        data{
                            id
                            attributes{
                                name
                                isc
                                vmp
                                voc
                                coefVoc
                                dcPower
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
      pagination: { pageSize: 50, page: 1 },
    },
  };
};
