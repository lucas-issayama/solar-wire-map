export function generateCombinations(mppts: any, n: number) {
  let result: any = null; // Store the first result
  let iteractions = 0;

  const combine = (index: number, currentConfig: any, total: number) => {
    iteractions++;
    if (result !== null) return; // Stop recursion if result is already found

    if (index === mppts.length) {
      if (total === n) {
        result = { total, mppts: [...currentConfig] }; // Save the first valid result
      }
      return;
    }

    // Iterate through the possible module counts for the current MPPT in descending order
    for (let moduleCount of [...mppts[index]].sort(
      (a, b) => parseInt(b, 10) - parseInt(a, 10)
    )) {
      combine(
        index + 1,
        [...currentConfig, parseInt(moduleCount, 10)],
        total + parseInt(moduleCount, 10)
      );
      if (result !== null) break; // Stop processing other branches once result is found
    }
  };

  combine(0, [], 0);
  console.log(JSON.stringify({ n, iteractions }));
  return result; // Return the first matching result or null if none found
}
