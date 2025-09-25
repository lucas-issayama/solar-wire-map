import { Quote } from "@/types/quote";

export default function getShippingCostFactor(stateName: string) {
  let states = [
    "AC",
    "AL",
    "AM",
    "AP",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MS",
    "MT",
    "PA",
    "PB",
    "PE",
    "PI",
    "RN",
    "RO",
    "RR",
    "SE",
    "TO",
  ];
  return states.find((el: string) => el == stateName) ? 0.93 : 0.88;
}
