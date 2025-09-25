import axios from "axios";
import sanitize from "../sanitize";
const userActivities = {
  async getQuoteSave(token: string, quoteId: number, offset?: number) {
    try {
      let ans = await axios.get(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/api/user-activity/getUaQuoteSave?quoteId=${quoteId}&offset=${
          offset ?? 0
        }`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return ans.data;
    } catch (error: any) {
      if (error.response) {
        const { status, name, message } = error.response.data.error;
        throw new Error(message); // Rethrow or handle the error
      } else if (error.request) {
        throw new Error("No response from the server.");
      } else {
        throw new Error("An error occurred while setting up the request.");
      }
    }
  },
};

export default userActivities;
