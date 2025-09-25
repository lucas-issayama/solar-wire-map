import { getDiscount } from "./get-discount";

export function getPriceFromCategory(
  valueInCents: number | undefined,
  user: any,
  enterprise?: any
) {
  return (valueInCents ?? 0) * (1 - getDiscount(user, enterprise));
}
