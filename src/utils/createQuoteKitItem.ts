import { v4 as uuidv4 } from "uuid";

export function createQuoteKitItem(price: any, quantity: number) {
  const uuid = uuidv4();
  let item = {
    name: price?.product?.name,
    quantity: quantity,
    priceInCents: price?.valueInCents,
    price,
    shippingDate: price?.priceList?.shippingDate,
    priceListJson: price?.priceList,
    code: price?.product?.code,
    deleted: false,
    erpId: price?.sku ?? price?.product?.erpId,
    cost: price?.product?.cost,
    costInCents: price?.costInCents ?? price?.product?.costInCents,
    uuid,
    type: price?.product.type,
  };
  return item;
}
