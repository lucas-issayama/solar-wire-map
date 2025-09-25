import axios from "axios";

export const sisApi = {
  async createContact(data: any) {
    // alert("createContact");
    try {
      const ERP_API_URL = process.env.NEXT_PUBLIC_ERP_API_URL as string;
      const ERP_API_KEY = process.env.NEXT_PUBLIC_ERP_API_KEY as string;

      let ans = await axios.post(`${ERP_API_URL}/sis/contact`, data, {
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

  async createKit(data: any) {
    // alert("createContact");
    try {
      const ERP_API_URL = process.env.NEXT_PUBLIC_ERP_API_URL as string;
      const ERP_API_KEY = process.env.NEXT_PUBLIC_ERP_API_KEY as string;

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
      const ERP_API_URL = process.env.NEXT_PUBLIC_ERP_API_URL as string;
      const ERP_API_KEY = process.env.NEXT_PUBLIC_ERP_API_KEY as string;

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

  async createOrder(data: any) {
    try {
      const ERP_API_URL = process.env.NEXT_PUBLIC_ERP_API_URL as string;
      const ERP_API_KEY = process.env.NEXT_PUBLIC_ERP_API_KEY as string;

      let ans = await axios.post(`${ERP_API_URL}/sis/order`, data, {
        headers: {
          "Content-type": "application/json",
          "X-API-KEY": ERP_API_KEY,
        },
      });
      console.log(JSON.stringify({ ans }));
      return ans?.data;

      // const res = await fetch(`${ERP_API_URL}/sis/order`, {
      //   method: "POST",
      //   headers: {
      //     "Content-type": "application/json",
      //     "X-API-KEY": ERP_API_KEY,
      //   },
      //   cache: "no-cache",
      //   body: JSON.stringify(data),
      // });
      // if (res.status != 200) {
      //   const json = (await res.json()) as {
      //     success?: boolean;
      //     message: string;
      //   };

      //   return json;
      // }

      // const json = (await res.json()) as { success: boolean; message: string };
      //return json;
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
};
