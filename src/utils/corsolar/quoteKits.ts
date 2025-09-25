import { GetQuoteKitByQuoteIdResponse } from "@/types/quoteKitsFetchs";
import axios from "axios";

const quoteKits = {
  //Page sis_checkout
  async listByQuoteId(quoteId: number) {
    var query = `query quoteKit {
                    quoteKits(filters: { quote: { id: { eq: ${quoteId} } } }) {
                        data {
                            id
                            attributes {
                                name
                                quantity
                                priceInCents
                                description
                                quoteKitNumber
                                deleted
                                deletedAt
                                dcPower
                                shippingDate
                                priceListJson
                                uuid
                                costInCents
                                erpId
                                structureName
                                singleItems
                                quoteKitItems(filters: { deleted: { eq: false } }, pagination: { limit: 100000 }) {
                                    data {
                                        id
                                        attributes {
                                            name
                                            quantity
                                            priceInCents
                                            description
                                            code
                                            shippingDate
                                            deleted
                                            uuid
                                            erpId
                                            cost
                                            costInCents
                                            type
                                            price{
                                                data{
                                                    id
                                                    attributes{
                                                      sku
                                                      product{
                                                        data{
                                                          id
                                                          attributes{
                                                            erpId
                                                            name
                                                            unit
                                                            manufacturerName
                                                            acPower
                                                            dcPower
                                                          }
                                                        }
                                                      }
                                                    }
                                                }
                                            }

                                        }
                                    }
                                }
                            }
                        }
                    }
                }
   
   
   
    `;
    try {
      let ans = await axios.post<GetQuoteKitByQuoteIdResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
        { query },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
          },
        }
      );
      const quoteKits = [];
      if (ans.data.data.quoteKits && ans.data.data.quoteKits.data.length > 0) {
        for (let i = 0; i < ans.data.data.quoteKits.data.length; i++) {
          const data = ans.data.data.quoteKits.data[i];
          let formattedQuoteKitItems: {
            id: string;
            name: string | null;
            quantity: number | null;
            priceInCents: number | null;
            description: string | null;
            code?: string | null;
            shippingDate: string | null;
            deleted: boolean;
            uuid: string | null;
            erpId: string | null;
            cost: number | null;
            costInCents: number | null;
            type: string | null;
          }[] = [];

          for (let j = 0; j < data.attributes.quoteKitItems.data.length; j++) {
            let quoteKitItem = data.attributes.quoteKitItems.data[j];
            formattedQuoteKitItems.push({
              id: quoteKitItem.id,
              ...quoteKitItem.attributes,
            });
          }

          quoteKits.push({
            id: Number(data.id),
            ...data.attributes,
            quoteKitItems: formattedQuoteKitItems,
          });
        }

        return quoteKits;
      }
    } catch (error) {
      console.error(error);
      console.error(error);
    }
  },

  //Page sis_checkout
  async update(quoteKitId: number, body: any) {
    try {
      const req = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/quote-kits/${quoteKitId}`,
        {
          method: "PUT",
          body: JSON.stringify({
            data: body,
          }),
          cache: "no-cache",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
            "Content-type": "application/json",
          },
        }
      );

      const json = (await req.json()) as { data: { id: number } };

      return json;
    } catch (error) {
      return false;
    }
  },
};

export default quoteKits;
