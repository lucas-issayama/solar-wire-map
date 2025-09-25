export type PricesInputDataUpdate = {
    value?: number
    product?: number
    priceList?: number
    kit?: number
    enabled?: boolean
    productUid?: string
    uid?: string
    valueInCents?: number
    quoteItems?: {
      data:{
        id: number
      }
    }
  }

export type PricesUpdateResponse = {
    data:{
      updatePrice: {
        data: {
          id: string
          attributes: {
            value: number | null,
            valueInCents: number | null,
            product: {
              data?: {
                id: string,
                attributes: {
                  name: string | null,
                  description: string | null,
                  imageUrl: string | null,
                  cost: number | null,
                  dcPower: number | null,
                  inverterManufacturer: string | null
                  type: string | null
                }
              }
            }
          } 
        }
      }
    }
  }

export type PricesFormattedDataResponse = {
  id: string;
  value: number;
  productName: null | string;
  productCost: null | number;
  productImageUrl: null | string;
  productDescription: null | string;
}

export type PricesFetchResponse = {
    data: {
      prices: {
        data: Array<{
          id: string;
          attributes: {
            value: number;
            valueInCents: number;
            product: {
              data: {
                id: string;
                attributes: {
                  name: string;
                  description: string;
                  cost: number;
                  nModules: number;
                  acPower: number | null;
                  dcPower: number;
                  type: string;
                  inverterManufacturer: string | null;
                  overload: number | null;
                  kitItems: string | null;
                  moduleName: string | null;
                  imageUrl: string | null;
                };
              };
            };
          };
        }>;
        meta: {
          pagination: {
            total: number;
            page: number;
            pageCount: number;
            pageSize: number;
          };
        };
      };
    };
  };

  export type PricesFetchById = {
    data: {
      price: {
        data: {
          id: string
          attributes: {
            value: number
            valueInCents: number
            product: {
              data: {
                id: string
                attributes: {
                  name: string
                  description: string
                  imageUrl: string
                  cost: number
                  dcPower: number
                  inverterManufacturer: any
                  type: string
                }
              }
            }
          }
        }
      }
    }
  }