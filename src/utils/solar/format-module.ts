
export function formatModule(pvModule: { voc: number; vmp: number; coefVoc?: number }) {
  const tBase = 25;
  const tMin = 0;
  const tMax = 70;

  const coefVoc = pvModule.coefVoc || 0;
  const formattedModule = {
    ...pvModule,
    vocTMin: (1 + coefVoc * (tMin - tBase)) * pvModule.voc,
    vocTMax: (1 + coefVoc * (tMax - tBase)) * pvModule.voc,
    vmpTMax: (1 - coefVoc * (tMin - tBase)) * pvModule.vmp,
  };
  return formattedModule;
}
