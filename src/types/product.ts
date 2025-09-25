import { Price, PriceList } from "./prices";

export interface Product {
  id: number;
  name: string;
  priceInCents: number;
  // price: number;
  //  priceId: number;
  imageUrl: string;
  description?: string;
  category?: string;
  code: string;
  cost: number;
  sapCode?: string;
  costInCents: number;
  dcPower?: number;
  acPower?: number;
  inverterManufacturer: string;
  manufacturerName: string;
  type: string;
  overload: number;
  //priceList: number;
  erpId: string;
  moduleId: number;
  inverterId: number;
  weight?: number;
  moduleName: string;
  structureType: string;
  structureName: string;
  kitItems?: KitItem[];
  price?: Price;
  prices: Price[];
  image?: {
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
    };
  };
  nModules?: number;
  length?: number;
  stockQuantity?: number;
}

export interface KitItem {
  productId: number;
  productName: string;
  productManufacturerName: string;
  quantity: number;
}

export interface ProductInCart extends Product {
  quantity: number;
}

export interface ProductFetchResponse {
  data: {
    product: {
      data: ProductAns;
    };
  };
}

export interface ProductAns {
  id: number;
  attributes: {
    name: string;
    priceInCents: number;
    price: number;
    imageUrl: string;
    description?: string;
    category?: string;
    cost: number;
    dcPower: number;
    acPower?: number;
    inverterManufacturer: string;
    type: string;
    overload: number;
  };
}

export interface ProductsFetchResponse {
  data: {
    products: {
      data: ProductAns[];
      meta: {
        pagination: {
          total: number | undefined;
          page: number | undefined;
          pageSize: number | undefined;
          pageCount: number | undefined;
        };
      };
    };
  };
}

export interface PriceFetchResponse {
  data: {
    price: {
      data: PriceAns;
    };
  };
  meta: {
    pagination: {
      total: number;
      page: number;
      pageSize: number;
      pageCount: number;
    };
  };
}

export interface PriceAns {
  id: number;
  attributes: {
    value: number;
    priceList: {
      id: number;
    };
    product: {
      name: string;
      priceInCents: number;
      price: number;
      imageUrl: string;
      description?: string;
      category?: string;
      cost: number;
      dcPower: number;
      inverterManufacturer: string;
      type: string;
    };
  };
}

export interface PricesFetchResponse {
  data: {
    prices: {
      data: PriceAns[];
      meta: {
        pagination: {
          total: number | undefined;
          page: number | undefined;
          pageSize: number | undefined;
          pageCount: number | undefined;
        };
      };
    };
  };
}

export interface ProductsUpdateInput {
  name?: string;
  cost?: number;
  erpId?: string;
  unit?: string;
  items?: string[] | number[];
  prices?: string[] | number[];
  cable?: string | number;
  clamp?: string | number;
  connector?: string | number;
  inverter?: string | number;
  module?: string | number;
  rail?: string | number;
  railConnector?: string | number;
  stringbox?: string | number;
  support?: string | number;
  type?:
    | "cable"
    | "clamp"
    | "connector"
    | "inverter"
    | "module"
    | "rail"
    | "rail_connector"
    | "stringbox"
    | "support"
    | "kit";
  uid?: string;
  dcPower?: number;
  inverterManufacturer?: string;
  moduleName?: string;
  overload?: number;
  imageUrl?: string;
  acPower?: number;
  description?: string;
  manufacturerName?: string;
  code?: string;
  structure?: string | number;
  nModules?: number;
  inverterId?: number;
  moduleId?: number;
  structureType?: string;
  dcMinPower?: number;
  dcMaxPower?: number;
  params?: string;
  image?: string | number;
  thumbnailUrl?: string;
  structureName?: string;
}

export interface ProductsUpdateResponse {
  data: {
    updateProduct: {
      data: {
        id: string;
        attributes: {
          name: string | null;
          cost: number | null;
          erpId: string | null;
          unit: string | null;
          type: string | null;
          uid: string | null;
          dcPower: number | null;
          inverterManufacturer: string | null;
          moduleName: string | null;
          overload: number | null;
          imageUrl: string | null;
          acPower: number | null;
          description: string | null;
          manufacturerName: string | null;
          code: string | null;
          nModules: number | null;
          inverterId: number | null;
          moduleId: number | null;
          structureType: string | null;
          dcMinPower: number | null;
          dcMaxPower: number | null;
          thumbnailUrl: string | null;
          params: string | null;
          kitItems: string | null;
          structureName: string | null;
        };
      };
    };
  };
}
