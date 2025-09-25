import { QuoteKit } from "@/types/quote";
import { LayoutItem, Structure } from "@/types/structure";
import { v4 as uuidv4 } from "uuid";
import evaluateLayoutFormula from "./evaluateLayoutFormula";
import getItemsFromStructureCalcMethod0 from "./getItemsFromStructureCalcMethod0";
import getItemsFromStructureCalcMethod1 from "./getItemsFromStructureCalcMethod1";
import getItemsFromStructureCalcMethod2 from "./getItemsFromStructureCalcMethod2";
import getItemsFromStructureCalcMethod3 from "./getItemsFromStructureCalcMethod3";

export default function getItemsFromStructure(
  _structure: Structure,
  _layoutItems: LayoutItem[],
  moduleProduct?: any
) {
  if (!_structure.calcMethod) {
    return getItemsFromStructureCalcMethod0(
      _structure,
      _layoutItems,
      moduleProduct
    );
  }

  if (_structure.calcMethod == 1) {
    return getItemsFromStructureCalcMethod1(
      _structure,
      _layoutItems,
      moduleProduct
    );
  }

  if (_structure.calcMethod == 2) {
    return getItemsFromStructureCalcMethod2(
      _structure,
      _layoutItems,
      moduleProduct
    );
  }
  if (_structure.calcMethod == 3) {
    return getItemsFromStructureCalcMethod3(
      _structure,
      _layoutItems,
      moduleProduct
    );
  }
}
