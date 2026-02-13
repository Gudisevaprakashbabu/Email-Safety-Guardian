"use strict";

console.log("[ESG Content] Script active");

if (!window.MESSAGE_TYPES) {
    console.error("[ESG] MESSAGE_TYPES not loaded.");
}

let lastEmailSignature = null;

async function detectEmailView() {

    const emailContainer = document.querySelector("div.a3s");

    if (!emailContainer) return;

    const emailData = window.extractEmailData();

    if (!emailData.subject && !emailData.senderEmail) return;

    const signature = emailData.subject + "|" + emailData.senderEmail;

    if (signature === lastEmailSignature) return;

    lastEmailSignature = signature;

    console.log("[ESG] New email detected");

    const emailHash = await window.generateEmailHash(emailData);

    console.log("[ESG] Email Hash:", emailHash);

    chrome.runtime.sendMessage({
        type: window.MESSAGE_TYPES.EMAIL_DETECTED,
        payload: {
            email_hash: emailHash,
            ...emailData
        }
    });
}

function startObserver() {

    const observer = new MutationObserver(() => {
        detectEmailView();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    console.log("[ESG] Gmail observer started");
}

startObserver();

chrome.runtime.sendMessage(
    { type: window.MESSAGE_TYPES.PING },
    (response) => {
        console.log("[ESG] Background response:", response);
    }
);
