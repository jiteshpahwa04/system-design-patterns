import { buildNotifierFactory } from "./bootstrap/buildFactory.js";
import { BookingConfirmationService } from "./services/BookingConfirmationService.js";

async function demo() {
    const factory = buildNotifierFactory();
    const svc = new BookingConfirmationService(factory);

    await svc.sendBookingConfirmation('email', 'user@example.com', 'Your booking is confirmed!');
    await svc.sendBookingConfirmation('sms', '+1234567890', 'Your booking is confirmed!');
    await svc.sendBookingConfirmation('push', 'userDeviceToken', 'Your booking is confirmed!');
    await svc.sendBookingConfirmation('whatsapp', '+1234567890', 'Your booking is confirmed!');
}