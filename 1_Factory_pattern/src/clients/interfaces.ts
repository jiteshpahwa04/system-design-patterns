export interface EmailClient {
    sendEmail(to: string, subject: string, body: string): Promise<void>;
}

export interface SMSClient {
    sendSMS(to: string, message: string): Promise<void>;
}

export interface PushNotificationClient {
    sendPush(to: string, title: string, message: string): Promise<void>;
}

export interface WhatsAppClient {
    sendWhatsAppMessage(to: string, message: string): Promise<void>;
}