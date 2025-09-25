import { Quote } from "@/types/quote";
import { getShippingPriceInCents } from "./getShippingPriceInCents";
import getShippingCostFactor from "./getShippingCostFactor";

export default function calculateShipping(quote: Quote) {
  // alert("calculateShipping");
  let shippingEstimated = false;
  let priceShippingInCents = 0;
  let costShippingInCents = 0;
  let shippingEstimationPriceInCents = 0;
  let shippingEstimationStateShortName =
    quote.shippingEstimationStateShortName ??
    quote.shippingEstimationCity?.stateShortName;
  let shippingEstimationCityName =
    quote.shippingEstimationCityName ?? quote.shippingEstimationCity?.name;

  if (
    !quote.shippingAddress?.zipCode &&
    shippingEstimationStateShortName &&
    shippingEstimationCityName
  ) {
    priceShippingInCents = getShippingPriceInCents(
      shippingEstimationStateShortName,
      shippingEstimationCityName,
      quote.dcPower ?? 0,
      quote.priceKitsFinalInCents ?? 0
    );

    shippingEstimationPriceInCents = priceShippingInCents;
    costShippingInCents =
      getShippingCostFactor(shippingEstimationStateShortName) *
      priceShippingInCents;
    shippingEstimated = true;
  } else if (
    quote.shippingAddress?.city?.stateShortName &&
    quote.shippingAddress?.city?.name
  ) {
    priceShippingInCents = getShippingPriceInCents(
      quote.shippingAddress.city.stateShortName,
      quote.shippingAddress.city.name,
      quote.dcPower ?? 0,
      quote.priceKitsFinalInCents ?? 0
    );
    costShippingInCents =
      getShippingCostFactor(quote.shippingAddress.stateShortName) *
      priceShippingInCents;
  }

  if (quote.manPriceShippingInCents) {
    priceShippingInCents = quote.manPriceShippingInCents;
    //factor for manual
    costShippingInCents = 0.88 * priceShippingInCents;
  }

  if (quote.shippingType !== "cif") {
    priceShippingInCents = 0;
    costShippingInCents = 0;
    shippingEstimationPriceInCents = 0;
  }

  return {
    priceShippingInCents,
    costShippingInCents,
    shippingEstimationPriceInCents,
    shippingEstimated,
  };
}
