"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processFlows = exports.handleEvent = exports.evenType = void 0;
const errors_1 = require("./errors");
var evenType;
(function (evenType) {
    evenType["WEB_SIGN_UP"] = "websiteSignup";
    evenType["SOCKS_PURCHASED"] = "socksPurchased";
    evenType["EMAIL_VERIFIED"] = "emailVerified";
})(evenType || (exports.evenType = evenType = {}));
const flows = {
    signUp: {
        delay: 7200000,
        emails: [
            //  This is assumed to always be 1 email
            {
                subject: "Welcome!",
                body: "Need some socks?",
            },
        ],
    },
    purchase: {
        delay: 7200, // delay between purchase emails
        emails: [
            // accounting for other emails in the sales process
            {
                subject: "Payment received",
                body: "Thank you!",
            },
            {
                subject: "Socks dispatched!",
                body: "Get ready!",
            },
        ],
    },
};
const handleEvent = (event, response) => {
    const { body } = event;
    if (!body)
        throw new errors_1.BadRequestError("Invalid Event: [Event does not contain a body]");
    try {
        return (0, exports.processFlows)(body.eventName, body);
    }
    catch (error) {
        if (error instanceof errors_1.BadRequestError)
            response.status(400).send(error.message);
        else
            response.status(500).send(`An error occured. Error: [${error}]`);
    }
};
exports.handleEvent = handleEvent;
const processFlows = (eventName_1, payload_1, ...args_1) => __awaiter(void 0, [eventName_1, payload_1, ...args_1], void 0, function* (eventName, payload, wait = false) {
    const emails = []; // list of emails to be sent
    if (eventName === evenType.WEB_SIGN_UP) {
        yield new Promise((resolve) => setTimeout(resolve, flows.signUp.delay));
        emails.push(...flows.signUp.emails);
    }
    if (eventName === evenType.SOCKS_PURCHASED)
        emails.push(...flows.purchase.emails);
    Object.values(emails).map((val) => __awaiter(void 0, void 0, void 0, function* () {
        const t = yield sendEmail(payload.userEmail, val);
        if (wait)
            yield new Promise((resolve) => setTimeout(resolve, flows.purchase.delay)); // can set wait to true to wait between purchases
    }));
    return `Process Complete. Number of actions: ${emails.length}`;
});
exports.processFlows = processFlows;
const sendEmail = (userEmail, message) => __awaiter(void 0, void 0, void 0, function* () {
    // Generate a random number between 0 and 1
    const randomNumber = Math.random();
    // Simulating an asynchronous operation, e.g., sending an email
    yield new Promise((resolve) => setTimeout(resolve, 1000));
    // 95% chance to return true, 5% chance to return false - emails fail
    if (randomNumber < 0.95)
        return `${message.subject} message sent`;
    else
        throw new Error("Failed to send message");
});
