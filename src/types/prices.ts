import { Product } from "./product";

export interface Price {
  data?: any;
  id: number;
  valueInCents: number;
  priceList?: PriceList;
  product?: Product;
  costInCents?: number;
  sku?: string;
  availableQuantity?: number;
}

export interface PriceList {
  id: number;
  name: string;
  shippingDate: string;
  tag?: {
    url: string;
    formats: {
      large: {
        url: string;
      };
      small: {
        url: string;
      };
      medium: {
        url: string;
      };
      thumbnail: {
        url: string;
      };
    };
  };
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
