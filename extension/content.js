"use strict";

console.log("[ESG Content] Script active");

/**
 * Responds to popup communication.
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    if (!message?.type) return;

    switch (message.type) {

        case "PING":
            sendResponse({ status: "Content Script Alive" });
            break;

        default:
            console.warn("[ESG Content] Unknown message:", message.type);
    }

});

/**
 * Initial handshake with background script.
 */
function notifyBackground() {

    chrome.runtime.sendMessage({ type: "PING" }, (response) => {

        if (chrome.runtime.lastError) {
            console.error("[ESG Content] Background error:", chrome.runtime.lastError);
            return;
        }

        console.log("[ESG Content] Background response:", response);
    });

}

notifyBackground();
