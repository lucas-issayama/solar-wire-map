export function getOptionsFromMppt(mppt: { sMax: number; mMin: number; mMax: number }) {
  const options: Record<number, { wirings: { s: number; m: number; n: number }[] }> = {};
  const sMax = mppt.sMax;
  const mMin = mppt.mMin;
  const mMax = mppt.mMax;
  options[0] = { wirings: [] };
  options[0].wirings.push({ s: 0, m: 0, n: 0 });

  for (let s = 1; s <= sMax; s++) {
    for (let m = mMin; m <= mMax; m++) {
      const n = m * s;
      if (!options[n]) {
        options[n] = { wirings: [{ s, m, n }] };
      } else {
        options[n].wirings.push({ s, m, n });
      }
    }
  }

  return options;
}
