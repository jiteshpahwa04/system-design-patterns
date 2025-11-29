import type { SMSClient } from "../clients/interfaces.js";
import type { Notifier } from "../types.js";

export class SmsNotifier implements Notifier {
    private smsClient: SMSClient;
    constructor(smsClient: SMSClient) {
        this.smsClient = smsClient;
    }
    async send(to: string, message: string): Promise<void> {
        await this.smsClient.sendSMS(to, message);
    }
}