import axios from "axios";

type addressInfo = {
  cityFullName: string;
  cityName: string;
  stateShortName: string;
  neighborhood: string;
  streetAddress: string;
};

const viacepApi = {
  async searchZipCode(zipCode: string) {
    if (!zipCode) return false;

    let addressInfo = {
      cityFullName: "",
      cityName: "",
      stateShortName: "",
      neighborhood: "",
      streetAddress: "",
    };

    try {
      console.log(`url:${`https://viacep.com.br/ws/${zipCode}/json`}`);
      let ans: any = await axios.get(
        `https://viacep.com.br/ws/${zipCode}/json`,
        {}
      );

      let data = ans?.data;
      if (data?.localidade) {
        addressInfo = {
          cityFullName: data.localidade + " - " + data.uf,
          cityName: data.localidade,
          stateShortName: data.uf,
          neighborhood: data.bairro,
          streetAddress: data.logradouro,
        };
      }

      return addressInfo;
    } catch (error: any) {
      return addressInfo;
    }
  },
};

export default viacepApi;
