"use strict";

const MESSAGE_TYPES = {
    PING: "PING"
};

console.log("[ESG Content] Script active");

/*
Handles popup → content → background routing
*/
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    if (!message?.type) return;

    switch (message.type) {

        case MESSAGE_TYPES.PING:

            chrome.runtime.sendMessage(
                { type: MESSAGE_TYPES.PING },
                (response) => {

                    if (chrome.runtime.lastError) {
                        console.error("[ESG Content] Background error:", chrome.runtime.lastError);
                        sendResponse({ error: true });
                        return;
                    }

                    sendResponse(response);
                }
            );

            return true;

        default:
            console.warn("[ESG Content] Unknown message:", message.type);
    }
});

/*
Initial handshake
*/
chrome.runtime.sendMessage({ type: MESSAGE_TYPES.PING }, (response) => {
    console.log("[ESG Content] Background response:", response);
});
