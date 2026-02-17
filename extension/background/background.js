import { runEngine } from "../engine/index.js";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    if (request.type === "RUN_ENGINE_V4") {

        const email = request.payload;

        const result = runEngine(email);

        sendResponse(result);

        return true;
    }
});
