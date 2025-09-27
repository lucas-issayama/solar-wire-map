import { i } from "mathjs";
import { getOptionsFromMppt } from "./getOptionsMppt";
import { getNmodulesOptions } from "./getNModulesOptions";
import { generateCombinations } from "./generateCombinations";

export function recalcInverterFromModule(inverter: any, pvModule: any) {
  const formattedInverter: any = { ...inverter };

  formattedInverter.mppts = inverter?.mppts
    ?.map((mppt: any) => ({
      ...mppt,
      sMax: Math.floor(mppt.dcCurrentMax / pvModule.isc),
      mMin: Math.ceil(mppt.dcVoltageMin / pvModule.vmpTMax),
      mMax: Math.floor(mppt.dcVoltageMax / pvModule.vocTMin),
    }))
    ?.map((mppt: any) => ({
      ...mppt,
      options: getOptionsFromMppt(mppt),
    }));

  formattedInverter.nMax = Math.floor(inverter.dcMaxPower / pvModule.dcPower);
  formattedInverter.nMin = Math.ceil(inverter.dcMinPower / pvModule.dcPower);

  formattedInverter.optionsNModules = getNmodulesOptions(
    formattedInverter.mppts.map((el: any) =>
      Object.keys(el.options).map((item) => parseInt(item))
    ),
    formattedInverter.nMin,
    formattedInverter.nMax
  );

  return formattedInverter;
}
