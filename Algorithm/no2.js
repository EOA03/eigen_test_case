function longest(input) {
  let words, char_length = 0, word;
  words = input.split(" ");
  for(let i = 0; i<words.length; i++){
    if(words[i].length>char_length){
      char_length = words[i].length
      word = words[i]
    }
  }
  return (`${word}: ${char_length} character`);
}

const sentence = "Saya sangat senang mengerjakan soal algoritma";
const output = longest(sentence);
console.log(output);
