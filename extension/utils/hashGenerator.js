"use strict";

window.ESGHash = {

    async generate(emailData) {

        const raw = `${emailData.subject}|${emailData.senderEmail}|${emailData.bodyText}`;
        const encoder = new TextEncoder();
        const data = encoder.encode(raw);

        const hashBuffer = await crypto.subtle.digest("SHA-256", data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));

        return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
    }
};
