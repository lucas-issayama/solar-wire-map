export type Contact = {
  id: number;
  name: string | null;
  legalName: string | null;
  typeId: number | null;
  cnpj: string | null;
  cpf: string | null;
  email: string | null;
  ie: string | null;
  rg: string | null;
  phone: string | null;
  mobile: string | null;
  receitaInfo: any | null;
  sintegraInfo: any | null;
  receitaActive: boolean | null;
  sintegraActive: boolean | null;
  sintegraContribuinteIcms: boolean | null;
  cityName: string | null;
  stateShortName: string | null;
  erpId: string | null;
  sapCode?: string;
  erpRepresentativeId: string | null;
  bankNumber: number | null;
  bankBranch: number | null;
  bankAccount: number | null;
  payDay: number | null;
  aliqIss: number | null;
  aliqIr: number | null;
  commision: number | null;
};

export type ContactsFetchResponse = {
  data: {
    contacts: {
      data: Array<{
        id: string;
        attributes: {
          name: string | null;
          legalName: string | null;
          typeId: number | null;
          cnpj: string | null;
          cpf: string | null;
          email: string | null;
          ie: string | null;
          rg: string | null;
          phone: string | null;
          receitaActive: boolean | null;
          sintegraActive: boolean | null;
          sintegraContribuinteIcms: boolean | null;
          addresses: {
            data: Array<{
              id: string;
            }>;
          };
        };
      }>;
      meta: {
        pagination: {
          total: number;
          page: number;
          pageSize: number;
          pageCount: number;
        };
      };
    };
  };
};

export type ContactCreateResponse = {
  data: {
    createContact: {
      data: {
        id: string;
        attributes: {
          name: string | null;
          legalName: string | null;
          typeId: number | null;
          cnpj: string | null;
          cpf: string | null;
          email: string | null;
          ie: string | null;
          rg: string | null;
          phone: string | null;
          receitaActive: boolean | null;
          sintegraActive: boolean | null;
          sintegraContribuinteIcms: boolean | null;
          addresses: {
            data: Array<{
              id: string;
            }>;
          };
        };
      };
    };
  };
};

export type ContactCreateDTO = {
  name: string;
  cpf: string;
  cnpj: string;
  phone: string;
  invoiceAddressId: number;
};

export type ContactInputDataCreate = {
  name?: string;
  legalName?: string;
  typeId?: number;
  cnpj?: string;
  cpf?: string;
  email?: string;
  ie?: string;
  rg?: string;
  phone?: string;
  mobile?: string;
  receitaActive?: boolean;
  erpRepresentativeId?: number;
  sintegraActive?: boolean;
  sintegraContribuinteIcms?: boolean;
  addresses?: string[];
  enterprise?: string;
  quotes?: string[];
  city?: string;
  publishedAt?: string;
};

export type ContactInputDataUpdate = {
  id?: number;
  name?: string;
  legalName?: string;
  typeId?: number;
  cnpj?: string;
  cpf?: string;
  email?: string;
  ie?: string;
  rg?: string;
  phone?: string;
  mobile?: string;
  receitaActive?: boolean;
  erpId?: string;
  erpRepresentativeId?: number;
  sintegraActive?: boolean;
  sintegraContribuinteIcms?: boolean;
  addresses?: string[];
  enterprise?: string;
  quotes?: string[];
  city?: string;
  receitaInfo?: any;
  sintegraInfo?: any;
  publishedAt?: string;
};

export type ContactResponse = {
  data: {
    contacts: {
      data: Array<{
        id: string;
        attributes: {
          name: string | null;
          legalName: string | null;
          typeId: number | null;
          cnpj: string | null;
          cpf: string | null;
          email: string | null;
          ie: string | null;
          rg: string | null;
          phone: string | null;
          mobile: string | null;
          receitaInfo: any | null;
          sintegraInfo: any | null;
          receitaActive: boolean | null;
          sintegraActive: boolean | null;
          sintegraContribuinteIcms: boolean | null;
          cityName: string | null;
          stateShortName: string | null;
          erpId: string | null;
          erpRepresentativeId: string | null;
          bankNumber: number | null;
          bankBranch: number | null;
          bankAccount: number | null;
          payDay: number | null;
          aliqIss: number | null;
          aliqIr: number | null;
          commision: number | null;
        };
      }>;
    };
  };
};
