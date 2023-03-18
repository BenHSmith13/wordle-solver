import possibleWords from "./possible_words.json" assert { type: "json" };
import usedWords from "./used_words.json" assert { type: "json" };

export function filteredWords(correctLetters, usedLetters, incorrectLetters) {
  let filteredWordList = filterOutPreviousAnswers(
    possibleWords.words,
    usedWords.words
  );

  filteredWordList = filterHasCorrectLetters(filteredWordList, correctLetters);
  filteredWordList = filterOutUsedLetters(filteredWordList, usedLetters);
  filteredWordList = filterOutIncorrectLetterPlacements(
    filteredWordList,
    incorrectLetters
  );

  return filteredWordList;
}

function filterOutPreviousAnswers(possibleWords, usedWords) {
  return possibleWords.filter(
    (word) => !usedWords.includes(word.toUpperCase())
  );
}

function filterHasCorrectLetters(words, correctLetters) {
  let filteredWords = words;
  correctLetters.split("").forEach((letter, index) => {
    if (letter === "-") return;
    const isPlacedCorrectly = letter.toUpperCase() === letter;
    filteredWords = filteredWords.filter((word) => {
      if (isPlacedCorrectly) return word[index] === letter.toLowerCase();
      return word.includes(letter) && word[index] !== letter;
    });
  });
  return filteredWords;
}

function filterOutUsedLetters(words, usedLetters) {
  let filteredWords = words;
  usedLetters.split("").forEach((usedLetter) => {
    filteredWords = filteredWords.filter((word) => !word.includes(usedLetter));
  });
  return filteredWords;
}

function filterOutIncorrectLetterPlacements(words, incorrectLetters) {
  let filteredWords = words;
  incorrectLetters.split("").forEach((incorrectLetter, index) => {
    if (incorrectLetter === "-") return;
    filteredWords = filteredWords.filter(
      (word) => word[index] !== incorrectLetter
    );
  });
  return filteredWords;
}