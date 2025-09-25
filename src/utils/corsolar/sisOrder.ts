import { SisOrdersGraphQL } from "@/types/graphql";
import { SisOrder } from "@/types/sisOrder";
import axios from "axios";

const sisOrders = {
  //sis_checkout
  async getByQuoteId(quoteId: number) {
    var query = `
        query sisOrders{
            sisOrders(filters:{quote:{id:{eq: ${quoteId}}}}){
            data{
            id
            attributes{
                sisId
                sisId2
                transactionType
                transactionType2
                sisIdCanceled
                sisId2Canceled
                accountId
                dateArrival
                dateDelivery
                datePayment
                dateProduction
                paymentTerms
                paymentTerms2
                paymentMethod
                obs
                cfop
                cfop2
                cio
                cio2
                ctCio
                ctCfop
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
      let ans = await axios.post<SisOrdersGraphQL>(
        `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
        {
          ...graphql,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
          },
        }
      );

      return ans.data.data.sisOrders.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  //sis_checkout
  async update(data: Partial<SisOrder>) {
    if (data.id) {
      try {
        let ans = await axios.put<{
          data: { id: number; attributes: SisOrder };
        }>(
          `${process.env.NEXT_PUBLIC_API_URL}/api/sis-orders/${data.id}`,
          {
            data,
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
            },
          }
        );
        return {
          id: ans.data.data.id,
          ...ans.data.data.attributes,
        };
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  },
  //sis_checkout
  async create(data: Partial<SisOrder>) {
    try {
      let ans = await axios.post<{
        data: { id: number; attributes: SisOrder };
      }>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/sis-orders`,
        {
          data,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
          },
        }
      );

      return {
        id: ans.data.data.id,
        ...ans.data.data.attributes,
      };
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};
export default sisOrders;
