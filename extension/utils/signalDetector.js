"use strict";

window.ESGSignals = {

    detect(emailData) {

        const signals = {
            has_shortened_link: false,
            suspicious_tld_detected: false,
            excessive_links_detected: false,
            link_text_mismatch: false,
            free_email_sender: false,
            urgency_detected: false,
            fear_tactic_detected: false,
            authority_pressure_detected: false,
            reward_bait_detected: false,
            suspicious_domain_pattern: false
        };

        const shortenedDomains = [
            "bit.ly", "tinyurl.com", "t.co", "goo.gl", "rebrand.ly"
        ];

        const suspiciousTlds = [
            ".xyz", ".top", ".click", ".ru", ".tk"
        ];

        const freeEmailDomains = [
            "@gmail.com", "@yahoo.com", "@outlook.com"
        ];

        if (emailData.links.length > 10) {
            signals.excessive_links_detected = true;
        }

        emailData.links.forEach(link => {

            shortenedDomains.forEach(domain => {
                if (link.includes(domain)) {
                    signals.has_shortened_link = true;
                }
            });

            suspiciousTlds.forEach(tld => {
                if (link.includes(tld)) {
                    signals.suspicious_tld_detected = true;
                }
            });
        });

        freeEmailDomains.forEach(domain => {
            if (emailData.senderEmail.includes(domain)) {
                signals.free_email_sender = true;
            }
        });

        const body = emailData.bodyText.toLowerCase();

        if (body.includes("urgent") || body.includes("immediately")) {
            signals.urgency_detected = true;
        }

        if (body.includes("account suspended") || body.includes("verify now")) {
            signals.fear_tactic_detected = true;
        }

        if (body.includes("ceo") || body.includes("legal notice")) {
            signals.authority_pressure_detected = true;
        }

        if (body.includes("reward") || body.includes("won") || body.includes("gift")) {
            signals.reward_bait_detected = true;
        }

        if (emailData.senderEmail.includes("secure-login") ||
            emailData.senderEmail.includes("verify-account")) {
            signals.suspicious_domain_pattern = true;
        }

        return signals;
    }
};
