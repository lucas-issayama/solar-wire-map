import { QuoteKit } from "@/types/quote";

function getInverterFromQuoteKit(quoteKit: QuoteKit) {
  return quoteKit?.quoteKitItems?.find((el: any) => el.type == "inverter");
}

function getInvertersFromQuoteKit(quoteKit: QuoteKit) {
  return quoteKit?.quoteKitItems?.filter((el: any) => el.type == "inverter");
}
function getModuleItemFromQuoteKit(quoteKit: QuoteKit) {
  return quoteKit?.quoteKitItems?.find((el: any) => el.type == "module");
}
function getModulesItemFromQuoteKit(quoteKit: QuoteKit) {
  return quoteKit?.quoteKitItems?.filter((el: any) => el.type == "module");
}

function formatKitDescription(quoteKit: QuoteKit) {
  let description = "GEF";

  let inverters = getInvertersFromQuoteKit(quoteKit);
  if (inverters?.length) {
    for (let i = 0; i < inverters?.length; i++) {
      description += ` ${inverters[i].code ?? ""}`;
    }
  }

  let modules = getModulesItemFromQuoteKit(quoteKit);

  if (modules?.length) {
    for (let i = 0; i < modules?.length; i++) {
      description += ` ${modules[i].code ?? ""}`;
    }
  }

  description += ` ${quoteKit?.dcPower.toFixed(2)} KWP`;
  description += ` ${quoteKit?.structureName}`;

  return description;
  //   return JSON.stringify({
  //     inverter: getInverterFromQuoteKit(quoteKit),
  //     module: getModuleItemFromQuoteKit(quoteKit),
  //     dcPower: quoteKit.dcPower,
  //     structureType: quoteKit.structureType,
  //     quoteKit,
  //   });
}

export default formatKitDescription;
