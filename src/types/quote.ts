export interface Quote {
  id?: number;
  version?: number;
  name?: string;
  priceInCents: number;
  createdAt: string;
  updatedAt?: string;
  synced?: boolean;
  enterpriseId?: number;
  enterprise: any;
  creatorId?: number;
  paymentDays?: number;
  priceShippingInCents?: number;
  manPriceShippingInCents?: number;
  priceItemsInCents?: number;
  priceKitsInCents: number;
  priceKitsFinalInCents: number;
  dcPower: number;
  stageId?: number;
  invoiceAddress?: Address;
  shippingAddress?: Address;
  shippingEstimationZipCode?: string;
  shippingEstimationCityName?: string;
  shippingEstimationStateShortName?: string;
  shippingEstimationPriceInCents?: number;
  shippingEstimated?: boolean;
  shippingEstimationCity?: City;
  shippingAddressInfo?: string;
  quoteKits?: QuoteKit[];
  shippingDate?: any;
  priceListJson?: any;
  activeShippingAssistant?: boolean;
  priceShippingAssistantInCents: number;
  activeEngineeringInsurance: boolean;
  priceEngineeringInsuranceInCents: number;
  shippingType: string;
  discountType: string;
  discountValue: number;
  grossMargin?: number;
  contributionMargin?: number;
  costKitsInCents: number;
  grossMarginInCents: number;
  contributionMarginInCents: number;
  revenueInCents: number;
  kitGrossMarginInCents: number;
  kitGrossMargin: number;

  kitContributionMarginInCents?: number;
  kitContributionMargin?: number;
  kitRevenueInCents?: number;

  costShippingInCents: number;
  variables: any;
  priceAssemblyInCents: number;
  engineeringInsuranceFee: number;
  stage: Stage;
  paymentNumberOfInstallments: number;
  paymentInterestAmountInCents: number;
  paymentMethod: PaymentMethod;
  integratorServicesInCents: number;
  integratorServicesType: string;
  integratorServicesValue: number;
  approvedByDirector?: boolean;
  approvedByCoordinator?: boolean;

  testNewKitsPriceInCents?: number;
  testNewFinalPriceInCents?: number;
  kitFinalDiscountPercentage?: number;
  categoryDiscount?: number;

  transactionType?: number;

  //contact?: Contact | { id: any; data: Contact };
  contact?: Contact;
  creator?: {
    email: string;
    id: number;
    name: string;
    username: string;
  };
  billingEntity?: string;
  obs?: string;
  invoiceObs?: string;
  discountFinalValue?: number;
  rawPriceInCents?: number;
  sapCreatedAt?: string;
  sapUpdatedAt?: string;
  sapDocEntry?: number;
  sapDocNum?: number;
  sapProdDocEntry?: number;
  sapProdDocNum?: number;
  sapProdCreatedAt?: string;
  sapProdUpdatedAt?: string;
  sapAltCatNum?: string;
  sapAltCatNum2?: string;
  sapOrders?: SapOrder[];
  sapProject?: {
    id: number;
    Code: string;
    Name: string;
    Active: string;
  };
  sapWarehouse?: {
    id: number;
    WarehouseCode: string;
    WarehouseName: string;
  };
}

export interface SapOrder {
  id: number;
  DocEntry: number;
  DocNum: number;
  CardCode: string;
  TaxCode: string;
  ProdDocEntry: number;
  ProdDocNum: number;
}
export interface QuoteUpdateWithAddressDTO {
  id: number;
  shippingType?: string;
  invoiceAddress?: {
    set: number[];
  };
  shippingAddress?: {
    set: number[];
  };
}

export interface QuoteGetAddressResponse {
  data: {
    quote: {
      data: {
        id: string;
        attributes: {
          shippingAddress?: {
            data: {
              id: string;
              attributes: {
                label: string | null;
                cityName: string | null;
                stateShortName: string | null;
                streetAddress: string | null;
                streetAddressLine2: string | null;
                streetAddressNumber: string | null;
                zipCode: string | null;
                customerSameAsOwner: boolean | null;
                customerName: string | null;
                customerType: number | null;
                customerDoc: string | null;
                customerIe: string | null;
                customerLegalName: string | null;
                type: string | null;
                customerEmail: string | null;
                customerPhone: string | null;
                neighborhood: string | null;
                city?: {
                  data: {
                    id: string;
                    attributes: {
                      name: string | null;
                      fullName: string | null;
                      yield: number[];
                      yieldAverage: number;
                      stateShortName: string;
                    };
                  } | null;
                };
              };
            };
          };
          invoiceAddress?: {
            data: {
              id: string;
              attributes: {
                label: string | null;
                cityName: string | null;
                stateShortName: string | null;
                streetAddress: string | null;
                streetAddressLine2: string | null;
                streetAddressNumber: string | null;
                zipCode: string | null;
                customerSameAsOwner: boolean | null;
                customerName: string | null;
                customerType: number | null;
                customerDoc: string | null;
                customerIe: string | null;
                customerLegalName: string | null;
                type: string | null;
                customerEmail: string | null;
                customerPhone: string | null;
                neighborhood: string | null;
                city?: {
                  data: {
                    id: string;
                    attributes: {
                      name: string | null;
                      fullName: string | null;
                      yield: number[];
                      yieldAverage: number;
                      stateShortName: string;
                    };
                  } | null;
                };
              };
            };
          };
        };
      };
    };
  };
}

import { Address } from "./addresses";
import { City } from "./city";
import { Contact } from "./contacts";
import { Enterprise } from "./enterprise";
import { Price } from "./prices";
import { Product } from "./product";
import { LayoutItem } from "./structure";

export interface Stage {
  id: number;
  name: string;
  slug: string;
  integratorMessa?: string;
  accessLevel?: number;
  sortNumber?: number;
  bgColor?: string;
  textColor?: string;
}

export interface PaymentMethod {
  id: number;
  label: string;
}

export interface QuoteItem {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  quantity: number;
  //product: Product | undefined;

  priceInCents: number;
  //priceId: number;
  synced?: boolean;
  name?: string;
  description?: string;
  price: Price | undefined;
}

export type QuoteStage = {
  id: number;
  name: string;
};

export type QuoteKit = {
  id?: number;
  name: string;
  deleted: boolean;
  deletedAt?: string;
  priceKitItemsInCents: number;
  quantity: number;
  priceInCents: number;
  description?: string;
  dcPower: number;
  erpId?: string;
  shippingDate?: any;
  priceListJson?: any;
  structureType?: string;
  uuid?: string;
  costInCents: number;
  structureName: string;
  layoutItems: LayoutItem[];
  quoteKitItems?: QuoteKitItem[];
  assemblyFee?: number;
  priceAssemblyInCents?: number;
  singleItems?: boolean;
};

export type QuoteKitItem = {
  id?: number;
  name: string;
  createdAt?: string;
  quantity: number;
  priceInCents: number;
  description?: string;
  price: Price;
  shippingDate?: any;
  priceListJson?: any;
  code?: string;
  deleted: boolean;
  deletedAt: string;
  uuid?: string;
  erpId: string;
  cost: number;
  costInCents: number;
  type: string;
  finalPriceInCents: number;
  finalRevenueInCents: number;
  finalPriceInCentsKit?: number;
  finalRevenueInCentsKit?: number;
};
