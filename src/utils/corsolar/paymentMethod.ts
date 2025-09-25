import axios from "axios";

const paymentMethod = {
  async getMethods(token: string) {
    var query = `
        query paymentMethods{
            paymentMethods{
                data{
                id
                attributes{
                    label
                    dailyRate
                    monthlyRate
                    days
                    maxNumberOfInstallments
                    interestAmountInCents
                    enabled
                }
                }
            }
            }
        `;
    try {
      let ans = await axios.post<GetPaymentMethods>(
        `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
        { query },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (
        ans.data.data.paymentMethods &&
        ans.data.data.paymentMethods.data.length > 0
      ) {
        const data = ans.data.data.paymentMethods.data;

        const res: PaymentMethod[] = [];

        for (let i = 0; i < data.length; i++) {
          const v = data[i];

          res.push({
            id: v.id,
            ...v.attributes,
          });
        }

        return res;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};

export default paymentMethod;
