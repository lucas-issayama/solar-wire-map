export type CreateKitSISResponse = {
  id?: number;
  success: boolean;
  message: string;
  kit: {
    success: boolean;
    components: Array<{
      name: string;
      code?: string;
      description: string;
      quantity: number;
      deviceType: string;
      product: {
        erpId: string;
      };
      weight: number;
      manufacturer?: string;
      acPower?: number;
      dcPower?: number;
    }>;
    dcPower: number;
    kit: {
      area: number;
      components: Array<{
        name: string;
        code?: string;
        description: string;
        quantity: number;
        deviceType: string;
        product: {
          erpId: string;
        };
        weight: number;
        manufacturer?: string;
        acPower?: number;
        dcPower?: number;
      }>;
      cordeiro: {
        description: string;
        descriptionAux: string;
      };
      dcPower: number;
      structureType: string;
      weight: number;
    };
    descriptionAux: string;
  };
};

export type GetPaymentTermsSISResponse = {
  success: boolean;
  message: string;
  data: Array<{
    Codigo: string;
    Nome: string;
    Parcelas: number;
  }>;
};

export type CreateContactSIS = {
  id: string;
  name: string;
  legalName?: string;
  phone?: string;
  mobile?: string;
  email?: string;
  billingAddress: {
    cityName: string;
    neighborhood: string;
    stateName: string;
    streetAddress: string;
    streetAddressLine2?: string;
    streetAddressNumber: string;
    zipCode: string;
  };
  deliveryAddress: {
    cityName: string;
    neighborhood: string;
    stateName: string;
    streetAddress: string;
    streetAddressLine2?: string;
    streetAddressNumber: string;
    zipCode: string;
    contactPhone?: string;
    contactCnpj?: string;
    contactEmail?: string;
    contactName?: string;
    needSchedule: boolean;
  };
  cordeiro: {
    receita: {
      active: boolean;
    };
    sintegra: {
      info: {
        contribuinte_icms: boolean;
      };
      ie: string;
      active: boolean;
    };
    sis: {
      create: boolean;
      creating: boolean;
      created: boolean;
    };
  };
  billingEmail?: string;
  cnaeSolar?: string;
  cnpj?: string;
  cpf?: string;
  typeId: number;
  ownerId: string;
  owner: {
    name: string;
    sisId?: string;
    email: string;
  };
};

export type CreateKitSIS = {
  area?: number;
  components: Array<{
    name: string;
    code?: string;
    description: string;
    quantity: number;
    deviceType: string;
    unit?: string;
    product: {
      erpId: string;
    };
    weight: number;
    manufacturer?: string;
    acPower?: number;
    dcPower?: number;
  }>;
  structureType: string;
  dcPower: number;
  weight: number;
};

export type CreateOrderSIS = {
  id?: number;
  services?: {
    price: number;
  };
  contact: {
    id?: string;
    name: string;
    typeId: number;
    cnpj: string;
    cpf: string;
    mobile?: string;
    phone: string;
    email: string;
    ownerId: string;
    billingEmail?: string;
    owner: {
      name: string;
      email: string;
      sisId?: number;
    };
    deliveryAddress: {
      needSchedule?: boolean;
      contactName?: string;
      contactPhone?: string;
      zipCode: string;
      streetAddress: string;
      streetAddressNumber: string;
      streetAddressLine2: string;
      neighborhood: string;
      cityName: string;
      stateName: string;
    };
    billingAddress: {
      cityName: string;
      neighborhood: string;
      stateName: string;
      streetAddress: string;
      streetAddressLine2?: string;
      streetAddressNumber: string;
      zipCode: string;
      needSchedule?: string;
      contactPhone?: string;
      contactCnpj?: string;
      contactEmail?: string;
      contactName?: string;
    };
    cordeiro: {
      sintegra?: {
        contribuinteIcms: boolean;
        info?: {
          contribuinte_icms: boolean;
          situacao_ie: string;
          situacao_cnpj: string;
          data_fim_atividade: string;
          status: string;
        };
        ie: string;
        stateName?: string;
        active: boolean;
      };
      receita?: {
        email?: string;
        active: boolean;
        valid: boolean;
      };
      sis: {
        id: string;
        create?: boolean;
        created?: boolean;
        creating?: boolean;
      };
    };
  };
  owner: {
    name: string;
    email: string;
    sisId?: string;
  };
  ownerId: string;
  billingAddress: {
    streetAddress: string;
    streetAddressNumber: string;
    zipCode: string;
    cityName: string;
    neighborhood: string;
    stateName: string;
  };
  delivery: {
    address: {
      streetAddress: string;
      streetAddressNumber: string;
      zipCode: string;
      streetAddressLine2?: string;
      neighborhood: string;
      cityName: string;
      stateName: string;
    };
    type: string;
    price?: number;
  };
  cordeiro: {
    sis: {
      transactionType: number;
      accountId?: number;
      dateArrival: string;
      dateDelivery: string;
      datePayment?: string;
      dateProduction: string;
      paymentTerms: number;
      paymentMethod: number;
      obs: string;
      cfop: string;
      cfop2?: string;
      cio: string;
      cio2?: string;
    };
  };
  integrator: {
    svToken?: string;
    svApiToken?: string;
    billingAddress?: {
      zipCode: string;
      streetAddress: string;
      streetAddressLine2: string;
      neighborhood: string;
      cityName: string;
      stateName: string;
      streetAddressNumber: string;
      email?: string;
      mobile?: string;
    };
    rg?: string;
    neighborhood?: string;
    createdAt?: number;
    integratorType?: string;
    createdAtIso?: string;
    contactProfileId?: number;
    updatedAt?: number;
    svStatus?: boolean;
    lastOwnerId?: string;
    cnaeSolar?: boolean;
    commission?: number;
    id?: string;
    cnpj?: string;
    cordeiro: {
      sis?: {
        id: string;
        create?: boolean;
        created?: boolean;
        creating?: boolean;
      };
      sintegra?: {
        contribuinteIcms: boolean;
        info?: {
          contribuinte_icms: boolean;
          situacao_ie: string;
          situacao_cnpj: string;
          data_fim_atividade: string;
          status: string;
        };
        ie: string;
        stateName?: string;
        active: boolean;
      };
      receita?: {
        email?: string;
        active: boolean;
        valid: boolean;
      };
      sisPartner?: {
        id: string;
        create?: boolean;
        created?: boolean;
      };
      ploomes?: {
        id: number;
        createdAt?: number;
        ownerId?: number;
        syncedAt?: number;
      };
      solarview?: {
        updatedAt?: number;
        id: string;
      };
      updatedAt?: number;
      cpf?: string;
      deliveryAddress?: {
        needSchedule?: boolean;
        contactName?: string;
        contactPhone?: string;
        zipCode: string;
        streetAddress: string;
        streetAddressNumber: string;
        streetAddressLine2: string;
        neighborhood: string;
        cityName: string;
        stateName: string;
      };
      email: string;
      legalName?: string;
      mobile?: string;
      name: string;
      owner?: any;
      ownerId: string;
      phone: string;
      typeId: number;
    };
  };
  kits: Array<{
    quantity: number;
    dcPower: number;
    cordeiro: {
      description?: string;
      solarview?: {
        id: number;
      };
      ploomes?: {
        id: number;
      };
      sis: {
        singleItems?: boolean;
        sku: string;
      };
    };
    components: Array<{
      device: {
        dcPowerWp?: number;
        description: string;
        id: string;
        solarviewModel?: string;
        svId?: string;
        code: string;
        product: {
          price: number;
          erpId: string;
          unit?: string;
          quantity?: number;
        };
        manufacturer: string;
        dcPower?: number;
        deviceType?: string;
        efficiency?: number;
        quantity?: number;
        dcWiring?: any;
        dcMinPower?: number;
        needStringBox?: boolean;
        weight?: number;
        height?: number;
        acPower?: number;
        nMax?: number;
        warranty?: number;
        mppts?: {
          "0": {
            dcMaxOpVoltage: number;
            dcMinOpVoltage: number;
            dcMaxVoltage: number;
            dcMaxCurrent: number;
          };
          "1": {
            dcMaxVoltage: number;
            dcMaxOpVoltage: number;
            dcMaxCurrent: number;
            dcMinOpVoltage: number;
          };
          "2": {
            dcMinOpVoltage: number;
            dcMaxVoltage: number;
            dcMaxOpVoltage: number;
            dcMaxCurrent: number;
          };
          "3": {
            dcMaxVoltage: number;
            dcMaxCurrent: number;
            dcMaxOpVoltage: number;
            dcMinOpVoltage: number;
          };
        };
        dcMaxVoltage?: number;
        performanceWarranty?: number;
        dcMaxPower?: number;
        acPhases?: number;
        nMin?: number;
        acVoltage?: number;
        unit?: string;
        acMaxCurrent?: number;
        depth?: number;
        width?: number;
        color?: string;
        nOutputs?: number;
        solarviewName?: string;
        connectorType?: string;
        createdAt?: number;
        solarview?: {
          dataInclusao?: string;
          id: string;
          nome: string;
        };
      };
      name: string;
      quantity: number;
      price: number;
    }>;
    id: string;
  }>;
  price: number;
  code: string;
};

export type ProduceOrderSIS = {
  kits: Array<{
    quantity: number;
    dcPower: number;
    cordeiro: {
      description?: string;
      solarview?: {
        id: number;
      };
      ploomes?: {
        id: number;
      };
      sis: {
        singleItems?: boolean;
        sku: string;
      };
    };
    components: Array<{
      device: {
        dcPowerWp?: number;
        description: string;
        id: string;
        solarviewModel?: string;
        svId?: string;
        code: string;
        product: {
          price: number;
          erpId: string;
          unit?: string;
          quantity?: number;
        };
        manufacturer: string;
        dcPower?: number;
        deviceType?: string;
        efficiency?: number;
        quantity?: number;
        dcWiring?: any;
        dcMinPower?: number;
        needStringBox?: boolean;
        weight?: number;
        height?: number;
        acPower?: number;
        nMax?: number;
        warranty?: number;
        mppts?: {
          "0": {
            dcMaxOpVoltage: number;
            dcMinOpVoltage: number;
            dcMaxVoltage: number;
            dcMaxCurrent: number;
          };
          "1": {
            dcMaxVoltage: number;
            dcMaxOpVoltage: number;
            dcMaxCurrent: number;
            dcMinOpVoltage: number;
          };
          "2": {
            dcMinOpVoltage: number;
            dcMaxVoltage: number;
            dcMaxOpVoltage: number;
            dcMaxCurrent: number;
          };
          "3": {
            dcMaxVoltage: number;
            dcMaxCurrent: number;
            dcMaxOpVoltage: number;
            dcMinOpVoltage: number;
          };
        };
        dcMaxVoltage?: number;
        performanceWarranty?: number;
        dcMaxPower?: number;
        acPhases?: number;
        nMin?: number;
        acVoltage?: number;
        unit?: string;
        acMaxCurrent?: number;
        depth?: number;
        width?: number;
        color?: string;
        nOutputs?: number;
        solarviewName?: string;
        connectorType?: string;
        createdAt?: number;
        solarview?: {
          dataInclusao?: string;
          id: string;
          nome: string;
        };
      };
      name: string;
      quantity: number;
      price: number;
    }>;
    id: string;
  }>;
  cordeiro: {
    sis: {
      id: number;
      transactionType: number;
      accountId?: number;
      dateArrival: string;
      dateDelivery: string;
      datePayment?: string;
      dateProduction: string;
      paymentTerms: number;
      paymentMethod: number;
      obs: string;
      cfop: string;
      cfop2?: string;
      cio?: string;
      cio2?: string;
    };
  };
  contact: {
    id?: string;
    name: string;
    typeId: number;
    cnpj: string;
    cpf: string;
    mobile?: string;
    phone: string;
    email: string;
    ownerId: string;
    billingEmail?: string;
    owner: {
      name: string;
      email: string;
      sisId?: number;
    };
  };
};

export type CreateRepresentativeSIS = {
  name: string;
  contactProfileId?: number;
  email: string;
  neighborhood: string;
  cityName: string;
  streetAddress: string;
  streetAddressNumber: string;
  streetAddressLine2?: string;
  stateName: string;
  zipCode: string;
  cnpj: string;
  phone: string;
  bankNumber: string;
  bankBranch: string;
  bankAccount: string;
  payDay?: number;
  aliqIss?: number;
  aliqIr?: number;
  commission?: number;
};

export type CreateRepresentativeResponseSIS = {
  success: boolean;
  message: string;
};
