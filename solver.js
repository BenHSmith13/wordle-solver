// This is the same as index, but is callable from the extension

import { findMostSimilarWord } from "./findMostSimilarWord.js";
import { filteredWordsByGuesses } from "./filters.js";

export function solve(guesses) {
  const filteredWordList = filteredWordsByGuesses(guesses);

  const bestPick = findMostSimilarWord(filteredWordList);
  console.log("Most Impactful Word: ", bestPick);

  console.log(filteredWordList);
  return { bestPick, filteredWordList };
}
