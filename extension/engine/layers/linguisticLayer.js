import { countMatches } from "../utils/textUtils.js";

export function linguisticLayer(email) {
  const text = (email.subject + " " + email.body).toLowerCase();
  let score = 0;

  const urgency = ["urgent", "immediately", "suspended", "action required"];
  const reward = ["winner", "prize", "claim", "reward"];
  const authority = ["government", "legal", "compliance", "official"];

  score += countMatches(text, urgency) * 10;
  score += countMatches(text, reward) * 15;
  score += countMatches(text, authority) * 12;

  const confidence = score > 0 ? 0.7 : 0.4;

  return {
    name: "linguistic",
    severityScore: Math.min(score, 100),
    confidence
  };
}
