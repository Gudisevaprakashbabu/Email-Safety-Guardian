"use strict";

console.log("[ESG Popup] Loaded");

const statusElement = document.getElementById("status");

/**
 * Verifies content script availability.
 */
function pingContentScript() {

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {

        if (!tabs[0]?.id) {
            statusElement.textContent = "Status: No active tab";
            return;
        }

        chrome.tabs.sendMessage(
            tabs[0].id,
            { type: "PING" },
            (response) => {

                if (chrome.runtime.lastError) {
                    console.error("[ESG Popup] Content script error:", chrome.runtime.lastError);
                    statusElement.textContent = "Status: Gmail not detected";
                    return;
                }

                console.log("[ESG Popup] Response:", response);
                statusElement.textContent = "Status: Extension Active";
            }
        );

    });

}

pingContentScript();
