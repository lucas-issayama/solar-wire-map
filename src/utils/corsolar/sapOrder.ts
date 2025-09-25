import axios from "axios";
import sanitize from "../sanitize";

const sapOrders = {
  async getPaymentTerms(token: string) {
    const start = Date.now();

    try {
      let ans = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/sap-payment-terms-types?pagination[pageSize]=500`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let pagination = ans?.data?.data?.meta?.pagination;
      let values = sanitize(ans?.data?.data);
      console.log(JSON.stringify({ values, pagination }));
      return { values, pagination };
    } catch (error: any) {
      return false;
    }
  },

  async getNotaFiscalUsages(token: string) {
    const start = Date.now();

    try {
      let ans = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/sap-nota-fiscal-usages?pagination[pageSize]=500`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let pagination = ans?.data?.data?.meta?.pagination;
      let values = sanitize(ans?.data?.data);
      console.log(JSON.stringify({ values, pagination }));
      return { values, pagination };
    } catch (error: any) {
      return false;
    }
  },

  async createSapOrder(token: string, sapOrder: any) {
    try {
      let data: any = { ...sapOrder };

      let ans = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/sap-orders`,
        {
          data,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return sanitize({ ...ans?.data?.data });
    } catch (error: any) {
      return false;
    }
  },

  async update(token: string, sapOrder: any) {
    try {
      let data: any = { ...sapOrder };

      let ans = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/sap-orders/${sapOrder.id}`,
        {
          data,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return sanitize({ ...ans?.data?.data });
    } catch (error: any) {
      return false;
    }
  },

  async createSapProd(token: string, sapOrder: any, quote: any) {
    try {
      let data: any = { sapOrder, quote };

      let ans = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/sap-order/createSapProd`,
        {
          ...data,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return ans?.data;
      // } catch (error: any) {
      //   return false;
      // }
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
};
export default sapOrders;
