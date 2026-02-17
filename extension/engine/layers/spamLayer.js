export function spamLayer(email) {
  const text = email.body.toLowerCase();
  let score = 0;

  if (text.includes("unsubscribe")) score += 15;
  if (text.includes("limited time offer")) score += 20;
  if ((text.match(/https?:\/\//g) || []).length > 8) score += 25;

  const confidence = score > 0 ? 0.6 : 0.4;

  return {
    name: "spam",
    severityScore: Math.min(score, 100),
    confidence
  };
}
