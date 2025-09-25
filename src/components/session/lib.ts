import { User } from "@/types/users";
import { SessionOptions } from "iron-session";

export interface SessionData {
  username: string;
  isLoggedIn: boolean;
  token: string;
  user: User | undefined;
  lastRefreshed: number;
}

export const defaultSession: SessionData = {
  username: "",
  isLoggedIn: false,
  token: "",
  user: undefined,
  lastRefreshed: 0,
};

export const sessionOptions: SessionOptions = {
  password: "complex_password_at_least_32_characters_long",
  cookieName: "iron-examples-app-router-client-component-route-handler-swr",
  cookieOptions: {
    // secure only works in `https` environments
    // if your localhost is not on `https`, then use: `secure: process.env.NODE_ENV === "production"`
    secure: true,
  },
};

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
