// export function formatModule(pvModule: any) {
//   const tBase = 25;
//   const tMin = 0;
//   const tMax = 70;

//   // Data is already in camelCase from the conversion
//   const formattedModule = {
//     ...pvModule,
//     // Use direct fields, fallback to svData if needed
//     dcPower: pvModule.dcPower || (pvModule?.svData?.potencia / 1000),
//     voc: pvModule.voc || pvModule?.svData?.tensaoCircuitoAbertoVOC,
//     vmp: pvModule.vmp || pvModule?.svData?.tensaoOperacaoVMP,
//     isc: pvModule.isc || pvModule?.svData?.correnteCurtoCircuitoISC,
//     imp: pvModule.imp || pvModule?.svData?.correnteOperacaoIMP,
//     coefVoc: pvModule.coefVoc || pvModule?.svData?.coeficienteTemperaturaVOC,
//     coefIsc: pvModule.coefIsc || pvModule?.svData?.coeficienteTemperaturaISC,
//     coefPmp: pvModule.coefPmp || pvModule?.svData?.coeficienteTemperaturaPMAX,
//     efficiency: pvModule.efficiency || pvModule?.svData?.eficiencia,
//     manufacturerName: pvModule.manufacturerName || pvModule?.svData?.fabricante,
//   };

//   // Calculate temperature variations using the coefficient from the formatted module
//   const coefVoc = formattedModule.coefVoc;
//   const voc = formattedModule.voc;
//   const vmp = formattedModule.vmp;

//   formattedModule.vocTMin = (1 + coefVoc * (tMin - tBase)) * voc;
//   formattedModule.vocTMax = (1 + coefVoc * (tMax - tBase)) * voc;
//   formattedModule.vmpTMax = (1 + coefVoc * (tMax - tBase)) * vmp;

//   return formattedModule;
// }

export function formatModule(pvModule: any) {
  let tBase = 25;
  let tMin = 0;
  let tMax = 70;

  let formattedModule = {
    ...pvModule,
    vocTMin: (1 + pvModule?.coefVoc * (tMin - tBase)) * pvModule?.voc,
    vocTMax: (1 + pvModule?.coefVoc * (tMax - tBase)) * pvModule?.voc,
    vmpTMax: (1 - pvModule?.coefVoc * (tMin - tBase)) * pvModule?.vmp,
  };
  return formattedModule;
}
