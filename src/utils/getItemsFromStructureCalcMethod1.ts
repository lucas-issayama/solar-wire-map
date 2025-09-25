import { QuoteKit } from "@/types/quote";
import { LayoutItem, Structure } from "@/types/structure";
import { v4 as uuidv4 } from "uuid";
import evaluateLayoutFormula from "./evaluateLayoutFormula";
import samplePrice from "./data/samplePrice";
import { mod } from "mathjs";

export default function getItemsFromStructureCalcMethod1(
  _structure: Structure,
  _layoutItems: LayoutItem[],
  moduleProduct?: any
) {
  if (_structure?.structureItems && _layoutItems.length) {
    let itemsToAdd = [] as any[];
    for (let l = 0; l < _layoutItems.length; l++) {
      let layoutItem = _layoutItems[l];
      console.log(JSON.stringify({ layoutItem }));
      let columns = layoutItem.columns ?? 0;
      let rows = layoutItem.rows ?? 0;
      let moduleWidth = moduleProduct?.width ?? 1134;
      let moduleHeight = moduleProduct?.height ?? 2274;
      let moduleLineLength =
        layoutItem.direction == "vertical" ? moduleWidth : moduleHeight;
      // let standardSupportModLength = 1200 + 25;
      let standardSupportModLength = 1200;

      let defaultClampWidth = 25; //Middle or end clamp

      let layoutItemLineLength =
        moduleLineLength * columns + defaultClampWidth * (columns + 1);

      let lineSupportLineUnits = Math.ceil(
        layoutItemLineLength / standardSupportModLength
      );

      let defaultSupportWidth = 1100;
      let supportsNModules = _structure?.supports?.map(
        (el) => el.product?.nModules ?? 0
      );

      let supportAccessoriesNumber = {
        rails: 0,
        middleClamps: 0,
        railConnectors: 0,
      };

      let aux = lineSupportLineUnits;

      let supports = _structure?.supports?.sort(
        (a, b) => (b?.product?.nModules ?? 0) - (a?.product?.nModules ?? 0)
      );
      let supportsAvailableCount = _structure?.supports?.length;

      for (let i = 0; i < supports?.length; i++) {
        let structureItem = supports[i];
        let quantity = 0;
        if (structureItem?.product?.nModules) {
          if (i < supportsAvailableCount - 1) {
            //not last
            //quantity = Math.floor(aux / structureItem?.product?.nModules);
            quantity = Math.round(
              aux / structureItem?.product?.nModules - 0.01 //To round to floor in the middle
            );
            console.log(`not last ${quantity}`);
          } else {
            //last
            quantity = Math.ceil(aux / structureItem?.product?.nModules);
            console.log(`last ${quantity}`);
          }
          if (structureItem?.product?.nModules == 4) {
            //supportAccessoriesNumber.rails += 4 * quantity;
            supportAccessoriesNumber.middleClamps += 6 * quantity;
            supportAccessoriesNumber.railConnectors += 2 * quantity;
          }
          if (structureItem?.product?.nModules == 2) {
            //  supportAccessoriesNumber.rails += 2 * quantity;
            supportAccessoriesNumber.middleClamps += 2 * quantity;
            supportAccessoriesNumber.railConnectors += 0 * quantity;
          }

          aux = aux - quantity * structureItem?.product?.nModules;
        }

        //const uuid = uuidv4();

        let item = formatIem(structureItem, quantity * rows);

        if (item) itemsToAdd.push(item);
      }

      console.log(JSON.stringify({ supportAccessoriesNumber }));

      let railsAvailableCount = _structure?.rails?.length;
      aux = layoutItemLineLength;
      _structure?.rails?.sort(
        (a, b) => (b?.product?.length ?? 0) - (a?.product?.length ?? 0)
      );
      let railsCount = 0;
      //console.log(JSON.stringify({ railsAvailableCount }));
      for (let i = 0; i < railsAvailableCount; i++) {
        let structureItem = _structure?.rails[i];
        let quantity = 0;
        if (structureItem?.product?.length) {
          //console.log(JSON.stringify({ rail: structureItem }));
          if (i < railsAvailableCount - 1) {
            //not last
            quantity = Math.floor(aux / structureItem?.product?.length) * 2;
          } else {
            //last
            quantity = Math.ceil(aux / structureItem?.product?.length) * 2;
          }
          railsCount += quantity;
          aux = aux - quantity * structureItem?.product?.length;
        }

        //const uuid = uuidv4();

        if (quantity > supportAccessoriesNumber.rails) {
          let item = formatIem(
            structureItem,
            (quantity - supportAccessoriesNumber.rails) * rows
          );
          if (item) itemsToAdd.push(item);
        }
      }

      console.log(JSON.stringify({ railsCount }));

      for (let i = 0; i < 1; i++) {
        let structureItem = _structure?.railConnectors?.[i];
        let quantity = 0;
        let railConnectorsQuantity = 0;
        if (structureItem?.product) {
          railConnectorsQuantity = railsCount - 2;
        }

        //const uuid = uuidv4();

        if (railConnectorsQuantity > supportAccessoriesNumber.railConnectors) {
          let item = formatIem(
            structureItem,
            (railConnectorsQuantity - supportAccessoriesNumber.railConnectors) *
              rows
          );
          if (item) itemsToAdd.push(item);
        }

        console.log(JSON.stringify({ railConnectorsQuantity }));
      }

      //Clamps
      for (let i = 0; i < 1; i++) {
        let structureItem = _structure?.clamps?.[i];
        console.log("Rail connector");
        console.log(JSON.stringify({ rail: structureItem }));
        let quantity = (columns - 1) * 2;

        //const uuid = uuidv4();

        if (quantity > supportAccessoriesNumber.middleClamps) {
          let item = formatIem(
            structureItem,
            (quantity - supportAccessoriesNumber.middleClamps) * rows
          );

          if (item) itemsToAdd.push(item);
        }

        console.log(JSON.stringify({ clamps: quantity }));
      }
    }

    console.log(JSON.stringify({ itemsToAdd }));
    return itemsToAdd;
  }
}

function formatIem(structureItem: any, quantity: number) {
  const uuid = uuidv4();

  //Test
  if (!structureItem?.product?.prices[0])
    structureItem?.product?.prices.push({
      ...samplePrice,
      id: new Date().getTime() + (structureItem.id ?? 0),
    });

  let product = structureItem?.product;
  let price = structureItem?.product?.prices[0];
  //let quantity = 1;

  if (product && price && quantity > 0) {
    let item = {
      name: structureItem?.product.name,
      quantity: quantity,
      priceInCents: price?.valueInCents ?? 0,
      price,
      shippingDate: price?.priceList?.shippingDate,
      priceListJson: price?.priceList,
      code: product?.code,
      deleted: false,
      erpId: product?.erpId,
      cost: product?.cost,
      costInCents: product?.costInCents,
      uuid,
      type: product?.type,
    };
    //  itemsToAdd.push(item);
    return item;
  }
}
