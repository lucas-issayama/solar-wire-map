import axios from "axios";
import sanitize from "../sanitize";
import businessUnit from "../global/businessUnit";

const leads = {
  async create(lead: any) {
    try {
      let data: any = { ...lead, businessUnit };
      delete data["lead_items"];
      delete data["id"];

      let ans = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/util/leads`,
        {
          data,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY_USERS}`,
          },
        }
      );
      return sanitize({ ...ans?.data?.data, stageId: 0 });
    } catch (error: any) {
      return false;
    }
  },
};

export default leads;
