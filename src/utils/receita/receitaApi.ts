export const receitaApi = {
  async consultCnpj(cnpj: string) {
    try {
      const ERP_API_URL = process.env.NEXT_PUBLIC_ERP_API_URL as string;
      const ERP_API_KEY = process.env.NEXT_PUBLIC_ERP_API_KEY as string;

      const res = await fetch(`${ERP_API_URL}/sis/receita/info/cnpj/${cnpj}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "X-API-KEY": ERP_API_KEY,
        },
        cache: "no-cache",
      });

      if (res.status != 200) {
        const json = (await res.json()) as {
          success: boolean;
          message: {
            error: string;
          };
        };

        switch (json.message.error) {
          case "Invalid CNPJ.":
            throw new Error("Verifique o CNPJ do integrador! (CNPJ Inválido.)");
          case "CNPJ inválido.":
            throw new Error("Verifique o CNPJ do integrador! (CNPJ Inválido.)");
          default:
            throw new Error(JSON.stringify(json));
        }
      }

      const json = (await res.json()) as any;

      return json;
    } catch (error) {
      console.log(error);
      throw new Error((error as Error).message);
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
};
