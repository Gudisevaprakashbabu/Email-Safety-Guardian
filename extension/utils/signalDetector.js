"use strict";

window.ESGSignalDetector = {
  detect(extracted) {
    const { subject, senderEmail, bodyText, links } = extracted;

    const freeEmailDomains = [
      "gmail.com", "yahoo.com", "outlook.com"
    ];

    const suspiciousTLDs = [".xyz", ".top", ".click", ".ru"];

    const shortenedDomains = [
      "bit.ly", "tinyurl.com", "goo.gl"
    ];

    const urgencyKeywords = [
      "urgent", "immediately", "expire", "suspended"
    ];

    const rewardKeywords = [
      "reward", "win", "prize", "claim"
    ];

    const authorityKeywords = [
      "government", "official", "legal", "compliance"
    ];

    const signals = {
      free_email_sender: false,
      suspicious_tld_detected: false,
      has_shortened_link: false,
      urgency_detected: false,
      reward_bait_detected: false,
      authority_pressure_detected: false,
      excessive_links_detected: false
    };

    if (senderEmail) {
      const domain = senderEmail.split("@")[1];
      if (freeEmailDomains.includes(domain)) {
        signals.free_email_sender = true;
      }
    }

    for (const link of links) {
      if (suspiciousTLDs.some(tld => link.includes(tld))) {
        signals.suspicious_tld_detected = true;
      }
      if (shortenedDomains.some(sd => link.includes(sd))) {
        signals.has_shortened_link = true;
      }
    }

    const combinedText = (subject + " " + bodyText).toLowerCase();

    if (urgencyKeywords.some(k => combinedText.includes(k))) {
      signals.urgency_detected = true;
    }

    if (rewardKeywords.some(k => combinedText.includes(k))) {
      signals.reward_bait_detected = true;
    }

    if (authorityKeywords.some(k => combinedText.includes(k))) {
      signals.authority_pressure_detected = true;
    }

    if (links.length > 10) {
      signals.excessive_links_detected = true;
    }

    return signals;
  }
};
