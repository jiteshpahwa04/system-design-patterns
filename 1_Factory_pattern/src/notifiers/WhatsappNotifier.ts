import type { WhatsAppClient } from "../clients/interfaces.js";
import type { Notifier } from "../types.js";

export class WhatsappNotifier implements Notifier {
    constructor(private whatsappClient: WhatsAppClient) {}
    async send(to: string, message: string): Promise<void> {
        await this.whatsappClient.sendWhatsAppMessage(to, message);
    }
}