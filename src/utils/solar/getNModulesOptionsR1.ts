export function getNmodulesOptions(
  mppts: any[],
  nMin: number,
  nMax: number
): number[] {
  const firstArray = mppts[0]; // Take one representative array since all are identical
  const numMppts = mppts.length;
  const totals: Set<number> = new Set();

  const combineForSingleArray = (
    index: number,
    total: number,
    depth: number
  ) => {
    // Terminate early if the total already exceeds nMax
    if (total > nMax) return;

    // Base case: All MPPTs have been processed
    if (depth === numMppts) {
      if (total >= nMin) totals.add(total); // Add total only if within range
      return;
    }

    // Iterate through the possible module counts for the array
    for (let moduleCount of firstArray) {
      combineForSingleArray(
        index,
        total + parseInt(moduleCount, 10),
        depth + 1
      );
    }
  };

  combineForSingleArray(0, 0, 0); // Start the recursion

  // Sort and return totals as an array
  return Array.from(totals).sort((a, b) => a - b);
}
