// creates clients, factory, and registers notifiers

import { ConsoleEmailClient, ConsolePushNotificationClient, ConsoleSMSClient } from "../clients/consoleClient.js";
import { NotifierFactory } from "../factory/NotifierFactory.js";
import { EmailNotifier } from "../notifiers/EmailNotifier.js";
import { PushNotifier } from "../notifiers/PushNotifier.js";
import { SmsNotifier } from "../notifiers/SmsNotifier.js";

export function buildNotifierFactory() {
    const factory = new NotifierFactory();

    const emailClient = new ConsoleEmailClient();
    const smsClient = new ConsoleSMSClient();
    const pushClient = new ConsolePushNotificationClient();

    factory.register('email', ()=> new EmailNotifier(emailClient));
    factory.register('sms', ()=> new SmsNotifier(smsClient));
    factory.register('push', ()=> new PushNotifier(pushClient));

    return factory;
}