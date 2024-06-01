function count(input, query) {
  let result = [], count = 0;
  for (let i = 0; i < query.length; i++) {
    for (let j = 0; j < input.length; j++) {
      if (query[i] == input[j]) {
        count++;
      }
    }
    result.push(count);
    count = 0;
  }
  return result;
}

const input = ["xc", "dz", "bbb", "dz"];
const query = ["bbb", "ac", "dz"];
const output = count(input, query);
console.log(output);
