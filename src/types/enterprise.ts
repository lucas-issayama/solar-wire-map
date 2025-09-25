export type Enterprise = {
  id?: number
  name?: string | null;
  cnpj?: string | null;
  ie?: string | null;
  statusId?: number | null
  email?: string | null
  phone?: string | null
  svId?: number | null
  ploomesId?: number | null
  active?: boolean | null
  erpId?: string | null
  erpRepresentativeId?: string | null
  bankNumber?: number | null
  bankBranch?: number | null
  bankAccount?: number | null
  payDay?: number | null
  aliqIss?: number | null
  aliqIr?: number | null
  comission?: number | null
  users?: number[];
  owner?: number;
  addresses?: number[]
  quotes?: number[]
  receitaActive?: boolean
  receitaInfo?: any
  sintegraActive?: boolean
  sintegraInfo?: any
};

export type EnterpriseInputUpdate = {
  id?: number
  name?: string;
  cnpj?: string;
  ie?: string;
  statusId?: number
  email?: string
  phone?: string
  svId?: number
  ploomesId?: number
  active?: boolean
  erpId?: string
  erpRepresentativeId?: string
  bankNumber?: number
  bankBranch?: number
  bankAccount?: number
  payDay?: number
  aliqIss?: number
  aliqIr?: number
  comission?: number
  users?: number[];
  owner?: number;
  addresses?: number[]
  quotes?: number[]
}


export type EnterpriseResponse = {
  data: {
    enterprises: {
      data: Array<{
        id: string
        attributes: {
          name: string | null;
          cnpj: string | null
          ie: string | null;
          statusId: number | null
          email: string | null
          phone: string | null
          svId: number | null
          ploomesId: number | null
          active: boolean | null
          erpId: string | null
          erpRepresentativeId: string | null
          bankNumber: number | null
          bankBranch: number | null
          bankAccount: number | null
          receitaActive: boolean | null
          receitaInfo: any
          sintegraActive: boolean | null
          sintegraInfo: any
          payDay: number | null
          aliqIss: number | null
          aliqIr: number | null
          comission: number | null
          owner: {
            data: {
              id: string
              attributes: {
                username: string | null
                email: string | null
                name: string | null
                erpId: string | null
              }
            } | null
          }
        }
      }>
    }
  }
}

export type EnterpriseFetch = {
  id: number;
  name: string | null;
  cnpj: string | null
  ie: string | null;
  statusId: number | null
  email: string | null
  phone: string | null
  svId: number | null
  ploomesId: number | null
  active: boolean | null
  erpId: string | null
  erpRepresentativeId: string | null
  bankNumber: number | null
  bankBranch: number | null
  bankAccount: number | null
  receitaActive: boolean | null
  receitaInfo: any
  sintegraActive: boolean | null
  sintegraInfo: any
  payDay: number | null
  aliqIss: number | null
  aliqIr: number | null
  comission: number | null
  owner: {
    data: {
      id: string
      attributes: {
        username: string | null
        email: string | null
        name: string | null
        erpId: string | null
      }
    } | null
  }
}