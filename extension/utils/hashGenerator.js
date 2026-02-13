"use strict";

/*
Email Hash Generator
Privacy-safe identity creation
Uses:
sender_email + subject + first_500_chars_of_body
*/

(function () {

    async function generateEmailHash(emailData) {

        if (!emailData) return null;

        const sender = emailData.senderEmail || "";
        const subject = emailData.subject || "";
        const bodySnippet = (emailData.bodyText || "").substring(0, 500);

        const combinedString = sender + subject + bodySnippet;

        const encoder = new TextEncoder();
        const data = encoder.encode(combinedString);

        const hashBuffer = await crypto.subtle.digest("SHA-256", data);

        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray
            .map(b => b.toString(16).padStart(2, "0"))
            .join("");

        return hashHex;
    }

    window.generateEmailHash = generateEmailHash;

})();
