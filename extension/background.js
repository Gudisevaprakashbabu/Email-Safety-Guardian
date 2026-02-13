"use strict";

console.log("[ESG Background] Service worker started");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    if (!message?.type) return;

    switch (message.type) {

        case "PING":
            sendResponse({ status: "Background Alive" });
            break;

        case "EMAIL_DETECTED":
            console.log("[ESG Background] Email received:", message.payload);
            break;

        default:
            console.warn("[ESG Background] Unknown message:", message.type);
    }

    return true;
});
