import type { EmailClient } from "../clients/interfaces.js";
import type { Notifier } from "../types.js";

export class EmailNotifier implements Notifier {
    private emailClient: EmailClient;
    constructor(emailClient: EmailClient) {
        this.emailClient = emailClient;
    }
    async send(to: string, message: string): Promise<void> {
        const subject = "Notification";
        await this.emailClient.sendEmail(to, subject, message);
    }
}