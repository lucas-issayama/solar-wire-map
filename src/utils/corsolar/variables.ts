import axios from "axios";
import sanitize from "../sanitize";
import businessUnit from "../global/businessUnit";
const variables = {
  async getWithPagination(
    token: string,
    page: number,
    pageSize: number,
    sort: string,
    sortDesc: boolean,
    filterName: string
  ) {
    const start = Date.now();
    let filters = {
      createdAt: { gt: "2023-12-20T00:00:00.000Z" },
      name: {
        contains: filterName,
      },
      businessUnit: { containsi: businessUnit },
    };

    var query = `query variables($filters:VariableFiltersInput!){
      variables( sort:"${sort}${
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
            value
            accessLevel
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
      let pagination = ans?.data?.data?.variables?.meta?.pagination;
      let values = sanitize(ans?.data?.data?.variables?.data);
      return { values, pagination };
    } catch (error: any) {
      return false;
    }
  },
};

export default variables;
