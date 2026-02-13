"use strict";

const MESSAGE_TYPES = {
    PING: "PING"
};

console.log("[ESG Popup] Loaded");

const statusElement = document.getElementById("status");

function updateStatus(text) {
    statusElement.textContent = `Status: ${text}`;
}

function pingContentScript() {

    updateStatus("Checking Gmail...");

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {

        if (!tabs[0]?.id) {
            updateStatus("No active tab");
            return;
        }

        chrome.tabs.sendMessage(
            tabs[0].id,
            { type: MESSAGE_TYPES.PING },
            (response) => {

                if (chrome.runtime.lastError || response?.error) {
                    updateStatus("Gmail not detected");
                    return;
                }

                console.log("[ESG Popup] Response:", response);
                updateStatus("Extension Connected");
            }
        );
    });
}

pingContentScript();
