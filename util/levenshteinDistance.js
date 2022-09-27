export const levenshteinDistance = (correctAnswer = "", providedAnswer = "") => {
  correctAnswer = correctAnswer.trim().toLowerCase();
  providedAnswer = providedAnswer.trim().toLowerCase();

  const track = Array(providedAnswer.length + 1)
    .fill(null)
    .map(() => Array(correctAnswer.length + 1).fill(null));
  for (let i = 0; i <= correctAnswer.length; i += 1) {
    track[0][i] = i;
  }
  for (let j = 0; j <= providedAnswer.length; j += 1) {
    track[j][0] = j;
  }
  for (let j = 1; j <= providedAnswer.length; j += 1) {
    for (let i = 1; i <= correctAnswer.length; i += 1) {
      const indicator = correctAnswer[i - 1] === providedAnswer[j - 1] ? 0 : 1;
      track[j][i] = Math.min(
        track[j][i - 1] + 1, // deletion
        track[j - 1][i] + 1, // insertion
        track[j - 1][i - 1] + indicator // substitution
      );
    }
  }
  return track[providedAnswer.length][correctAnswer.length];
};

export const isSimilar = (correctAnswer, providedAnswer) => {
  let maxLen =
    correctAnswer.length >= providedAnswer.length ? correctAnswer.length : providedAnswer.length;
  let levDiff = levenshteinDistance(correctAnswer, providedAnswer);

  return levDiff / maxLen <= 0.1 ? true : false;
};
