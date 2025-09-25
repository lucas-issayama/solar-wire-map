import enterprises from "@/utils/corsolar/enterprises";
import { fieldsAddress } from "../fields/fields-address";
import { fieldsContact } from "../fields/fields-contact";
import { schemaCategory } from "./schemaCategory";
import { schemaCoupon } from "./schemaCoupon";
import { schemaEnterprise } from "./schemaEnterprise";
import { schemaManufacturer } from "./schemaManufacturer";
import { schemaPaymentMethod } from "./schemaPaymentMethods";
import { schemaPriceList } from "./schemaPriceList";
import { schemaPrice } from "./schemaPrice";
import { schemaProduct } from "./schemaProduct";
import { schemaQuote } from "./schemaQuote";
import { schemaVariable } from "./schemaVariable";
import { schemaUser } from "./schemaUser";
import { schemaContact } from "./schemaContact";
import { schemaAddress } from "./schemaAddress";
import { schemaOrder } from "./schemaOrder";
import { schemaCity } from "./schemaCity";
import { schemaLead } from "./schemaLeads";
import { schemaStructure } from "./schemaStructure";
import { schemaSupport } from "./schemaSupports";
import { schemaRail } from "./schemaRails";
import { schemaRailConnector } from "./schemaRailsConnector";
import { schemaClamp } from "./schemaClamp";
import { schemaInverter } from "./schemaInverter";
import { schemaModule } from "./schemaModule";
import { schemaSapProject } from "./schemaSapProject";
import { schemaSapWarehouse } from "./schemaSapWarehouse";
import { schemaQuoteKitItem } from "./schemaQuoteKitItem";

export const schemas = {
  address: schemaAddress,
  contact: schemaContact,
  enterprise: schemaEnterprise,
  manufacturer: schemaManufacturer,
  category: schemaCategory,
  coupon: schemaCoupon,
  paymentMethod: schemaPaymentMethod,
  priceList: schemaPriceList,
  price: schemaPrice,
  product: schemaProduct,
  inverter: schemaInverter,
  module: schemaModule,
  quote: schemaQuote,
  order: schemaOrder,
  variable: schemaVariable,
  user: schemaUser,
  city: schemaCity,
  lead: schemaLead,
  structure: schemaStructure,
  support: schemaSupport,
  rail: schemaRail,
  railConnector: schemaRailConnector,
  clamp: schemaClamp,
  sapProject: schemaSapProject,
  sapWarehouse: schemaSapWarehouse,
  quoteKitItem: schemaQuoteKitItem,
};
