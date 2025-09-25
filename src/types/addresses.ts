import { City } from "./city";

export interface Address {
  id?: number;
  label?: string;
  //type: "invoice" | "shipping";
  type: string;
  customerType: number; //0-pj , 1-pf
  customerName: string;
  customerDoc: string;
  customerIe?: string;
  customerEmail: string;
  customerPhone: string;
  streetAddress: string;
  streetAddressLine2?: string;
  streetAddressNumber: string;
  neighborhood: string;
  zipCode: string;
  cityName: string;
  stateShortName: string;
  enterpriseId?: number;
  // city?: {
  //   name: string;
  //   stateShortName: string;
  // };
  city?: City;
}

export interface AddressWithCity {
  id?: number;
  label?: string;
  //type: "invoice" | "shipping";
  type: string;
  customerType: number; //0-pj , 1-pf
  customerName: string;
  customerDoc: string;
  customerIe?: string;
  customerEmail: string;
  customerPhone: string;
  streetAddress: string;
  streetAddressLine2?: string;
  streetAddressNumber: string;
  neighborhood: string;
  zipCode: string;
  cityName: string;
  stateShortName: string;
  enterpriseId?: number;
  city: {
    connect: {
      id: number;
    }[];
  };
  enterprise?: number[];
}
