(function () {
    if (window.__ESG_CONTENT_LOADED__) {
        return;
    }
    window.__ESG_CONTENT_LOADED__ = true;

    console.log("[ESG] Content script active");

    const processedMessageIds = new Set();
    let observerStarted = false;

    function isExtensionContextValid() {
        return typeof chrome !== "undefined" &&
               chrome.runtime &&
               typeof chrome.runtime.sendMessage === "function";
    }

    function getMessageIdFromURL() {
        const match = window.location.href.match(/#.*?\/([^/?]+)/);
        return match ? match[1] : null;
    }

    function extractEmailData() {
        const subjectEl = document.querySelector("h2");
        const fromEl = document.querySelector(".gD");

        if (!subjectEl || !fromEl) return null;

        return {
            subject: subjectEl.innerText || "",
            from: fromEl.getAttribute("email") || "",
            body: document.body.innerText || ""
        };
    }

    function processEmailIfNew() {
        try {
            const messageId = getMessageIdFromURL();
            if (!messageId) return;

            if (processedMessageIds.has(messageId)) {
                return;
            }

            const emailData = extractEmailData();
            if (!emailData || (!emailData.subject && !emailData.from)) {
                return;
            }

            processedMessageIds.add(messageId);

            console.log("[ESG] New email detected");
            console.log("[ESG] Message ID:", messageId);

            if (!isExtensionContextValid()) {
                console.warn("[ESG] Extension context invalid. Skipping sendMessage.");
                return;
            }

            chrome.runtime.sendMessage(
                {
                    type: "analyzeEmail",
                    emailData,
                    messageId
                },
                (response) => {
                    if (chrome.runtime.lastError) {
                        console.warn("[ESG] Background not reachable:", chrome.runtime.lastError.message);
                        return;
                    }

                    console.log("[ESG] Background response:", response);
                }
            );

        } catch (err) {
            console.error("[ESG] Fatal processing error:", err);
        }
    }

    function monitorURLChange() {
        let lastUrl = location.href;

        new MutationObserver(() => {
            const currentUrl = location.href;
            if (currentUrl !== lastUrl) {
                lastUrl = currentUrl;
                processEmailIfNew();
            }
        }).observe(document.body, { childList: true, subtree: true });
    }

    function startObserver() {
        if (observerStarted) return;
        observerStarted = true;

        console.log("[ESG] Gmail observer started");

        monitorURLChange();
        processEmailIfNew();
    }

    window.addEventListener("load", () => {
        startObserver();
    });

})();
