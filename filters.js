import possibleWords from "./possible_words.json" with { type: "json" };
import usedWords from "./used_words.json" with { type: "json" };

export function filteredWordsByGuesses(guesses) {
  let filteredWordList = filterOutPreviousAnswers(possibleWords.words, usedWords.words);

  guesses.forEach((guess) => {
    filteredWordList = filterHasCorrectLetters(filteredWordList, guess.correctLetters);
    filteredWordList = filterOutUsedLetters(
      filteredWordList,
      guess.usedLetters,
      guess.correctLetters
    );
  });
  console.log(filteredWordList);

  return filteredWordList;
}

export function filteredWords(correctLetters, usedLetters, incorrectLetters) {
  let filteredWordList = filterOutPreviousAnswers(possibleWords.words, usedWords.words);

  filteredWordList = filterHasCorrectLetters(filteredWordList, correctLetters);
  filteredWordList = filterOutUsedLetters(filteredWordList, usedLetters, correctLetters);
  filteredWordList = filterOutIncorrectLetterPlacements(filteredWordList, incorrectLetters);

  return filteredWordList;
}

function filterOutPreviousAnswers(possibleWords, usedWords) {
  return possibleWords.filter((word) => !usedWords.includes(word.toUpperCase()));
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

function filterOutUsedLetters(words, usedLetters, correctLetters) {
  let filteredWords = words;
  const okLetters = correctLetters?.replace(/-/g, "").toLowerCase() ?? "";
  usedLetters.split("").forEach((usedLetter) => {
    if (okLetters.includes(usedLetter)) return;
    filteredWords = filteredWords.filter((word) => !word.includes(usedLetter));
  });
  return filteredWords;
}

// TODO: combine this with filterHasCorrectLetters for optimization
// Or don't, because it's not slow on my machine, I'm the only consumer, the data is finite, and I don't care about this project that much
function filterOutIncorrectLetterPlacements(words, incorrectLetters) {
  let filteredWords = words;
  incorrectLetters.split("").forEach((incorrectLetter, index) => {
    if (incorrectLetter === "-") return;
    filteredWords = filteredWords.filter((word) => word[index] !== incorrectLetter);
  });
  return filteredWords;
}
