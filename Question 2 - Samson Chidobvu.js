/* Function returning number of jumps a
cangaroo will possibly have by n steps (Array length)
*/
function numOfJumps(array, n) {
  // Return '-1' souce matches destination
  if (n == 1) return 0;
  /*
  Traverse through all the points
  possible from the starting position of the canagroo the
  Recursively, get the minimum number
  of jumps needed to reach the final possible node.
  */

  //Initialise maximum numeric value
  let res = Number.MAX_VALUE;
  for (let i = n - 2; i >= 0; i--) {
    if (i + array[i] >= n - 1) {
      let sub_res = numOfJumps(array, i + 1);
      if (sub_res != Number.MAX_VALUE) res = Math.min(res, sub_res + 1);
    }
  }
  //return number of jumps a cangaroo will possibly take
  return res;
}

let array = [1, 2, 1, 5];
let arrayLen = array.length;
console.log(numOfJumps(array, arrayLen));
