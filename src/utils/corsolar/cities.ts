import axios from "axios";
import sanitize from "../sanitize";
import { e } from "mathjs";
import { removeAccents } from "../format/remove-accents";
const cities = {
  async getByName(token: string, fullName: string) {
    let pageSize = 100;
    var query = `query cities( $filters:CityFiltersInput!){
      cities(filters:$filters,pagination:{pageSize: ${pageSize}}){
        data{
          id
          attributes{
            fullName
            name
            stateShortName
            sapCounty
          }
        }
      }
    }`;

    let graphql = {
      query,
      variables: {
        filters: { fullName: { containsi: fullName } },
      },
    };

    let url = `${process.env.VUE_APP_STRAPI_URL}/graphql`;

    try {
      let ans = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
        {
          ...graphql,
        },
        {
          headers: {
            Authorization: `Bearer ${
              token ?? process.env.NEXT_PUBLIC_API_KEY_USERS
            }`,
          },
        }
      );
      let values = sanitize(ans?.data?.data?.cities?.data);
      if (values?.length == 1) {
        return values[0];
      }
      if (values?.length > 1) {
        let foundCity = values.find((el: any) => el.fullName == fullName);
        if (foundCity) return foundCity;
        else return values[0];
      }
      return null;
    } catch (error: any) {
      return false;
    }
  },

  async getCitiesByName(token: string, name: string) {
    //alert(`  token ?? process.env.NEXT_PUBLIC_API_KEY_USERS `);
    let queryToken = process.env.NEXT_PUBLIC_API_KEY_USERS;
    if (token) queryToken = token;
    
    // Create both original and accent-free search terms
    const normalizedName = removeAccents(name);
    
    let query = `
    query cities{
        cities(   
          sort:"fullName", 
          pagination:{pageSize:30},  
          filters:{
            or:[
              {fullName:{containsi:"${name}"}},
              {fullName:{containsi:"${normalizedName}"}}
            ]
          }
        ){
        data{
        id
        attributes{
            fullName
            name
            yieldAverage
            yield
            stateShortName
            ploomesId
        }
        }
      }
    }
    `;

    try {
      let ans = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
        {
          query,
        },
        {
          headers: {
            Authorization: `Bearer ${queryToken}`,
          },
        }
      );
      let values = sanitize(ans?.data?.data?.cities?.data);
      return values;
    } catch (error: any) {
      return false;
    }
  },
};

export default cities;
