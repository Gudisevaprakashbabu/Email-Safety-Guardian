export function aggregateRisk(layers) {
  const weights = {
    structural: 1.4,
    linguistic: 1.2,
    scam: 1.8,
    spam: 1.0
  };

  let weightedSum = 0;
  let totalWeight = 0;
  let confidenceSum = 0;

  let activeLayers = 0;

  const layerScores = {};

  for (const key in layers) {
    const layer = layers[key];
    const weight = weights[layer.name];

    layerScores[layer.name] = layer.severityScore;

    if (layer.severityScore > 0) {
      activeLayers++;
    }

    weightedSum += layer.severityScore * weight;
    totalWeight += weight;
    confidenceSum += layer.confidence;
  }

  const avgConfidence =
    Object.keys(layers).length > 0
      ? confidenceSum / Object.keys(layers).length
      : 0;

  // Base numeric score (no suppression by confidence)
  let finalScore = totalWeight > 0
    ? weightedSum / totalWeight
    : 0;

  finalScore = Math.min(Math.round(finalScore), 100);

  const structural = layerScores.structural || 0;
  const linguistic = layerScores.linguistic || 0;
  const scam = layerScores.scam || 0;
  const spam = layerScores.spam || 0;

  let riskLevel = "SAFE";

  /* ===========================
     RULE PRIORITY ESCALATION
  ============================ */

  // CRITICAL
  if (scam >= 80 && structural >= 40) {
    riskLevel = "CRITICAL";
  }

  // HIGH
  else if (
    scam >= 60 ||
    (structural >= 50 && linguistic >= 30) ||
    [structural, linguistic, scam, spam].filter(s => s >= 40).length >= 3
  ) {
    riskLevel = "HIGH";
  }

  // MEDIUM
  else if (
    scam >= 30 ||
    structural >= 30 ||
    linguistic >= 30 ||
    [structural, linguistic, scam, spam].filter(s => s >= 35).length >= 2
  ) {
    riskLevel = "MEDIUM";
  }

  // LOW
  else if (activeLayers > 0) {
    riskLevel = "LOW";
  }

  // SAFE
  else {
    riskLevel = "SAFE";
  }

  /* ===========================
     SPAM CEILING RULE
  ============================ */

  const onlySpamActive =
    spam > 0 &&
    structural === 0 &&
    linguistic === 0 &&
    scam === 0;

  if (onlySpamActive && (riskLevel === "HIGH" || riskLevel === "CRITICAL")) {
    riskLevel = "MEDIUM";
  }

  return {
    riskScore: finalScore,
    riskLevel,
    confidence: avgConfidence.toFixed(2),
    breakdown: layers
  };
}
