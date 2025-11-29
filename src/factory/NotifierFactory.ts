// Heart of the Factory Pattern

import type { Notifier } from '../types.js';

type Maker = () => Notifier;

export class NotifierFactory {
    private registry = new Map<string, Maker>();

    register (channel: string, maker: Maker) {
        this.registry.set(channel, maker);
    }

    get (channel: string): Notifier {
        const maker = this.registry.get(channel);
        if (!maker) {
            throw new Error(`Notifier for channel ${channel} not registered.`);
        }
        return maker();
    }
}