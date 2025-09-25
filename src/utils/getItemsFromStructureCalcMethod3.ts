import { QuoteKit } from "@/types/quote";
import { LayoutItem, Structure } from "@/types/structure";
import { v4 as uuidv4 } from "uuid";
import evaluateLayoutFormula from "./evaluateLayoutFormula";
import samplePrice from "./data/samplePrice";
import { mod } from "mathjs";

/**
 * If lineUnits ≤ max kit size:
 *   → return [1 × smallest kit ≥ lineUnits].
 * Else:
 *   → take full multiples of each kit (largest first),
 *     then cover any leftover with one smallest‐possible kit.
 */
type SupportAlloc = { support: any; quantity: number };

/**
 * If lineUnits ≤ max kit size:
 *   → return [1 × smallest kit ≥ lineUnits].
 * Else:
 *   → take full multiples of the largest kit (largest→smallest),
 *     then cover any leftover with one smallest-possible kit.
 */
export function allocateSupports(
  lineUnits: number,
  supports: Array<{ product: { nModules: number } }>
): SupportAlloc[] {
  console.log("| allocateSupports");
  if (!supports.length || lineUnits <= 0) return [];

  const asc = [...supports].sort(
    (a, b) => a.product.nModules - b.product.nModules
  );
  const desc = [...asc].reverse();
  const maxSize = desc[0].product.nModules;

  // small case: single kit
  // if (lineUnits <= maxSize) {
  //   const single = asc.find((k) => k.product.nModules >= lineUnits)!;
  //   return [{ support: single, quantity: 1 }];
  // }

  // large case: greedy split
  let rem = lineUnits;
  const alloc: SupportAlloc[] = [];
  //alert(rem);
  // 1) full multiples of each kit (largest first)
  for (const kit of desc) {
    console.log(JSON.stringify({ kit }));
    const size = kit.product.nModules;
    const cnt = Math.round(rem / size - 0.01);
    console.log(JSON.stringify({ cnt }));
    if (cnt > 0) {
      alloc.push({ support: kit, quantity: cnt });
      rem -= cnt * size;
    }
  }

  // 2) cover leftover with one smallest-possible kit
  if (rem > 0) {
    const cover = asc.find((k) => k.product.nModules >= rem);
    if (cover) alloc.push({ support: cover, quantity: 1 });
  }

  return alloc;
}

export default function getItemsFromStructureCalcMethod3(
  _structure: Structure,
  _layoutItems: LayoutItem[],
  moduleProduct?: any
) {
  console.log("getItemsFromStructureCalcMethod3");
  if (!(_structure?.structureItems && _layoutItems.length)) {
    return [];
  }

  const itemsToAdd: any[] = [];

  for (const layoutItem of _layoutItems) {
    const columns = layoutItem.columns ?? 0;
    const rows = layoutItem.rows ?? 0;

    // dimensions and clamp width
    const moduleWidth = 1134;
    const supportModW = 1200;
    const clampWidth = 25;

    // compute how many support‐modules are needed
    //const lineLen = moduleWidth * columns + clampWidth * (columns + 1);
    const lineUnits = layoutItem.columns;

    // track how many clamps/connectors our supports already give us
    let supportAccessoriesNumber = {
      middleClamps: 0,
      railConnectors: 0,
    };

    // 1) allocate supports
    const supports: any = _structure.supports || [];
    const supportAllocs = allocateSupports(lineUnits, supports);

    // record accessories and add items
    for (const { support, quantity } of supportAllocs) {
      const n = support.product.nModules;
      // if (n === 4) {
      //   supportAccessoriesNumber.middleClamps += 6 * quantity;
      //   supportAccessoriesNumber.railConnectors += 2 * quantity;
      // } else if (n === 2) {
      //   supportAccessoriesNumber.middleClamps += 2 * quantity;
      // }

      const item = formatIem(support, quantity * rows);
      if (item) itemsToAdd.push(item);
    }

    // 2) rails (unchanged)
    // let remRails = lineUnits;
    // let railsCount = 0;
    // const rails = (_structure.rails || []).sort(
    //   (a, b) => (b.product?.nModules ?? 0) - (a.product?.nModules ?? 0)
    // );
    // rails.forEach((rail, i) => {
    //   const size = rail.product?.nModules ?? 0;
    //   const qty =
    //     i < rails.length - 1
    //       ? Math.floor(remRails / size)
    //       : Math.ceil(remRails / size);

    //   railsCount += qty;
    //   remRails -= qty * size;

    //   const item = formatIem(rail, qty * rows);
    //   if (item) itemsToAdd.push(item);
    // });

    // // 3) rail connectors (unchanged)
    // if (_structure.railConnectors?.[0]) {
    //   const needed = railsCount - 2;
    //   const have = supportAccessoriesNumber.railConnectors;
    //   const toAdd = Math.max(0, needed - have);

    //   if (toAdd > 0) {
    //     const rcItem = formatIem(_structure.railConnectors[0], toAdd * rows);
    //     if (rcItem) itemsToAdd.push(rcItem);
    //   }
    // }

    // // 4) clamps (unchanged)
    // if (_structure.clamps?.[0]) {
    //   const needed = (columns - 1) * 2;
    //   const have = supportAccessoriesNumber.middleClamps;
    //   const toAdd = Math.max(0, needed - have);

    //   if (toAdd > 0) {
    //     const clItem = formatIem(_structure.clamps[0], toAdd * rows);
    //     if (clItem) itemsToAdd.push(clItem);
    //   }
    // }
  }

  return itemsToAdd;
}

function formatIem(structureItem: any, quantity: number) {
  if (!structureItem?.product || quantity <= 0) return null;

  // ensure there is at least one price
  if (!structureItem.product.prices?.length) {
    structureItem.product.prices = [
      {
        ...samplePrice,
        id: Date.now() + (structureItem.id ?? 0),
      },
    ];
  }

  const product = structureItem.product;
  const price = product.prices[0];

  return {
    uuid: uuidv4(),
    name: product.name,
    quantity,
    priceInCents: price.valueInCents,
    price,
    shippingDate: price.priceList?.shippingDate,
    priceListJson: price.priceList,
    code: product.code,
    erpId: product.erpId,
    cost: product.cost,
    costInCents: product.costInCents,
    type: product.type,
    deleted: false,
  };
}
