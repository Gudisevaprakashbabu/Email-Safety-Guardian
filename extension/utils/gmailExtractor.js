"use strict";

window.ESGExtractor = {
  extract() {
    const subject =
      document.querySelector("h2")?.innerText?.trim() || "";

    const senderEmail =
      document.querySelector("span[email]")?.getAttribute("email") || "";

    const bodyContainer =
      document.querySelector("div[role='listitem']");

    const bodyText =
      bodyContainer?.innerText?.trim() || "";

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
