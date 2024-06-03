import { handleEvent, processFlows, evenType } from "../eventHandler";
import { Request, Response, response } from "express";
import * as fileUnderTest from "../eventHandler";

const testEvent = {
  eventName: evenType.WEB_SIGN_UP,
  userEmail: "pete@healthtech1.uk",
};

const mockRequest = {} as Request;

const mockResponse = {} as Response;

describe("EventHandler", () => {
  describe("handleEvent()", () => {
    it("should throw BadRequestError when event body is empty", () => {
      const request = mockRequest;
      const response = mockResponse;
      const functionUnderTest = () => handleEvent(request, response);
      expect(functionUnderTest).toThrow(
        "Invalid Event: [Event does not contain a body]"
      );
    });

    it("should call processFlows with valid event body", () => {
      const request = mockRequest;
      request.body = testEvent;
      const response = mockResponse;
      const spyProcessFlows = jest.spyOn(fileUnderTest, "processFlows");
      handleEvent(request, response);
      expect(spyProcessFlows).toHaveBeenCalledWith(
        evenType.WEB_SIGN_UP,
        testEvent
      );
    });
  });
});
