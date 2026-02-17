(function () {
    if (window.__ESG_V4_LOCK__) return;
    window.__ESG_V4_LOCK__ = true;

    console.log("[ESG v4] Content script initialized");

    const processed = new Set();
    let currentMessageId = null;
    let currentView = null;

    /* ===============================
       VIEW DETECTION
    =============================== */

    function detectView() {
        const url = location.href;

        const match = url.match(/#.*?\/([^/?]+)/);
        const messageId = match ? match[1] : null;

        if (messageId) {
            return { type: "email", messageId };
        }

        return { type: "inbox", messageId: null };
    }

    /* ===============================
       EMAIL DOM READY CHECK
    =============================== */

    function isEmailDomReady() {
        const subject = document.querySelector("h2");
        const sender = document.querySelector("span[email]");

        return subject && sender;
    }

    function extractEmail() {
        const subject =
            document.querySelector("h2")?.innerText?.trim() || "";

        const sender =
            document.querySelector("span[email]")?.getAttribute("email") || "";

        const body =
            document.querySelector("div[role='listitem']")?.innerText?.trim() || "";

        const links = Array.from(document.querySelectorAll("a"))
            .map(a => a.href)
            .filter(Boolean);

        return { subject, sender, body, links };
    }

    /* ===============================
       ENGINE EXECUTION
    =============================== */

    function runAnalysis(messageId) {
        if (processed.has(messageId)) {
            return;
        }

        const email = extractEmail();

        if (!email.subject && !email.sender) {
            return;
        }

        processed.add(messageId);

        chrome.runtime.sendMessage(
            {
                type: "RUN_ENGINE_V4",
                payload: email,
                messageId
            },
            (response) => {
                if (chrome.runtime.lastError) {
                    console.warn("[ESG] Background not reachable");
                    return;
                }

                console.log("[ESG v4 RESULT]", response);
            }
        );
    }

    /* ===============================
       STABLE EXECUTION LOOP
    =============================== */

    function lifecycleCheck() {
        const view = detectView();

        if (view.type !== currentView) {
            currentView = view.type;
        }

        if (view.type === "email") {
            if (view.messageId !== currentMessageId) {
                currentMessageId = view.messageId;

                waitForEmailReady(view.messageId);
            }
        }
    }

    function waitForEmailReady(messageId) {
        const interval = setInterval(() => {
            if (isEmailDomReady()) {
                clearInterval(interval);
                runAnalysis(messageId);
            }
        }, 300);
    }

    /* ===============================
       URL CHANGE OBSERVER
    =============================== */

    let lastUrl = location.href;

    const observer = new MutationObserver(() => {
        const url = location.href;

        if (url !== lastUrl) {
            lastUrl = url;
            lifecycleCheck();
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    window.addEventListener("load", lifecycleCheck);
})();
