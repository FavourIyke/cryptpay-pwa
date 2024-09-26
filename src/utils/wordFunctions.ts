export const truncateWord = (word: string): string => {
  if (word.length <= 10) {
    return word; // No need to truncate if the word is already short
  }

  const firstPart = word.slice(0, 6);
  const lastPart = word.slice(-3);

  return `${firstPart}......${lastPart}`;
};
