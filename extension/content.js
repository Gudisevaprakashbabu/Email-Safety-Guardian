"use strict";

console.log("[ESG Content] Script active");

chrome.runtime.sendMessage({ type: window.MESSAGE_TYPES.PING }, (response) => {
    console.log("[ESG] Background response:", response);
});

let lastProcessedHash = null;

async function processEmail() {

    const emailData = window.ESGExtractor.extract();

    if (!emailData.subject && !emailData.bodyText) return;

    const emailHash = await window.ESGHash.generate(emailData);

    if (emailHash === lastProcessedHash) return;

    lastProcessedHash = emailHash;

    console.log("[ESG] New email detected");
    console.log("[ESG] Email Hash:", emailHash);

    const signals = window.ESGSignals.detect(emailData);
    console.log("[ESG] Signals:", signals);

    const risk = window.ESGRiskEngine.evaluate(signals);
    console.log("[ESG] Risk:", risk);
}

function observeGmail() {

    const observer = new MutationObserver(() => {
        processEmail();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    console.log("[ESG] Gmail observer started");
}

observeGmail();
