//Check each combination

import { generateCombinations } from "./generateCombinations";

export function getNmodulesOptions(
  mppts: any[],
  nMin: number,
  nMax: number
): number[] {
  const options: number[] = [];
  for (let i = nMin; i <= nMax; i++) {
    if (generateCombinations(mppts, i)) {
      options.push(i);
    }
  }

  return options;
}
