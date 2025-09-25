import axios from "axios";
import { formatCNPJ } from "../format/format-cnpj";
import { formatCpf } from "../format/format-cpf";

const ERP_API_URL = process.env.NEXT_PUBLIC_ERP_API_URL as string;
//const ERP_API_URL = `https://api-integrations.cordeiro.com.br:3000/homolog/v1`;

const ERP_API_KEY = process.env.NEXT_PUBLIC_ERP_API_KEY as string;

export const sapApi = {
  async rawRequest(data: any) {
    // alert("createContact");
    try {
      let ans = await axios.post(`${ERP_API_URL}/sap/raw`, data, {
        headers: {
          "Content-type": "application/json",
          "X-API-KEY": ERP_API_KEY,
        },
      });

      return ans?.data;
    } catch (error: any) {
      if (error.response) {
        console.log(error.response);
        const { status, statusText, data } = error.response;

        throw new Error(JSON.stringify(data?.message));

        // if (data?.errors)
        //   throw new Error(data?.errors.map((el: any) => el.message)?.join(",")); // Rethrow or handle the error
        // if (data?.error) throw new Error(data?.error.message); // Rethrow or handle the error
      } else if (error.request) {
        throw new Error("No response from the server.");
      } else {
        throw new Error("An error occurred while setting up the request.");
      }
    }
  },

  async brOneRequest(data: any) {
    // alert("createContact");
    try {
      let ans = await axios.post(`${ERP_API_URL}/sap/brOne`, data, {
        headers: {
          "Content-type": "application/json",
          "X-API-KEY": ERP_API_KEY,
        },
      });
      console.log(JSON.stringify({ ans }));
      return ans?.data;
    } catch (error: any) {
      if (error.response) {
        console.log(error.response);
        const { status, statusText, data } = error.response;

        throw new Error(JSON.stringify(data?.message));

        // if (data?.errors)
        //   throw new Error(data?.errors.map((el: any) => el.message)?.join(",")); // Rethrow or handle the error
        // if (data?.error) throw new Error(data?.error.message); // Rethrow or handle the error
      } else if (error.request) {
        throw new Error("No response from the server.");
      } else {
        throw new Error("An error occurred while setting up the request.");
      }
    }
  },

  async createContact(data: any) {
    try {
      let ans = await axios.post(`${ERP_API_URL}/sap/raw`, data, {
        headers: {
          "Content-type": "application/json",
          "X-API-KEY": ERP_API_KEY,
        },
      });

      return ans?.data;
    } catch (error: any) {
      if (error.response) {
        console.log(error.response);
        const { status, statusText, data } = error.response;
        throw new Error(JSON.stringify(data?.message));
      } else if (error.request) {
        throw new Error("No response from the server.");
      } else {
        throw new Error("An error occurred while setting up the request.");
      }
    }
  },

  async updateContact(data: any) {
    try {
      let ans = await axios.post(`${ERP_API_URL}/sap/raw`, data, {
        headers: {
          "Content-type": "application/json",
          "X-API-KEY": ERP_API_KEY,
        },
      });

      return ans?.data;
    } catch (error: any) {
      if (error.response) {
        console.log(error.response);
        const { status, statusText, data } = error.response;
        throw new Error(JSON.stringify(data?.message));
      } else if (error.request) {
        throw new Error("No response from the server.");
      } else {
        throw new Error("An error occurred while setting up the request.");
      }
    }
  },

  async getContact(cardCode: string) {
    let data = {
      method: "GET",
      url: `/b1s/v1/BusinessPartners('${cardCode}')`,
    };

    try {
      let ans = await axios.post(`${ERP_API_URL}/sap/raw`, data, {
        headers: {
          "Content-type": "application/json",
          "X-API-KEY": ERP_API_KEY,
        },
      });
      console.log(JSON.stringify({ ans }));
      return ans?.data;
    } catch (error: any) {
      if (error.response) {
        console.log(error.response);
        const { status, statusText, data } = error.response;
        throw new Error(JSON.stringify(data?.message));
      } else if (error.request) {
        throw new Error("No response from the server.");
      } else {
        throw new Error("An error occurred while setting up the request.");
      }
    }
  },

  async getContactByDoc(
    doc: string,
    CardType: string,
    isNaturalPerson?: boolean
  ) {
    //alert(CardType);
    let data = {
      method: "GET",
      // url: `/b1s/v1/BusinessPartners?$filter=contains(U_UPPTaxId, '${doc}')`,

      url: `/b1s/v1/BusinessPartners?$filter=contains(U_UPPTaxId, '${
        isNaturalPerson ? formatCpf(doc) : formatCNPJ(doc)
      }') or contains(U_UPPTaxId,'${doc}' )`,
    };
    try {
      let ans = await axios.post(`${ERP_API_URL}/sap/raw`, data, {
        headers: {
          "Content-type": "application/json",
          "X-API-KEY": ERP_API_KEY,
        },
      });
      return ans?.data?.value?.filter((el: any) => el.CardType == CardType);
    } catch (error: any) {
      if (error.response) {
        console.log(error.response);
        const { status, statusText, data } = error.response;
        throw new Error(JSON.stringify(data?.message));
      } else if (error.request) {
        throw new Error("No response from the server.");
      } else {
        throw new Error("An error occurred while setting up the request.");
      }
    }
  },

  async createKit(data: any) {
    // alert("createContact");
    try {
      let ans = await axios.post(`${ERP_API_URL}/sis/kit`, data, {
        headers: {
          "Content-type": "application/json",
          "X-API-KEY": ERP_API_KEY,
        },
      });
      console.log(JSON.stringify({ ans }));
      return ans?.data;
    } catch (error: any) {
      if (error.response) {
        console.log(error.response);
        const { status, statusText, data } = error.response;

        throw new Error(JSON.stringify(data?.message));

        // if (data?.errors)
        //   throw new Error(data?.errors.map((el: any) => el.message)?.join(",")); // Rethrow or handle the error
        // if (data?.error) throw new Error(data?.error.message); // Rethrow or handle the error
      } else if (error.request) {
        throw new Error("No response from the server.");
      } else {
        throw new Error("An error occurred while setting up the request.");
      }
    }
  },

  async consultCpf(cpf: string) {
    try {
      const res = await fetch(`${ERP_API_URL}/sis/receita/cpf/${cpf}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "X-API-KEY": ERP_API_KEY,
        },
        cache: "no-cache",
      });

      if (res.status != 200) {
        const json = (await res.json()) as {
          message: string;
          statusCode: number;
        };
        console.log(json);
        return {
          message: json.message,
          success: false,
        };
      }
      const json = (await res.json()) as any;

      return json;
    } catch (error) {
      console.log(error);
      throw new Error((error as Error).message);
    }
  },
};
