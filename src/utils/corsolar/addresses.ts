import { Address, AddressWithCity } from "@/types/addresses";
import axios from "axios";
import sanitize from "../sanitize";
import { AddressGetByQuoteResponse } from "@/types/addressesFetchs";
const addresss = {
  // const { session, isLoading, logout } = useSession();

  async create(token: string, address: Address) {
    //alert("create address");

    try {
      let data: any = address;
      data.enterprise = address?.enterpriseId;
      delete data["enterpriseId"];
      delete data["id"];
      let ans = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/addresses`,
        {
          data,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return sanitize(ans?.data?.data);
    } catch (error: any) {
      console.error(error);
      return false;
    }
  },
  async createWithCity(token: string, address: AddressWithCity) {
    try {
      let data: any = address;
      data.enterprise = address?.enterpriseId;
      delete data["enterpriseId"];
      delete data["id"];
      let ans = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/addresses?populate=city`,
        {
          data,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return sanitize(ans?.data?.data);
    } catch (error: any) {
      if (error.response) {
        console.log(error.response);
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

  async updateWithCity(token: string, address: AddressWithCity) {
    try {
      let data: any = address;
      let ans = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/addresses/${address.id}`,
        { data },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return sanitize(ans?.data?.data);
    } catch (error: any) {
      if (error.response) {
        console.log(error.response);
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

  async getInvoiceAddressMoreRecentFromEnterprise(
    token: string,
    enterpriseId: number
  ) {
    let query = `
          query addresses {
                    addresses(filters:{type:{eq:"invoice"},enterprise:{id:{eq:${enterpriseId}}}}, sort:"createdAt:desc"){
                      data{
                        id
                        attributes{
                          label
                          cityName
                          stateShortName
                          streetAddress
                          streetAddressLine2
                          streetAddressNumber
                          zipCode
                          customerSameAsOwner
                          customerName
                          customerType
                          customerDoc
                          customerIe
                          customerLegalName
                          type
                          customerEmail
                          customerPhone
                          neighborhood
                          city{
                      data{
                        id
                        attributes{
                          fullName
                          name
                          yieldAverage
                          yield
                          stateShortName
                          ploomesId
                          ibgeCode
                          
                        }
                      }
                    }
            }
          }
        }
      }
    `;
    try {
      let ans = await axios.post<AddressGetByQuoteResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
        {
          query,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (ans.data.data.addresses.data.length == 0) {
        return false;
      }
      const data = ans.data.data.addresses.data[0];
      return {
        id: Number(data.id),
        ...data.attributes,
      };
    } catch (error: any) {
      if (error.response) {
        console.log(error.response);
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

  async update(token: string, address: Address) {
    alert("update address");
    try {
      let id = address.id;
      let data: any = address;
      data.enterprise = address?.enterpriseId;
      delete data["enterpriseId"];
      delete data["id"];
      let ans = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/addresses/${id}`,
        {
          data,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // alert(JSON.stringify({ ans }));
      return sanitize(ans?.data?.data);
    } catch (error: any) {
      if (error.response) {
        console.log(error.response);
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

  async submitAddress(token: string, address: Address) {
    //update address - price and others
    console.log(`submitaddress`);
    //update address - price and others
    if (address?.id) return await this.update(token, address);
    else return await this.create(token, address);
  },

  async getWithPagination(
    token: string,
    page: number,
    pageSize: number,
    sort: string,
    sortDesc: boolean,
    type: string,
    enterpriseId: number
    // filterName: string,
  ) {
    const start = Date.now();
    let filters = {
      and: [
        {
          enterprise: {
            id: {
              eq: enterpriseId,
            },
          },
        },
        { type: { eq: type } },
      ],
    };

    var query = `query addresses($filters:AddressFiltersInput!){
      addresses( sort:"${sort}${
      sortDesc ? ":desc" : ""
    }" filters:$filters ,pagination:{page:${page},pageSize:${pageSize}}){
        meta{
          pagination{
            total
            pageSize
            page
            pageCount
          }
        }
        data{
          id
          attributes{
            label
            cityName
            stateShortName
            neighborhood
            streetAddress	
            streetAddressLine2
            streetAddressNumber
            zipCode
            customerSameAsOwner
            customerName
            customerType
            customerDoc
            customerIe
            customerLegalName
            enterprise{
              data{
                id
                attributes{
                  name
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
        filters,
      },
    };

    var url = `${process.env.VUE_APP_STRAPI_URL}/graphql`;

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
      let pagination = ans?.data?.data?.addresses?.meta?.pagination;
      let values = sanitize(ans?.data?.data?.addresses?.data);
      return { values, pagination };

      return;
    } catch (error: any) {
      if (error.response) {
        console.log(error.response);
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

export default addresss;
