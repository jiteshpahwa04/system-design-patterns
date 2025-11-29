import type { EmailClient, PushNotificationClient, SMSClient } from "./interfaces.js";

export class ConsoleEmailClient implements EmailClient {
    async sendEmail(to: string, subject: string, body: string): Promise<void> {
        await Promise.resolve();
        console.log(`Email sent to ${to} with subject "${subject}" and body "${body}"`);
    }
}

export class ConsoleSMSClient implements SMSClient {
    async sendSMS(to: string, message: string): Promise<void> {
        await Promise.resolve();
        console.log(`SMS sent to ${to} with message "${message}"`);
    }
}

export class ConsolePushNotificationClient implements PushNotificationClient {
    async sendPush(to: string, title: string, message: string): Promise<void> {
        await Promise.resolve();
        console.log(`Push notification sent to ${to} with title "${title}" and message "${message}"`);
    }
}