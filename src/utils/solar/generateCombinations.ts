
export function generateCombinations(
  mppts: number[][],
  n: number
): number[] | null {
  let iteractions = 0;

  let ans = [];
  let nRemaining = n;
  let mppts_ = [...mppts];

  if (mppts_.length > 4) {
    //Change the mppt object and consider test bigger numbers
    //let mppts

    if (mppts[0][mppts[0].length - 1] > nRemaining) {
    }
  }

  let i = 0;
  let finish = false;
  // console.log(JSON.stringify({ length: mppts_.length, finish, nRemaining }));
  while (mppts_.length > 4 && !finish && nRemaining > 0) {
    let mppt_ = mppts_[0];
    // console.log(
    //   `mppt_?.[mppt_.length - 1]: ${
    //     mppt_?.[mppt_.length - 1]
    //   }, nRemaining:${nRemaining}`
    // );

    if (mppt_?.[mppt_.length - 1] * 2 < nRemaining) {
      mppts_.shift();
      nRemaining = nRemaining - mppt_?.[mppt_.length - 1];
      ans.push(mppt_?.[mppt_.length - 1]);
      // console.log(
      //   `length:${mppts_.length}, value: ${
      //     mppt_?.[mppt_.length - 1]
      //   } , remaining:${nRemaining}`
      // );
    } else {
      finish = true;
    }
  }

  /*   console.log(`Finish length:${mppts_.length}`);

  return ans; */
  // console.log("continue getOption");
  const getOption = (index: number, remaining: number): number[] | null => {
    iteractions++;
    if (remaining === 0) return Array(mppts_.length).fill(0); // Exact match with no remaining value
    if (index >= mppts_.length) return null; // Out of MPPTs, no solution

    // Iterate from largest to smallest in the current MPPT array
    for (let i = mppts_[index].length - 1; i >= 0; i--) {
      const currentValue = mppts_[index][i];

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
  let ans2 = getOption(0, nRemaining);

  if (ans2) {
    return [...ans, ...ans2];
  }
  return null;
}
