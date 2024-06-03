export type TEmailBody = {
  subject: string;
  body: string;
};

export const scheduleEmail = async (
  delayInMs: number,
  emailDetails: { userEmail: string; message: TEmailBody }
) => {
  const task = async () => {
    const success = await sendEmail(
      emailDetails.userEmail,
      emailDetails.message
    );
    if (!success) {
      throw new Error("Failed to complete task");
    } else console.log("Complete", success); //for demo purposes
  };
  setTimeout(task, delayInMs);
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
