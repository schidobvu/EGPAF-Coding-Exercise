function regexDivisibleBy(n) {
  // Initialise nodes variable
  let Nodes = [];
  //Iterating by n times and adding ("" + i) to the Nodes array
  for (let i = 0; i < n; i++) {
    Nodes.push("" + i);
  }
  let paths = {},
    output = "";
  for (let i = n - 1; i >= 0; i--) {
    let x = Nodes[i];
    if (i % 2 === 0 && i !== 0) {
      if (paths[Nodes[i / 2] + x]) {
        paths[Nodes[i / 2] + x] = `(${paths[Nodes[i / 2] + x]}|0)`;
      } else {
        paths[Nodes[i / 2] + x] = "0";
      }
    } else if (i % 2 !== 0) {
      if (paths[Nodes[(i - 1) / 2] + x]) {
        paths[Nodes[(i - 1) / 2] + x] = `(${
          paths[Nodes[(i - 1) / 2] + x] + x
        }|1)`;
      } else {
        paths[Nodes[(i - 1) / 2] + x] = "1";
      }
    }
    if ((2 * i) % n < i) {
      if (paths[x + Nodes[(2 * i) % n]]) {
        paths[x + Nodes[(2 * i) % n]] = `(${paths[x + Nodes[(2 * i) % n]]}|0)`;
      } else {
        paths[x + Nodes[(2 * i) % n]] = "0";
      }
    } else if ((2 * i) % n === i) {
      if (paths[x + x]) {
        paths[x + x] = `(${paths[x + x]}0*)*`;
      } else {
        paths[x + x] = "0*";
      }
    }
    if ((2 * i + 1) % n < i) {
      if (paths[x + Nodes[(2 * i + 1) % n]]) {
        paths[x + Nodes[(2 * i + 1) % n]] = `(${
          paths[x + Nodes[(2 * i + 1) % n]]
        }|1)`;
      } else {
        paths[x + Nodes[(2 * i + 1) % n]] = "1";
      }
    } else if ((2 * i + 1) % n === i) {
      if (paths[x + x]) {
        paths[x + x] = `(${paths[x + x]}1*)*`;
      } else {
        paths[x + x] = "1*";
      }
    }

    //eliminate states
    let start = [],
      end = [],
      loop = "";
    let pathkeys = Object.keys(paths);
    pathkeys.forEach((y) => {
      if (y === x + x) {
        loop = paths[x + x];
      } else if (y[1] === x && y[0] !== x) {
        start.push(y[0]);
      } else if (y[0] === x && y[1] !== x) {
        end.push(y[1]);
      }
    });
    start.forEach((s) => {
      end.forEach((e) => {
        if (s !== e) {
          if (paths[s + e]) {
            paths[s + e] = `(${paths[s + e]}|(${
              paths[s + x] + loop + paths[x + e]
            }))`;
          } else {
            paths[s + e] = paths[s + x] + loop + paths[x + e];
          }
        } else {
          if (paths[s + s]) {
            paths[s + s] = `(${paths[s + s]}(${
              paths[s + x] + loop + paths[x + e]
            })*)`;
          } else {
            paths[s + s] = `(${paths[s + x] + loop + paths[x + e]})*`;
          }
        }
      });
    });
    if (i !== 0) {
      pathkeys.forEach((j) => {
        if (j.indexOf(x) !== -1) {
          delete paths[j];
        }
      });
    }
  }
  return `^${paths["00"]}$`;
}
console.log(regexDivisibleBy(5));
