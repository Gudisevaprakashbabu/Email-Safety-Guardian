"use strict";

window.ESGHash = {
  async generate(data) {
    const encoder = new TextEncoder();
    const encoded = encoder.encode(data);

    const buffer = await crypto.subtle.digest("SHA-256", encoded);
    const hashArray = Array.from(new Uint8Array(buffer));

    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  }
};
