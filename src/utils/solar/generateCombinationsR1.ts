export function generateCombinations(
  mppts: number[][],
  n: number
): number[] | null {
  let iteractions = 0;
  const getOption = (index: number, remaining: number): number[] | null => {
    iteractions++;
    if (remaining === 0) return Array(mppts.length).fill(0); // Exact match with no remaining value
    if (index >= mppts.length) return null; // Out of MPPTs, no solution

    // Iterate from largest to smallest in the current MPPT array
    for (let i = mppts[index].length - 1; i >= 0; i--) {
      const currentValue = mppts[index][i];

      if (currentValue > remaining) continue; // Skip values larger than the remaining target

      // Recursively attempt to find a solution with the current value
      const result = getOption(index + 1, remaining - currentValue);
      if (result) {
        result[index] = currentValue; // Assign the value for the current MPPT
        return result;
      }
    }

    return null; // No solution found for this branch
  };

  let ans = getOption(0, n);
  console.log(JSON.stringify({ n, iteractions }));
  return ans;
}
