// utils/corsolar/corsolarApi.ts

// IMPORTANT: Ensure these environment variables are correctly set in your .env.local
// For your GraphQL endpoint:
const GRAPHQL_API_URL = process.env.NEXT_PUBLIC_API_URL + "/graphql";
// For your GraphQL API key (keep server-side if possible, if used only by API routes):
const GRAPHQL_API_KEY = process.env.NEXT_PUBLIC_API_KEY; // Assuming it's NEXT_PUBLIC_API_KEY as per your code

import sanitize from "../sanitize"; // Assuming this path is correct
import getStandardPriceQuery from "../get-standard-price-query"; // Assuming this path is correct

// Define the revalidation time for Next.js's Data Cache (e.g., 1 hour = 3600 seconds)
const REVALIDATE_TIME = 600; // Cache for 10 min

// Helper function for making GraphQL POST requests with Next.js caching
async function graphqlFetch(query: string, variables: object) {
  if (!GRAPHQL_API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL environment variable is not defined.");
  }
  if (!GRAPHQL_API_KEY) {
    console.warn(
      "NEXT_PUBLIC_API_KEY is not defined. Requests might fail if authentication is required."
    );
  }

  const graphqlPayload = {
    query,
    variables,
  };

  try {
    const response = await fetch(GRAPHQL_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(GRAPHQL_API_KEY && { Authorization: `Bearer ${GRAPHQL_API_KEY}` }),
      },
      body: JSON.stringify(graphqlPayload),
      // This is where Next.js caches the result of this POST request
      next: { revalidate: REVALIDATE_TIME },
    });

    if (!response.ok) {
      const errorBody = await response.text(); // Get raw text for better error messages
      console.error(
        `GraphQL fetch failed with status ${response.status}: ${errorBody}`
      );
      throw new Error(
        `GraphQL request failed: ${response.status} - ${response.statusText}`
      );
    }

    const data = await response.json();

    if (data.errors) {
      console.error("GraphQL errors:", data.errors);
      throw new Error(
        `GraphQL query returned errors: ${JSON.stringify(data.errors)}`
      );
    }

    return data.data; // Return the 'data' part of the GraphQL response
  } catch (error) {
    console.error("Error during GraphQL fetch:", error);
    throw error;
  }
}

// --- Specific API Calls ---

export const prices = {
  //via next route

  async getCables() {
    console.log("getCables called"); // This console.log will appear on the server where the API Route runs
    let page = 1;
    let pageSize = 10;
    let sort = "";
    let sortDesc = false;

    let filters = {
      product: {
        type: { eq: "cable" },
        voltageType: { eq: "dc" },
        length: { gt: 0 },
        enabled: { eq: true },
      },
      enabled: { eq: true },
    };

    let query = getStandardPriceQuery(page, pageSize, sort, sortDesc);

    try {
      const data = await graphqlFetch(query, { filters });
      let pagination = data?.prices?.meta?.pagination;
      let values = sanitize(data?.prices?.data);
      return { values, pagination };
    } catch (error: any) {
      console.error("Error fetching cables from GraphQL:", error);
      throw error; // Re-throw to be caught by the Next.js API route
    }
  },

  async getConnectors() {
    console.log("getConnectors called");
    let page = 1;
    let pageSize = 10;
    let sort = "";
    let sortDesc = false;

    let filters = {
      product: {
        enabled: { eq: true },
        type: { eq: "connector" },
      },
      enabled: { eq: true },
    };

    let query = getStandardPriceQuery(page, pageSize, sort, sortDesc);

    try {
      const data = await graphqlFetch(query, { filters });
      let pagination = data?.prices?.meta?.pagination;
      let values = sanitize(data?.prices?.data);
      return { values, pagination };
    } catch (error: any) {
      console.error("Error fetching connectors from GraphQL:", error);
      throw error;
    }
  },

  async getStringboxes() {
    console.log("getStringboxes called");
    let page = 1;
    let pageSize = 20;
    let sort = "";
    let sortDesc = false;

    let filters = {
      product: {
        cost: { gt: 0 },
        type: { eq: "stringbox" },
        enabled: { eq: true },
      },
      enabled: { eq: true },
    };

    let query = getStandardPriceQuery(page, pageSize, sort, sortDesc);

    try {
      const data = await graphqlFetch(query, { filters });
      let pagination = data?.prices?.meta?.pagination;
      let values = sanitize(data?.prices?.data);
      return { values, pagination };
    } catch (error: any) {
      console.error("Error fetching stringboxes from GraphQL:", error);
      throw error;
    }
  },

  async getChargers() {
    console.log("getChargers called");
    let page = 1;
    let pageSize = 20;
    let sort = "";
    let sortDesc = false;

    let filters = {
      product: {
        type: { eq: "charger" },
        enabled: { eq: true },
      },
      enabled: { eq: true },
    };

    let query = getStandardPriceQuery(page, pageSize, sort, sortDesc);

    try {
      const data = await graphqlFetch(query, { filters });
      let pagination = data?.prices?.meta?.pagination;
      let values = sanitize(data?.prices?.data);
      return { values, pagination };
    } catch (error: any) {
      console.error("Error fetching chargers from GraphQL:", error);
      throw error;
    }
  },

  async getBatteries() {
    console.log("getBatteries called");
    let page = 1;
    let pageSize = 20;
    let sort = "";
    let sortDesc = false;

    let filters = {
      product: {
        type: { eq: "battery" },
        enabled: { eq: true },
      },
      enabled: { eq: true },
    };

    let query = getStandardPriceQuery(page, pageSize, sort, sortDesc);

    try {
      const data = await graphqlFetch(query, { filters });
      let pagination = data?.prices?.meta?.pagination;
      let values = sanitize(data?.prices?.data);
      return { values, pagination };
    } catch (error: any) {
      console.error("Error fetching batteries from GraphQL:", error);
      throw error;
    }
  },
};

// You'd also need to add structures, modules, inverters if they also use GraphQL
// Example for structures (adjust if it's a REST endpoint not GraphQL)
/*
export const structures = {
  get: async () => {
    const query = `
      query {
        structures {
          data {
            id
            attributes {
              name
              // ... other fields
            }
          }
        }
      }
    `;
    try {
      const data = await graphqlFetch(query, {}); // No variables needed for simple get
      return sanitize(data?.structures?.data);
    } catch (error) {
      console.error("Error fetching structures from GraphQL:", error);
      throw error;
    }
  }
};
*/

// Export all parts of your API
export default prices /*, structures, modules, inverters */;
