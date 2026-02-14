"use strict";

window.ESGExtractor = {

    extract() {

        const subject =
            document.querySelector("h2")?.innerText || "";

        const senderEmail =
            document.querySelector("span[email]")?.getAttribute("email") || "";

        const bodyText =
            document.querySelector("div[role='listitem']")?.innerText || "";

        const links = Array.from(document.querySelectorAll("a"))
            .map(a => a.href)
            .filter(Boolean);

        return {
            subject,
            senderEmail,
            bodyText,
            links
        };
    }
};
