export function scamPatternLayer(email) {
  const text = (email.subject + " " + email.body).toLowerCase();
  let score = 0;

  if (text.includes("verify your account")) score += 40;
  if (text.includes("click here to login")) score += 50;
  if (text.includes("send otp")) score += 60;
  if (text.includes("payment required")) score += 50;
  if (text.includes("crypto investment")) score += 70;

  const confidence = score > 0 ? 0.9 : 0.3;

  return {
    name: "scam",
    severityScore: Math.min(score, 100),
    confidence
  };
}
