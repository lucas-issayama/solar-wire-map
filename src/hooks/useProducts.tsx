import { useQuery } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";
import { useProductFilter } from "./useProductFilter";
import { mountQueryPrices } from "@/utils/queries/mountQueryPrices";
import sanitize from "@/utils/sanitize";
import { useDeferredValue, useEffect } from "react";
import { PricesFetchResponse, Product } from "@/types/product";
import { getImageUrlByType } from "@/utils/get-image-by-type";
import useSession from "@/components/session/use-session";
import getItemsFromStructure from "@/utils/getItemsFromStructure";

const API_URL = process.env.NEXT_PUBLIC_API_GRAPHQL_URL as string;
const NEXT_PUBLIC_API_KEY_READ_PRODUCTS = process.env
  .NEXT_PUBLIC_API_KEY_READ_PRODUCTS as string;

const NEXT_PUBLIC_API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const fetcher = (
  query: any,
  token?: string
): AxiosPromise<PricesFetchResponse> => {
  let authToken = NEXT_PUBLIC_API_KEY_READ_PRODUCTS ?? NEXT_PUBLIC_API_KEY;
  if (token) {
    authToken = token;
  }

  return axios.post(API_URL, query, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
};

export function useProducts() {
  const {
    page,
    setPage,
    pageSize,
    type,
    sortBy,
    search,
    manufacturers,
    dcPowerMax,
    dcPowerMin,
    overloadMin,
    overloadMax,
    filterModules,
    structures,
    filterLoaded,
    setQueryLoading,
    filterInverterTypes,
    filterAcVoltage,
    filterAcPhases,
  } = useProductFilter();
  const searchDeferred = useDeferredValue(search);
  const { session } = useSession();
  const { user } = session;

  const query = mountQueryPrices(
    type,
    page,
    pageSize,
    sortBy,
    manufacturers,
    user,
    dcPowerMin,
    dcPowerMax,
    overloadMin,
    overloadMax,
    filterModules,
    structures,
    filterInverterTypes,
    filterAcVoltage,
    filterAcPhases
  );

  let noStructuresSelected = false;
  let filteredStructures = structures?.filter((el) => el.filterActive);

  if (filteredStructures?.length == 0) {
    noStructuresSelected = true;
    filteredStructures = structures;
  }
  let count = filteredStructures?.length ?? 0;
  let _page = 19;
  let frontEndPage = _page % count;
  let queryPage = Math.floor(_page / count);

  const { data, isLoading } = useQuery({
    queryFn: async () => {
      // Start measuring time when the request starts
      const startTime = performance.now();
      console.log("will fetch");
      const response = await fetcher(query, session?.token);

      // Measure the end time when the request completes
      const endTime = performance.now();

      return response;
    },
    queryKey: [
      "prices",
      type,
      page,
      sortBy,
      manufacturers,
      user,
      dcPowerMax,
      dcPowerMin,
      overloadMin,
      overloadMax,
      // structures,
      filterInverterTypes,
      filterAcVoltage,
      filterAcPhases,
      filterModules,
      session?.token,
    ],
    enabled: filterLoaded,
    staleTime: 1000 * 60 * 1,
    onSuccess(data) {
      let total = data?.data?.data?.prices?.meta?.pagination?.pageCount;
      if (total) {
        if (page > total) {
          setPage(1);
        }
      }
    },
  });

  useEffect(() => {
    setQueryLoading(isLoading);
  }, [isLoading]);

  let products: Array<Product> = [];
  let prices = sanitize(data?.data?.data?.prices?.data);
  let pagination: any = data?.data?.data?.prices?.meta?.pagination;

  products = prices?.map((el: any) => ({
    ...el.product,
    imageUrl: el.product.imageUrl ?? getImageUrlByType(el.product),
    price: el,
  }));

  let newProducts: Array<any> = [];
  if (products) {
    if (noStructuresSelected) newProducts = products;
    for (let s = 0; s < filteredStructures?.length; s++) {
      let structure = filteredStructures[s];
      newProducts = [
        ...newProducts,
        ...products.map((prod) => {
          let layoutItems = [
            {
              id: 0,
              direction: "vertical",
              rows: 1,
              columns: prod?.nModules ?? 0,
            },
          ];
          let productModule = filterModules?.find(
            (el: any) => el.id == prod.moduleId
          );

          let itemsStructures = getItemsFromStructure(
            structure,
            layoutItems,
            productModule
          );

          let priceStructures = itemsStructures?.reduce(
            (acc, curr) => acc + curr.priceInCents * curr.quantity,
            0
          );

          return {
            ...prod,
            price: {
              ...prod.price,
              valueInCents:
                (prod.price?.valueInCents ?? 0) + priceStructures * 1.013,
            },
            structureType: structure.structureType,
            structureName: structure.name,
            rawPrice: prod.price?.valueInCents ?? 0,
            priceStructures: priceStructures * 1.013,
            itemsStructures,
          };
        }),
      ];
    }
  }

  //Sort

  if (sortBy == 1) {
    newProducts.sort((a, b) => a.price?.valueInCents - b.price?.valueInCents);
  }

  if (sortBy == 2) {
    newProducts.sort((a, b) => b.price?.valueInCents - a.price?.valueInCents);
  }

  return {
    products: newProducts,
    pagination: {
      ...pagination,
      total: pagination?.total * filteredStructures?.length,
    },
  };
}
