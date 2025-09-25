export function getOptionsFromMppt(mppt: any) {
  let options: any = {};
  let sMax = mppt.sMax;
  let mMin = mppt.mMin;
  let mMax = mppt.mMax;
  options[0] = { wirings: [] };
  options[0].wirings.push({ s: 0, m: 0, n: 0 });

  for (let s = 1; s <= sMax; s++) {
    for (let m = mMin; m <= mMax; m++) {
      let n = m * s;
      if (!options[n]) {
        options[n] = { wirings: [{ s, m, n }] };
      } else {
        options[n].wirings.push({ s, m, n });
      }
    }
  }

  return options;
}
