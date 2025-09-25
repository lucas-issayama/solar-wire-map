import { QuotePropsContext } from "@/contexts/quote-props-context";
import { useContext } from "react";

export function useQuoteProps() {
  return useContext(QuotePropsContext);
}
