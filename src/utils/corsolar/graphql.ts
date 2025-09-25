import { Quote, QuoteItem, QuoteKit } from "@/types/quote";
import axios from "axios";
import sanitize from "../sanitize";
import useSession from "@/components/session/use-session";
import { toHyphenatedCase } from "../format/to-hyphenated-case";
import businessUnit from "../global/businessUnit";
import globalObjectsNames from "../global/globalObjectsNames";

const graphql = {
  async fetch(
    token: string,
    object: { singular: string; plural: string },
    filters: any,
    query: string
  ) {
    var graphql = {
      query,
      variables: {
        filters: { ...filters },
      },
    };

    let isGlobal = globalObjectsNames.find((el) => el == object.plural)
      ? true
      : false;

    if (!isGlobal) {
      graphql.variables.filters["businessUnit"] = { containsi: businessUnit };
    }

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
      let pagination = ans?.data?.data?.[object.plural]?.meta?.pagination;
      let values = sanitize(ans?.data?.data?.[object.plural]?.data);
      return { values, pagination };
    } catch (error: any) {
      if (error.response) {
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

  async fetchOne(
    object: { singular: string; plural: string },
    filters: any,
    query: string,
    token: string
  ) {
    var graphql = {
      query,
      variables: {
        filters,
      },
    };

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

      let value = sanitize(ans?.data?.data?.[object.singular]?.data);
      return value;
    } catch (error: any) {
      if (error?.response) {
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

  async update(object: any, value: any, token: string) {
    let plural =
      object.name == "usersPermissionsUser" ? "users" : object.plural;
    try {
      let data: any = { ...value, updatedBy: 1 };
      let ans = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/${toHyphenatedCase(plural)}/${
          value.id
        }`,
        object.name == "usersPermissionsUser"
          ? { ...data }
          : {
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
      if (error?.response) {
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

  async create(object: any, value: any, token: string) {
    try {
      let data: any = { ...value, businessUnit };

      delete data.id;

      //Fix it
      let objectPlural =
        toHyphenatedCase(object.plural) !== "users-permissions-users"
          ? toHyphenatedCase(object.plural)
          : "users";

      let body =
        objectPlural == "users"
          ? {
              ...data,
              username: data.email,
              role: data?.role?.id ?? data?.role,
              enterprise: data?.enterprise?.id ?? data?.enterprise,
              confirmed: true,
            }
          : { data };

      let ans = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/${objectPlural}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return sanitize(ans?.data?.data);
    } catch (error: any) {
      console.log("Error");
      console.log(JSON.stringify(error));
      console.log("Error response");
      console.log(JSON.stringify(error?.response));
      if (error?.response) {
        const { status, statusText, data } = error.response;
        console.log(JSON.stringify({ data }));

        if (data?.errors) {
          console.log(
            JSON.stringify(data?.errors.map((el: any) => el.message)?.join(","))
          );
          throw new Error(data?.errors.map((el: any) => el.message)?.join(",")); // Rethrow or handle the error
        }

        if (data?.error) {
          console.log(JSON.stringify(data?.error));
          throw new Error(JSON.stringify(data?.error)); // Rethrow or handle the error
        }
      } else if (error.request) {
        throw new Error("No response from the server.");
      } else {
        throw new Error("An error occurred while setting up the request.");
      }
    }
  },

  async delete(token: string, object: any, value: any) {
    try {
      let data: any = { ...value };
      if (data?.id) {
        let ans = await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/api/${toHyphenatedCase(
            object.plural
          )}/${data?.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return sanitize(ans?.data?.data);
      }
    } catch (error: any) {
      if (error?.response) {
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

export default graphql;
