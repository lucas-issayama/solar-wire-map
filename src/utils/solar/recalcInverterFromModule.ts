import { getOptionsFromMppt } from "./getOptionsMppt";
import { getNmodulesOptions } from "./getNModulesOptions";

export function recalcInverterFromModule(
  inverter: {
    mppts: Array<{
      dcCurrentMax: number;
      dcVoltageMin: number;
      dcVoltageMax: number;
    }>;
    dcMaxPower: number;
    dcMinPower: number;
  },
  pvModule: {
    isc?: number;
    vmpTMax: number;
    vocTMin: number;
    dcPower?: number;
  }
) {
  const formattedInverter = { ...inverter, nMax: 0, nMin: 0, optionsNModules: [] as number[] };
  formattedInverter.mppts = (inverter?.mppts
    ?.map((mppt) => ({
      ...mppt,
      sMax: Math.floor(mppt.dcCurrentMax / (pvModule.isc || 1)),
      mMin: Math.ceil(mppt.dcVoltageMin / pvModule.vmpTMax),
      mMax: Math.floor(mppt.dcVoltageMax / pvModule.vocTMin),
    }))
    ?.map((mppt) => ({
      ...mppt,
      options: getOptionsFromMppt(mppt),
    }))) || [];

  formattedInverter.nMax = Math.floor(inverter.dcMaxPower / (pvModule.dcPower || 1));
  formattedInverter.nMin = Math.ceil(inverter.dcMinPower / (pvModule.dcPower || 1));

  formattedInverter.optionsNModules = getNmodulesOptions(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formattedInverter.mppts.map((el: any) =>
      Object.keys(el.options).map((item) => parseInt(item))
    ),
    formattedInverter.nMin,
    formattedInverter.nMax
  );

  return formattedInverter;
}
