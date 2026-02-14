"use strict";

console.log("[ESG Background] Service worker started");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    if (!message?.type) return;

    if (message.type === "PING") {
        sendResponse({ status: "Background Alive" });
    }

    return true;
});
