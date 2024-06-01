function reverse(input) {
  let word_reverse = "";
  let char_number;
  let regex1 = /\D*/;
  let words = input.match(regex1);
  words = words[0];

  let regex2 = /\d/;
  char_number = input.match(regex2);
  char_number = char_number[0];

  for (let i = words.length - 1; i >= 0; i--) {
    word_reverse = word_reverse + words[i];
  }
  return `${word_reverse}${char_number}`;
}

const string = "NEGIE1";
const output = reverse(string);
console.log(output);
