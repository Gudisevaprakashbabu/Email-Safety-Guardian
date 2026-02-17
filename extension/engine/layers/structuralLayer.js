import { getDomain } from "../utils/domainUtils.js";

export function structuralLayer(email) {
  const domain = getDomain(email.from);
  let score = 0;

  const suspiciousTLDs = [".xyz", ".ru", ".top", ".click"];
  const freeDomains = ["gmail.com", "yahoo.com", "outlook.com"];

  if (freeDomains.includes(domain)) score += 20;
  if (suspiciousTLDs.some(t => domain.endsWith(t))) score += 40;
  if (/\b\d{1,3}(\.\d{1,3}){3}\b/.test(email.body)) score += 30;

  const confidence = score > 0 ? 0.8 : 0.3;

  return {
    name: "structural",
    severityScore: Math.min(score, 100),
    confidence
  };
}
