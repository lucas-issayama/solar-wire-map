import { Product } from "./product";

export interface Structure {
  id: number;
  name: string;
  manufacturerName: string;
  structureType: string;
  structureItems: StructureItem[];
  supports: StructureItem[];
  rails: StructureItem[];
  railConnectors: StructureItem[];
  clamps: StructureItem[];
  filterActive: boolean;
  calcMethod?: number;
}

export interface StructureItem {
  id: number;
  quantityFormula: string;
  product: Product;
}

export interface LayoutItem {
  id: number;
  direction: string;
  rows: number;
  columns: number;
}
