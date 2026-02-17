import { structuralLayer } from "./layers/structuralLayer.js";
import { linguisticLayer } from "./layers/linguisticLayer.js";
import { scamPatternLayer } from "./layers/scamPatternLayer.js";
import { spamLayer } from "./layers/spamLayer.js";
import { aggregateRisk } from "./aggregator/riskAggregator.js";

export function runEngine(email) {
  const structural = structuralLayer(email);
  const linguistic = linguisticLayer(email);
  const scam = scamPatternLayer(email);
  const spam = spamLayer(email);

  const finalRisk = aggregateRisk({
    structural,
    linguistic,
    scam,
    spam
  });

  return finalRisk;
}
