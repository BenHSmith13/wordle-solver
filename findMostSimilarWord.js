export function findMostSimilarWord(words) {
  let maxCommonLetters = 0;
  let mostSimilarWord = "";

  words.forEach((word1) => {
    let commonLetters = 0;

    words.forEach((word2) => {
      if (word1 !== word2) {
        const uniqueLetters = new Set([...word1]);
        uniqueLetters.forEach((letter) => {
          if (word2.includes(letter)) {
            commonLetters++;
          }
        });
      }
    });

    if (commonLetters > maxCommonLetters) {
      maxCommonLetters = commonLetters;
      mostSimilarWord = word1;
    }
  });

  return mostSimilarWord;
}
