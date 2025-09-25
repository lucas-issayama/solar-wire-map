import fieldsArrayToJson from "./fieldsArrayToJson";
import { generateGraphQLQuery } from "./generate-graphql-query";

export function generateGraphQLQueryFromFields(fields: any) {
  let jsonObject = fieldsArrayToJson(fields);

  return generateGraphQLQuery(jsonObject);
}
