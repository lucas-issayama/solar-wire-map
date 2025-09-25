import { Quote, QuoteKit, QuoteKitItem } from "@/types/quote";
import { formatDecimalBr } from "../format/format-decimal-br";
import quoteKitItemsUniquePriceId from "./quoteKitItemsUniquePriceId";
import getTotalKitItems from "./getTotalKitItems";

function quoteKitRecalc(quoteKit: QuoteKit) {
  let quoteKitUpdated: QuoteKit;

  if (quoteKit && quoteKit?.quoteKitItems) {
    let quoteKitItems = quoteKitItemsUniquePriceId(
      quoteKit?.quoteKitItems?.filter((el) => !el.deleted)
    );
    //let quoteKitItems = quoteKit?.quoteKitItems?.filter((el) => !el.deleted);

    let assemblyFee = quoteKit?.assemblyFee ?? 1.3;
    let priceKitItems = getTotalKitItems(quoteKitItems);
    //alert(JSON.stringify({ priceKitItems }));
    //alert(Math.round(priceKitItems * (1 + assemblyFee / 100)));
    //alert(Math.round(priceKitItems * (assemblyFee / 100)));
    quoteKitUpdated = {
      ...quoteKit,
      //  priceKitItemsInCents: getTotalKitItems(quoteKit?.quoteKitItems),
      //..
      quoteKitItems: [
        ...quoteKitItems,
        ...quoteKit?.quoteKitItems?.filter((el) => el.deleted),
      ],
      assemblyFee,
      priceInCents: Math.round(priceKitItems * (1 + assemblyFee / 100)),
      priceAssemblyInCents: Math.round(priceKitItems * (assemblyFee / 100)),
      costInCents: Math.round(getCostKitItems(quoteKitItems)),
      dcPower: getDcPower(quoteKitItems),
      shippingDate: getShippingDate(quoteKitItems),
      priceListJson: getPriceListJson(quoteKitItems),
      name: getCustomName(quoteKitItems),
    };

    return quoteKitUpdated;
  }

  return quoteKit;
}

function getCostKitItems(quoteKitsItems: QuoteKitItem[]) {
  return (
    quoteKitsItems?.reduce(
      (sum, item) => (sum += (item?.costInCents ?? 0) * item.quantity),
      0
    ) ?? 0
  );
}

// function getTotalKitItems(quoteKitsItems: QuoteKitItem[]) {
//   return (
//     quoteKitsItems
//       ?.filter((el) => !el.deleted)
//       ?.reduce(
//         (sum, item) => (sum += (item?.priceInCents ?? 0) * item.quantity),
//         0
//       ) ?? 0
//   );
// }
const getDcPower = (quoteKitsItems: QuoteKitItem[]) => {
  return (
    Math.round(
      100 *
        (quoteKitsItems?.reduce(
          (sum, item) =>
            (sum +=
              item?.price?.product?.type == "module"
                ? (item?.price?.product?.dcPower ?? 0) * item.quantity
                : 0),
          0
        ) ?? 0)
    ) / 100
  );
};

function sortDate(a: any, b: any) {
  // Convert shipping dates to Date objects
  const dateA = a?.shippingDate ? new Date(a.shippingDate) : null;
  const dateB = b?.shippingDate ? new Date(b.shippingDate) : null;

  // Handle cases where shippingDate is null
  if (dateA === null && dateB === null) {
    return 0; // No need to sort, both dates are null
  } else if (dateA === null) {
    return 1; // dateA is null, so b comes first
  } else if (dateB === null) {
    return -1; // dateB is null, so a comes first
  } else {
    // Both dates are not null, proceed with regular comparison
    return dateA.getTime() - dateB.getTime();
  }
}

const getShippingDate = (quoteKitsItems: QuoteKitItem[]) => {
  let items = [...quoteKitsItems];
  if (items.length > 0) {
    items.sort(sortDate);

    return items?.[0].shippingDate;
  }
};

const getCustomName = (quoteKitsItems: QuoteKitItem[]) => {
  let items = [...quoteKitsItems];
  let moduleItem = items.find((m: any) => m?.price?.product?.type == "module");
  let inverterItem = items.find(
    (m: any) => m?.price?.product?.type == "inverter"
  );

  let description = `GEF ${inverterItem?.code} ${
    moduleItem?.code
  } ${formatDecimalBr(getDcPower(quoteKitsItems))} KWP`;

  return description;
};

const getPriceListJson = (quoteKitsItems: QuoteKitItem[]) => {
  let items = [...quoteKitsItems];
  if (items.length > 0) {
    items.sort(sortDate);
    return items?.[0].priceListJson;
  }
};
export default quoteKitRecalc;
