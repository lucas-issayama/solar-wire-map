export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  jwt: string;
  enterprise: {
    id: number;
    name: string;
    cnpj: string;
    ie: string;
    priceList: {
      id: number;
      name: string;
    };
  };
  role: {
    id: number;
    name: string;
    description: string;
    type: string;
  };
}

export interface AnsUser {
  data: Array<User>;
}

export interface LoginResponse {
  data: {
    jwt: string;
    user: User;
  };
}

export type GetUserByNameResponse = {
  data: {
    usersPermissionsUsers: {
      data: Array<{
        id: string;
        attributes: {
          name: string | null;
          username: string | null;
          email: string | null;
          provider: string | null;
          confirmed: boolean | null;
          blocked: boolean | null;
          phone: string | null;
          erpId: string | null;
        };
      }>;
    };
  };
};
