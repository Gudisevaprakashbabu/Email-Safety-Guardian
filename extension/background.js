"use strict";

const MESSAGE_TYPES = {
    PING: "PING"
};

console.log("[ESG Background] Service worker started");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    if (!message?.type) return;

    switch (message.type) {

        case MESSAGE_TYPES.PING:
            sendResponse({ status: "Background Alive" });
            break;

        default:
            console.warn("[ESG Background] Unknown message:", message.type);
    }

    return true;
});
