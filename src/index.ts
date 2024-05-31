import express, { Request, Response } from "express";
import { handleEvent } from "./eventHandler";

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/", async (request: Request, response: Response) => {
  response.status(200).send("Process Innitiated"); //Responding with a message while everything continues in the background
  await handleEvent(request, response);
});
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
