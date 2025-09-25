import { QuoteKit } from "@/types/quote";
import { LayoutItem, Structure } from "@/types/structure";
import { v4 as uuidv4 } from "uuid";
import evaluateLayoutFormula from "./evaluateLayoutFormula";

export default function getItemsFromStructureCalcMethod0(
  _structure: Structure,
  _layoutItems: LayoutItem[],
  moduleProduct?: any
) {
  if (_structure?.structureItems && _layoutItems.length) {
    let itemsToAdd = [] as any[];
    for (let l = 0; l < _layoutItems.length; l++) {
      let layoutItem = _layoutItems[l];
      for (let i = 0; i < _structure?.structureItems?.length; i++) {
        let structureItem = _structure?.structureItems[i];
        const uuid = uuidv4();
        if (structureItem?.product?.prices[0]) {
          let product = structureItem?.product;
          let price = structureItem?.product?.prices[0];

          let quantity = evaluateLayoutFormula(
            structureItem.quantityFormula ?? "",
            layoutItem,
            moduleProduct
          );

          if (quantity > 0) {
            let item = {
              name: structureItem?.product?.name,
              quantity: quantity,
              priceInCents: price.valueInCents ?? 0,
              price,
              shippingDate: price?.priceList?.shippingDate,
              priceListJson: price?.priceList,
              code: product?.code,
              deleted: false,
              erpId: product?.erpId,
              cost: product?.cost,
              costInCents: product?.costInCents,
              uuid,
              type: product.type,
            };
            itemsToAdd.push(item);
          }
        }
      }
    }

    return itemsToAdd;
  }
}
