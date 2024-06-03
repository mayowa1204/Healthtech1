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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stopAllTasks = exports.scheduleEmail = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const scheduledTasks = new Map();
const scheduleEmail = (taskId, delayInMs, emailDetails) => {
    const date = new Date(Date.now() + delayInMs);
    const cronExpression = `${date.getUTCMinutes()} ${date.getUTCHours()} ${date.getUTCDate()} ${date.getUTCMonth() + 1} *`;
    const task = node_cron_1.default.schedule(cronExpression, () => __awaiter(void 0, void 0, void 0, function* () {
        const success = yield sendEmail(emailDetails.userEmail, emailDetails.message);
        console.log("HERE");
        if (!success) {
            throw new Error("Failed to send email");
        }
        scheduledTasks.delete(taskId);
    }));
    scheduledTasks.set(taskId, task);
};
exports.scheduleEmail = scheduleEmail;
// Function to stop all scheduled tasks, useful for cleanup
const stopAllTasks = () => {
    scheduledTasks.forEach((task) => task.stop());
    scheduledTasks.clear();
};
exports.stopAllTasks = stopAllTasks;
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
