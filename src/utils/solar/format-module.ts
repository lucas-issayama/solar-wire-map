
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
