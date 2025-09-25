"use client";

import { LoadingIcon } from "@/components/icons/loading";
import useSession from "@/components/session/use-session";
import { Manufacturer } from "@/types/manufacturer";
import { Product } from "@/types/product"; // Potentially still needed for type definitions
import { SortTypes } from "@/types/sort-types";
import { Structure } from "@/types/structure";
// No longer directly importing corsolarApi here, as we'll call our own /api routes
// No longer importing axios, sanitize, getImageUrlByType, mountQueryPricesModules here
import { ReactNode, createContext, useEffect, useState } from "react";
import useSWR from "swr"; // Import useSWR

// --- Initial Data Defaults (remain the same) ---
export type FilterStructure = {
  name: string;
  filterActive: boolean;
};

const allManufacturers: Array<Manufacturer> = [
  { name: "", filterActive: false },
];

const startModules = [
  { id: 0, name: "", manufacturerName: "", filterActive: false },
];

const startFilterInverterTypes = [
  { value: "string", text: "STRING", filterActive: false },
  { value: "micro", text: "MICROINVERSOR", filterActive: false },
  { value: "hybrid", text: "HÍBRIDO", filterActive: false },
];

const startFilterAcVoltage = [
  { value: 220, text: "220 V", filterActive: false },
  { value: 380, text: "380 V", filterActive: false },
  { value: 480, text: "480 V", filterActive: false },
  { value: 600, text: "600 V", filterActive: false },
  { value: 800, text: "800 V", filterActive: false },
];

const startFilterAcPhases = [
  { value: 2, text: "MONOFÁSICO", filterActive: false },
  { value: 3, text: "TRIFÁSICO", filterActive: false },
];

// --- Fetcher Function for useSWR ---
// This function will fetch data from your new Next.js /api routes
const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const errorBody = await res
      .json()
      .catch(() => ({ message: "Unknown error" }));
    throw new Error(
      `Failed to fetch ${url}: ${res.status} - ${
        errorBody.message || res.statusText
      }`
    );
  }
  return res.json();
};

// --- FilterProductContext (remains largely the same) ---
export const FilterProductContext = createContext({
  search: "",
  page: 0,
  pageSize: 6,
  type: "kit",
  sortBy: SortTypes.LATEST,
  manufacturers: allManufacturers,
  structures: [] as Structure[],
  chargers: [] as any,
  batteries: [] as any, // Corrected typo from "batteries" to "batteries" as in your original context
  filterModules: startModules as any,
  total: 0,
  dcPowerMin: 0,
  dcPowerMax: 0,
  overloadMin: 0,
  overloadMax: 100,
  filterLoaded: false,
  queryLoading: true,
  cables: [] as any[],
  connectors: [] as any[],
  stringboxes: [] as any[],

  filterInverterTypes: startFilterInverterTypes as any[],
  filterAcVoltage: startFilterAcVoltage as any[],
  filterAcPhases: startFilterAcPhases as any[],

  setSortBy: (value: SortTypes) => {},
  setSearch: (value: string) => {},
  setPage: (value: number) => {},
  setPageSize: (value: number) => {},
  setType: (value: string) => {},
  setManufacturers: (value: Manufacturer[]) => {},
  setStructures: (value: Structure[]) => {},
  setTotal: (value: number) => {},
  setDcPowerMin: (value: number) => {},
  setDcPowerMax: (value: number) => {},
  setOverloadMin: (value: number) => {},
  setOverloadMax: (value: number) => {},
  setFilterModules: (value: any) => {},
  setQueryLoading: (value: boolean) => {},
  setFilterInverterTypes: (value: any[]) => {},
  setFilterAcVoltage: (value: any[]) => {},
  setFilterAcPhases: (value: any[]) => {},
});

// --- ProviderProps (no longer accepts initial data as props) ---
interface ProviderProps {
  children: ReactNode;
  // All 'FromServer' props are removed as data will be fetched client-side
}

export function FilterProductContextProvider({ children }: ProviderProps) {
  // --- State Variables (initialized with defaults) ---
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [type, setType] = useState("kit");
  const [sortBy, setSortBy] = useState(SortTypes.PRICE_LOW_TO_HIGH);

  const [filterInverterTypes, setFilterInverterTypes] = useState<any>(
    startFilterInverterTypes
  );
  const [filterAcVoltage, setFilterAcVoltage] =
    useState<any>(startFilterAcVoltage);
  const [filterAcPhases, setFilterAcPhases] =
    useState<any>(startFilterAcPhases);

  const [total, setTotal] = useState(0);
  const [dcPowerMin, setDcPowerMin] = useState(300);
  const [dcPowerMax, setDcPowerMax] = useState(1500);
  const [overloadMin, setOverloadMin] = useState(0);
  const [overloadMax, setOverloadMax] = useState(10000);

  // States to be updated by SWR data
  const [manufacturers, setManufacturers] =
    useState<Manufacturer[]>(allManufacturers);
  const [structures, setStructures] = useState<Structure[]>([]);
  const [filterModules, setFilterModules] = useState<any[]>(startModules);
  const [cables, setCables] = useState<any[]>([]);
  const [connectors, setConnectors] = useState<any[]>([]);
  const [stringboxes, setStringboxes] = useState<any[]>([]);
  const [chargers, setChargers] = useState<any[]>([]);
  const [batteries, setBatteries] = useState<any[]>([]); // Corrected typo here too

  // Loading and error states
  const [filterLoaded, setFilterLoaded] = useState(false);
  const [queryLoading, setQueryLoading] = useState(true); // Initial state is loading

  const { session } = useSession();
  const { user } = session; // If user is needed for conditional fetches later

  // --- useSWR Hooks for Data Fetching from your /api routes ---
  // The key for SWR is the URL of your API route.
  // The fetcher is the function that makes the actual HTTP request.
  const {
    data: structuresData,
    error: structuresError,
    isLoading: structuresLoading,
  } = useSWR("/api/structures", fetcher);
  const {
    data: modulesData,
    error: modulesError,
    isLoading: modulesLoading,
  } = useSWR("/api/modules", fetcher);
  const {
    data: inverterManufacturersData,
    error: inverterManufacturersError,
    isLoading: inverterManufacturersLoading,
  } = useSWR("/api/inverter-manufacturers", fetcher);
  const {
    data: cablesData,
    error: cablesError,
    isLoading: cablesLoading,
  } = useSWR("/api/cables", fetcher);
  const {
    data: connectorsData,
    error: connectorsError,
    isLoading: connectorsLoading,
  } = useSWR("/api/connectors", fetcher);
  const {
    data: stringboxesData,
    error: stringboxesError,
    isLoading: stringboxesLoading,
  } = useSWR("/api/stringboxes", fetcher);
  const {
    data: batteriesData,
    error: batteriesError,
    isLoading: batteriesLoading,
  } = useSWR("/api/batteries", fetcher);
  const {
    data: chargersData,
    error: chargersError,
    isLoading: chargersLoading,
  } = useSWR("/api/chargers", fetcher);

  // --- useEffect to Update Local State from SWR Data ---
  useEffect(() => {
    if (inverterManufacturersData) {
      setManufacturers(
        inverterManufacturersData.map((el: string) => ({
          name: el,
          filterActive: false,
        }))
      );
    }
  }, [inverterManufacturersData]);

  useEffect(() => {
    if (structuresData) {
      setStructures(
        structuresData.map((el: any) => ({ ...el, filterActive: false }))
      );
    }
  }, [structuresData]);

  useEffect(() => {
    if (modulesData) {
      // Assuming modulesData is an array of module objects directly from your API route
      // Adjust the mapping logic if the structure is different
      setFilterModules(
        modulesData.map((module: any) => ({
          id: module.moduleId || module.id,
          width: module.width,
          height: module.height,
          label: module.label,
          name: module.name,
          manufacturerName: module.manufacturerName,
          filterActive: false,
          code: module.code,
          dcPower: module.dcPower,
          price: module.price, // Adjust based on your API response for module prices
        }))
      );
    }
  }, [modulesData]);

  useEffect(() => {
    if (cablesData) setCables(cablesData.values || []); // Assuming your API returns { values: [], pagination: {} }
  }, [cablesData]);

  useEffect(() => {
    if (connectorsData) setConnectors(connectorsData.values || []);
  }, [connectorsData]);

  useEffect(() => {
    if (stringboxesData) setStringboxes(stringboxesData.values || []);
  }, [stringboxesData]);

  useEffect(() => {
    if (chargersData) setChargers(chargersData.values || []);
  }, [chargersData]);

  useEffect(() => {
    if (batteriesData) setBatteries(batteriesData.values || []);
  }, [batteriesData]);

  // --- Manage overall loading and loaded state ---
  useEffect(() => {
    const allFetchesCompleted =
      !structuresLoading &&
      !modulesLoading &&
      !inverterManufacturersLoading &&
      !cablesLoading &&
      !connectorsLoading &&
      !stringboxesLoading &&
      !batteriesLoading &&
      !chargersLoading;

    const anyError =
      structuresError ||
      modulesError ||
      inverterManufacturersError ||
      cablesError ||
      connectorsError ||
      stringboxesError ||
      batteriesError ||
      chargersError;

    setQueryLoading(!allFetchesCompleted || !!anyError); // Set to true if still loading or if there's an error
    setFilterLoaded(allFetchesCompleted && !anyError); // Set to true only when all are done and no errors
  }, [
    structuresLoading,
    modulesLoading,
    inverterManufacturersLoading,
    cablesLoading,
    connectorsLoading,
    stringboxesLoading,
    batteriesLoading,
    chargersLoading,
    structuresError,
    modulesError,
    inverterManufacturersError,
    cablesError,
    connectorsError,
    stringboxesError,
    batteriesError,
    chargersError,
  ]);

  // --- Existing useEffect for resetting page on filter changes ---
  useEffect(() => {
    setPage(1);
  }, [
    type,
    sortBy,
    manufacturers, // Now reacts to changes from SWR updates
    dcPowerMin,
    dcPowerMax,
    overloadMin,
    overloadMax,
  ]);

  // --- Initial filter options fetch (now handled by SWR) ---
  // The previous getFilterOptions function is no longer needed
  // as useSWR handles the fetching on component mount.

  // --- Render Loading/Error States ---
  // if (
  //   queryLoading &&
  //   (!structures.length ||
  //     !filterModules.length ||
  //     !cables.length ||
  //     !cables.length ||
  //     !connectors.length ||
  //     !stringboxes.length ||
  //     !batteries.length ||
  //     !chargers.length)
  // ) {
  //   // You can replace this with a more sophisticated skeleton or spinner

  //   return (
  //     <div className="p-4 text-center">
  //       {/* Loading product filters... */}
  //       <LoadingIcon></LoadingIcon>
  //       {/* <p>{structures.length}</p>
  //       <p>{filterModules.length}</p>
  //       <p>{cables.length}</p>
  //       <p>{connectors.length}</p>
  //       <p>{stringboxes.length}</p>
  //       <p>{batteries.length}</p>
  //       <p>{chargers.length}</p> */}
  //     </div>
  //   );
  // }

  if (
    structuresError ||
    modulesError ||
    inverterManufacturersError ||
    cablesError ||
    connectorsError ||
    stringboxesError ||
    batteriesError ||
    chargersError
  ) {
    // Log the errors for debugging
    console.error("Failed to load filter data:", {
      structuresError,
      modulesError,
      inverterManufacturersError,
      cablesError,
      connectorsError,
      stringboxesError,
      batteriesError,
      chargersError,
    });
    // Provide a user-friendly error message or a retry mechanism
    return (
      <div className="p-4 text-center text-red-600">
        Erro no servidor. Favor recarregar a página
        {/* You could add a button here to revalidate SWR manually if needed */}
      </div>
    );
  }

  // --- Main Context Provider Render ---
  return (
    <FilterProductContext.Provider
      value={{
        search,
        page,
        pageSize,
        setPageSize,
        type,
        setSearch,
        setType,
        setPage,
        sortBy,
        setSortBy,
        manufacturers,
        setManufacturers,
        total,
        setTotal,
        dcPowerMin,
        dcPowerMax,
        setDcPowerMin,
        setDcPowerMax,
        overloadMin,
        overloadMax,
        setOverloadMin,
        setOverloadMax,
        filterModules,
        setFilterModules,
        structures,
        setStructures,
        filterLoaded,
        setQueryLoading,
        queryLoading,
        cables,
        connectors,
        stringboxes,
        chargers,
        batteries, // Corrected typo here too

        filterInverterTypes,
        setFilterInverterTypes,
        filterAcVoltage,
        setFilterAcVoltage,
        filterAcPhases,
        setFilterAcPhases,
      }}
    >
      {children}
    </FilterProductContext.Provider>
  );
}
