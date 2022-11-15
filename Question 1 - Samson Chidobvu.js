//Question 1
const generateSeq = (seqX) => {
  let seqY = [];
  let n = seqX.length;

  for (let i = 0; i < n; i++) {
    let current = seqX[i];
    if (current !== seqX[n - 1]) {
      let difference = seqX[i + 1] - current;
      seqY.push(difference);
    }
  }
  return seqY;
};
const seqX = [1, 3, 7, 12, 18, 26, 35, 45, 56, 69, 83, 98];
console.log(generateSeq(seqX));
