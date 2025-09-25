import { Parser as FormulaParser } from "hot-formula-parser";

export default function getItemsFromAccessories(inverterPrice: any) {
  const parser = new FormulaParser();
  let accessories = inverterPrice?.product?.accessories;
  let items = [];

  for (let a = 0; a < accessories.length; a++) {
    let accessory = accessories[a];
    let product = accessory.product;

    let quantityFormula = accessory.quantityFormula;

    const result = parser.parse(quantityFormula);

    if (result.error) {
      console.error(`Error: ${result.error}`);
    } else {
      if (result?.result ?? 0 > 0) {
        let quantity: any = result?.result;
        items.push({ product, quantity: Math.ceil(quantity) });
      }
    }
  }

  return items;
}
