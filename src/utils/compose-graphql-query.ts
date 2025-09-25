import fieldsArrayToJson from "./fieldsArrayToJson";
import formatFirstUppercase from "./format/format-first-uppercase";
import { generateGraphQLQuery } from "./generate-graphql-query";
import { generateGraphQLQueryFromFields } from "./generate-graphql-query-from-fields";

export function composeGraphQLQuery(
  fields: any,
  object: any,
  sort: string,
  page: number,
  pageSize: number
) {
  const query = generateGraphQLQueryFromFields(fields);

  //const sortFromFields =
  return `
  query ${object.plural}($filters:${formatFirstUppercase(
    object.singular
  )}FiltersInput!){
    ${
      object.plural
    }( sort:"${sort}" filters:$filters ,pagination:{page:${page},pageSize:${pageSize}}){
      meta{
        pagination{
          total
          pageSize
          page
          pageCount
        }
      }
      ${query}
    }
  }
  `;
}
