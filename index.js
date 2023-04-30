import { findMostSimilarWord } from "./findMostSimilarWord.js";
import { filteredWords } from "./filters.js";
import readliner from "readline";

const readline = readliner.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("BS Wordle Solver");
console.log("Best Starter: SALET");
console.log(
  "Input as [-xX-x asdf x--x-] Hyphen if unknown, capital if position correct, lowercase if letter in wrong position [SPACE] letters not in workd"
);

// TODO: import function from solver.js
readline.question(`Input: `, (input) => {
  const [correctLetters, usedLetters, incorrectLetters] = input.split(" ");
  const filteredWordList = filteredWords(
    correctLetters,
    usedLetters,
    incorrectLetters
  );

  const bestPick = findMostSimilarWord(filteredWordList);
  console.log("Most Impactful Word: ", bestPick);

  console.log(filteredWordList);
  readline.close();
});
