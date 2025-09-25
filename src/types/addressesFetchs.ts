export type AddressesFetchResponse = {
  data: {
    addresses: {
      data: Array<{
        id: string;
        attributes: {
          label: string | null;
          cityName: string | null;
          stateShortName: string | null;
          neighborhood: string | null;
          streetAddress: string | null;
          streetAddressLine2: string | null;
          streetAddressNumber: string | null;
          zipCode: string | null;
          customerSameAsOwner: boolean | null;
          customerName: string | null;
          customerType: number | null;
          customerDoc: string | null;
          customerIe: string | null;
          customerEmail: string | null;
          customerPhone: string | null;
          customerLegalName: string | null;
          type: string | null;
          enterprise: {
            data: {
              id: string;
            } | null;
          };
          quotes: {
            data: Array<{
              id: string;
            }>;
          };
          contact: {
            data: {
              id: string;
            } | null;
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

export type AddressInputCreate = {
  label?: string;
  cityName?: string;
  stateShortName?: string;
  neighborhood?: string;
  streetAddress?: string;
  streetAddressLine2?: string;
  streetAddressNumber?: string;
  zipCode?: string;
  customerSameAsOwner?: boolean;
  customerName?: string;
  customerType?: number;
  customerDoc?: string;
  customerIe?: string;
  customerEmail?: string;
  customerPhone?: string;
  customerLegalName?: string;
  type?: string;
  enterprise?: number;
  quotes?: string[];
  contact?: number;
};

export type AddressCreateResponse = {
  data: {
    createAddress: {
      data: {
        id: string;
        attributes: {
          label: string | null;
          cityName: string | null;
          stateShortName: string | null;
          neighborhood: string | null;
          streetAddress: string | null;
          streetAddressLine2: string | null;
          streetAddressNumber: string | null;
          zipCode: string | null;
          customerSameAsOwner: boolean | null;
          customerName: string | null;
          customerType: number | null;
          customerDoc: string | null;
          customerIe: string | null;
          customerEmail: string | null;
          customerPhone: string | null;
          customerLegalName: string | null;
          type: string | null;
          enterprise: {
            data: {
              id: string;
            } | null;
          };
          quotes: {
            data: Array<{
              id: string;
            }>;
          };
          contact: {
            data: {
              id: string;
            } | null;
          };
        };
      };
    };
  };
};

export type AddressGetByQuoteResponse = {
  data: {
    addresses: {
      data: Array<{
        id: number;
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
          city: {
            data: {
              id: string;
              attributes: {
                fullName: string | null;
                name: string | null;
                yieldAverage: number | null;
                yield: number[] | null;
                stateShortName: string | null;
                ploomesId: number | null;
                ibgeCode: number | null;
              };
            } | null;
          };
        };
      }>;
    };
  };
};

export type AddressGetByQuote = {
  id: number;
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
    id: number;
    name: string | null;
    fullName: string | null;
    yield: number[] | null;
    yieldAverage: number | null;
  };
};

export type AddressUpdateResponse = {
  data: {
    updateAddress: {
      data: {
        id: string;
        attributes: {
          label: string | null;
          cityName: string | null;
          stateShortName: string | null;
          neighborhood: string | null;
          streetAddress: string | null;
          streetAddressLine2: string | null;
          streetAddressNumber: string | null;
          zipCode: string | null;
          customerSameAsOwner: boolean | null;
          customerName: string | null;
          customerType: number | null;
          customerDoc: string | null;
          customerIe: string | null;
          customerEmail: string | null;
          customerPhone: string | null;
          customerLegalName: string | null;
          type: string | null;
          enterprise: {
            data: {
              id: string;
            } | null;
          };
          quotes: {
            data: Array<{
              id: string;
            }>;
          };
          contact: {
            data: {
              id: string;
            } | null;
          };
        };
      };
    };
  };
};

export type AddressUpdateInput = {
  label?: string;
  cityName?: string;
  stateShortName?: string;
  neighborhood?: string;
  streetAddress?: string;
  streetAddressLine2?: string;
  streetAddressNumber?: string;
  zipCode?: string;
  customerSameAsOwner?: boolean;
  customerName?: string;
  customerType?: number;
  customerDoc?: string;
  customerIe?: string;
  customerEmail?: string;
  customerPhone?: string;
  customerLegalName?: string;
  type?: string;
  enterprise?: number;
  quotes?: string[];
  contact?: number;
};
