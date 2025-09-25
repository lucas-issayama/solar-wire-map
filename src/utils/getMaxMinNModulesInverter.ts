export default function getMaxMinNModulesInverter(
  inverterProduct: any,
  moduleProduct: any,
  inverterQuantity: number
) {
  let moduleId = moduleProduct?.id - 400000000;
  let options = inverterProduct?.inverter?.combinations?.find(
    (el: any) => el.moduleId == moduleId
  )?.options;

  let dcMaxPower = inverterProduct?.dcMaxPower;
  let dcMinPower = inverterProduct?.dcMinPower;
  let dcPowerModule = moduleProduct?.dcPower;
  let minNModules;
  let maxNModules;

  if (options) {
    // console.log("Found options");
    // console.log(JSON.stringify(options));
    minNModules = options[0];
    maxNModules = options[options?.length - 1];
  } else {
    if (dcMinPower && dcPowerModule) {
      minNModules = Math.ceil(dcMinPower / dcPowerModule);
    }

    if (inverterProduct.nMinModules) {
      minNModules = inverterProduct.nMinModules;
    }

    if (dcMaxPower && dcPowerModule) {
      maxNModules = Math.floor(dcMaxPower / dcPowerModule);
    }

    if (inverterProduct.nMaxModules) {
      maxNModules = inverterProduct.nMaxModules;
    }
  }

  return {
    minNModules: minNModules * inverterQuantity,
    maxNModules: maxNModules * inverterQuantity,
  };
}
