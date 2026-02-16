// background.js – Service Worker for analysis

// Example static data or modules could be loaded here if needed.
// (In this refactor, we do simple logic directly.)

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'analyzeEmail') {
    // Extract email data from request
    const email = request.emailData || {};
    // Simple signal detection logic (stubbed for example)
    const senderDomain = email.from ? email.from.split('@').pop() : '';
    const signals = {
      free_email_sender: ["gmail.com", "yahoo.com", "hotmail.com"].includes(senderDomain),
      suspicious_tld_detected: senderDomain.endsWith('.xyz') || senderDomain.endsWith('.top'),
      has_shortened_link: email.body && email.body.includes('bit.ly'),
      urgency_detected: email.subject && /urgent|asap|reply immediately/i.test(email.subject),
      reward_bait_detected: email.body && /free prize|winner|claim now/i.test(email.body),
      has_ip: email.body && /\b\d{1,3}(\.\d{1,3}){3}\b/.test(email.body),
      risky_sender_domain: false  // stub, could check known bad domains
    };
    // Compute risk score (example logic)
    let riskScore = 0;
    if (signals.free_email_sender) riskScore += 20;
    if (signals.reward_bait_detected) riskScore += 30;
    if (signals.suspicious_tld_detected) riskScore += 25;
    if (signals.urgency_detected) riskScore += 10;
    if (signals.has_shortened_link) riskScore += 10;
    // Determine risk level
    const riskLevel = riskScore >= 25 ? 'MEDIUM' : 'SAFE';
    // Send back the analysis results
    sendResponse({ signals, risk: { riskScore, riskLevel } });
    // Indicate async response if needed (not needed here since we responded)
    return true;
  }
});
