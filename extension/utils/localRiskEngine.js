"use strict";

window.ESGRiskEngine = {

    evaluate(signals) {

        let riskScore = 0;

        const weights = {
            has_shortened_link: 15,
            suspicious_tld_detected: 20,
            excessive_links_detected: 15,
            link_text_mismatch: 20,
            free_email_sender: 10,
            urgency_detected: 10,
            fear_tactic_detected: 15,
            authority_pressure_detected: 15,
            reward_bait_detected: 10,
            suspicious_domain_pattern: 20
        };

        Object.keys(signals).forEach(key => {
            if (signals[key] && weights[key]) {
                riskScore += weights[key];
            }
        });

        let riskLevel = "SAFE";

        if (riskScore >= 60) {
            riskLevel = "HIGH";
        } else if (riskScore >= 30) {
            riskLevel = "MEDIUM";
        }

        return {
            riskScore,
            riskLevel
        };
    }
};
