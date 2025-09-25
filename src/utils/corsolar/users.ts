import { AnsUser, GetUserByNameResponse, User } from "@/types/users";

import axios from "axios";
import sanitize from "../sanitize";
import businessUnit from "../global/businessUnit";
const users = {
  async auth(email: string, password: string) {
    try {
      let ans = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local`,
        {
          identifier: email,
          password: password,
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

  async register(email: string, password: string, name: string, phone: string) {
    try {
      let ans = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local/register`,
        {
          username: email,
          email,
          password,
          name,
          phone,
          businessUnit,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY_USERS}`,
          },
        }
      );
      return ans.data;
    } catch (error: any) {
      if (error.response) {
        const { status, name, message } = error.response.data.error;
        console.error(`Error ${status}: ${name} - ${message}`);
        throw new Error(message); // Rethrow or handle the error
      } else if (error.request) {
        console.error("No response received:", error.request);
        throw new Error("No response from the server.");
      } else {
        console.error("Error", error.message);
        throw new Error("An error occurred while setting up the request.");
      }
    }
  },

  async resetPassword(
    code: string,
    password: string,
    passwordConfirmation: string
  ) {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/reset-password`;
    try {
      let ans = await axios.post(
        url,
        {
          code,
          password,
          passwordConfirmation,
        },
        {}
      );

      return ans.data;
    } catch (error: any) {
      if (error.response) {
        const { status, name, message } = error.response.data.error;
        // Handle specific errors
        if (status === 400 && name === "ApplicationError") {
          throw new Error(message); // Rethrow or handle the error
        }
        throw new Error(message); // Rethrow or handle the error
      } else if (error.request) {
        console.error("No response received:", error.request);
        throw new Error("No response from the server.");
      } else {
        console.error("Error", error.message);
        throw new Error("An error occurred while setting up the request.");
      }
    }
  },

  async forgotPassword(email: string) {
    try {
      let ans = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/forgot-password`,
        {
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY_USERS}`,
          },
        }
      );

      return ans.data;
    } catch (error: any) {
      if (error.response) {
        const { status, name, message } = error.response.data.error;
        // Handle specific errors
        if (status === 400 && name === "ApplicationError") {
          throw new Error(message); // Rethrow or handle the error
        }
      } else if (error.request) {
        throw new Error("No response from the server.");
      } else {
        throw new Error("An error occurred while setting up the request.");
      }
    }
  },

  //next route - check it
  async get(userId: number) {
    try {
      let ansUser: AnsUser = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users?populate=enterprise,enterprise.priceList,enterprise.category&populate[2]=role&filters[id]=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
          },
        }
      );
      if (ansUser?.data?.length > 0) return ansUser.data[0];
      else return false;
    } catch (error: any) {
      return false;
    }
  },

  async getSellers() {
    try {
      let ans = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/util/sellers`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY_USERS}`,
          },
        }
      );
      //alert(JSON.stringify(ans.data));
      return ans?.data;

      //return sanitize(ans?.data?.data);
    } catch (error) {
      return false;
    }
  },

  async update(token: string, user: User) {
    try {
      let data: any = { ...user };
      if (user.enterprise?.id) {
        data.enterprise = user.enterprise?.id;
      }
      if (user.role?.id) {
        data.role = user.role?.id;
      }

      //alert(`Will update:${JSON.stringify(data)}`);
      let ans = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${user.id}`,
        {
          ...data,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // alert(JSON.stringify({ ans }));
      return sanitize(ans?.data?.data);
    } catch (error: any) {
      console.log(error);
      return false;
    }
  },
};

export default users;
