"use strict";

/*
Basic Gmail email extraction utilities
*/

(function () {

    function extractEmailData() {

        const subjectElement = document.querySelector("h2.hP");
        const senderElement = document.querySelector(".gD");
        const bodyElement = document.querySelector("div.a3s");

        const subject = subjectElement ? subjectElement.innerText.trim() : "";
        const senderEmail = senderElement ? senderElement.getAttribute("email") : "";
        const bodyText = bodyElement ? bodyElement.innerText.trim() : "";

        const links = Array.from(document.querySelectorAll("div.a3s a"))
            .map(a => a.href);

        return {
            subject,
            senderEmail,
            bodyText,
            links
        };
    }

    /*
    Expose globally
    */
    window.extractEmailData = extractEmailData;

})();
