// This class never know if it's email, sms or push notifier
// That's where decoupling happens

import type { NotifierFactory } from "../factory/NotifierFactory.js";

export class BookingConfirmationService {
    constructor(private notifierFactory: NotifierFactory) {}

    async sendBookingConfirmation(channel: string, to: string, message: string): Promise<void> {
        const notifier = this.notifierFactory.get(channel);
        await notifier.send(to, message);
    }
}