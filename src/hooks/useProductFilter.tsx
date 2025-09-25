import { FilterProductContext } from "@/contexts/filter-product-context-provider";
import { useContext } from "react";

export function useProductFilter() {
  return useContext(FilterProductContext);
}
