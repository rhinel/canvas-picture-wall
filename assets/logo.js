var logoPositionTable = (function () {
  function add (x, y) { return { x: (x - 1) * 8, y: (y - 1) * 8 } }
  var len = [
    [[37, 40]],
    [[34, 40]],
    [[31, 39]],
    [[28, 37]],
    [[26, 35]],
    [[24, 33]],
    [[21, 31]],
    [[18, 29]],
    [[16, 28]],
    [[14, 25]],
    [[13, 23]],
    [[11, 22]],
    [[10, 20]],
    [[8, 19]],
    [[7, 18]],
    [[6, 17]],
    [[5, 16]],
    [[5, 16]],
    [[4, 16]],
    [[3, 16]],
    [[3, 16]],
    [[2, 15]],
    [[2, 15]],
    [[2, 14]],
    [[1, 11]],
    [[1, 6], [12, 15]],
    [[1, 4], [8, 20]],
    [[1, 3], [7, 23]],
    [[1, 3], [5, 26]],
    [[1, 2], [4, 28]],
    [[4, 5], [9, 17], [21, 30]],
    [[10, 16], [23, 33]],
    [[6, 9], [12, 15], [30, 35]],
    [[7, 11], [32, 35]],
    [[8, 13]],
    [[8, 14]],
    [[9, 14]],
    [[13, 15]],
    [[14, 16]],
    [[15, 17]],
    [[16, 17]],
    [[17, 18]],
    [[18, 18]],
  ]

  var map = [];

  for (var lineIndex = 0; lineIndex < len.length; lineIndex++ ) {
    var line = len[lineIndex];
    for (var blockIndex = 0; blockIndex < line.length; blockIndex++ ) {
      var block = line[blockIndex];
      for (var i = 0; i <= (block[1] - block[0]); i++ ) {
        map.push(add(block[0] + i, lineIndex + 1));
      }
    }
  }

  // len.forEach((line, lineIndex) => {
  //   line.forEach((block) => {
  //     for (var i = 0; i <= (block[1] - block[0]); i++) {
  //       map.push(add(block[0] + i, lineIndex + 1));
  //     }
  //   })
  // })

  return map;
})();
