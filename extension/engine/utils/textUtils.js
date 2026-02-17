export function countMatches(text, keywords) {
  let count = 0;
  for (const word of keywords) {
    if (text.includes(word)) count++;
  }
  return count;
}
