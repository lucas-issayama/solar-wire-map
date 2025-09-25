import { Quote, QuoteKit } from "@/types/quote";
import calculateShipping from "../calculateShipping";
import getTotalKits from "./getTotalKits";
const taxesFactor = 1 - 0.0925; // Taxes 9.25%

let interestRate = 1.33;
let machineInterestRates = [
  { min: 1, max: 1, interestRate: 2.07 },
  { min: 2, max: 6, interestRate: 2.18 },
  { min: 7, max: 12, interestRate: 2.65 },
];

function quoteRecalc(quote: Quote, deleteApproval?: boolean) {
  if (!quote || !quote?.quoteKits) return quote;

  //In case  stage >=100 means that the quote is already a orderve
  if (quote?.stage?.sortNumber && quote?.stage?.sortNumber >= 100) return quote;

  let quoteUpdated: Quote = {
    ...quote,
    priceKitsInCents: Math.round(
      getTotalKits(quote?.quoteKits) *
        (quote?.categoryDiscount ? 1 - quote?.categoryDiscount : 1)
    ),
    costKitsInCents: Math.round(getCostKits(quote?.quoteKits)),
    priceAssemblyInCents: getTotalAssemblyKits(quote?.quoteKits),
    dcPower: getDcPowerKit(quote?.quoteKits),
    discountType: quote.discountType || "percentage",
    kitFinalDiscountPercentage: 0,
  };

  // Apply discount to kit prices
  quoteUpdated.priceKitsFinalInCents = applyDiscount(
    quoteUpdated.priceKitsInCents,
    quoteUpdated.discountValue,
    quoteUpdated.discountType
  );

  //Fix addresses

  quoteUpdated.shippingEstimationStateShortName =
    quoteUpdated.shippingEstimationStateShortName ??
    quoteUpdated.shippingEstimationCity?.stateShortName;
  quoteUpdated.shippingEstimationCityName =
    quoteUpdated.shippingEstimationCityName ??
    quoteUpdated.shippingEstimationCity?.name;

  // Shipping calculations
  let {
    priceShippingInCents,
    costShippingInCents,
    shippingEstimationPriceInCents,
    shippingEstimated,
  } = calculateShipping(quoteUpdated);

  if (quote.manPriceShippingInCents) {
    priceShippingInCents = quote.manPriceShippingInCents;
  }
  let { costsInCents, costsInPercentage } =
    getOptionalServicesFactors(quoteUpdated);

  let shippingFactor =
    quoteUpdated.priceKitsFinalInCents > 0
      ? priceShippingInCents / quoteUpdated.priceKitsFinalInCents
      : 0;
  costsInPercentage.push(shippingFactor);

  quoteUpdated = {
    ...quoteUpdated,
    priceShippingInCents,
    costShippingInCents: Math.round(costShippingInCents),
    shippingEstimationPriceInCents,
    shippingEstimated,
    priceInCents: quoteUpdated.priceKitsFinalInCents + priceShippingInCents,
  };
  // Optional services costs
  quoteUpdated = applyOptionalServices(quoteUpdated);

  //Insert interestAmount
  if (quoteUpdated.paymentMethod?.id == 2) {
    let paymentInfo: any = getPaymentInfo(
      quoteUpdated.priceInCents,
      quoteUpdated.paymentNumberOfInstallments ?? 1
    );
    quoteUpdated.paymentInterestAmountInCents = parseInt(
      paymentInfo?.totalInterestAmount
    );
    quoteUpdated.priceInCents += quoteUpdated.paymentInterestAmountInCents;
  }

  //Calc final price
  quoteUpdated.rawPriceInCents = quoteUpdated.priceInCents;

  if (quoteUpdated.rawPriceInCents && quoteUpdated.discountFinalValue) {
    let newPriceInCents =
      quoteUpdated.rawPriceInCents - quoteUpdated.discountFinalValue;

    if (quoteUpdated.paymentMethod?.id == 2) {
      let paymentInfo: any = getPaymentInfo(
        newPriceInCents,
        quoteUpdated.paymentNumberOfInstallments ?? 1
      );

      quoteUpdated.paymentInterestAmountInCents = parseInt(
        paymentInfo?.totalInterestAmount
      );

      if (quoteUpdated.paymentInterestAmountInCents)
        costsInCents.push(quoteUpdated.paymentInterestAmountInCents);
    }

    let costTotal = costsInCents.reduce((acc, curr) => acc + curr, 0);

    let costTotalPercentage = costsInPercentage.reduce(
      (acc, curr) => acc + (curr ?? 0),
      0
    );
    if (!costTotalPercentage) costTotalPercentage = 0;

    let newPriceKitsInCents =
      (quoteUpdated.rawPriceInCents -
        costTotal -
        quoteUpdated.discountFinalValue) /
      (1 + (costTotalPercentage ?? 0));

    quoteUpdated.priceKitsFinalInCents = Math.round(newPriceKitsInCents);

    let newCostTotalPercentage =
      (costTotalPercentage ?? 0) - quoteUpdated.discountValue / 100;

    quoteUpdated.testNewKitsPriceInCents =
      (quoteUpdated.priceKitsInCents * (1 + newCostTotalPercentage) -
        quoteUpdated.discountFinalValue) /
      (1 + newCostTotalPercentage);

    quoteUpdated.testNewFinalPriceInCents =
      quoteUpdated.testNewKitsPriceInCents * (1 + newCostTotalPercentage) +
      costTotal;

    quoteUpdated.kitFinalDiscountPercentage = getFinalDiscountPercent(
      quoteUpdated,
      costTotal,
      costTotalPercentage
    );

    ({
      priceShippingInCents,
      costShippingInCents,
      shippingEstimationPriceInCents,
      shippingEstimated,
    } = calculateShipping(quoteUpdated));

    quoteUpdated = {
      ...quoteUpdated,
      priceShippingInCents,
      costShippingInCents: Math.round(costShippingInCents),
      shippingEstimationPriceInCents,
      shippingEstimated,
      priceInCents: newPriceInCents,
    };
  }

  if (quoteUpdated.integratorServicesType === "percentage") {
    quoteUpdated.integratorServicesInCents = Math.round(
      ((quoteUpdated.priceKitsFinalInCents ?? 0) *
        (quoteUpdated.integratorServicesValue ?? 0)) /
        100
    );
  } else if (quoteUpdated.integratorServicesType === "money") {
    quoteUpdated.integratorServicesInCents = Math.round(
      quoteUpdated.integratorServicesValue ?? 0
    );
  }

  // KPI calculations
  quoteUpdated = calculateKPIs(quoteUpdated);

  // Additional data
  quoteUpdated.shippingDate = getShippingDate(quote?.quoteKits);
  quoteUpdated.priceListJson = getPriceListJson(quote?.quoteKits);

  //alert(quoteUpdated.priceInCents);
  if (deleteApproval) {
    if (quoteUpdated.approvedByCoordinator) {
      quoteUpdated.approvedByCoordinator = false;
    }

    if (quoteUpdated.approvedByDirector) {
      quoteUpdated.approvedByDirector = false;
    }
  }

  return quoteUpdated;
}

function getFinalDiscountPercent(
  quoteUpdated: Quote,
  costTotal: any,
  costTotalPercentage: any
) {
  let newCostTotalPercentage =
    (costTotalPercentage ?? 0) - quoteUpdated.discountValue / 100;

  quoteUpdated.testNewKitsPriceInCents =
    (quoteUpdated.priceKitsInCents * (1 + newCostTotalPercentage) -
      (quoteUpdated.discountFinalValue ?? 0)) /
    (1 + newCostTotalPercentage);

  quoteUpdated.testNewFinalPriceInCents =
    quoteUpdated.testNewKitsPriceInCents * (1 + newCostTotalPercentage) +
    costTotal;

  // quoteUpdated.testDiscountPercentage =
  //   1 -
  //   (quoteUpdated.testNewKitsPriceInCents * (1 - quoteUpdated.discountValue / 100)) /
  //     quoteUpdated.priceKitsInCents;

  // Apply discount to kit prices
  let priceKitsFinalInCents = applyDiscount(
    quoteUpdated.testNewKitsPriceInCents,
    quoteUpdated.discountValue,
    quoteUpdated.discountType
  );

  return 1 - priceKitsFinalInCents / quoteUpdated.priceKitsInCents;
}

function applyDiscount(
  priceKitsInCents: number,
  discountValue: number = 0,
  discountType: string
) {
  if (discountType === "percentage") {
    return Math.round(priceKitsInCents * (1 - discountValue / 100));
  } else if (discountType === "money") {
    return Math.round(priceKitsInCents - discountValue);
  }
  return priceKitsInCents;
}

function applyOptionalServices(quote: Quote) {
  let { priceInCents } = quote;

  let costsInCents = [];
  let costsInPercentage = [];

  if (quote.activeShippingAssistant) {
    const priceShippingAssistantInCents =
      quote.priceShippingAssistantInCents ?? 0;
    priceInCents += priceShippingAssistantInCents;
    costsInCents.push(priceShippingAssistantInCents);
  }

  if (quote.activeEngineeringInsurance) {
    const priceEngineeringInsuranceInCents = Math.round(
      (quote.priceKitsInCents ?? 0) * quote.engineeringInsuranceFee
    );

    costsInPercentage.push(quote.engineeringInsuranceFee);
    quote.priceEngineeringInsuranceInCents = priceEngineeringInsuranceInCents;
    priceInCents += priceEngineeringInsuranceInCents;
  }

  if (quote.integratorServicesType === "percentage") {
    quote.integratorServicesInCents = Math.round(
      ((quote.priceKitsFinalInCents ?? 0) *
        (quote.integratorServicesValue ?? 0)) /
        100
    );

    // costsInPercentage.push(
    //   (quote.integratorServicesValue ?? 0) / 100 / taxesFactor
    // );
  } else if (quote.integratorServicesType === "money") {
    quote.integratorServicesInCents = Math.round(
      quote.integratorServicesValue ?? 0
    );
  }

  // priceInCents += Math.round(
  //   (quote.integratorServicesInCents ?? 0) / taxesFactor
  // );
  priceInCents += Math.round(quote.integratorServicesInCents ?? 0);

  quote.priceInCents = priceInCents;

  return quote;
}

function getOptionalServicesFactors(quote: Quote) {
  let { priceInCents } = quote;

  let costsInCents = [];
  let costsInPercentage = [];

  if (quote.activeShippingAssistant) {
    const priceShippingAssistantInCents =
      quote.priceShippingAssistantInCents ?? 0;
    priceInCents += priceShippingAssistantInCents;
    costsInCents.push(priceShippingAssistantInCents);
  }

  if (quote.activeEngineeringInsurance) {
    const priceEngineeringInsuranceInCents = Math.round(
      (quote.priceKitsInCents ?? 0) * quote.engineeringInsuranceFee
    );

    costsInPercentage.push(quote.engineeringInsuranceFee);
    quote.priceEngineeringInsuranceInCents = priceEngineeringInsuranceInCents;
    priceInCents += priceEngineeringInsuranceInCents;
  }

  if (quote.integratorServicesType === "percentage") {
    quote.integratorServicesInCents = Math.round(
      ((quote.priceKitsFinalInCents ?? 0) *
        (quote.integratorServicesValue ?? 0)) /
        100
    );

    costsInPercentage.push((quote.integratorServicesValue ?? 0) / 100);
  } else if (quote.integratorServicesType === "money") {
    quote.integratorServicesInCents = Math.round(
      quote.integratorServicesValue ?? 0
    );

    costsInCents.push(Math.round(quote.integratorServicesValue));
  }

  priceInCents += quote.integratorServicesInCents ?? 0;

  quote.priceInCents = priceInCents;

  return { costsInCents, costsInPercentage };
}

export function calculateKPIs(quote: Quote) {
  quote.kitRevenueInCents = Math.round(
    (quote.priceKitsFinalInCents + (quote.priceShippingInCents ?? 0)) *
      taxesFactor
  );

  // kit
  quote.kitGrossMarginInCents = Math.round(
    quote.kitRevenueInCents - quote.costKitsInCents - quote.priceAssemblyInCents
  );
  quote.kitGrossMargin =
    quote.kitGrossMarginInCents / Math.abs(quote.kitRevenueInCents);

  quote.kitContributionMarginInCents = Math.round(
    quote.kitRevenueInCents -
      quote.costKitsInCents -
      quote.priceAssemblyInCents -
      quote.costShippingInCents
  );
  quote.kitContributionMargin =
    quote.kitContributionMarginInCents / Math.abs(quote.kitRevenueInCents);

  // total
  // quote.revenueInCents = Math.round(
  //   (quote.priceInCents - quote.paymentInterestAmountInCents) * taxesFactor
  // );
  quote.revenueInCents = Math.round(
    quote.kitRevenueInCents -
      (quote.priceInCents - quote.paymentInterestAmountInCents) * taxesFactor
  );

  // console.log(
  //   JSON.stringify({
  //     kitRevenueInCents: quote.kitRevenueInCents,
  //     revenue: quote.revenueInCents,
  //     other: quote.priceKitsFinalInCents + (quote.priceShippingInCents ?? 0),
  //     priceInCents: quote.priceInCents,
  //   })
  // );

  quote.grossMarginInCents = Math.round(
    quote.revenueInCents -
      quote.costKitsInCents -
      (quote.integratorServicesInCents ?? 0) * 0.9075 -
      (quote.priceShippingAssistantInCents ?? 0) -
      (quote.priceEngineeringInsuranceInCents ?? 0) -
      (quote.priceAssemblyInCents ?? 0)
  );
  quote.grossMargin = quote.grossMarginInCents / Math.abs(quote.revenueInCents);

  quote.contributionMarginInCents = Math.round(
    quote.revenueInCents -
      quote.costKitsInCents -
      (quote.integratorServicesInCents ?? 0) * 0.9075 -
      (quote.priceShippingAssistantInCents ?? 0) -
      (quote.priceEngineeringInsuranceInCents ?? 0) -
      (quote.costShippingInCents ?? 0) -
      (quote.priceAssemblyInCents ?? 0)
  );

  quote.contributionMargin =
    quote.contributionMarginInCents / Math.abs(quote.revenueInCents);

  return quote;
}

function getPaymentInfo(amount: number, numberOfInstallments: number) {
  let month = 1;

  let installments = [];
  let installmentPrice = amount / numberOfInstallments;
  let machineInterestRate = machineInterestRates.find(
    (el) => el.min <= numberOfInstallments && el.max >= numberOfInstallments
  )?.interestRate;
  let interestMachine = (installmentPrice * (machineInterestRate ?? 0)) / 100;

  while (month <= numberOfInstallments) {
    let interestPrice =
      ((1 + interestRate / 100) ** month - 1) * installmentPrice;
    installments.push({
      month,
      installmentPrice,
      interestMachine,
      interestPrice,
    });
    month++;
  }

  let amountInterest = installments.reduce(
    (acc, curr) => acc + curr.interestMachine + curr.interestPrice,
    0
  );
  let amountWithouInterest = amount - amountInterest;
  let factor = amountWithouInterest / amount;
  let finalAmount = amount / factor;
  let finalInstallmentPrice = finalAmount / numberOfInstallments;
  let totalInterestAmount = finalAmount - amount;

  return {
    installments,
    amountWithouInterest,
    factor,
    finalAmount,
    finalInstallmentPrice,
    totalInterestAmount,
  };
}

// function getShippingCostFactor(stateName: string) {
//   let states = [
//     "AC",
//     "AL",
//     "AM",
//     "AP",
//     "BA",
//     "CE",
//     "DF",
//     "ES",
//     "GO",
//     "MA",
//     "MS",
//     "MT",
//     "PA",
//     "PB",
//     "PE",
//     "PI",
//     "RN",
//     "RO",
//     "RR",
//     "SE",
//     "TO",
//   ];
//   return states.find((el: string) => el == stateName) ? 0.93 : 0.88;
// }

// function getTotalKits(quoteKits: QuoteKit[]) {
//   return (
//     quoteKits
//       ?.filter((el) => !el.deleted)
//       .reduce(
//         (sum, item) => (sum += (item?.priceInCents ?? 0) * item.quantity),
//         0
//       ) ?? 0
//   );
// }

function getTotalAssemblyKits(quoteKits: QuoteKit[]) {
  return (
    quoteKits
      ?.filter((el) => !el.deleted)
      .reduce(
        (sum, item) =>
          (sum += (item?.priceAssemblyInCents ?? 0) * item.quantity),
        0
      ) ?? 0
  );
}

function getCostKits(quoteKits: QuoteKit[]) {
  return (
    quoteKits
      ?.filter((el) => !el.deleted)
      .reduce(
        (sum, item) => (sum += (item?.costInCents ?? 0) * item.quantity),
        0
      ) ?? 0
  );
}

const getDcPowerKit = (quoteKits: QuoteKit[]) => {
  return (
    quoteKits?.reduce(
      (sum, item) => (sum += (item?.dcPower ?? 0) * item.quantity),
      0
    ) ?? 0
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

const getShippingDate = (quoteKits: QuoteKit[]) => {
  let items = [...quoteKits];
  //items.sort((a, b) => ( a?.id ?? 1) - (b?.id ?? 2));
  if (items.length > 0) {
    items.sort(sortDate);
    return items?.[0].shippingDate;
  }
};

const getPriceListJson = (quoteKits: QuoteKit[]) => {
  let items = [...quoteKits];
  //items.sort((a, b) => ( a?.id ?? 1) - (b?.id ?? 2));
  if (items.length > 0) {
    items.sort(sortDate);
    return items?.[0].priceListJson;
  }
};

export default quoteRecalc;
