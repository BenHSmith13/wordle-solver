const possibleWords = require("./possible_words.json");
const usedWords = require("./used_words.json");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const withoutPreviousAnswers = possibleWords.words.filter(
  (word) => !usedWords.words.includes(word.toUpperCase())
);

console.log("BS Wordle Solver");
console.log("Best Starter: SALET");
console.log(
  "Input as [-xX-x asdf] Hyphen if unknown, capital if position correct, lowercase if letter in wrong position [SPACE] letters not in workd"
);

readline.question(`Input: `, (input) => {
  const [correctLetters, usedLetters] = input.split(" ");
  let filteredWordList = withoutPreviousAnswers;

  correctLetters.split("").forEach((letter, index) => {
    if (letter === "-") return;
    const isPlacedCorrectly = letter.toUpperCase() === letter;
    filteredWordList = filteredWordList.filter((word) => {
      if (isPlacedCorrectly) return word[index] === letter.toLowerCase();
      return word.includes(letter) && word[index] !== letter;
    });
  });

  usedLetters.split("").forEach((usedLetter) => {
    filteredWordList = filteredWordList.filter(
      (word) => !word.includes(usedLetter)
    );
  });

  console.log(filteredWordList);
  readline.close();
});
