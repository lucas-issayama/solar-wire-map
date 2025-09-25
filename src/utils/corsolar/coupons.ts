import axios from "axios";
import sanitize from "../sanitize";
const coupons = {
  async validate(token: string, code: string) {
    //create quote and return the same object with id;
    //alert("Create quote");
    try {
      let data = {
        code,
      };

      console.log(JSON.stringify(data));
      //console.log(`createItem, data:${JSON.stringify(data)}`);
      let ans = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/coupon/validate`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return ans;
    } catch (error: any) {
      return false;
    }
  },
};

export default coupons;
