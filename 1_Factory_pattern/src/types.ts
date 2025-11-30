export interface Notifier {
    send(to: string, message: string): Promise<void>;
}

export type channel = 'email' | 'sms' | 'push' | 'whatsapp';