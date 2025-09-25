export function getNmodulesOptions(mppts: any, nMin: number, nMax: number) {
  const uniqueTotals: any = new Set(); // Use a Set to store unique totals

  const combine = (index: number, total: number) => {
    if (index === mppts.length) {
      // Base case: All MPPTs have been processed
      if (total >= nMin && total <= nMax) uniqueTotals.add(total); // Add the total to the set
      return;
    }

    // Iterate through the possible module counts for the current MPPT
    for (let moduleCount of mppts[index]) {
      combine(index + 1, total + parseInt(moduleCount, 10));
    }
  };

  combine(0, 0); // Start the recursion with the first MPPT and initial total 0
  return Array.from(uniqueTotals).sort((a: any, b: any) => a - b); // Return sorted unique totals
}
