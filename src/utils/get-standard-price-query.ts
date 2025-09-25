export default function getStandardPriceQuery(
  page: number,
  pageSize: number,
  sort: string,
  sortDesc: boolean
) {
  var query = `query prices($filters:PriceFiltersInput!){
  prices( sort:"${sort}${
    sortDesc ? ":desc" : ""
  }" filters:$filters ,pagination:{page:${page},pageSize:${pageSize}}){
      meta {
        pagination {
          total
          pageSize
          page
          pageCount
        }
      }
      data {
        id
        attributes {
          value
          valueInCents
          costInCents
          sku
          priceList {
            data {
              id
              attributes {
                name
                shippingDate
              }
            }
          }
          product {
            data {
              id
              attributes {
                erpId
                name
                dcPower
                manufacturerName
                code
                cost
                costInCents
                type
                voltageType
                length
                gauge
                color
              }
            }
          }
        }
      }
    }
}
`;

  return query;
}
