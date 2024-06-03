import { Request, Response } from "express";
import { BadRequestError } from "./errors";
import { TEmailBody, scheduleEmail } from "./utils/scheduler";

export enum evenType {
  WEB_SIGN_UP = "websiteSignup",
  SOCKS_PURCHASED = "socksPurchased",
  EMAIL_VERIFIED = "emailVerified",
}
type TEventBody = {
  eventName: string;
  userEmail: string;
};

const flows = {
  signUp: {
    delay: 7200,
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

export const handleEvent = (event: Request, response: Response) => {
  const { body } = event;
  if (!body)
    throw new BadRequestError("Invalid Event: [Event does not contain a body]");
  try {
    return processFlows(body.eventName, body);
  } catch (error) {
    if (error instanceof BadRequestError)
      response.status(400).send(error.message);
    else response.status(500).send(`An error occured. Error: [${error}]`);
  }
};

export const processFlows = async (
  eventName: string,
  payload: TEventBody,
  wait = false
) => {
  const emails = []; // list of emails to be sent
  if (eventName === evenType.WEB_SIGN_UP) {
    // await new Promise((resolve) => setTimeout(resolve, flows.signUp.delay));
    // emails.push(...flows.signUp.emails);
    await scheduleEmail(flows.signUp.delay, {
      userEmail: payload.userEmail,
      message: flows.signUp.emails[0],
    });
  }
  if (eventName === evenType.SOCKS_PURCHASED)
    flows.purchase.emails.map(async (f) => {
      await scheduleEmail(flows.signUp.delay, {
        userEmail: payload.userEmail,
        message: f,
      });
    });
  // emails.push(...flows.purchase.emails);

  //   Object.values(emails).map(async (val) => {
  //     // const t = await sendEmail(payload.userEmail, val);
  //     // if (wait)
  //     //   await new Promise((resolve) => setTimeout(resolve, flows.purchase.delay)); // can set wait to true to wait between purchases
  //     await scheduleEmail("i2345");
  //   });
  return `Process Complete. Number of actions: ${emails.length}`;
};

const sendEmail = async (
  userEmail: string,
  message: TEmailBody
): Promise<string | void> => {
  // Generate a random number between 0 and 1
  const randomNumber = Math.random();

  // Simulating an asynchronous operation, e.g., sending an email
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // 95% chance to return true, 5% chance to return false - emails fail
  if (randomNumber < 0.95) return `${message.subject} message sent`;
  else throw new Error("Failed to send message");
};
