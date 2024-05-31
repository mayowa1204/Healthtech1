"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const eventHandler_1 = require("../eventHandler");
const fileUnderTest = __importStar(require("../eventHandler"));
const testEvent = {
    eventName: eventHandler_1.evenType.WEB_SIGN_UP,
    userEmail: "pete@healthtech1.uk",
};
const mockRequest = {};
const mockResponse = {};
describe("EventHandler", () => {
    describe("handleEvent()", () => {
        it("should throw BadRequestError when event body is empty", () => {
            const request = mockRequest;
            const response = mockResponse;
            const functionUnderTest = () => (0, eventHandler_1.handleEvent)(request, response);
            expect(functionUnderTest).toThrow("Invalid Event: [Event does not contain a body]");
        });
        it("should call processFlows with valid event body", () => {
            const request = mockRequest;
            request.body = testEvent;
            const response = mockResponse;
            const spyProcessFlows = jest.spyOn(fileUnderTest, "processFlows");
            (0, eventHandler_1.handleEvent)(request, response);
            expect(spyProcessFlows).toHaveBeenCalledWith(eventHandler_1.evenType.WEB_SIGN_UP, testEvent);
        });
    });
    describe("processFlows()", () => {
        it("should process purchase flow", () => __awaiter(void 0, void 0, void 0, function* () {
            testEvent.eventName = eventHandler_1.evenType.SOCKS_PURCHASED;
            const result = yield (0, eventHandler_1.processFlows)(eventHandler_1.evenType.SOCKS_PURCHASED, testEvent, true);
            expect(result).toBe("Process Complete. Number of actions: 2");
        }));
    });
});
