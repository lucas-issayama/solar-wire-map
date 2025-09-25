"use client";
import useSession from "@/components/session/use-session";
import { Stage } from "@/types/quote";
import corsolarApi from "@/utils/corsolar/corsolarApi";
import { ReactNode, createContext, useEffect, useState } from "react";

export const QuotePropsContext = createContext({
  stages: [] as Stage[],
});

interface ProviderProps {
  children: ReactNode;
}

export function QuotePropsContextProvider({ children }: ProviderProps) {
  const [stages, setStages] = useState<Array<Stage>>([]);

  const { session } = useSession();
  const { user } = session;

  useEffect(() => {
    if (user) {
      getData();
    }
  }, [user]);

  async function getData() {
    await getStages();
  }

  async function getStages() {
    let res: any = await corsolarApi.stages.get(session?.token);
    let { values, pagination } = res;
    if (values) setStages(values);
  }

  return (
    <QuotePropsContext.Provider
      value={{
        stages,
      }}
    >
      {children}
    </QuotePropsContext.Provider>
  );
}
