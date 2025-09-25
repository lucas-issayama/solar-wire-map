import { GetStagesByNameResponse } from "@/types/stages";
import axios from "axios";
import sanitize from "../sanitize";

const stages = {
  async get(token: string) {
    let page = 1;
    let pageSize = 100;
    let sort = "sortNumber";
    let sortDesc = false;

    let filters = {};

    var query = `query stages($filters:StageFiltersInput!){
    stages( sort:"${sort}${
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
          name
          slug
          integratorMessage
          sortNumber
          accessLevel
          bgColor
          textColor
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
      let pagination = ans?.data?.data?.stages?.meta?.pagination;
      let values = sanitize(ans?.data?.data?.stages?.data);
      return { values, pagination };
    } catch (error: any) {
      return false;
    }
  },

  //sis_checkout
  async getStageBySlug(slug: string) {
    var query = `
            query stage{
                stages(filters:{slug:{eq:"${slug}"}}){
                    data{
                        id
                        attributes{
                            name
                            slug
                        }
                    }
                }
            }
        `;
    try {
      let ans = await axios.post<GetStagesByNameResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
        { query },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
          },
        }
      );

      return ans.data.data.stages;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
};

export default stages;
