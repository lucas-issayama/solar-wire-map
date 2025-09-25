import { Quote, QuoteItem, QuoteKit } from "@/types/quote";
import axios from "axios";
import sanitize from "../sanitize";
import { Enterprise } from "@/types/enterprise";
const enterprises = {
  async getById(token: string, id: number) {
    var query = `query enterprise{
      enterprise(id:${id}){
        data{
          id
          attributes{
            name
            cnpj
            ie
            phone
            email
            erpId
            receitaActive
            receitaInfo
            sintegraActive
            sintegraInfo
            users{
              data{
                id
                attributes{
                  username
                  email
                }
              }
            }
            priceList{
              data{
                id
              }
            }
            owner{
              data{
                id
                attributes{
                  username
                  email
                }
              }
            }
            addresses{
              data{
                id
              }
            }
            quotes{
              data{
                id
              }
            }
            statusId
            coupons{
              data{
                id
              }
            }
            category{
              data{
                id
                attributes{
                  name
                }
              }
            }
            contacts{
              data{
                id
              }
            }
            createdAt
            updatedAt
            
            
          }
        }
      }
    }`;

    var graphql = {
      query,
      variables: {
        filters: {},
      },
    };

    try {
      let ans = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
        {
          ...graphql,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return sanitize(ans?.data?.data?.enterprise?.data);
    } catch (error: any) {
      if (error.response) {
        const { status, statusText, data } = error.response;
        if (data?.errors)
          throw new Error(data?.errors.map((el: any) => el.message)?.join(",")); // Rethrow or handle the error
        if (data?.error) throw new Error(data?.error.message); // Rethrow or handle the error
      } else if (error.request) {
        throw new Error("No response from the server.");
      } else {
        throw new Error("An error occurred while setting up the request.");
      }
    }
  },

  async getByCnpj(token: string, cnpj: string) {
    var query = `
    query enterprise {
      enterprises(filters: {cnpj:{eq:"${cnpj}"}}) {
        data {
          id
          attributes {
            name
            cnpj
            ie
            statusId
            email
            phone
            svId
            ploomesId
            active
            erpId
            receitaActive
            receitaInfo
            sintegraActive
            sintegraInfo
            erpRepresentativeId
            bankNumber
            bankBranch
            bankAccount
            payDay
            aliqIss
            aliqIr
            commission
            owner {
              data {
                id
                attributes {
                  username
                  email
                  name
                  erpId
                }
              }
            }
          }
        }
      }
    }
  `;

    var graphql = {
      query,
      variables: {
        filters: {},
      },
    };

    try {
      let ans = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
        {
          ...graphql,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return sanitize(ans.data.data.enterprises.data[0]);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios Error Configuration:", error.config);
        if (error.response) {
          console.error("Error Response Data:", error.response.data);
          console.error("Error Response Status:", error.response.status);
          throw new Error(`API Error: ${error.response.statusText}`);
        } else if (error.request) {
          console.error("Error Request:", error.request);
          throw new Error("No response from the server.");
        } else {
          console.error("Error Message:", error.message);
          throw new Error("An error occurred while setting up the request.");
        }
      } else {
        console.error("Unexpected Error:", error);
        throw new Error("An unexpected error occurred.");
      }
    }
  },

  async getByQuoteId(token: string, quoteId: number) {
    var query = `
      query enterprise {
        enterprises(filters: { quotes: { id: { eq: ${quoteId} } } }) {
          data {
            id
            attributes {
              name
              cnpj
              ie
              statusId
              email
              phone
              svId
              ploomesId
              active
              erpId
              receitaActive
              receitaInfo
              sintegraActive
              sintegraInfo
              erpRepresentativeId
              bankNumber
              bankBranch
              bankAccount
              payDay
              aliqIss
              aliqIr
              commission
              owner {
                data {
                  id
                  attributes {
                    username
                    email
                    name
                    erpId
                  }
                }
              }
            }
          }
        }
      }
    `;

    try {
      let ans = await axios.post<any>(
        // let ans = await axios.post<EnterpriseResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
        { query },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = ans.data.data.enterprises.data[0];
      const enterprise = {
        id: Number(data.id),
        ...data.attributes,
      };

      return enterprise;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios Error Configuration:", error.config);
        if (error.response) {
          console.error("Error Response Data:", error.response.data);
          console.error("Error Response Status:", error.response.status);
          throw new Error(`API Error: ${error.response.statusText}`);
        } else if (error.request) {
          console.error("Error Request:", error.request);
          throw new Error("No response from the server.");
        } else {
          console.error("Error Message:", error.message);
          throw new Error("An error occurred while setting up the request.");
        }
      } else {
        console.error("Unexpected Error:", error);
        throw new Error("An unexpected error occurred.");
      }
    }
  },

  async update(token: string, enterprise: Partial<Enterprise>) {
    try {
      const data = { ...enterprise };
      let ans = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/enterprises/${enterprise.id}`,
        { data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return sanitize(ans?.data?.data);
    } catch (error: any) {
      if (error.response) {
        const { status, statusText, data } = error.response;
        if (data?.errors)
          throw new Error(data?.errors.map((el: any) => el.message)?.join(",")); // Rethrow or handle the error
        if (data?.error) throw new Error(data?.error.message); // Rethrow or handle the error
      } else if (error.request) {
        throw new Error("No response from the server.");
      } else {
        throw new Error("An error occurred while setting up the request.");
      }
    }
  },
};

export default enterprises;
