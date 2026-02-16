"use strict";

window.ESGRiskEngine = {
  evaluate(signals) {
    let score = 0;

    const weights = {
      free_email_sender: 15,
      suspicious_tld_detected: 25,
      has_shortened_link: 20,
      urgency_detected: 15,
      reward_bait_detected: 20,
      authority_pressure_detected: 15,
      excessive_links_detected: 10
    };

    for (const key in signals) {
      if (signals[key] && weights[key]) {
        score += weights[key];
      }
    }

    let riskLevel = "SAFE";

    if (score >= 60) riskLevel = "HIGH";
    else if (score >= 30) riskLevel = "MEDIUM";

    return {
      riskScore: score,
      riskLevel
    };
  }
};
