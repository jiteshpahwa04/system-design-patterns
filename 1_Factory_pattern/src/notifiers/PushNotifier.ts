import type { PushNotificationClient } from "../clients/interfaces.js";
import type { Notifier } from "../types.js";

export class PushNotifier implements Notifier {
    private pushClient: PushNotificationClient;
    constructor(pushClient: PushNotificationClient) {
        this.pushClient = pushClient;
    }
    async send(to: string, message: string): Promise<void> {
        const title = "Notification";
        await this.pushClient.sendPush(to, title, message);
    }
}