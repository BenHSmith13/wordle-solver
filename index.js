const dictionary = require("./words_dictionary.json");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const fiveLetterWords = Object.entries(dictionary)
  .filter(([key, _val]) => key.length === 5)
  .map((entry) => entry[0]);

readline.question(
  `Correct Letters capital if position correct [SPACE] used letters not in workd (-xX-x asdf):`,
  (input) => {
    const [correctLetters, usedLetters] = input.split(" ");
    let filteredWordList = fiveLetterWords;

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
  }
);
