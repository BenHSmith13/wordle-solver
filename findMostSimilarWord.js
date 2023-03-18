export function findMostSimilarWord(words) {
  let maxCommonLetters = 0;
  let mostSimilarWord = "";

  for (let i = 0; i < words.length; i++) {
    const word1 = words[i];
    let commonLetters = 0;

    for (let j = 0; j < words.length; j++) {
      if (i !== j) {
        const word2 = words[j];

        for (let k = 0; k < word1.length; k++) {
          if (word2.includes(word1[k])) {
            commonLetters++;
          }
        }
      }
    }

    if (commonLetters > maxCommonLetters) {
      maxCommonLetters = commonLetters;
      mostSimilarWord = word1;
    }
  }

  return mostSimilarWord;
}
