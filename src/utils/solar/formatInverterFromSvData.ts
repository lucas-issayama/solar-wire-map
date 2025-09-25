
export function formatInverterFromSvData(inverter: any) {
  if (inverter?.mppts && Array.isArray(inverter.mppts)) return inverter;

  let overload = inverter?.svData?.fabricante == "SOLAX" ? 1 : 0.7;
  if (inverter.inverterType == "micro") overload = 1;
  let underload = 0.5;

  let formattedInverter = { ...inverter };

  // Data is already in camelCase from the conversion, use direct fields
  if (!formattedInverter.acPower) {
    formattedInverter.acPower = inverter.acPower || (inverter?.svData?.potenciaNominal / 1000);
  }

  if (!formattedInverter.dcMaxPower) {
    formattedInverter.dcMaxPower = inverter.dcMaxPower || (formattedInverter.acPower * (1 + overload));
  }

  if (!formattedInverter.dcMinPower) {
    formattedInverter.dcMinPower = inverter.dcMinPower || (formattedInverter.acPower * (1 - underload));
  }

  if (!formattedInverter.acVoltage) {
    formattedInverter.acVoltage = inverter.acVoltage || inverter?.svData?.tensaoLinha;
  }

  if (!formattedInverter.acPhases) {
    formattedInverter.acPhases = inverter.acPhases || inverter?.svData?.fases;
  }

  // Use mppts array if already exists, otherwise build from sv_data
  if (inverter.mppts && Array.isArray(inverter.mppts)) {
    formattedInverter.mppts = inverter.mppts;
  } else {
    formattedInverter.mpptVoltageMax = inverter?.svData?.tensaoMaximaMPPT;
    formattedInverter.mpptVoltageMin = inverter?.svData?.tensaoMinimaMPPT;
    formattedInverter.mpptCurrentMax = inverter?.svData?.correnteMaximaMPPT;

    let mppts = [];

    for (let i = 0; i < (inverter?.svData?.mppts || 1); i++) {
      let mppt = {
        dcVoltageMax: formattedInverter.mpptVoltageMax,
        dcVoltageMin: formattedInverter.mpptVoltageMin,
        dcCurrentMax: 0,
      };
      if (i == 0) mppt.dcCurrentMax = formattedInverter.mpptCurrentMax;
      else {
        mppt.dcCurrentMax =
          inverter?.svData?.[`correnteMaximaMPPT${i + 1}`] ??
          inverter?.svData?.correnteMaximaMPPT;
      }

      mppts.push(mppt);
    }
    formattedInverter.mppts = mppts;
  }

  return formattedInverter;
}
