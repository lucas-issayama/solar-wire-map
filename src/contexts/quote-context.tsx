"use client";

import { Quote, QuoteKit } from "@/types/quote";
import { ReactNode, createContext, useEffect, useState } from "react";

export const QuoteContext = createContext({
  quote: {} as Quote | undefined,
  setQuote: (value: Quote | undefined) => {},
});

interface ProviderProps {
  children: ReactNode;
}

export function QuoteContextProvider({ children }: ProviderProps) {
  const [quote, setQuote] = useState<Quote>();

  useEffect(() => {}, []);

  return (
    <QuoteContext.Provider
      value={{
        quote,
        setQuote,
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
}
