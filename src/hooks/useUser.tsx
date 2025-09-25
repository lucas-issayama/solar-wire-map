import { UserContext } from "@/contexts/user-context";
import { useContext } from "react";

export function useUser() {
  return useContext(UserContext);
}
