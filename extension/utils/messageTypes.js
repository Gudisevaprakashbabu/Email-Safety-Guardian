"use strict";

/*
Centralized message communication contract
*/

(function () {

    const MESSAGE_TYPES = {

        PING: "PING",

        EMAIL_DETECTED: "EMAIL_DETECTED"

    };

    /*
    Attach safely to global scope
    */
    window.MESSAGE_TYPES = MESSAGE_TYPES;

})();
