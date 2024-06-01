function diagonalDiff(input) {
  let diagonal1 = 0, diagonal2 = 0, result;

  for (let i = 0; i < input.length; i++) {
    diagonal1 = diagonal1 + input[i][i];
  }

  for (let i = 0, j = input.length - 1; i < input.length, j >= 0; i++, j--) {
    diagonal2 = diagonal2 + input[i][j];
  }

  result = diagonal1 - diagonal2;
  return result;
}

const matrix = [
  [1, 2, 0],
  [4, 5, 6],
  [7, 8, 9],
];
const output = diagonalDiff(matrix);
console.log(output);
