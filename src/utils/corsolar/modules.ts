import { Quote, QuoteItem } from "@/types/quote";
import axios from "axios";
import sanitize from "../sanitize";
import { checkPrimeSync } from "crypto";
import { mountQueryPricesModules } from "../queries/mountQueryPricesModules";
import { getImageUrlByType } from "../get-image-by-type";
import { re } from "mathjs";
const REVALIDATE_TIME = 600; // Cache for 10 min

function getUniqueStrings(arr: any) {
  return Array.from(new Set(arr));
}

const API_URL = process.env.NEXT_PUBLIC_API_GRAPHQL_URL as string;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY as string;

const modules = {
  //via server
  async get() {
    console.log("will fetch modules");
    try {
      const query = mountQueryPricesModules();

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify(query),
        next: { revalidate: REVALIDATE_TIME }, // This enables ISR (Incremental Static Regeneration)
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.error(
          `Fetch failed with status ${response.status}: ${errorBody}`
        );
        throw new Error(
          `Request failed: ${response.status} - ${response.statusText}`
        );
      }

      const data = await response.json();

      let products: Array<any> = [];
      let prices = sanitize(data?.data?.prices?.data);
      let pagination = data?.data?.prices?.meta?.pagination;

      products = prices?.map((el: any) => ({
        ...el.product,
        moduleId: el.product?.module?.id,
        price: el.value,
        priceId: el.id,
        priceList: el.priceList?.id,
        imageUrl: el.product.imageUrl ?? getImageUrlByType(el.product),
      }));

      return products?.map((pvModule) => ({
        id: pvModule.moduleId,
        width: pvModule?.width,
        height: pvModule?.height,
        label: pvModule.label,
        name: pvModule.name,
        manufacturerName: pvModule.manufacturerName,
        filterActive: false,
        code: pvModule.code,
        dcPower: pvModule.dcPower,
        price: prices?.find((el: any) => el.id == pvModule.priceId),
      }));
    } catch (error: any) {
      console.error("Error during module fetch:", error);
      throw error;
    }
  },

  //via configurator
  async getById(id: string) {
    if (id == "none") return null;
    try {
      let ans = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/modules/${id}`,

        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
          },
        }
      );

      //console.log(JSON.stringify({ ans }));
      let pagination = ans?.data?.data?.meta?.pagination;
      let values = sanitize(ans?.data?.data);
      //console.log(JSON.stringify(values));
      return values;
    } catch (error: any) {
      return false;
    }
  },
};

export default modules;
