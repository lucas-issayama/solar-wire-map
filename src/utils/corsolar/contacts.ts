import axios from "axios";
import sanitize from "../sanitize";
import {
  ContactCreateDTO,
  ContactInputDataCreate,
  ContactInputDataUpdate,
  ContactResponse,
} from "@/types/contacts";
import { toast } from "@/hooks/use-toast";

const contacts = {
  async getByQuoteId(token: string, quoteId: number) {
    var query = `
      query contact{
        contacts(filters:{quotes:{id:{eq:${quoteId}}}}){
          data{
            id
            attributes{
              name
              legalName
              typeId
              cnpj
              cpf
              email
              ie
              rg
              phone
              mobile
              receitaInfo
              sintegraInfo
              receitaActive
              sintegraActive
              sintegraContribuinteIcms
              cityName
              stateShortName
              erpId
              erpRepresentativeId
              bankNumber
              bankBranch
              bankAccount
              payDay
              aliqIss
              aliqIr
              commision
            }
          }
        }
      }`;

    try {
      let ans = await axios.post<ContactResponse>(
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
      const data = ans.data.data.contacts.data[0];

      const contact = {
        id: Number(data.id),
        ...data.attributes,
      };
      return contact;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async update(token: string, contact: any) {
    try {
      const data = { ...contact };
      let ans = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/contacts/${contact.id}`,
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

export default contacts;
