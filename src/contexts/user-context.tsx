"use client";

import { User } from "@/types/users";
import { useRouter } from "next/navigation";

import { ReactNode, createContext, useEffect, useState } from "react";

export const UserContext = createContext({
  user: {} as User | undefined,
  setUser: (value: User) => {},
  //setManufacturers: (value: Manufacturer[]) => {},
});

interface ProviderProps {
  children: ReactNode;
}

export function UserContextProvider({ children }: ProviderProps) {
  const [user, setUser] = useState<User>();
  const router = useRouter();

  // Load items from localStorage when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined" && storedUser !== "null") {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Save items to localStorage whenever the items change
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
