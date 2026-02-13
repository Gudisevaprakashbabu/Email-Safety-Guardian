"use strict";

console.log("[ESG Background] Service worker started");

/**
 * Handles internal extension messaging.
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("[ESG Background] Installed / Updated");
    if (!message?.type) return;

    switch (message.type) {

        case "PING":
            sendResponse({ status: "Background Alive" });
            return true;

        default:
            console.warn("[ESG Background] Unknown message:", message.type);
    }

});

