import { Quote, QuoteItem } from "@/types/quote";
import axios from "axios";
import sanitize from "../sanitize";
import { checkPrimeSync } from "crypto";

const REVALIDATE_TIME = 600; // Cache for 10 min

function getUniqueStrings(arr: any) {
  return Array.from(new Set(arr));
}

const inverters = {
  //Via server
  async getManufacturerNames() {
    console.log("getManufacturerNames");

    let filters: any = {
      enabled: { eq: true },
      product: {
        and: [{ type: { eq: "inverter" } }, { enabledOnKits: { eq: true } }],
      },
    };

    let query = `
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
                priceList{
                  data{
                      id
                      attributes{
                        name
                      }
                    }
                }
                product{
                  data{
                    id
                    attributes{
                      manufacturerName
                    }
                  }
                }
              }
            }
          }
        }
    `;

    let variables = {
      filters,
      sort: ["manufacturerName"],
      pagination: { pageSize: 200, page: 1 },
    };

    const graphqlPayload = {
      query,
      variables,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
          },
          body: JSON.stringify(graphqlPayload),
          next: { revalidate: REVALIDATE_TIME }, // revalidate every 10 seconds
        }
      );

      if (!response.ok) {
        const errorBody = await response.text();
        console.error(
          `GraphQL fetch failed with status ${response.status}: ${errorBody}`
        );
        throw new Error(
          `GraphQL request failed: ${response.status} - ${response.statusText}`
        );
      }

      const ans = await response.json();

      let values = sanitize(ans?.data?.prices?.data);

      let manufacturers = values
        .map((el: any) => el?.product?.manufacturerName)
        .filter((el: string) => el !== "SOLIS");

      manufacturers = getUniqueStrings(manufacturers);
      console.log(JSON.stringify({ manufacturers }));

      return manufacturers;
    } catch (error: any) {
      console.error("Error fetching manufacturer names:", error);
      return false;
    }
  },
  //Only on configurator
  async getFromManufacturer(manufacturerName: string) {
    console.log(JSON.stringify({ manufacturerName }));
    try {
      let ans = await axios.get(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/api/inverters?filters[manufacturerName][$eq]=${
          manufacturerName == "none" ? "" : manufacturerName
        }&pagination[pageSize]=200&sort[1]=acPower:asc`,

        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
          },
        }
      );

      //console.log(JSON.stringify({ ans }));
      let pagination = ans?.data?.data?.meta?.pagination;
      let values = sanitize(ans?.data?.data);

      console.log(JSON.stringify(values));
      // let toHide = ["SUNGROW", "HUAWEI", "REFUSOL"];
      // return values?.filter((el: string) => toHide.find((i) => el !== i));
      return values;
    } catch (error: any) {
      return false;
    }
  },
};

export default inverters;
